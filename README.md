# eslint-etc

More utils for use with `eslint`.

I use these utils to implement and test my own ESLint rules. That's their primary purpose, so the documentation is ... light.

## fromFixture

`fromFixture` allows TSLint-like fixtures to be used to test ESlint rules. Using fixtures means that you don't have to specify lines and columns. Instead, you underline the failure locations within the fixture, like this:

```ts
{
  invalid: [
    fromFixture(stripIndent`
      const name = "alice";
            ~~~~            [foo { "identifier": "name" }]
                   ~~~~~~~  [bar]
      const role = 'cto';
            ~~~~            [foo { "identifier": "role" }]
    `),
    fromFixture(stripIndent`
      const name = "alice";
            ~~~~            [foo { "identifier": "name" }]
      const role = 'cto';
            ~~~~            [foo { "identifier": "role" }]
    `, {
      options: [{ bar: false }]
    }),
  ]
}
```

which is equivalent to the following:

```ts
{
  invalid: [{
    code: `const name = "alice";
const role = 'cto';`,
    errors: [{
      column: 7,
      endColumn: 11,
      line: 1,
      endLine: 1,
      messageId: "foo",
      data: {
        identifier: "name",
      },
    }, {
      column: 14,
      endColumn: 21,
      line: 1,
      endLine: 1,
      messageId: "bar",
      data: {},
    }, {
      column: 7,
      endColumn: 11,
      line: 2,
      endLine: 2,
      messageId: "foo",
      data: {
        identifier: "role",
      },
    }]
  }, {
    code: `const name = "alice";
const role = 'cto';`,
    errors: [{
      column: 7,
      endColumn: 11,
      line: 1,
      endLine: 1,
      messageId: "foo",
      data: {
        identifier: "name",
      },
    }, {
      column: 7,
      endColumn: 11,
      line: 2,
      endLine: 2,
      messageId: "foo",
      data: {
        identifier: "role",
      },
    }],
    options: [{
      bar: false
    }]
  }]
}
```

Specifying `data` in the fixture is optional. If it's omitted, `data` defaults to `{}`.

The second, optional, argument passed to `fromFixture` can be used to pass additional test case properties - `options` and `output`, etc.