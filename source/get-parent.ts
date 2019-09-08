/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import * as es from "estree";

export function getParent(node: es.Node): es.Node | undefined {
  return (node as any).parent;
}
