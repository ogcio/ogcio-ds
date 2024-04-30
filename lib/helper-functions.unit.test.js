const helpers = require('../lib/helper-functions')

describe('componentNameToClassName', () => {
  it('transforms a single word component name', () => {
    expect(helpers.componentNameToClassName('button'))
      .toBe('Button')
  })

  it('transforms a multi-word component name', () => {
    expect(helpers.componentNameToClassName('character-count'))
      .toBe('CharacterCount')
  })
})

describe('componentPathToModuleName', () => {
  it('transforms path to module name', () => {
    expect(helpers.componentPathToModuleName('components/accordion'))
      .toBe('GOVIEFrontend.Accordion')
  })

  it('transforms multi path word to module name', () => {
    expect(helpers.componentPathToModuleName('components/character-count'))
      .toBe('GOVIEFrontend.CharacterCount')
  })
})

describe('componentPathToModuleName', () => {
  it('transforms kebab to pascal case', () => {
    expect(helpers.kebabCaseToPascalCase('kebab-case'))
      .toBe('KebabCase')
  })
})