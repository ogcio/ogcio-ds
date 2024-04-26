import { join } from 'path';
import cheerio from 'cheerio';
import { configureAxe } from 'jest-axe';
import sass from 'node-sass';
import nunjucks from 'nunjucks';
import { outdent } from 'outdent';

import { paths } from '../config/index.js';
import { getComponentData } from './file-helper.js';
import { componentNameToMacroName } from './helper-functions.js';

const sassPaths = [
  join(paths.src, 'govie'),
  paths.node_modules
]

const nunjucksPaths = [
  join(paths.src, 'govie'),
  paths.components
]

export const nunjucksEnv = nunjucks.configure(nunjucksPaths, {
  trimBlocks: true,
  lstripBlocks: true
})

/**
 * Render the raw HTML for a component
 *
 * @param {string} componentName - Component name
 * @param {object} options - options to pass to the component macro
 * @param {string} [callBlock] - if provided, the macro is called using the
 *   Nunjucks call tag, with the callBlock passed as the contents of the block
 * @returns {string} HTML rendered by the macro
 */
export const renderHtml = (componentName, options, callBlock) => {
  const macroName = componentNameToMacroName(componentName)
  const macroPath = `${componentName}/macro.njk`

  return callMacro(macroName, macroPath, [options], callBlock)
}

/**
 * Returns the string result from calling a macro
 *
 * @param {string} macroName - The name of the macro
 * @param {string} macroPath - The path to the file containing the macro *from the root of the project*
 * @param {Array} params - The parameters that will be passed to the macro. They'll be `JSON.stringify`ed and joined with a `,`
 * @param {string} [callBlock] - Content for an optional callBlock, if necessary for the macro to receive one
 * @returns {string} The result of calling the macro
 */
export const callMacro = (macroName, macroPath, params = [], callBlock) => {
  const macroParams = params.map(param => JSON.stringify(param, null, 2)).join(',')

  let macroString = `{%- from "${macroPath}" import ${macroName} -%}`

  // If we're nesting child components or text, pass the children to the macro
  // using the 'caller' Nunjucks feature
  if (callBlock) {
    macroString += `{%- call ${macroName}(${macroParams}) -%}${callBlock}{%- endcall -%}`
  } else {
    macroString += `{{- ${macroName}(${macroParams}) -}}`
  }

  return nunjucksEnv.renderString(macroString)
}

/**
 * Render component into Cheerio API
 *
 * Allows us to interrogate the output of the macro using a jQuery-like syntax
 *
 * @param {string} componentName - Component name
 * @param {object} options - options to pass to the component macro
 * @param {string} [callBlock] - if provided, the macro is called using the
 *   Nunjucks call tag, with the callBlock passed as the contents of the block
 * @returns {import('cheerio').CheerioAPI} a jQuery-like representation of the macro output
 */
export const render = (componentName, options, callBlock) => {
  return cheerio.load(
    renderHtml(componentName, options, callBlock)
  )
}

/**
 * Render Nunjucks template into Cheerio API
 *
 * @param {object} [context] - Nunjucks context
 * @param {Object<string, string>} [blocks] - Nunjucks blocks
 * @returns {import('cheerio').CheerioAPI} a jQuery-like representation of the template output
 */
export const renderTemplate = (context = {}, blocks = {}) => {
  let viewString = '{% extends "template.njk" %}'

  for (const [blockName, blockContent] of Object.entries(blocks)) {
    viewString += outdent`

      {% block ${blockName} -%}
        ${blockContent}
      {%- endblock %}`
  }

  const output = nunjucksEnv.renderString(viewString, context)
  return cheerio.load(output)
}

/**
 * Get examples from a component's metadata file
 *
 * @param {string} componentName - Component name
 * @returns {Promise<Object<string, ComponentExample['data']>>} returns object that includes all examples at once
 */
export const getExamples = async (componentName) => {
  const componentData = await getComponentData(componentName)

  /** @type {Object<string, ComponentExample['data']>} */
  const examples = {}

  for (const example of componentData?.examples || []) {
    examples[example.name] = example.data
  }

  return examples
}

/**
 * Render Sass from file
 *
 * @param {string} path - Path to Sass file
 * @param {import('node-sass').Options} [options] - Options to pass to Sass
 */
export const compileSassFile = async (path, options = {}) => {
  const { css, map, stats } = sass.renderSync({
    file: path,
    includePaths: sassPaths,
    outputStyle: 'expanded',
    quietDeps: true,
    ...options
  })

  return {
    css: css?.toString().trim(),
    map: map?.toString().trim(),
    stats
  }
}

export const renderSass = async (data, options = {}) => {
  const { css, map, stats } = sass.renderSync({
    data,
    includePaths: sassPaths,
    outputStyle: 'expanded',
    quietDeps: true,
    ...options
  })

  return {
    css: css?.toString().trim(),
    map: map?.toString().trim(),
    stats
  }
}

/**
 * Render Sass from string
 *
 * @param {string} source - Sass source string
 * @param {import('node-sass').Options} [options] - Options to pass to Sass
 */
export const compileSassString = async (source, options = {}) => {
  const { css, map, stats } = sass.renderSync({
    data: source,
    includePaths: sassPaths,
    outputStyle: 'expanded',
    quietDeps: true,
    ...options
  })

  return {
    css: css?.toString().trim(),
    map: map?.toString().trim(),
    stats
  }
}

/**
 * Get the raw HTML representation of a component, and remove any other
 * child elements that do not match the component.
 * Relies on B.E.M naming ensuring that child components relating to a component
 * are namespaced.
 *
 * @param {import('cheerio').CheerioAPI} $ - requires an instance of cheerio (jQuery) that includes the
 *   rendered component.
 * @param {string} className - the top level class 'Block' in B.E.M terminology
 * @returns {string} returns HTML
 */
export const htmlWithClassName = ($, className) => {
  const $component = $(className)
  const classSelector = className.replace('.', '')
  // Remove all other elements that do not match this component
  $component.find(`[class]:not([class^=${classSelector}])`).remove()
  return $.html($component)
}

/**
 * As we're testing incomplete HTML fragments, we don't expect there to be a
 * skip link, or for them to be contained within landmarks.
 */
export const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

// export default {
//   axe,
//   getExamples,
//   htmlWithClassName,
//   nunjucksEnv,
//   callMacro,
//   render,
//   renderHtml,
//   renderSass,
//   compileSassFile,
//   compileSassString,
//   renderTemplate
// }

/**
 * @typedef {import('./file-helper.js').ComponentExample} ComponentExample
 */