const { compileSassString } = require('../../../lib/jest-helpers');

const sassConfig = {
  style: 'compressed'
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
    const sassString = `
      ${sassBootstrap}

      .foo {
        color: govie-colour('red');
      }`;
      
    const results = await compileSassString(sassString, sassConfig);

    expect(results.css.toString().trim()).toBe('.foo{color:red}');
  });
  
  it('throws an error if a non-existent colour is requested', async () => {
    const sassString = `
      ${sassBootstrap}

      .foo {
        color: govie-colour('hooloovoo');
      }`;

    await expect(compileSassString(sassString, sassConfig)).rejects.toThrow(
      'Unknown colour `hooloovoo`',
    );
  });
});
