import { readFile } from 'fs/promises'
import { join, parse } from 'path'
import { promisify } from 'util'

import { render } from 'sass'
import PluginError from 'plugin-error'
import postcss from 'postcss'
// eslint-disable-next-line import/default
import postcssrc from 'postcss-load-config'

import { paths, pkg } from '../config/index.js'
import { getListing } from '../lib/file-helper.js'

import { writeAsset } from './compile-assets.mjs'
import {
  destination,
  isDist,
  isPackage,
  isPublic,
  isStorybook,
} from './task-arguments.mjs'

// Sass renderer
const sassRender = promisify(render)

/**
 * Compile Sass to CSS task
 *
 * @returns {Promise<void>}
 */
export async function compileStylesheets() {
  const importEntries = await getImportEntries()

  try {
    await Promise.all(importEntries.map(compileStylesheet))
  } catch (cause) {
    throw new PluginError('compile:scss', cause)
  }
}

compileStylesheets.displayName = 'compile:scss'

/**
 * Compile Sass to CSS helper
 *
 * @param {AssetEntry} assetEntry - Asset entry
 */
export async function compileStylesheet([modulePath, { srcPath, destPath }]) {
  const moduleSrcPath = join(srcPath, modulePath)
  const moduleDestPath = join(destPath, getPathByDestination(modulePath))

  let css

  // Configure PostCSS
  const options = {
    from: moduleSrcPath,
    to: moduleDestPath,
  }

  // Render Sass
  if (!isPackage) {
    ;({ css } = await sassRender({
      file: moduleSrcPath,
      outFile: moduleDestPath,

      // Resolve @imports via
      includePaths: [paths.node_modules],
    }))
  }

  if (!css) {
    css = await readFile(moduleSrcPath)
  }

  // Transform with PostCSS
  const config = await postcssrc(options)
  const result = await postcss(config.plugins).process(css, {
    ...options,
    ...config.options,
  })

  // Write to files
  return writeAsset(moduleDestPath, result)
}

/**
 * Stylesheet imports to compile
 *
 * @returns {Promise<AssetEntry[]>} Import entries
 */
export async function getImportEntries() {
  const srcPath = join(paths.src, 'govie')
  const destPath = isPackage ? join(destination, 'govie') : destination

  // Perform a search and return an array of matching file names
  // but for 'dist' and 'public' we only want top-level stylesheets
  const importPaths = await getListing(
    srcPath,
    isPackage ? '**/*.scss' : '[!_]*.scss'
  )

  let finalImportPaths
  if (isStorybook) {
    finalImportPaths = importPaths.filter((modulePath) =>
      modulePath.includes('storybook')
    )
  } else {
    finalImportPaths = importPaths.filter(
      (modulePath) => !modulePath.includes('storybook')
    )
  }

  return finalImportPaths.map((modulePath) => [
    modulePath,
    {
      srcPath,
      destPath,
    },
  ])
}

/**
 * Stylesheet path by destination
 *
 * @param {AssetEntry[0]} filePath - File path
 * @returns {AssetEntry[0]} File path adjusted by destination
 */
export function getPathByDestination(filePath) {
  let { dir, name } = parse(filePath)

  // Adjust file path by destination
  name = isDist
    ? `${name.replace(/^all/, 'ogcio-ds')}-${pkg.version}`
    : isStorybook
    ? `${name.replace(/^all-storybook/, pkg.name)}`
    : name

  // Adjust file path for minification
  return join(dir, !isPackage ? `${name}.min.css` : `${name}.scss`)
}

/**
 * @typedef {import('./compile-assets.mjs').AssetEntry} AssetEntry
 * @typedef {import('./compile-assets.mjs').AssetOutput} AssetOutput
 */
