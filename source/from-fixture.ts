/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { TSESLint as eslint } from "@typescript-eslint/experimental-utils";

export function fromFixture(
  fixture: string,
  invalidTestCase?: {
    output?: string;
    suggestions?: eslint.SuggestionOutput<string>[] | null | undefined;
  }
): eslint.InvalidTestCase<never, never>;

export function fromFixture<
  TMessageIds extends string,
  TOptions extends unknown[]
>(
  fixture: string,
  invalidTestCase: Omit<
    eslint.InvalidTestCase<TMessageIds, TOptions>,
    "code" | "errors"
  > & {
    suggestions?: eslint.SuggestionOutput<TMessageIds>[] | null | undefined;
  }
): eslint.InvalidTestCase<TMessageIds, TOptions>;

export function fromFixture<
  TMessageIds extends string = string,
  TOptions extends unknown[] = never[]
>(
  fixture: string,
  invalidTestCase: Omit<
    eslint.InvalidTestCase<TMessageIds, TOptions>,
    "code" | "errors"
  > & {
    suggestions?: eslint.SuggestionOutput<TMessageIds>[] | null | undefined;
  } = {}
): eslint.InvalidTestCase<TMessageIds, TOptions> {
  const { suggestions } = invalidTestCase;
  return {
    ...invalidTestCase,
    ...parseFixture(fixture, suggestions ?? []),
  };
}

function getSuggestions<TMessageIds extends string>(
  suggestions: eslint.SuggestionOutput<TMessageIds>[],
  indices: string | undefined
): eslint.SuggestionOutput<TMessageIds>[] {
  if (indices === undefined) {
    return suggestions;
  }
  if (indices === "") {
    return [];
  }
  return indices
    .split(/\s+/)
    .map((index) => suggestions[Number.parseInt(index, 10)]);
}

function parseFixture<TMessageIds extends string>(
  fixture: string,
  suggestions: eslint.SuggestionOutput<TMessageIds>[]
) {
  const errorRegExp =
    /^(?<indent>\s*)(?<error>~+)\s*\[(?<id>\w+)\s*(?<data>.*?)(?:\s*suggest\s*(?<indices>[\d\s]*))?\]\s*$/;
  const lines: string[] = [];
  const errors: eslint.TestCaseError<TMessageIds>[] = [];
  fixture.split("\n").forEach((line) => {
    const match = line.match(errorRegExp);
    if (match?.groups) {
      const column = match.groups.indent.length + 1;
      const endColumn = column + match.groups.error.length;
      const { length } = lines;
      errors.push({
        column,
        data: JSON.parse(match.groups.data || "{}"),
        endColumn,
        endLine: length,
        line: length,
        messageId: match.groups.id as TMessageIds,
        suggestions: getSuggestions(suggestions, match.groups.indices?.trim()),
      });
    } else {
      lines.push(line);
    }
  });
  return {
    code: lines.join("\n"),
    errors,
  };
}
