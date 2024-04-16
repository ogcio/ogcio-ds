// import { dirname, join } from "path";

module.exports = {
  stories: [
    '../storybook/**/*.mdx',
    '../src/govie/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/templates/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/patterns/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-docs'
    // '@etchteam/storybook-addon-css-variables-theme'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  staticDirs: [
    {
      from: '../storybook/dist',
      to: '/'
    },
    {
      from: './assets/themes',
      to: '/themes'
    }
  ],
  docs: {
    autodocs: true
  }
}

// function getAbsolutePath(value) {
//   return dirname(require.resolve(join(value, "package.json")));
// }
