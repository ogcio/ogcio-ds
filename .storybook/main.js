const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../storybook/**/*.stories.mdx',
    '../src/govie/components/**/*.stories.mdx',
    '../src/govie/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/templates/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/patterns/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    // '@etchteam/storybook-addon-css-variables-theme',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/html',
  staticDirs: [
    {
      from: '../storybook/dist',
      to: '/',
    },
    {
      from: './assets/themes',
      to: '/themes',
    },
  ],
  docs: {
    docsPage: 'automatic',
  },
  webpackFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    };

    return config;
  },
};
