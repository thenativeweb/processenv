'use strict';

const processEnv = function (key) {
  /* eslint-disable no-process-env */
  const value = process.env[key];
  /* eslint-enable no-process-env */

  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
};

module.exports = processEnv;
