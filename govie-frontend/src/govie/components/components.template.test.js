const { HtmlValidate } = require('html-validate')

// We can't use the render function from jest-helpers, because we need control
// over the nunjucks environment.
const nunjucks = require('nunjucks')

const { getDirectories, getComponentsData } = require('../../../lib/file-helper')
const { nunjucksEnv, renderHtml } = require('../../../lib/jest-helpers')

const configPaths = require('../../../config/paths.js')

describe('Components', () => {
  let nunjucksEnvCustom
  let nunjucksEnvDefault

  let componentNames

  beforeAll(async () => {
    // Create a new Nunjucks environment that uses the src directory as its
    // base path, rather than the components folder itself
    nunjucksEnvCustom = nunjucks.configure(configPaths.src)
    nunjucksEnvDefault = nunjucksEnv

    // Components list
    componentNames = [...(await getDirectories(configPaths.components)).keys()]
  })

  describe('Nunjucks environment', () => {
    it('renders template for each component', () => {
      return Promise.all(componentNames.map((componentName) =>
        expect(nunjucksEnvDefault.render(`${componentName}/template.njk`, {})).resolves
      ))
    })

    it('renders template for each component (different base path)', () => {
      return Promise.all(componentNames.map((componentName) =>
        expect(nunjucksEnvCustom.render(`components/${componentName}/template.njk`, {})).resolves
      ))
    })
  })

  describe('Nunjucks HTML validation', () => {
    let validator

    beforeAll(() => {
      validator = new HtmlValidate({
        extends: ['html-validate:recommended'],
        rules: {
          // We don't use boolean attributes consistently – buttons currently
          // use disabled="disabled"
          'attribute-boolean-style': 'off',

          // Allow pattern attribute on input type="number"
          'input-attributes': 'off',

          // Allow for conditional comments (used in header for fallback png)
          'no-conditional-comment': 'off',

          // Allow inline styles for testing purposes
          'no-inline-style': 'off',

          // Allow for explicit roles on regions that have implict roles
          // We do this to better support AT with older versions of IE that
          // have partial support for HTML5 semantic elements
          'no-redundant-role': 'off',

          // More hassle than it's worth 👾
          'no-trailing-whitespace': 'off',

          // We still support creating `input type=button` with the button
          // component, but you have to explicitly choose to use them over
          // buttons
          'prefer-button': 'off',

          // Allow use of roles where there are native elements that would give
          // us that role automatically, e.g. <section> instead of
          // <div role="region">
          //
          // This is mainly needed for links styled as buttons, but we do this
          // in the cookie banner and notification banner too
          'prefer-native-element': 'off',

          // HTML Validate is opinionated about IDs beginning with a letter and
          // only containing letters, numbers, underscores and dashes – which is
          // more restrictive than the spec allows.
          //
          // Relax the rule to allow anything that is valid according to the
          // spec.
          'valid-id': ['error', { relaxed: true }]
        },
        elements: [
          'html5',
          {
          // Allow textarea autocomplete attribute to be street-address
          // (html-validate only allows on/off in default rules)
            textarea: {
              attributes: {
                autocomplete: { enum: ['on', 'off', 'street-address'] }
              }
            },
            // Allow buttons to omit the type attribute (defaults to 'submit')
            button: {
              attributes: {
                type: { required: false }
              }
            }
          }
        ]
      })
    })

    it('renders valid HTML for each component example', async () => {
      const componentsData = await getComponentsData()

      // Validate component examples
      for (const { name: componentName, examples } of componentsData) {
        const exampleTasks = examples.map(async ({ name: exampleName, data }) => {
          const html = renderHtml(componentName, data)

          // Validate HTML
          return expect({ componentName, exampleName, report: validator.validateString(html) })
            .toEqual({ componentName, exampleName, report: expect.objectContaining({ valid: true }) })
        })

        // Validate all component examples in parallel
        await Promise.all(exampleTasks)
      }
    }, 30000)
  })
})
