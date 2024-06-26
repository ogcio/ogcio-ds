const { compileSassString } = require('../../../lib/jest-helpers');

const sassConfig = {
  style: 'compressed',
};

describe('@mixin govie-exports', () => {
  it('will only output a named section once', async () => {
    const sass = `
      @import "tools/exports";

      @include govie-exports(foo) {
        .foo {
          color: red;
        }
      }

      @include govie-exports(foo) {
        .foo {
          color: blue;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toEqual('.foo{color:red}');
  });

  it('will export differently named sections', async () => {
    const sass = `
      @import "tools/exports";

      @include govie-exports(foo) {
        .foo {
          color: red;
        }
      }

      @include govie-exports(bar) {
        .bar {
          color: blue;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toEqual(
      '.foo{color:red}.bar{color:blue}',
    );
  });
});
