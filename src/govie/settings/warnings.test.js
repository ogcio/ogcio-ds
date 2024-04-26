const sass = require('node-sass');
import { vi } from 'vitest';
import { compileSassString } from '../../../lib/jest-helpers'

// Create a mock warn function that we can use to override the native @warn
// function, that we can make assertions about post-render.
const mockWarnFunction = vi.fn().mockReturnValue(sass.NULL);

const sassConfig = {
  outputStyle: 'compressed',
  functions: {
    '@warn': mockWarnFunction,
  },
};

describe('Warnings mixin', () => {
  const sassBootstrap = '@import "settings/warnings";';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Fires a @warn with the message plus the key suffix text', async () => {
    const sass = `
    ${sassBootstrap}
    @include _warning('test', 'This is a warning.');`;

    await compileSassString(sass, sassConfig).then(() => {
      // Expect our mocked @warn function to have been called once with a single
      // argument, which should be the test message
      return expect(mockWarnFunction.mock.calls[0][0].getValue()).toEqual(
        'This is a warning. To silence this warning, update ' +
          '$govie-suppressed-warnings with key: "test"',
      );
    });
  });

  it('Only fires one @warn per warning key', async () => {
    const sass = `
    ${sassBootstrap}
    @include _warning('test', 'This is a warning.');
    @include _warning('test', 'This is a warning.');`;

    await compileSassString(sass, sassConfig).then(() => {
      // Expect our mocked @warn function to have been called once with a single
      // argument, which should be the test message
      return expect(mockWarnFunction.mock.calls.length).toEqual(1);
    });
  });

  it('Does not fire a @warn if the key is already in $govie-suppressed-warnings', async () => {
    const sass = `
    ${sassBootstrap}

    $govie-suppressed-warnings: append($govie-suppressed-warnings, 'test');
    @include _warning('test', 'This is a warning.');`;

    await compileSassString(sass, sassConfig).then(() => {
      return expect(mockWarnFunction).not.toHaveBeenCalled();
    });
  });
});
