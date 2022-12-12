const { readdir, readFile, stat } = require('fs/promises')
const { join, normalize } = require('path')
const fm = require('front-matter')

const configPaths = require('../config/paths.js')

/**
 * Used to cache slow operations
 */
const cache = {}

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


module.exports = {
  getDirectories,
  getFiles,
  getFilesByDirectory,
  getListing
}
