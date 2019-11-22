import { assert } from 'assertthat';
import { nodeenv } from 'nodeenv';
import { processenv } from '../../lib/processenv';
import { uuid } from 'uuidv4';

suite('processenv', (): void => {
  let key: string;

  setup(async (): Promise<void> => {
    key = uuid();
  });

  test('is a function.', async (): Promise<void> => {
    assert.that(processenv).is.ofType('function');
  });

  test('returns all existing environment variables if no key is given.', async (): Promise<void> => {
    const restore = nodeenv(key, 'foobar');
    const environmentVariables = processenv();

    assert.that(environmentVariables).is.ofType('object');
    assert.that(environmentVariables[key]).is.equalTo('foobar');

    restore();
  });

  test('returns undefined for a non-existing environment variable.', async (): Promise<void> => {
    assert.that(processenv(key)).is.undefined();
  });

  test('returns default value for a non-existing environment variable if set as parameter.', async (): Promise<void> => {
    assert.that(processenv(key, 'foobar')).is.equalTo('foobar');
  });

  test('returns default value for a non-existing environment variable if used with || syntax.', async (): Promise<void> => {
    assert.that(processenv(key) || 'foobar').is.equalTo('foobar');
  });

  test('returns default value (number) for a non-existing environment variable if set as parameter.', async (): Promise<void> => {
    assert.that(processenv(key, 23)).is.equalTo(23);
  });

  test('returns default value (number) for a non-existing environment variable if used with || syntax.', async (): Promise<void> => {
    assert.that(processenv(key) || 23).is.equalTo(23);
  });

  test('returns default value (boolean) for a non-existing environment variable if set as parameter.', async (): Promise<void> => {
    assert.that(processenv(key, false)).is.false();
    assert.that(processenv(key, true)).is.true();
  });

  test('returns default value (boolean) for a non-existing environment variable if used with || syntax.', async (): Promise<void> => {
    assert.that(processenv(key) || false).is.false();
    assert.that(processenv(key) || true).is.true();
  });

  test('returns default value if it is provided as a synchronous function.', async (): Promise<void> => {
    assert.that(processenv(key, (): number => 23)).is.equalTo(23);
  });

  test('returns default value if it is provided as an asynchronous function.', async (): Promise<void> => {
    assert.that(await processenv(key, async (): Promise<number> => 23)).is.equalTo(23);
  });

  test('returns the value for an existing environment variable.', async (): Promise<void> => {
    const restore = nodeenv(key, 'foobar');

    assert.that(processenv(key)).is.equalTo('foobar');
    restore();
  });

  test('returns the value for an existing environment variable of type number.', async (): Promise<void> => {
    const restore = nodeenv(key, '23');

    assert.that(processenv(key)).is.equalTo(23);
    restore();
  });

  test('returns the value for an existing environment variable of type boolean.', async (): Promise<void> => {
    const restore = nodeenv(key, 'false');

    assert.that(processenv(key)).is.false();
    restore();
  });

  test('returns the value for an existing environment variable of type boolean when a default is passed as a parameter.', async (): Promise<void> => {
    const restore = nodeenv(key, 'false');

    assert.that(processenv(key, true)).is.false();
    restore();
  });

  test('does not return the correct value for an existing environment variable of type boolean when a default is assigned via || syntax.', async (): Promise<void> => {
    const restore = nodeenv(key, 'false');

    assert.that(processenv(key) || true).is.not.false();
    restore();
  });

  test('returns the parsed value for an existing environment variable that contains a JSON object.', async (): Promise<void> => {
    const restore = nodeenv(key, '{"foo": "bar"}');

    assert.that(processenv(key)).is.equalTo({ foo: 'bar' });
    restore();
  });

  test('returns the value for an existing environment variable that contains a malformed JSON object.', async (): Promise<void> => {
    const restore = nodeenv(key, '{"foo": "bar"');

    assert.that(processenv(key)).is.equalTo('{"foo": "bar"');
    restore();
  });

  test('returns the parsed value for an existing environment variable that contains a JSON array.', async (): Promise<void> => {
    const restore = nodeenv(key, '["foo", "bar"]');

    assert.that(processenv(key)).is.equalTo([ 'foo', 'bar' ]);
    restore();
  });

  test('returns the value for an existing environment variable that contains a malformed JSON array.', async (): Promise<void> => {
    const restore = nodeenv(key, '["foo", "bar"');

    assert.that(processenv(key)).is.equalTo('["foo", "bar"');
    restore();
  });
});
