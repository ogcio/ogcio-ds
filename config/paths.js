import { dirname, join } from 'path';

// Repository root directory
const rootPath = dirname(new URL(import.meta.url).pathname);
const parentDirectory = dirname(rootPath);

/**
 * Config root paths
 */
const configPaths = {
  root: parentDirectory,
  src: join(parentDirectory, 'src'),
  config: join(parentDirectory, 'config'),
  node_modules: join(parentDirectory, 'node_modules'),

  // Build: Release distribution
  dist: join(parentDirectory, 'dist'),

  // Build: Package for npm publish
  package: join(parentDirectory, 'package'),

  // Review application
  public: join(parentDirectory, 'public'),
};

export const paths = {
  ...configPaths,
  // Source paths
  assets: join(configPaths.src, 'govie/assets'),
  components: join(configPaths.src, 'govie/components'),
};