'use strict';

const assert = require('assertthat'),
      nodeenv = require('nodeenv'),
      uuid = require('uuidv4');

const processEnv = require('../../src/processEnv');

suite('processEnv', () => {
  let key;

  setup(() => {
    key = uuid();
  });

  test('is a function.', async () => {
    assert.that(processEnv).is.ofType('function');
  });

  test('returns all existing environment variables if no key is given.', async () => {
    const restore = nodeenv(key, 'foobar');
    const environmentVariables = processEnv();

    assert.that(environmentVariables).is.ofType('object');
    assert.that(environmentVariables[key]).is.equalTo('foobar');

    restore();
  });

  test('returns undefined for a non-existing environment variable.', async () => {
    assert.that(processEnv(key)).is.undefined();
  });

  test('returns the value for an existing environment variable.', async () => {
    const restore = nodeenv(key, 'foobar');

    assert.that(processEnv(key)).is.equalTo('foobar');
    restore();
  });

  test('returns the value for an existing environment variable of type number.', async () => {
    const restore = nodeenv(key, '23');

    assert.that(processEnv(key)).is.equalTo(23);
    restore();
  });

  test('returns the parsed value for an existing environment variable that contains a JSON object.', async () => {
    const restore = nodeenv(key, '{"foo": "bar"}');

    assert.that(processEnv(key)).is.equalTo({ foo: 'bar' });
    restore();
  });

  test('returns the value for an existing environment variable that contains a malformed JSON object.', async () => {
    const restore = nodeenv(key, '{"foo": "bar"');

    assert.that(processEnv(key)).is.equalTo('{"foo": "bar"');
    restore();
  });

  test('returns the parsed value for an existing environment variable that contains a JSON array.', async () => {
    const restore = nodeenv(key, '["foo", "bar"]');

    assert.that(processEnv(key)).is.equalTo([ 'foo', 'bar' ]);
    restore();
  });

  test('returns the value for an existing environment variable that contains a malformed JSON array.', async () => {
    const restore = nodeenv(key, '["foo", "bar"');

    assert.that(processEnv(key)).is.equalTo('["foo", "bar"');
    restore();
  });
});
