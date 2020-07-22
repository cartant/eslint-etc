/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { TSESLint as eslint } from "@typescript-eslint/experimental-utils";

export function fromFixture<
  TMessageIds extends string = string,
  TOptions extends unknown[] = unknown[]
>(
  fixture: string,
  options: Omit<
    eslint.InvalidTestCase<TMessageIds, TOptions>,
    "code" | "errors"
  > = {}
): eslint.InvalidTestCase<TMessageIds, TOptions> {
  return {
    ...options,
    ...parseFixture(fixture),
  };
}

function parseFixture<TMessageIds extends string>(fixture: string) {
  const errorRegExp = /^(\s*)(~+)\s*\[(\w+)\]\s*$/;
  const lines: string[] = [];
  const errors: eslint.TestCaseError<TMessageIds>[] = [];
  fixture.split("\n").forEach((line) => {
    const match = line.match(errorRegExp);
    if (match) {
      const column = match[1].length + 1;
      const endColumn = column + match[2].length;
      const { length } = lines;
      const error: Omit<eslint.TestCaseError<TMessageIds>, "messageId"> & {
        message?: string;
        messageId?: string;
      } = {
        column,
        endColumn,
        endLine: length,
        line: length,
      };
      error.messageId = match[3];
      errors.push(error as eslint.TestCaseError<TMessageIds>);
    } else {
      lines.push(line);
    }
  });
  return {
    code: lines.join("\n"),
    errors,
  };
}
