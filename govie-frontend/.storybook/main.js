module.exports = {
  stories: [
    '../docs/storybook/**/*.stories.mdx',
    '../package/govie/components/**/*.stories.mdx',
    '../package/govie/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs'
  ],
  framework: '@storybook/html',
  staticDirs: [{ from: '../dist', to: '/' }]
}
