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
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            mode: 'local',
            // outputs the actual classname - necessary for the HTML snippets to output as expected
            localIdentName: '[local]',
          },
        },
      },
    },
    'storybook-addon-themes',
    'storybook-source-code-addon',
  ],
  framework: '@storybook/react',
};
