import { normalize } from './normalize';

type EnvironmentVariableValue = undefined | string | number | boolean | Record<string, unknown> | any[];

/* eslint-disable func-style, no-redeclare */
function processenv (): Record<string, EnvironmentVariableValue>;
function processenv (key: string, defaultValue: (() => Promise<EnvironmentVariableValue>)): Promise<EnvironmentVariableValue>;
function processenv (key: string, defaultValue?: EnvironmentVariableValue | (() => EnvironmentVariableValue)): EnvironmentVariableValue;
function processenv (key?: any, defaultValue?: any): any {
  /* eslint-disable no-redeclare */
  if (!key) {
    const environmentVariables: NodeJS.ProcessEnv = {};

    // eslint-disable-next-line no-process-env
    Object.keys(process.env).forEach((name: string): void => {
      // eslint-disable-next-line no-process-env
      environmentVariables[name] = normalize(process.env[name]);
    });

    return environmentVariables;
  }

  // eslint-disable-next-line no-process-env
  const value = process.env[key];

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
