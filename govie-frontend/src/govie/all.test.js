const sassdoc = require('sassdoc')

const configPaths = require('../../config/paths.js')

const { renderSass } = require('../../lib/jest-helpers')
const { goTo, goToExample } = require('../../lib/puppeteer-helpers')

describe('GOV.IE Frontend', () => {
  describe('javascript', () => {
    it('can be accessed via `GOVIEFrontend`', async () => {
      await goTo(page, '/')

      const GOVIEFrontendGlobal = await page.evaluate(() => window.GOVIEFrontend)

      expect(typeof GOVIEFrontendGlobal).toBe('object')
    })
    it('exports `initAll` function', async () => {
      await goTo(page, '/')

      const typeofInitAll = await page.evaluate(() => typeof window.GOVIEFrontend.initAll)

      expect(typeofInitAll).toEqual('function')
    })
    it('exports Components', async () => {
      await goTo(page, '/')

      const GOVIEFrontendGlobal = await page.evaluate(() => window.GOVIEFrontend)

      const components = Object.keys(GOVIEFrontendGlobal)
        .filter(method => !['initAll'].includes(method))

      // Ensure GOV.IE Frontend exports the expected components
      expect(components).toEqual([
        'Accordion',
        'Button',
        'Details',
        'CharacterCount',
        'Checkboxes',
        'ErrorSummary',
        'Header',
        'NotificationBanner',
        'Radios',
        'SkipLink',
        'Tabs'
      ])
    })
    it('exported Components have an init function', async () => {
      await goTo(page, '/')

      var componentsWithoutInitFunctions = await page.evaluate(() => {
        const components = Object.keys(window.GOVIEFrontend)
          .filter(method => !['initAll'].includes(method))

        return components.filter(component => {
          var prototype = window.GOVIEFrontend[component].prototype
          return typeof prototype.init !== 'function'
        })
      })

      expect(componentsWithoutInitFunctions).toEqual([])
    })
    it('can be initialised scoped to certain sections of the page', async () => {
      await goToExample(page, 'scoped-initialisation')

      // To test that certain parts of the page are scoped we have two similar components
      // that we can interact with to check if they're interactive.

      // Check that the conditional reveal component has a conditional section that would open if enhanced.
      await page.waitForSelector('#conditional-not-scoped', { hidden: true })

      await page.click('[for="not-scoped"]')

      // Check that when it is clicked that nothing opens, which shows that it has not been enhanced.
      await page.waitForSelector('#conditional-not-scoped', { hidden: true })

      // Check the other conditional reveal which has been enhanced based on it's scope.
      await page.waitForSelector('#conditional-scoped', { hidden: true })

      await page.click('[for="scoped"]')

      // Check that it has opened as expected.
      await page.waitForSelector('#conditional-scoped', { hidden: false })
    })
  })
  describe('global styles', () => {
    it('are disabled by default', async () => {
      const sass = `
        @import "all";
      `
      const results = await renderSass({ data: sass })
      expect(results.css.toString()).not.toContain(', a {')
      expect(results.css.toString()).not.toContain(', p {')
    })
    it('are enabled if $global-styles variable is set to true', async () => {
      const sass = `
        $govie-global-styles: true;
        @import "all";
      `
      const results = await renderSass({ data: sass })
      expect(results.css.toString()).toContain(', a {')
      expect(results.css.toString()).toContain(', p {')
    })
  })

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
  it('does not contain any unexpected govie- function calls', async () => {
    const sass = '@import "all"'

    const results = await renderSass({ data: sass })
    const css = results.css.toString()

    const functionCalls = css.match(/_?govie-[\w-]+\(.*?\)/g)

    expect(functionCalls).toBeNull()
  })

  describe('Sass documentation', () => {
    it('associates everything with a group', async () => {
      return sassdoc.parse([
        `${configPaths.src}/**/*.scss`,
        `!${configPaths.src}/vendor/*.scss`
      ])
        .then(docs => docs.forEach(doc => {
          return expect(doc).toMatchObject({
            // Include doc.context.name in the expected result when this fails,
            // giving you the context to be able to fix it
            context: {
              name: doc.context.name
            },
            group: [
              expect.not.stringMatching('undefined')
            ]
          })
        }))
    })
  })
})
