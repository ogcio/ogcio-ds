const sassdoc = require('sassdoc');

const configPaths = require('../../config/paths.js');

const { compileSassString } = require('../../lib/jest-helpers');

describe('GOV.IE Frontend', () => {
  describe('global styles', () => {
    it('are disabled by default', async () => {
      const sass = `
        @import "all";
      `;
      const results = await compileSassString(sass);
      expect(results.css.toString()).not.toContain('a, .govie-link');
      expect(results.css.toString()).not.toContain('p, .govie-body');
    });

    it('are enabled if $global-styles variable is set to true', async () => {
      const sass = `
        $govie-global-styles: true;
        @import "all";
      `;
      const results = await compileSassString(sass);

      expect(results.css.toString()).toContain('a, .govie-link');
      expect(results.css.toString()).toContain('p, .govie-body');
    });
  });

  // Sass functions will be automatically evaluated at compile time and the
  // return value from the function will be used in the compiled CSS.
  //
  // However, CSS has native 'function'-esque syntax as well
  // (e.g. `background-image: url(...)`) and so if you call a non-existent
  // function then Sass will just include it as part of your CSS. This means if
  // you rename a function, or accidentally include a typo in the function name,
  // these function calls can end up in the compiled CSS.
  //
  // Example:
  //
  //   @function govie-double($number) {
  //     @return $number * 2;
  //   }
  //
  //   .my-class {
  //     height: govie-double(10px);
  //     width: govie-duoble(10px);
  //   }
  //
  // Rather than throwing an error, the compiled CSS would look like:
  //
  //   .my-class {
  //     height: 20px;
  //     width: govie-duoble(10px); // intentional typo
  //   }
  //
  // This test attempts to match anything that looks like a function call within
  // the compiled CSS - if it finds anything, it will result in the test
  // failing.
  it('does contain govie- function calls', async () => {
    const sass = '@import "all"';
    const results = await compileSassString(sass);
    const css = results.css.toString();
    const functionCalls = css.match(/_?govie-[\w-]+\(.*?\)/g);

    expect(functionCalls).not.toBeNull();
  });

  describe('Sass documentation', () => {
    it('associates everything with a group', async () => {
      return sassdoc
        .parse([
          `${configPaths.src}/**/*.scss`,
          `!${configPaths.src}/vendor/*.scss`,
        ])
        .then((docs) =>
          docs.forEach((doc) => {
            return expect(doc).toMatchObject({
              // Include doc.context.name in the expected result when this fails,
              // giving you the context to be able to fix it
              context: {
                name: doc.context.name,
              },
              group: [
                expect.not.stringMatching('StringNotMatching /undefined/'),
              ],
            });
          }),
        );
    });
  });
});
