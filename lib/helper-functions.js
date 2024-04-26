import { dirname, join, parse } from 'path';
import { minimatch } from 'minimatch';

/**
 * Convert a kebab-cased string to a PascalCased one
 *
 * @param {string} value - Input kebab-cased string
 * @returns {string} Output PascalCased string
 */
export const kebabCaseToPascalCase = (value) => {
  return value
    .toLowerCase()
    .split('-')
    // capitalize each 'word'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * Convert component name to its JavaScript class name
 *
 * @param {string} componentName - A kebab-cased component name
 * @returns {string} The name of its corresponding JavaScript class
 */
export const componentNameToClassName = (componentName) => {
  return kebabCaseToPascalCase(componentName)
}

/**
 * Convert component path to JavaScript UMD module name
 *
 * Used by Rollup to set the `window` global and UMD/AMD export name
 *
 * Component paths have kebab-cased file names (button.mjs, date-input.mjs),
 * whilst module names have a `GOVIEFrontend.` prefix and are PascalCased
 * (GOVIEFrontend.Button, GOVIEFrontend.CharacterCount)
 *
 * @param {string} componentPath - Path to component with kebab-cased file name
 * @returns {string} The name of its corresponding module
 */
export const componentPathToModuleName = (componentPath) => {
  const { name } = parse(componentPath)

  return minimatch(componentPath, '**/components/**', { matchBase: true })
    ? `GOVIEFrontend.${componentNameToClassName(name)}`
    : 'GOVIEFrontend'
}

/**
 * Resolve path to package from any npm workspace
 *
 * Used by npm workspaces to find packages that might be hoisted to
 * the project root node_modules
 *
 * @param {string} packageName - Installed npm package name
 * @param {string} [childPath] - Optional child directory path
 * @returns {string} Path to installed npm package
 */
export const  packageNameToPath = (packageName, childPath = '') => {
  return join(dirname(require.resolve(`${packageName}/package.json`)), childPath)
}
