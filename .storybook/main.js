// import { dirname, join } from "path";

module.exports = {
  stories: [
    '../storybook/**/*.mdx',
    '../src/govie/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/templates/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/patterns/**/*.stories.@(js|jsx|ts|tsx)'
  ],

  // This addon is added to avoid build failures.
  // Reference: <https://github.com/storybookjs/storybook/issues/26576>.
  // getAbsolutePath("@storybook/addon-webpack5-compiler-babel"),
  // getAbsolutePath("@storybook/addon-essentials"),
  // getAbsolutePath("@storybook/addon-links"),
  // getAbsolutePath("@storybook/addon-interactions"),
  // getAbsolutePath("@storybook/addon-themes"),
  // // getAbsolutePath("@storybook/addon-docs"),
  // // getAbsolutePath("@storybook/addon-mdx-gfm"),
  // // getAbsolutePath("@storybook/addon-a11y"),
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions'
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
