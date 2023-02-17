import { readFile } from 'fs/promises'
import { join } from 'path'

import configPaths from '../../../config/paths.js'
import { filterPath, getDirectories, getListing, mapPathTo } from '../../../lib/file-helper.js'
import { componentNameToClassName, componentPathToModuleName } from '../../../lib/helper-functions.js'
import { compileSassFile } from '../../../lib/jest-helpers.js'

describe('package/', () => {
  let listingSource
  let listingPackage

  let componentsFilesSource
  let componentsFilesPackage
  let componentsFilesPackageESM

  let componentNames

  beforeAll(async () => {
    listingSource = await getListing(configPaths.src)
    listingPackage = await getListing(configPaths.package)

    componentsFilesSource = await getListing(configPaths.components)
    componentsFilesPackage = await getListing(join(configPaths.package, 'govie/components'))
    componentsFilesPackageESM = await getListing(join(configPaths.package, 'govie-esm/components'))

    // Components list
    componentNames = await getDirectories(configPaths.components)
  })

  it('should contain the expected files', async () => {
    const filterPatterns = [
      '!**/.DS_Store',
      '!**/*.test.*',
      '!**/__snapshots__/',
      '!**/__snapshots__/**',
      '!govie/README.md'
    ]

    // Build array of expected output files
    const listingExpected = listingSource
      .filter(filterPath(filterPatterns))

      // Replaces all source '*.mjs' files
      .flatMap(mapPathTo(['**/*.mjs'], ({ dir: requirePath, name }) => {
        const importFilter = /^govie(?!-)/

        // All source `**/*.mjs` files compiled to `**/*.js`
        const output = [
          join(requirePath, `${name}.js`),
          join(requirePath, `${name}.js.map`) // with source map
        ]

        // Only source `./govie/**/*.mjs` files copied to `./govie-esm/**/*.mjs`
        if (importFilter.test(requirePath)) {
          output.push(join(requirePath.replace(importFilter, 'govie-esm'), `${name}.mjs`))
        }

        return output
      }))

      // Replaces source component '*.yaml' with:
      // - `fixtures.json` fixtures for tests
      // - `macro-options.json` component options
      .flatMap(mapPathTo(['**/*.yaml'], ({ dir: requirePath }) => [
        join(requirePath, 'fixtures.json'),
        join(requirePath, 'macro-options.json')
      ]))

      // Files already present in 'package'
      .concat(...[
        'package.json',
        'README.md'
      ])
      .sort()

    // Compare array of actual output files
    expect(listingPackage).toEqual(listingExpected)
  })

  describe('README.md', () => {
    it('is not overwritten', async () => {
      const contents = await readFile(join(configPaths.package, 'README.md'), 'utf8')

      // Look for H1 matching 'GOV.UK Frontend' from existing README
      expect(contents).toMatch(/^# GOV.UK Frontend/)
    })
  })

  describe('all.scss', () => {
    it('should compile without throwing an exception', async () => {
      const file = join(configPaths.package, 'govie', 'all.scss')
      await expect(compileSassFile(file)).resolves
    })
  })

  describe('all.js', () => {
    it('should have correct module name', async () => {
      const contents = await readFile(join(configPaths.package, 'govie', 'all.js'), 'utf8')

      // Look for AMD module definition for 'GOVIEFrontend'
      expect(contents).toContain("typeof define === 'function' && define.amd ? define('GOVIEFrontend', ['exports'], factory)")
    })
  })

  describe('components with JavaScript', () => {
    let componentNamesWithJavaScript

    beforeAll(async () => {
      // Components list (with JavaScript only)
      componentNamesWithJavaScript = componentNames
        .filter((componentName) => componentsFilesSource.includes(join(componentName, `${componentName}.mjs`)))
    })

    it('should have component JavaScript file with correct module name', () => {
      const componentTasks = componentNamesWithJavaScript.map(async (componentName) => {
        const componentFilter = filterPath([`${componentName}/**`])

        const componentSource = componentsFilesSource.filter(componentFilter)
        const componentPackage = componentsFilesPackage.filter(componentFilter)
        const componentPackageESM = componentsFilesPackageESM.filter(componentFilter)

        // CommonJS module not found at source
        expect(componentSource)
          .toEqual(expect.not.arrayContaining([join(componentName, `${componentName}.js`)]))

        // CommonJS generated in package
        expect(componentPackage)
          .toEqual(expect.arrayContaining([join(componentName, `${componentName}.js`)]))

        // ESM module generated in package
        expect(componentsFilesPackageESM)
          .toEqual(expect.arrayContaining([join(componentName, `${componentName}.mjs`)]))

        const [modulePath] = componentPackage
          .filter(filterPath([`**/${componentName}.js`]))

        const [modulePathESM] = componentPackageESM
          .filter(filterPath([`**/${componentName}.mjs`]))

        const moduleName = componentPathToModuleName(join(configPaths.components, modulePath))
        const moduleText = await readFile(join(configPaths.package, 'govie/components', modulePath), 'utf8')
        const moduleTextESM = await readFile(join(configPaths.package, 'govie-esm/components', modulePathESM), 'utf8')

        expect(moduleText).toContain(`typeof define === 'function' && define.amd ? define('${moduleName}', factory)`)
        expect(moduleTextESM).toContain(`export default ${componentNameToClassName(componentName)}`)
      })

      // Check all component files
      return Promise.all(componentTasks)
    })
  })
})
