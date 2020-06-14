/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import {
  ESLintUtils,
  TSESLint,
  TSESTree as es,
} from "@typescript-eslint/experimental-utils";
import * as tsutils from "tsutils-etc";
import * as ts from "typescript";
import { isArrowFunctionExpression, isFunctionDeclaration } from "./is";

export function getTypeServices<
  TMessageIds extends string,
  TOptions extends unknown[]
>(context: TSESLint.RuleContext<TMessageIds, Readonly<TOptions>>) {
  const service = ESLintUtils.getParserServices(context);
  const nodeMap = service.esTreeNodeToTSNodeMap;
  const typeChecker = service.program.getTypeChecker();

  const couldBeType = (
    node: es.Node,
    name: string | RegExp,
    qualified?: { name: RegExp }
  ) => {
    const type = getType(node);
    return tsutils.couldBeType(
      type,
      name,
      qualified ? { ...qualified, typeChecker } : undefined
    );
  };

  const couldReturnType = (
    node: es.Node,
    name: string | RegExp,
    qualified?: { name: RegExp }
  ) => {
    const tsNode = nodeMap.get(node);
    if (
      ts.isArrowFunction(tsNode) ||
      ts.isFunctionDeclaration(tsNode) ||
      ts.isMethodDeclaration(tsNode) ||
      ts.isFunctionExpression(tsNode) ||
      ts.isCallSignatureDeclaration(tsNode) ||
      ts.isMethodSignature(tsNode)
    ) {
      return (
        tsNode.type &&
        tsutils.couldBeType(
          typeChecker.getTypeAtLocation(tsNode.type),
          name,
          qualified ? { ...qualified, typeChecker } : undefined
        )
      );
    }
    return false;
  };

  const getType = (node: es.Node) => {
    const tsNode = nodeMap.get(node);
    return tsNode && typeChecker.getTypeAtLocation(tsNode);
  };

  return {
    couldBeBehaviorSubject: (node: es.Node) =>
      couldBeType(node, "BehaviorSubject"),
    couldBeError: (node: es.Node) => couldBeType(node, "Error"),
    couldBeFunction: (node: es.Node) => {
      if (isArrowFunctionExpression(node) || isFunctionDeclaration(node)) {
        return true;
      }
      return tsutils.couldBeFunction(getType(node));
    },
    couldBeMonoTypeOperatorFunction: (node: es.Node) =>
      couldBeType(node, "MonoTypeOperatorFunction"),
    couldBeObservable: (node: es.Node) => couldBeType(node, "Observable"),
    couldBeSubject: (node: es.Node) => couldBeType(node, "Subject"),
    couldBeSubscription: (node: es.Node) => couldBeType(node, "Subscription"),
    couldBeType,
    couldReturnObservable: (node: es.Node) =>
      couldReturnType(node, "Observable"),
    couldReturnType,
    getType,
    isAny: (node: es.Node) => tsutils.isAny(getType(node)),
    isReferenceType: (node: es.Node) => tsutils.isReferenceType(getType(node)),
    nodeMap,
    typeChecker,
  };
}
