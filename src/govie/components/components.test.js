const { getFilesByDirectory } = require('../../../lib/file-helper');
const { compileSassFile } = require('../../../lib/jest-helpers');
const configPaths = require('../../../config/paths.js');

describe('Components', () => {
  let componentsFiles;

  beforeAll(async () => {
    componentsFiles = await getFilesByDirectory(configPaths.components);
  });

  describe('Sass render', () => {
    it('renders CSS for all components', async () => {
      const file = `${configPaths.src}/govie/components/_all.scss`;
      const compiled = await compileSassFile(file);

      expect(compiled).toHaveProperty('css');
    });
  });
});
