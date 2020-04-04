/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */
/*tslint:disable no-unused-expression*/

import { expect } from "chai";
import estraverse from "estraverse";
import { configureTraverse } from "./configure-traverse";

describe("configureTraverse", () => {
  it("should configure the TypeScript nodes by default", () => {
    expect(estraverse.VisitorKeys["TSTypeAnnotation"]).to.not.exist;
    let options: any;
    try {
      options = configureTraverse();
      expect(estraverse.VisitorKeys["TSTypeAnnotation"]).to.exist;
    } finally {
      configureTraverse(options);
      expect(estraverse.VisitorKeys["TSTypeAnnotation"]).to.not.exist;
    }
  });

  it("should not change the module property references", () => {
    const { Syntax, VisitorKeys } = estraverse;
    let options: any;
    try {
      options = configureTraverse();
      expect(estraverse.Syntax).to.equal(Syntax);
      expect(estraverse.VisitorKeys).to.equal(VisitorKeys);
    } finally {
      configureTraverse(options);
      expect(estraverse.Syntax).to.equal(Syntax);
      expect(estraverse.VisitorKeys).to.equal(VisitorKeys);
    }
  });
});
