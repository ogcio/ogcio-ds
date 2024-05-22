module.exports = {
  stories: [
    '../storybook/**/*.mdx',
    '../src/govie/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/templates/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/patterns/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    // '@etchteam/storybook-addon-css-variables-theme',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
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
    autodocs: true,
  },
  viteFinal: async (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.base = "/ogcio-ds/";
    }
    return config
  }
};
