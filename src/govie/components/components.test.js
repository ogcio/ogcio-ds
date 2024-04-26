import { getFilesByDirectory } from '../../../lib/file-helper';
import { compileSassFile } from '../../../lib/jest-helpers'
import { paths } from '../../../config/paths.js';

describe('Components', () => {
  let componentsFiles;

  beforeAll(async () => {
    componentsFiles = await getFilesByDirectory(paths.components);
  });

  describe('Sass render', () => {
    it('renders CSS for all components', () => {
      const file = `${paths.src}/components/_all.scss`;
      return expect(compileSassFile(file)).resolves.toEqual(
        expect.objectContaining({
          css: expect.any(Object),
          stats: expect.any(Object),
        }),
      );
    });

    it('renders CSS for each component', () => {
      const sassTasks = [...componentsFiles].map(([componentName, files]) => {
        const file = files.get(`_${componentName}.scss`)?.path;

        return expect(compileSassFile(file)).resolves.toEqual(
          expect.objectContaining({
            css: expect.any(Object),
            stats: expect.any(Object),
          }),
        );
      });

      return Promise.all(sassTasks);
    });
  });
});
