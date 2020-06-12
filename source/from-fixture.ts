import { RuleTester } from "eslint";

export function fromFixture(
  fixture: string,
  messages: Record<string | number, string> = {},
  options: Omit<RuleTester.InvalidTestCase, "code" | "errors"> = {}
): RuleTester.InvalidTestCase {
  return {
    ...options,
    ...parseFixture(fixture, messages),
  };
}

function parseFixture(
  fixture: string,
  messages: Record<string | number, string>
) {
  const errorRegExp = /^(\s*)(~+)\s*\[(\w+)\]\s*$/;
  const lines: string[] = [];
  const errors: RuleTester.TestCaseError[] = [];
  fixture.split("\n").forEach((line) => {
    const match = line.match(errorRegExp);
    if (match) {
      const column = match[1].length + 1;
      const endColumn = column + match[2].length;
      const { length } = lines;
      const error: RuleTester.TestCaseError = {
        column,
        endColumn,
        endLine: length,
        line: length,
      };
      const key = match[3];
      if (messages[key]) {
        error.message = messages[key];
      } else {
        error.messageId = key;
      }
      errors.push(error);
    } else {
      lines.push(line);
    }
  });
  return {
    code: lines.join("\n"),
    errors,
  };
}
