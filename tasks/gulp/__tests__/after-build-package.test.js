const { readFile } = require('fs/promises')
const path = require('path')
const recursive = require('recursive-readdir')
const glob = require('glob')

const configPaths = require('../../../config/paths.js')
const {
  getDirectories,
  getFilesByDirectory,
} = require('../../../lib/file-helper')
const {
  componentNameToJavaScriptModuleName,
} = require('../../../lib/helper-functions')

const { renderSass } = require('../../../lib/jest-helpers')

describe('package/', () => {
  let componentsFilesSource
  let componentsFilesPackage

  let componentNames

  beforeAll(async () => {
    componentsFilesSource = await getFilesByDirectory(configPaths.components)
    componentsFilesPackage = await getFilesByDirectory(
      `${configPaths.package}govie/components/`
    )

    // Components list
    componentNames = [...(await getDirectories(configPaths.components)).keys()]
  })

  it('should contain the expected files', () => {
    // Build an array of the files that are present in the package directory.
    const actualPackageFiles = () => {
      return recursive(configPaths.package).then(
        (files) => {
          return (
            files
              // Remove /package prefix from filenames
              .map((file) => file.replace(/^package\//, ''))
              // Sort to make comparison easier
              .sort()
          )
        },
        (error) => {
          console.error('Unable to get package files', error)
        }
      )
    }

    // Build an array of files we expect to be found in the package directory,
    // based on the contents of the src directory.
    const expectedPackageFiles = () => {
      const filesToIgnore = [
        '.DS_Store',
        '*.test.*',
        '*.stories.*',
        '*.snap',
        '*/govie/README.md',
        // Excluse files related to Storybook application
        '*.css',
        '*/govie/all-storybook.scss',
        '*/govie/storybook/*.scss',
      ]

      const additionalFilesNotInSrc = ['package.json', 'README.md']

      return recursive(configPaths.src, filesToIgnore).then(
        (files) => {
          let filesNotInSrc = files
          // Use glob to generate an array of files that accounts for wildcards in filenames
          filesNotInSrc = glob.sync(
            '{' + additionalFilesNotInSrc.join(',') + '}',
            { cwd: 'package' }
          )

          return (
            files
              .map((file) => {
                // Remove /src prefix from filenames
                const fileWithoutSrc = file.replace(/^src\//, '')
                // Account for govie-esm folder
                if (fileWithoutSrc.split('.').pop() === 'mjs') {
                  const umdFile = fileWithoutSrc.replace('.mjs', '.js')
                  return [umdFile]
                } else {
                  return fileWithoutSrc
                }
              })
              // Allow for additional files that are not in src
              .concat(filesNotInSrc)
              .flat()
              // Sort to make comparison easier
              .sort()
          )
        },
        (error) => {
          console.error('Unable to get package files', error)
        }
      )
    }

    // Compare the expected directory listing with the files we expect
    // to be present
    return Promise.all([actualPackageFiles(), expectedPackageFiles()]).then(
      (results) => {
        const [actualPackageFiles, expectedPackageFiles] = results

        const expectedPackageFilesWithConfigs = [
          '.npmrc',
          ...expectedPackageFiles,
        ]

        expect(actualPackageFiles).toEqual(expectedPackageFilesWithConfigs)
      }
    )
  })

  describe('README.md', () => {
    it('is not overwritten', () => {
      return readFile(path.join(configPaths.package, 'README.md'), 'utf8')
        .then((contents) => {
          // Look for H1 matching 'GOV.IE Frontend' from existing README
          expect(contents).toMatch(/^# GOV.IE Frontend/)
        })
        .catch((error) => {
          throw error
        })
    })
  })

  describe('all.scss', () => {
    it('should compile without throwing an exception', async () => {
      const allScssFile = path.join(configPaths.package, 'govie', 'all.scss')
      await renderSass({ file: allScssFile })
    })
  })

  describe('all.js', () => {
    it('should have correct module name', async () => {
      const allJsFile = path.join(configPaths.package, 'govie', 'all.js')

      return readFile(allJsFile, 'utf8')
        .then((data) => {
          expect(data).toContain(
            "typeof define === 'function' && define.amd ? define('GOVIEFrontend', ['exports'], factory)"
          )
        })
        .catch((error) => {
          throw error
        })
    })
  })

  describe('components with JavaScript', () => {
    beforeEach(async () => {
      // Filter "JavaScript enabled" only
      componentNames = [...componentsFilesSource]
        .filter(([name, files]) => files.has(`${name}.js`))
        .map(([name]) => name)
    })

    it('should have component JavaScript file with correct module name', () => {
      const componentTasks = componentNames.map(async (componentName) => {
        const componentSource = componentsFilesSource.get(componentName)
        const componentPackage = componentsFilesPackage.get(componentName)

        // CommonJS module not found at source
        expect([...componentSource.keys()]).toEqual(
          expect.not.arrayContaining([`${componentName}.js`])
        )

        // CommonJS generated in package
        expect([...componentPackage.keys()]).toEqual(
          expect.arrayContaining([`${componentName}.js`])
        )

        const { path: modulePath } = componentPackage.get(`${componentName}.js`)

        const moduleText = await readFile(modulePath, 'utf8')

        expect(moduleText).toContain(
          `typeof define === 'function' && define.amd ? define('${componentNameToJavaScriptModuleName(
            componentName
          )}', factory)`
        )
      })

      // Check all component files
      return Promise.all(componentTasks)
    })
  })
})
