/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-etc
 */

import { TSESLint as eslint } from "@typescript-eslint/experimental-utils";

export function fromFixture<TMessageIds extends string>(
  fixture: string,
  invalidTestCase?: {
    output?: string;
    suggestions?: readonly eslint.SuggestionOutput<TMessageIds>[] | null;
  }
): eslint.InvalidTestCase<TMessageIds, never>;

export function fromFixture<
  TMessageIds extends string,
  TOptions extends readonly unknown[]
>(
  fixture: string,
  invalidTestCase: Omit<
    eslint.InvalidTestCase<TMessageIds, TOptions>,
    "code" | "errors"
  > & {
    suggestions?: readonly eslint.SuggestionOutput<TMessageIds>[] | null;
  }
): eslint.InvalidTestCase<TMessageIds, TOptions>;

export function fromFixture<
  TMessageIds extends string,
  TOptions extends readonly unknown[]
>(
  fixture: string,
  invalidTestCase: Omit<
    eslint.InvalidTestCase<TMessageIds, TOptions>,
    "code" | "errors"
  > & {
    suggestions?: readonly eslint.SuggestionOutput<TMessageIds>[] | null;
  } = {}
): eslint.InvalidTestCase<TMessageIds, TOptions> {
  const { suggestions, ...rest } = invalidTestCase;
  return {
    ...rest,
    ...parseFixture(fixture, suggestions),
  };
}

function getSuggestions<TMessageIds extends string>(
  suggestions:
    | readonly eslint.SuggestionOutput<TMessageIds>[]
    | null
    | undefined,
  indices: string | undefined
) {
  if (!suggestions || indices === "") {
    return {};
  }
  if (indices === undefined) {
    return { suggestions } as const;
  }
  return {
    suggestions: indices
      .split(/\s+/)
      .map((index) => suggestions[Number.parseInt(index, 10)]),
  } as const;
}

function parseFixture<TMessageIds extends string>(
  fixture: string,
  suggestions?: readonly eslint.SuggestionOutput<TMessageIds>[] | null
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
        // TODO: Remove typecast once https://github.com/typescript-eslint/typescript-eslint/pull/3844 is available.
        ...(getSuggestions(
          suggestions,
          match.groups.indices?.trim()
        ) as eslint.TestCaseError<TMessageIds>["suggestions"]),
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
