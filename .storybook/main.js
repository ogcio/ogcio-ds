module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-themes',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            exportLocalsConvention: 'camelCase'
          }
        }
      }
    },
  ],
  framework: '@storybook/react',
};
