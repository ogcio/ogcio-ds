/**
 * Convert a kebab-cased string to a PascalCased one
 *
 * @param {string} value - Input kebab-cased string
 * @returns {string} Output PascalCased string
 */
function kebabCaseToPascalCase (value) {
  return value
    .toLowerCase()
    .split('-')
    // capitalize each 'word'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Convert component name to macro name
 *
 * Component names are kebab-cased (button, date-input), whilst macro names have
 * a `govuk` prefix and are camel cased (govukButton, govukDateInput).
 *
 * @param {string} componentName - A kebab-cased component name
 */
function componentNameToMacroName (componentName) {
  return `govuk${kebabCaseToPascalCase(componentName)}`
}

/**
 * Convert component name to its JavaScript class name
 *
 * @param {string} componentName - A kebab-cased component name
 * @returns {string} The name of its corresponding JavaScript class
 */
function componentNameToJavaScriptClassName (componentName) {
  return kebabCaseToPascalCase(componentName)
}

/**
 * Convert component name to JavaScript UMD module name
 *
 * Used by rollup to set the `window` global and UMD/AMD export name
 *
 * Component names are kebab-cased strings (button, date-input), whilst module
 * names have a `GOVIEFrontend.` prefix and are PascalCased
 * (GOVIEFrontend.Button, GOVIEFrontend.CharacterCount).
 *
 * @param {string} componentName - A kebab-cased component name
 * @returns {string} The name of its corresponding module
 */
function componentNameToJavaScriptModuleName (componentName) {
  return `GOVIEFrontend.${componentNameToJavaScriptClassName(componentName)}`
}

module.exports = {
  componentNameToJavaScriptClassName,
  componentNameToMacroName,
  componentNameToJavaScriptModuleName
}
