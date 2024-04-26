import { readFile } from 'fs/promises';
import { join, parse, relative } from 'path';
import glob from 'glob';
import fm from 'front-matter';
import yaml from 'js-yaml';
import { minimatch } from 'minimatch';
import { paths } from '../config/paths.js';

/**
 * Test environment globals
 * Used to cache slow operations
 *
 * See `config/jest/globals.mjs`
 *
 * @type {{
 *  directories?: Map<string, string[]>,
 *  componentsData?: ComponentData[]
 * }}
 */
const cache = global.cache || {}

/**
 * Directory listing for path
 *
 * @param {string} directoryPath - Path to directory
 * @param {string} [pattern] - Minimatch pattern
 * @param {import('glob').IOptions} [options] - Glob options
 * @returns {Promise<string[]>} File paths
 */
export const getListing = async (directoryPath, pattern = '**/*', options = {}) => {
  console.log("directoryPath ", directoryPath)
  console.log("pattern ", pattern)
  console.log("options ", options)

  const listing = await glob(pattern, {
    cwd: directoryPath,
    matchBase: true,
    nodir: true,
    realpath: true,
    ...options
  })

  return listing.map((entryPath) => relative(directoryPath, entryPath)).sort()
}

/**
 * Directory listing (directories only)
 *
 * @param {string} directoryPath - Path to directory
 * @returns {Promise<string[]>} File paths
 */
export const getDirectories = (directoryPath) => {
  const directories = cache.directories?.get(directoryPath)

  // Retrieve from cache
  if (directories) {
    return Promise.resolve(directories)
  }

  // Read from disk
  return getListing(directoryPath, '*/', { nodir: false })
}

export const getFilesByDirectory = async (directoryPath, pattern = '**/*', options = {}) => {
  const listing = await getListing(directoryPath, pattern, options);
  
  // Filter out only files (exclude directories)
  const files = listing.filter(entryPath => !entryPath.endsWith('/'));

  return files;
};

/**
 * Directory listing array filter
 * Returns true for files matching every pattern
 *
 * @param {string[]} patterns - Minimatch patterns
 * @returns {function(string): boolean} Returns true for files matching every pattern
 */
export const filterPath = (patterns) => (entryPath) => {
  return patterns.every(
    (pattern) => minimatch(entryPath, pattern, {
      matchBase: true
    })
  )
}

/**
 * Directory listing array mapper
 * Runs callback for files matching every pattern
 *
 * @param {string[]} patterns - Minimatch patterns
 * @param {mapPathToCallback} callback - Runs on files matching every pattern
 * @returns {function(string): string | string[]} Returns path (or array of paths)
 */
export const mapPathTo = (patterns, callback) => (entryPath) => {
  const isMatch = filterPath(patterns)

  // Run callback on files matching every pattern (or original path)
  return isMatch(entryPath)
    ? callback(parse(entryPath))
    : entryPath
}

/**
 * Load single component data
 *
 * @param {string} componentName - Component name
 * @returns {Promise<ComponentData>} Component data
 */
export const getComponentData = async (componentName) => {
  const componentData = cache.componentsData
    ?.find(({ name }) => name === componentName)

  // Retrieve from cache
  if (componentData) {
    return componentData
  }

  // Read from disk
  const yamlPath = join(paths.components, componentName, `${componentName}.yaml`)
  const yamlData = yaml.load(await readFile(yamlPath, 'utf8'), { json: true })

  return {
    name: componentName,
    ...yamlData
  }
}

/**
 * Load all components' data
 *
 * @returns {Promise<ComponentData[]>} Components' data
 */
export const getComponentsData = async () => {
  if (cache.componentsData) {
    return cache.componentsData
  }

  // Read from disk
  const componentNames = await getDirectories(paths.components)
  return Promise.all(componentNames.map(getComponentData))
}

/**
 * Load all full page examples' front matter
 *
 * @returns {Promise<FullPageExample[]>} Full page examples
 */
export const getFullPageExamples = async () => {
  const directories = await getDirectories(paths.fullPageExamples)

  // Add metadata (front matter) to each example
  const examples = await Promise.all(directories.map(async (exampleName) => {
    const templatePath = join(paths.fullPageExamples, exampleName, 'index.njk')
    const { attributes } = fm(await readFile(templatePath, 'utf8'))

    return {
      name: exampleName,
      path: exampleName,
      ...attributes
    }
  }))

  const collator = new Intl.Collator('en', {
    sensitivity: 'base'
  })

  return examples.sort(({ name: a }, { name: b }) =>
    collator.compare(a, b))
}

/**
 * Directory entry path mapper callback
 *
 * @callback mapPathToCallback
 * @param {import('path').ParsedPath} file - Parsed file
 * @returns {string[]} Returns path (or array of paths)
 */

/**
 * Component data from YAML
 *
 * @typedef {object} ComponentData
 * @property {string} name - Component name
 * @property {ComponentOption[]} [params] - Nunjucks macro options
 * @property {ComponentExample[]} [examples] - Example Nunjucks macro options
 * @property {string} [previewLayout] - Nunjucks layout for component preview
 * @property {string} [accessibilityCriteria] - Accessibility criteria
 */

/**
 * Component option from YAML
 *
 * @typedef {object} ComponentOption
 * @property {string} name - Option name
 * @property {string} type - Option type
 * @property {boolean} required - Option required
 * @property {string} description - Option description
 * @property {boolean} [isComponent] - Option is another component
 * @property {ComponentOption[]} [params] - Nested Nunjucks macro options
 */

/**
 * Component example from YAML
 *
 * @typedef {object} ComponentExample
 * @property {string} name - Example name
 * @property {object} data - Example data
 * @property {boolean} [hidden] - Example hidden from review app
 */

/**
 * Full page example from front matter
 *
 * @typedef {object} FullPageExample
 * @property {string} name - Example name
 * @property {string} [scenario] - Description explaining the example
 * @property {string} [notes] - Additional notes about the example
 */