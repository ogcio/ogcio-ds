module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    '../packages/components/**/*.stories.mdx',
    '../packages/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
    'storybook-addon-themes'
  ],
  framework: '@storybook/react',
};
