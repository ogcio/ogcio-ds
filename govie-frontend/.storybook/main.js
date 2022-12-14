module.exports = {
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
    {
      name: 'storybook-design-token',
      options: {
        preserveCSSVars: true,
        designTokenGlob: 'src/**/**/*.css'
      }
    }
  ],
  framework: '@storybook/html',
  staticDirs: [{ from: '../storybook', to: '/' }]
}
