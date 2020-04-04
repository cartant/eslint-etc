/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { Syntax as tsSyntax } from "@typescript-eslint/parser";
import { visitorKeys as tsVisitorKeys } from "@typescript-eslint/typescript-estree";

type Options = {
  Syntax: Record<string, string>;
  VisitorKeys: Record<string, readonly string[] | undefined>;
};

export function configureTraverse(
  options: Options = {
    Syntax: tsSyntax,
    VisitorKeys: tsVisitorKeys,
  }
): Options {
  const {
    Syntax: esSyntax,
    VisitorKeys: esVisitorKeys,
  } = require("estraverse");
  const previous = {
    Syntax: Object.assign({}, esSyntax),
    VisitorKeys: Object.assign({}, esVisitorKeys),
  };
  // Mutate the object contents to handle situations in which other code
  // already has a reference to said objects.
  Object.keys(esSyntax).forEach((key) => delete esSyntax[key]);
  Object.keys(esVisitorKeys).forEach((key) => delete esVisitorKeys[key]);
  Object.assign(esSyntax, options.Syntax);
  Object.assign(esVisitorKeys, options.VisitorKeys);
  return previous;
}
