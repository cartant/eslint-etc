/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { expect } from "chai";
import { parseScript } from "esprima";
import { configureTraverse } from "./configure-traverse";
import { query } from "./query";

describe("query", () => {
  const program = parseScript(`const a = "a"`);

  it("should throw if estraverse has not been configured", () => {
    expect(() => query(program, "Identifier")).to.throw(/not configured/);
  });

  it("should not throw if estraverse has been configured", () => {
    let options: any;
    try {
      options = configureTraverse();
      expect(() => query(program, "Identifier")).to.not.throw();
    } finally {
      configureTraverse(options);
    }
  });
});
