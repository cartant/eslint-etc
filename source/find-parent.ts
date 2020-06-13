/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { TSESTree as es } from "@typescript-eslint/experimental-utils";
import { getParent } from "./get-parent";

export function findParent(
  node: es.Node,
  ...parentTypes: string[]
): es.Node | undefined {
  let parent = getParent(node);
  while (parent) {
    if (parentTypes.indexOf(parent.type) !== -1) {
      return parent;
    }
    parent = getParent(parent);
  }
  return undefined;
}
