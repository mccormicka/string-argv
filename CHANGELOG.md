# Changelog

## v0.4.0 (2026-09-28)
**Parsing Behavior Changes** (thanks to [@TooTallNate](https://github.com/TooTallNate) via [PR #24](https://github.com/mccormicka/string-argv/pull/24))
- Rewrote the parser as a character-by-character state machine instead of the previous regex, so adjacent quoted and unquoted segments are treated as a single argument, matching bash word-splitting
- Quote characters are now always stripped, including word-internal and `key=value` positions:
  - `--foo="bar"'baz'` -> `--foo=barbaz`
  - `a" b"` -> `a b`
  - `"a"b` -> `ab`
  - `run:silent["echo 1"]["echo 2"]` -> `run:silent[echo 1][echo 2]`
  - `--name='Phil Taylor'` -> `--name=Phil Taylor`
- Fixes [#20](https://github.com/mccormicka/string-argv/issues/20) (word-internal quotes were not stripped)
- Fixes [#23](https://github.com/mccormicka/string-argv/issues/23) (unquoted tail after a quoted section was split into a separate argument)
- Known differences from bash, unchanged by this release: backslash escapes are not processed, `$variables`/globs are left literal, and an unclosed quote consumes the rest of the input instead of raising an error
- Security dependency bumps: minimatch 3.1.5 via [#25](https://github.com/mccormicka/string-argv/pull/25), brace-expansion 1.1.16 via [#27](https://github.com/mccormicka/string-argv/pull/27)

## v0.3.2 (2023-05-01)
- Update TypeScript to 5.0.4 [b1015b8](https://github.com/mccormicka/string-argv/commit/b1015b8911b1505ed2ccd546fa0c35dc1dfcda07)
- CI workflow (`node.js.yml`) added via [#22](https://github.com/mccormicka/string-argv/pull/22)

## v0.3.1 (2022-09-16)
- Now provides both esm and cjs builds
- Update TypeScript to 4.8.3

## v0.3.0 (2019-04-16)
**Dev Experience Changes**
- Project now compiled with TypeScript and provides typings

## v0.2.0 (2019-04-14)
**Parsing Behavior Changes**
- Now parses multiple nested quotes and content when there are no spaces [7d9b897](https://github.com/mccormicka/string-argv/commit/7d9b89730ea112b829f2591e3e9cae4c0d0cc285)
