'use strict';

const assert = require('assertthat'),
      nodeenv = require('nodeenv'),
      uuid = require('uuidv4');

const processEnv = require('../lib/processEnv');

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
    nodeenv(key, 'foobar', restore => {
      const environmentVariables = processEnv();

      assert.that(environmentVariables).is.ofType('object');
      assert.that(environmentVariables[key]).is.equalTo('foobar');
      restore();
      done();
    });
  });

  test('returns undefined for a non-existing environment variable.', done => {
    assert.that(processEnv(key)).is.undefined();
    done();
  });

  test('returns the value for an existing environment variable.', done => {
    nodeenv(key, 'foobar', restore => {
      assert.that(processEnv(key)).is.equalTo('foobar');
      restore();
      done();
    });
  });

  test('returns the value for an existing environment variable of type number.', done => {
    nodeenv(key, '23', restore => {
      assert.that(processEnv(key)).is.equalTo(23);
      restore();
      done();
    });
  });

  test('returns the parsed value for an existing environment variable that contains a JSON object.', done => {
    nodeenv(key, '{"foo": "bar"}', restore => {
      assert.that(processEnv(key)).is.equalTo({ foo: 'bar' });
      restore();
      done();
    });
  });

  test('returns the value for an existing environment variable that contains a malformed JSON object.', done => {
    nodeenv(key, '{"foo": "bar"', restore => {
      assert.that(processEnv(key)).is.equalTo('{"foo": "bar"');
      restore();
      done();
    });
  });

  test('returns the parsed value for an existing environment variable that contains a JSON array.', done => {
    nodeenv(key, '["foo", "bar"]', restore => {
      assert.that(processEnv(key)).is.equalTo([ 'foo', 'bar' ]);
      restore();
      done();
    });
  });

  test('returns the value for an existing environment variable that contains a malformed JSON array.', done => {
    nodeenv(key, '["foo", "bar"', restore => {
      assert.that(processEnv(key)).is.equalTo('["foo", "bar"');
      restore();
      done();
    });
  });
});
