import { normalize } from './normalize';

type EnvironmentVariableValue = undefined | string | number | boolean | object | any[];

/* eslint-disable func-style */
function processenv (): Record<string, EnvironmentVariableValue>;
function processenv (key: string, defaultValue: (() => Promise<EnvironmentVariableValue>)): Promise<EnvironmentVariableValue>;
function processenv (key: string, defaultValue?: EnvironmentVariableValue | (() => EnvironmentVariableValue)): EnvironmentVariableValue;
function processenv (key?: any, defaultValue?: any): any {
  if (!key) {
    const environmentVariables: NodeJS.ProcessEnv = {};

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
    if (typeof defaultValue === 'function') {
      return defaultValue();
    }

    return defaultValue;
  }

  return normalize(value);
}
/* eslint-enable func-style */

export { processenv };
