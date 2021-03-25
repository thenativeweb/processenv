# processenv

processenv parses environment variables.

## Status

| Category         | Status                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Version          | [![npm](https://img.shields.io/npm/v/processenv)](https://www.npmjs.com/package/processenv)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/processenv)                                                                                   |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/processenv)                                                                               |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/processenv/workflows/Release/badge.svg?branch=main) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/processenv)                                                                         |

## Installation

```shell
$ npm install processenv
```

## Quick start

First you need to integrate processenv into your application:

```javascript
const { processenv } = require('processenv');
```

If you use TypeScript, use the following code instead:

```typescript
import { processenv } from 'processenv';
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

Alternatively, you may also provide a function which returns the default values. This is useful, e.g. if you want to lazily evaluate a value:

```javascript
const port = processenv('PORT', () => 3000);
```

If you want to use an asynchronous function, please note that you must `await` the call to `processenv`:

```javascript
const port = await processenv('PORT', async () => 3000);
```

#### Using the `??` operator

Instead of providing a second parameter, you may use the `??` operator to handle default values:

```javascript
const isRoot = processenv('ROOT') ?? true;
```

*Please note that this is only true if you are using the `??` operator. If you are using the old-style `||` operator instead, the previous line always returns `true`, no matter what the actual value of the `ROOT` environment variable is. To avoid this problem, either use the `??` operator or use the previously shown syntax using a second parameter to provide a default value.*

### Getting all environment variables

If you want to get all environment variables at once, omit the name and simply call `processenv`. The values will all be parsed, but you can not specify default values.

```javascript
const environmentVariables = processenv();
```

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
