import {
  componentNameToClassName,
  componentPathToModuleName,
  kebabCaseToPascalCase
 } from '../lib/helper-functions'

describe('componentNameToClassName', () => {
  it('transforms a single word component name', () => {
    expect(componentNameToClassName('button'))
      .toBe('Button')
  })

  it('transforms a multi-word component name', () => {
    expect(componentNameToClassName('character-count'))
      .toBe('CharacterCount')
  })
})

describe('componentPathToModuleName', () => {
  it('transforms path to module name', () => {
    expect(componentPathToModuleName('components/accordion'))
      .toBe('GOVIEFrontend.Accordion')
  })

  it('transforms multi path word to module name', () => {
    expect(componentPathToModuleName('components/character-count'))
      .toBe('GOVIEFrontend.CharacterCount')
  })
})

describe('componentPathToModuleName', () => {
  it('transforms kebab to pascal case', () => {
    expect(kebabCaseToPascalCase('kebab-case'))
      .toBe('KebabCase')
  })
})
