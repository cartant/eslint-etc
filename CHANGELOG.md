<a name="4.0.4"></a>
## [4.0.4](https://github.com/cartant/eslint-etc/compare/v4.0.3...v4.0.4) (2021-03-20)

## Fixes

* Remove misused type parameters from `fromFixture`. ([2733425](https://github.com/cartant/eslint-etc/commit/2733425))

<a name="4.0.3"></a>
## [4.0.3](https://github.com/cartant/eslint-etc/compare/v4.0.2...v4.0.3) (2021-03-20)

## Fixes

* Use a separate `output`-only signature for `fromFixture`. ([0bb0bbe](https://github.com/cartant/eslint-etc/commit/0bb0bbe))

<a name="4.0.2"></a>
## [4.0.2](https://github.com/cartant/eslint-etc/compare/v4.0.1...v4.0.2) (2021-03-20)

## Fixes

* Use separate signatures for `fromFixture` to better handle no-option usage. ([3545994](https://github.com/cartant/eslint-etc/commit/3545994))

## Features

* Add more type guards. ([220d981](https://github.com/cartant/eslint-etc/commit/220d981))

<a name="4.0.1"></a>
## [4.0.1](https://github.com/cartant/eslint-etc/compare/v4.0.0...v4.0.1) (2020-11-28)

## Changes

* Use `files` in `package.json` instead of `.npmignore`. ([1b83d0b](https://github.com/cartant/eslint-etc/commit/1b83d0b))

<a name="4.0.0"></a>
## [4.0.0](https://github.com/cartant/eslint-etc/compare/v3.0.2...v4.0.0) (2020-09-02)

## Changes

* Upgrade `@typescript-eslint` dependencies. ([519e76d](https://github.com/cartant/eslint-etc/commit/519e76d))

<a name="3.1.1"></a>
## [3.1.1](https://github.com/cartant/eslint-etc/compare/v3.0.1...v3.0.2) (2020-09-02)

## Changes

* For what ever reason, `yarn version --patch` seemed to have bumped the minor version instead of the patch version. 🤷‍♂️ This is 3.0.2.

<a name="3.0.2"></a>
## [3.0.2](https://github.com/cartant/eslint-etc/compare/v3.0.1...v3.0.2) (2020-09-02)

## Changes

* Revert upgrade of `@typescript-eslint` dependencies. ([f407b62](https://github.com/cartant/eslint-etc/commit/f407b62))

<a name="3.0.1"></a>
## [3.0.1](https://github.com/cartant/eslint-etc/compare/v3.0.0...v3.0.1) (2020-09-02)

## Changes

* Upgrade `@typescript-eslint` dependencies. ([09d2e8e](https://github.com/cartant/eslint-etc/commit/09d2e8e))

<a name="3.0.0"></a>
## [3.0.0](https://github.com/cartant/eslint-etc/compare/v2.0.0...v3.0.0) (2020-08-30)

## Breaking changes

* Remove `nodeMap` from `getTypeServices`. Use the (standard) maps from `getParserServices` instead. ([8bd2c4d](https://github.com/cartant/eslint-etc/commit/8bd2c4d))

<a name="2.0.0"></a>
## [2.0.0](https://github.com/cartant/eslint-etc/compare/v1.0.2...v2.0.0) (2020-07-23)

## Breaking changes

* `fromFixture` now supports message IDs only. ([4f63498](https://github.com/cartant/eslint-etc/commit/4f63498))