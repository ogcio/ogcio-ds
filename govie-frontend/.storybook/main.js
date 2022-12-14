module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: [
    '../docs/storybook/**/*.stories.mdx',
    '../src/govie/components/**/*.stories.mdx',
    '../src/govie/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@etchteam/storybook-addon-css-variables-theme'
  ],
  framework: '@storybook/html',
  staticDirs: [
    {
      from: '../storybook/dist',
      to: '/'
    }
  ],
  docs: {
    docsPage: 'automatic'
  }
}
