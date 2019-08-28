# processenv

processenv parses environment variables.

## Status

| Category         | Status                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version          | [![npm](https://img.shields.io/npm/v/processenv)](https://www.npmjs.com/package/processenv)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/processenv)                                                                                   |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/processenv)                                                                               |
| Build            | [![CircleCI](https://img.shields.io/circleci/build/github/thenativeweb/processenv)](https://circleci.com/gh/thenativeweb/processenv/tree/master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/processenv)                                                                         |

## Installation

```shell
$ npm install processenv
```

## Quick start

First you need to integrate processenv into your application:

```javascript
const processenv = require('processenv').default;
```

If you use TypeScript, use the following code instead:

```typescript
import processenv from 'processenv';
```

Then, to parse an environment variable, call the `processenv` function and provide the name of the environment variable you would like to parse:

```javascript
const port = processenv('PORT');
```

Please note that the value is automatically converted to the appropriate data type, e.g. a `number`. This also works for stringified JSON objects, in case you want to store complex configuration data inside an environment variable.

### Using default values

If you want to provide a default value, you may add it as a second parameter. This also works for booleans and all other types. If neither the environment variable nor the desired default value are set, `processenv` returns `undefined`:

```javascript
const port = processenv('PORT', 3000);
const user = processenv('USER', 'Jane Doe');
const isRoot = processenv('ROOT', true);
```

#### Using the `||` operator

Instead of providing a second parameter, you may use the `||` operator to handle default values. However, this may lead to problems with boolean values, e.g. if you want to use a default value of `true`:

```javascript
// This will always evaluate to true, no matter whether ROOT is false or true.
const isRoot = processenv('ROOT') || true;
```

The underlying problem here is that when a value of `false` is given for the environment variable, the `||` operator automatically falls back to the `true` keyword, hence the result will always be `true`.

To avoid this problem, always use the previously shown syntax using a second parameter to provide default values.

### Getting all environment variables

If you want to get all environment variables at once, omit the name and simply call `processenv`. The values will all be parsed, but you can not specify default values.

```javascript
const environmentVariables = processenv();
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
