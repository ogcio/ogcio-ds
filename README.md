# OGCIO Design System

This repository contains the code for the OGCIO Design System components, provided for reuse by services.

See live examples of OGCIO-DS components, and guidance on when to use them in your service, in the [OGCIO-DS Storybook](https://storybook.design-system.ogcio.gov.ie/).

## Run locally

You'll need [Git](https://help.github.com/articles/set-up-git/) and [Node.js](https://nodejs.org/en/) installed to get this project running.

Note: You will need the [active LTS (Long-term support)](https://github.com/nodejs/Release#release-schedule) Node.js version for this project (as specified in [.nvmrc](./.nvmrc))

### Fork repository (optional)
If you're an external contributor make sure to [fork this project first](https://help.github.com/articles/fork-a-repo/)

### Clone repository
```
git clone git@github.com:ogcio/ogcio-ds.git # or clone your own fork

cd ogcio-ds
```

### Using nvm (optional)
If you work across multiple Node.js projects there's a good chance they require different Node.js and npm versions.

To enable this we use [nvm (Node Version Manager)](https://github.com/creationix/nvm) to switch between versions easily.

1. [install nvm](https://github.com/creationix/nvm#installation)
2. Run `nvm install` in the project directory (this will use [.nvmrc](./.nvmrc))

### Install npm dependencies
```
npm install
```

### Start a local server

We use [Storybook](https://storybook.js.org/) to serve our components. To build Storybook locally sources (`build`), use:
```
npm run storybook:build
```

To build Storybook dist sources (`storybook/dist`), use:
```
npm run build:storybook:dist
```

If you don't need to build Storybook sources but just serve the pages.
```
npm run storybook:ci
```

And to build sources for storybook (under `storybook/dist`), serve Storybook and watch for changes.
```
npm run storybook
```
Storybook will be available in `localhost:6006`.


## Build a new package version
Build `./src` to `./package`
```
npm run build:package
```

## Build pre-compiled files
Build `./src` to `./dist`
```
npm run build:dist
```

## OGCIO-DS package publishing

The following steps are required for making new package be available on Github Packages:
* Create PR for your code and update the `package/package.json` file with the newest version
* Once your PR is merged to the `main` branch you need to create a tag (ether from CLI or from the GUI), the tag name should be same as the version name
* The last step is create a new release based on the previously created tag, this last action will trigger the package pipeline and the latest version will be available as a package


--------------------

## Continuous integration

When changes are pushed to `main` branch on GitHub, [Github Actions][github-actions] will:

- deploy the [Storybook website on GH pages](https://ogcio.github.io/ogcio-ds/)
- deploy the [Storybook website](https://storybook.design-system.ogcio.gov.ie/)


[github-actions]: https://github.com/ogcio/ogcio-ds/tree/main/.github/workflows

## Contributing

Contributors to OGCIO repositories are expected to follow the [Contributor Guide](https://ogcio.github.io/ogcio-ds-website/help/how-to-contribute/).