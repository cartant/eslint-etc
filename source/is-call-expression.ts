/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import * as es from "estree";

export function isCallExpression(node: es.Node): node is es.CallExpression {
  return node.type === "CallExpression";
}
