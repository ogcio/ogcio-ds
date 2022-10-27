# Description

It is a proof of concept for a component library with storybook that supports both HTLM and react examples. It also has built in support for tokenisation that allows the use of themes.

# Running locally

First need to build the local packages referenced in the `package.json` workspaces section by running `npm run build`. Then you need to install the dependencies by running `npm i`. After all that you should be able to run `npm run storybook` which will run a storybook instance with the components at `localhost:6006`.
