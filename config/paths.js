const { dirname, join } = require('path')

// Repository root directory
const rootPath = dirname(__dirname)

const parentDirectory = dirname(rootPath);

/**
 * Config root paths
 */
const configPaths = {
  root: rootPath,
  src: join(rootPath, 'src'),
  config: join(rootPath, 'config'),
  node_modules: join(rootPath, 'node_modules'),

  // Build: Release distribution
  dist: join(rootPath, 'dist'),

  // Build: Package for npm publish
  package: join(rootPath, 'package'),

  // Review application
  public: join(rootPath, 'public'),
}

module.exports = {
  ...configPaths,

  // Source paths
  assets: join(configPaths.src, 'govie/assets'),
  components: join(configPaths.src, 'govie/components'),
}
