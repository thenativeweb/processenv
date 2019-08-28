import { EnvironmentVariables } from 'nodeenv';

const normalize = function (value: any): any {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
};

const processEnv = function (key?: string, defaultValue: any = undefined): EnvironmentVariables | any {
  if (!key) {
    const environmentVariables: EnvironmentVariables = {};

    /* eslint-disable no-process-env */
    Object.keys(process.env).forEach((name: string): void => {
      environmentVariables[name] = normalize(process.env[name]);
    });
    /* eslint-enable no-process-env */

    return environmentVariables;
  }

  /* eslint-disable no-process-env */
  const value = process.env[key];
  /* eslint-enable no-process-env */

  if (value === undefined) {
    return defaultValue;
  }

  return normalize(value);
};

export default processEnv;
