'use strict';

var assert = require('assertthat'),
    nodeenv = require('nodeenv');

var processEnv = require('../lib/processEnv');

suite('processEnv', function () {
  test('is a function.', function (done) {
    assert.that(processEnv).is.ofType('function');
    done();
  });

  test('returns undefined for a non-existing environment variable.', function (done) {
    assert.that(processEnv('b301bc3e-cdd0-4636-8bdb-2bfa574b8453')).is.undefined();
    done();
  });

  test('returns the value for an existing environment variable.', function (done) {
    nodeenv('ea2c9734-f932-4d7e-9676-64463a8bc2c6', 'foobar', function (restore) {
      assert.that(processEnv('ea2c9734-f932-4d7e-9676-64463a8bc2c6')).is.equalTo('foobar');
      restore();
      done();
    });
  });

  test('returns the value for an existing environment variable of type number.', function (done) {
    nodeenv('67f472c9-587b-4407-a7d5-58f67c3b22fb', '23', function (restore) {
      assert.that(processEnv('67f472c9-587b-4407-a7d5-58f67c3b22fb')).is.equalTo(23);
      restore();
      done();
    });
  });

  test('returns the parsed value for an existing environment variable that contains a JSON object.', function (done) {
    nodeenv('c3d51fa3-ad87-4146-872c-ed3472b89672', '{"foo": "bar"}', function (restore) {
      assert.that(processEnv('c3d51fa3-ad87-4146-872c-ed3472b89672')).is.equalTo({
        foo: 'bar'
      });
      restore();
      done();
    });
  });

  test('returns the value for an existing environment variable that contains a malformatted JSON object.', function (done) {
    nodeenv('bd69cb2c-8c81-4f4e-b6d8-0c4c4f75a30e', '{"foo": "bar"', function (restore) {
      assert.that(processEnv('bd69cb2c-8c81-4f4e-b6d8-0c4c4f75a30e')).is.equalTo('{"foo": "bar"');
      restore();
      done();
    });
  });
});
