
# What is it?
`string-argv` parses a string into an argument array to mimic `process.argv`.
This is useful when testing Command Line Utilities that you want to pass arguments to and is the opposite of what the other argv utilities do.

# Installation

```
npm install string-argv --save
```

# Usage

```ts
// Typescript
import stringArgv from 'string-argv';

const args = stringArgv(
  '-testing test -valid=true --quotes "test quotes" "nested \'quotes\'" --key="some value" --title="Peter\'s Friends"',
  'node',
  'testing.js'
);

console.log(args);
```

```js
// Javascript
var { parseArgsStringToArgv } = require('string-argv');

var args = parseArgsStringToArgv(
    '-testing test -valid=true --quotes "test quotes" "nested \'quotes\'" --key="some value" --title="Peter\'s Friends"',
    'node',
    'testing.js'
);

console.log(args);
/** output
[ 'node',
  'testing.js',
  '-testing',
  'test',
  '-valid=true',
  '--quotes',
  'test quotes',
  'nested \'quotes\'',
  '--key=some value',
  '--title=Peter\'s Friends' ]
  **/
```

## params

__required__: __arguments__ String: arguments that you would normally pass to the command line.

__optional__: __environment__ String: Adds to the environment position in the argv array. If ommitted then there is no need to call argv.split(2) to remove the environment/file values. However if your cli.parse method expects a valid argv value then you should include this value.

__optional__: __file__ String: file that called the arguments. If omitted then there is no need to call argv.split(2) to remove the environment/file values. However if your cli.parse method expects a valid argv value then you should include this value.

## Parsing behavior (bash-compatible quoting)

Quoting follows bash word-splitting rules: `'` and `"` group text into a single
argument, adjacent quoted and unquoted segments are concatenated, and the quote
characters themselves are removed. Whitespace separates arguments only when it
appears outside of quotes.

```
--foo="bar"'baz'                    -> [--foo=barbaz]
a" b"                                -> [a b]
"a"b                                 -> [ab]
jake run:silent["echo 1"]["echo 2"]  -> [jake, run:silent[echo 1][echo 2], --trace]
--name='Phil Taylor'                 -> [--name=Phil Taylor]
--title="Peter's Friends"            -> [--title=Peter's Friends]
```

A quote of the opposite kind inside quotes is kept literally
(`--name='Phil "The Power" Taylor'` -> `--name=Phil "The Power" Taylor`),
and empty quotes produce an empty argument (`""` -> `[""]`).

Known differences from bash:
- backslash escapes are not processed
- `$variables`, globs and other expansions are left literal
- an unclosed quote consumes the rest of the input instead of raising a syntax error
