import remarkGfm from 'remark-gfm';

export default {
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
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-essentials',
    // reference: <https://storybook.js.org/docs/writing-docs/mdx#markdown-tables-arent-rendering-correctly>
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
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
    if (configType === 'PRODUCTION' && process.env.DS_ENV === 'github-pages') {
      config.base = '/ogcio-ds/';
    }
    return config;
  },
};
