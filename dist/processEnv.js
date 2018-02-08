'use strict';

var normalize = function normalize(value) {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
};

var processEnv = function processEnv(key) {
  if (!key) {
    var environmentVariables = {};

    /* eslint-disable no-process-env */
    Object.keys(process.env).forEach(function (name) {
      environmentVariables[name] = normalize(process.env[name]);
    });
    /* eslint-enable no-process-env */

    return environmentVariables;
  }

  /* eslint-disable no-process-env */
  var value = process.env[key];
  /* eslint-enable no-process-env */

  if (!value) {
    return undefined;
  }

  return normalize(value);
};

module.exports = processEnv;