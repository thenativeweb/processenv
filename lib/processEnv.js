'use strict';

var processEnv = function (key) {
  /*eslint-disable no-process-env*/
  var value = process.env[key];
  /*eslint-enable no-process-env*/

  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

module.exports = processEnv;
