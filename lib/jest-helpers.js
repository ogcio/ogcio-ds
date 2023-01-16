const util = require('util')

const { configureAxe } = require('jest-axe')

const sass = require('node-sass')
const sassRender = util.promisify(sass.render)

const configPaths = require('../config/paths.js')

/**
 * Render Sass
 *
 * @param {import('node-sass').Options} options - Options to pass to sass.render
 * @returns {Promise<import('node-sass').Result>} Result of calling sass.render
 */
function renderSass (options) {
  return sassRender({
    includePaths: [configPaths.src],
    ...options
  })
}

/**
 * As we're testing incomplete HTML fragments, we don't expect there to be a
 * skip link, or for them to be contained within landmarks.
 */
const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

module.exports = {
  axe,
  renderSass
}
