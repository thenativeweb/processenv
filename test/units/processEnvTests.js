'use strict';

const assert = require('assertthat'),
      nodeenv = require('nodeenv'),
      uuid = require('uuidv4');

const processEnv = require('../../lib/processEnv');

suite('processEnv', () => {
  let key;

  setup(() => {
    key = uuid();
  });

  test('is a function.', done => {
    assert.that(processEnv).is.ofType('function');
    done();
  });

  test('returns all existing environment variables if no key is given.', done => {
    const restore = nodeenv(key, 'foobar');
    const environmentVariables = processEnv();

    assert.that(environmentVariables).is.ofType('object');
    assert.that(environmentVariables[key]).is.equalTo('foobar');

    restore();
    done();
  });

  test('returns undefined for a non-existing environment variable.', done => {
    assert.that(processEnv(key)).is.undefined();
    done();
  });

  test('returns the value for an existing environment variable.', done => {
    const restore = nodeenv(key, 'foobar');

    assert.that(processEnv(key)).is.equalTo('foobar');
    restore();
    done();
  });

  test('returns the value for an existing environment variable of type number.', done => {
    const restore = nodeenv(key, '23');

    assert.that(processEnv(key)).is.equalTo(23);
    restore();
    done();
  });

  test('returns the parsed value for an existing environment variable that contains a JSON object.', done => {
    const restore = nodeenv(key, '{"foo": "bar"}');

    assert.that(processEnv(key)).is.equalTo({ foo: 'bar' });
    restore();
    done();
  });

  test('returns the value for an existing environment variable that contains a malformed JSON object.', done => {
    const restore = nodeenv(key, '{"foo": "bar"');

    assert.that(processEnv(key)).is.equalTo('{"foo": "bar"');
    restore();
    done();
  });

  test('returns the parsed value for an existing environment variable that contains a JSON array.', done => {
    const restore = nodeenv(key, '["foo", "bar"]');

    assert.that(processEnv(key)).is.equalTo([ 'foo', 'bar' ]);
    restore();
    done();
  });

  test('returns the value for an existing environment variable that contains a malformed JSON array.', done => {
    const restore = nodeenv(key, '["foo", "bar"');

    assert.that(processEnv(key)).is.equalTo('["foo", "bar"');
    restore();
    done();
  });
});
