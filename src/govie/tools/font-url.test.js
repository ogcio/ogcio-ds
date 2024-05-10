const { compileSassString } = require('../../../lib/jest-helpers');

const sassConfig = {
  style: 'compressed',
};

describe('@function font-url', () => {
  it('by default concatenates the font path and the filename', async () => {
    const sass = `
      @import "tools/font-url";

      $govie-fonts-path: '/path/to/fonts/';

      @font-face {
        font-family: "whatever";
        src: govie-font-url("whatever.woff2");
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toEqual(
      '@font-face{font-family:"whatever";src:url("/path/to/fonts/whatever.woff2")}',
    );
  });

  it.only('can be overridden to use a defined Sass function', async () => {
    const sass = `
      @import "tools/font-url";

      $govie-font-url-function: 'to-upper-case';
      $govie-fonts-path: './assets/fonts/';

      @font-face {
        font-family: "whatever";
        src: govie-font-url("whatever.woff2");
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toEqual(
      '@font-face{font-family:"whatever";src:"WHATEVER.WOFF2"}',
    );
  });

  it('can be overridden to use a custom function', async () => {
    const sass = `
      @import "tools/font-url";

      @function custom-url-handler($filename) {
        @return url("/custom/#{$filename}");
      }

      $govie-fonts-path: './assets/fonts/';
      $govie-font-url-function: 'custom-url-handler';

      @font-face {
        font-family: "whatever";
        src: govie-font-url("whatever.woff2");
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toEqual(
      '@font-face{font-family:"whatever";src:url("/custom/whatever.woff2")}',
    );
  });
});
