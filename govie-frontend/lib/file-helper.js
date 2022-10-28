const { readdir, readFile, stat } = require('fs/promises')
const { join, normalize } = require('path')
const yaml = require('js-yaml')
const fm = require('front-matter')

const configPaths = require('../config/paths.js')

/**
 * Test environment globals
 * Used to cache slow operations
 *
 * See `config/jest/globals.mjs`
 */
const cache = global.cache || {}

/**
 * Directory listing for path
 *
 * @param {string} directoryPath
 * @returns {Promise<DirectoryListing>} Directory listing
 */
const getListing = async (directoryPath) => {
  const basenames = await readdir(directoryPath)

  // Gather listing entries
  const entries = await Promise.all(basenames.map(async basename => {
    const entryPath = join(directoryPath, basename)

    return [basename, {
      basename,
      path: normalize(entryPath),
      stats: await stat(entryPath)
    }]
  }))

  return new Map(entries)
}

/**
 * Directory listing (directories only)
 *
 * @param {string} directoryPath
 * @returns {Promise<DirectoryListing>} Directory entries
 */
const getDirectories = async (directoryPath) => {
  const directories = cache.directories?.get(directoryPath)

  // Retrieve from cache
  if (directories) {
    return directories
  }

  // Read from disk
  const listing = await getListing(directoryPath)

  // Directories only
  const entries = [...listing]
    .filter(([, { stats }]) => stats.isDirectory())

  return new Map(entries)
}

/**
 * Directory listing (files only)
 *
 * @param {string} directoryPath
 * @returns {Promise<DirectoryListing>} File entries
 */
const getFiles = async (directoryPath) => {
  const listing = await getListing(directoryPath)

  // Files only
  const entries = [...listing]
    .filter(([, { stats }]) => stats.isFile())

  return new Map(entries)
}

/**
 * Directory listing (files, grouped by directory)
 *
 * @param {string} directoryPath
 * @returns {Promise<Map<string, DirectoryListing>>} File entries by directory
 */
const getFilesByDirectory = async (directoryPath) => {
  const directories = await getDirectories(directoryPath)

  // Directory listing per directory
  const listings = await Promise.all([...directories]
    .map(async ([basename, { path }]) => [basename, await getFiles(path)])
  )

  return new Map(listings)
}

/**
 * Load single component data
 *
 * @param {string} componentName - Component name
 * @returns {Promise<ComponentData>} Component data
 */
const getComponentData = async (componentName) => {
  const componentData = cache.componentsData
    ?.find(({ name }) => name === componentName)

  // Retrieve from cache
  if (componentData) {
    return componentData
  }

  // Read from disk
  try {
    const yamlPath = join(configPaths.components, componentName, `${componentName}.yaml`)
    const yamlData = yaml.load(await readFile(yamlPath, 'utf8'), { json: true })

    return {
      name: componentName,
      ...yamlData
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Load all components' data
 *
 * @returns {Promise<ComponentData[]>} Components' data
 */
const getComponentsData = async () => {
  if (cache.componentsData) {
    return cache.componentsData
  }

  // Read from disk
  const directories = await getDirectories(configPaths.components)
  return Promise.all([...directories.keys()].map(getComponentData))
}

/**
 * Load all full page examples' front matter
 *
 * @returns {Promise<FullPageExample[]>} Full page examples
 */
const getFullPageExamples = async () => {
  const directories = await getDirectories(configPaths.fullPageExamples)

  // Add metadata (front matter) to each example
  const examples = await Promise.all([...directories.keys()].map(async (exampleName) => {
    const templatePath = join(configPaths.fullPageExamples, exampleName, 'index.njk')
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

module.exports = {
  getComponentData,
  getComponentsData,
  getDirectories,
  getFiles,
  getFilesByDirectory,
  getFullPageExamples,
  getListing
}

/**
 * Directory listing
 *
 * @typedef {Map<string, { path: string; stats: import('fs').Stats }>} DirectoryListing
 */

/**
 * Directory listing entry
 *
 * @typedef {object} DirectoryListingEntry
 * @property {string} path - Relative path to file or directory
 * @property {import('fs').Stats} stats - Information about a file or directory
 */

/**
 * Component data from YAML
 *
 * @typedef {object} ComponentData
 * @property {string} name - Component name
 * @property {unknown[]} [params] - Nunjucks macro options
 * @property {unknown[]} [examples] - Example Nunjucks macro options
 * @property {string} [previewLayout] - Nunjucks layout for component preview
 * @property {string} [accessibilityCriteria] - Accessibility criteria
 */

/**
 * Full page example from front matter
 *
 * @typedef {object} FullPageExample
 * @property {string} name - Example name
 * @property {string} [scenario] - Description explaining the example
 * @property {string} [notes] - Additional notes about the example
 */
