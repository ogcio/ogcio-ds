import { dirname, join } from "path";
module.exports = {
  stories: [
    '../storybook/**/*.mdx',
    '../src/govie/components/**/*.mdx',
    '../src/govie/components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/templates/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/govie/patterns/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@etchteam/storybook-addon-css-variables-theme"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    // This addon is added to avoid build failures.
    // Reference: <https://github.com/storybookjs/storybook/issues/26576>.
    getAbsolutePath("@storybook/addon-webpack5-compiler-babel"), 
  ],
  framework: {
    name: getAbsolutePath("@storybook/html-webpack5"),
    options: {}
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
  }
}

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
