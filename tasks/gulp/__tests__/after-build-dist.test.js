import { readFile } from 'fs/promises';
import path from 'path';
import recursive from 'recursive-readdir';
import { paths } from '../../../config/paths.js';

describe('dist/', async () => {
  let packagePath = path.join(paths.package, 'package.json');
  const { version } = await import(packagePath);
  
  describe('assets/', () => {
    it('should include the same files as in src/assets', () => {
      // Build an array of the assets that are present in the src directory.

      const expectedDistAssets = () => {
        const filesToIgnore = [
          '.DS_Store'
        ]
        return recursive(path.join(paths.src, 'assets'), filesToIgnore).then(
          files => {
            return files
              // Remove /package prefix from filenames
              .map(file => file.replace(/^src\/govie\/assets\//, ''))
              // Sort to make comparison easier
              .sort()
          },
          error => {
            console.error('Unable to get asset files from src', error)
          }
        )
      }

      const actualDistAssets = () => {
        return recursive(path.join(paths.dist, 'assets')).then(
          files => {
            return files
              // Remove /package prefix from filenames
              .map(file => file.replace(/^dist\/assets\//, ''))
              // Sort to make comparison easier
              .sort()
          },
          error => {
            console.error('Unable to get asset files from dist', error)
          }
        )
      }

      // Compare the expected directory listing with the files we expect
      // to be present
      return Promise.all([actualDistAssets(), expectedDistAssets()])
        .then(results => {
          const [actualDistAssets, expectedDistAssets] = results

          expect(actualDistAssets).toEqual(expectedDistAssets)
        })
    })
  })

  describe(`@ogcio/ogcio-ds-${version}.min.css`, () => {
    let stylesheet

    beforeAll(async () => {
      stylesheet = await readFile(path.join(paths.dist, `@ogcio/ogcio-ds-${version}.min.css`), 'utf8')
    })

    it('should not contain current media query displayed on body element', () => {
      expect(stylesheet).not.toMatch(/body:before{content:/)
    })

    // it('should contain the copyright notice', () => {
    //   expect(stylesheet).toContain('/*! Copyright (c) 2011 by Margaret Calvert & Henrik Kubel. All rights reserved. The font has been customised for exclusive use on gov.uk. This cut is not commercially available. */')
    // })
  })

  describe(`govie-frontend-ie8-${version}.min.css`, () => {
    let stylesheet

    beforeAll(async () => {
      stylesheet = await readFile(path.join(paths.dist, `@ogcio/ogcio-ds-ie8-${version}.min.css`), 'utf8')
    })

    it('should not contain current media query displayed on body element', () => {
      expect(stylesheet).not.toMatch(/body:before{content:/)
    })
  })

  describe(`@ogcio/ogcio-ds-${version}.min.js`, () => {
    let javascript

    beforeAll(async () => {
      javascript = await readFile(path.join(paths.dist, `@ogcio/ogcio-ds-${version}.min.js`), 'utf8')
    })

    it('should have the correct version name', () => {
      expect(javascript).toBeTruthy()
    })
  })
})
