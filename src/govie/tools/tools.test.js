import glob from 'glob'
import path from 'path'

import sassdoc from 'sassdoc'

import { compileSassFile } from '../../../lib/jest-helpers'
import { paths } from '../../../config/paths.js'

const sassFiles = glob.sync(`${paths.src}/tools/**/*.scss`);

describe('The tools layer', () => {
  it('should not output any CSS', async () => {
    const file = path.join(paths.src, 'govie/tools', '_all.scss');

    const output = await compileSassFile(file);
    expect(output.css.toString()).toEqual('');
  });

  it.each(sassFiles)('%s renders to CSS without errors', (file) => {
    return compileSassFile(file);
  });

  describe('Sass documentation', () => {
    it('associates everything with a "tools" group', async () => {
      return sassdoc
        .parse(path.join(paths.src, 'tools', '*.scss'))
        .then((docs) =>
          docs.forEach((doc) => {
            return expect(doc).toMatchObject({
              // Include doc.context.name in the expected result when this fails,
              // giving you the context to be able to fix it
              context: {
                name: doc.context.name,
              },
              group: [expect.stringMatching(/^tools/)],
            });
          }),
        );
    });
  });
});
