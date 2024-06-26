const glob = require('glob');
const path = require('path');

const sassdoc = require('sassdoc');

const { compileSassFile } = require('../../../lib/jest-helpers');
const configPaths = require('../../../config/paths.js');

const sassFiles = glob.sync(`${configPaths.src}/helpers/**/*.scss`);

describe('The helpers layer', () => {
  it('should not output any CSS', async () => {
    const helpers = path.join(configPaths.src, 'govie/helpers', '_all.scss');

    const output = await compileSassFile(helpers);
    expect(output.css.toString()).toEqual('');
  });

  it.each(sassFiles)('%s renders to CSS without errors', (file) => {
    return compileSassFile(file);
  });

  describe('Sass documentation', () => {
    it('associates everything with a "helpers" group', async () => {
      return sassdoc
        .parse(path.join(configPaths.src, 'helpers', '*.scss'))
        .then((docs) =>
          docs.forEach((doc) => {
            return expect(doc).toMatchObject({
              // Include doc.context.name in the expected result when this fails,
              // giving you the context to be able to fix it
              context: {
                name: doc.context.name,
              },
              group: [expect.stringMatching(/^helpers/)],
            });
          }),
        );
    });
  });
});
