const sass = require('node-sass');
const { renderSass } = require('../../../lib/jest-helpers');

// Create a mock warn function that we can use to override the native @warn
// function, that we can make assertions about post-render.
const mockWarnFunction = jest.fn().mockReturnValue(sass.NULL);

const sassConfig = {
  outputStyle: 'compact',
  functions: {
    '@warn': mockWarnFunction,
  },
};

describe('@function govie-colour', () => {
  let sassBootstrap = '';

  beforeEach(() => {
    sassBootstrap = `
      $govie-colours: (
        "red": #ff0000,
        "green": #00ff00,
        "blue": #0000ff
      );

      @import "helpers/colour";
    `;
  });

  it('returns a colour from the colour palette', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-colour('red');
      }`;

    const results = await renderSass({ data: sass, ...sassConfig });

    expect(results.css.toString().trim()).toBe('.foo { color: #ff0000; }');
  });

  it('works with unquoted strings', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-colour(red);
      }`;

    const results = await renderSass({ data: sass, ...sassConfig });

    expect(results.css.toString().trim()).toBe('.foo { color: #ff0000; }');
  });

  it('throws an error if a non-existent colour is requested', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-colour('hooloovoo');
      }`;

    await expect(renderSass({ data: sass, ...sassConfig })).rejects.toThrow(
      'Unknown colour `hooloovoo`',
    );
  });
});
