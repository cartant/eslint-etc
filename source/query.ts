/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import esquery from "esquery";
import estraverse from "estraverse";

export function query(
  ...args: Parameters<typeof esquery>
): ReturnType<typeof esquery> {
  if (!estraverse.VisitorKeys["TSTypeAnnotation"]) {
    throw new Error("estraverse not configured");
  }
  return esquery(...args);
}
