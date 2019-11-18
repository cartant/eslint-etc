/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { Syntax } from "@typescript-eslint/parser";
import { visitorKeys as VisitorKeys } from "@typescript-eslint/typescript-estree";

type Options = {
  Syntax: Record<string, string>;
  VisitorKeys: Record<string, readonly string[] | undefined>;
};

export function configureTraverse(
  options: Options = {
    Syntax,
    VisitorKeys
  }
): Options {
  const estraverse = require("estraverse");
  const previous = {
    Syntax: { ...estraverse.Syntax },
    VisitorKeys: { ...estraverse.VisitorKeys }
  };
  Object.assign(estraverse.Syntax, options.Syntax);
  Object.assign(estraverse.VisitorKeys, options.VisitorKeys);
  return previous;
}
