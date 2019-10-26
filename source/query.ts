/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import esquery from "esquery";
import { configureTraverse } from "./configure-traverse";

let configured = false;

export function query(
  ...args: Parameters<typeof esquery>
): ReturnType<typeof esquery> {
  if (!configured) {
    configureTraverse();
    configured = true;
  }
  return esquery(...args);
}
