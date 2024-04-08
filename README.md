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

## OGCIO-DS package publishing

- Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and [squash commits](https://github.com/googleapis/release-please?tab=readme-ov-file#linear-git-commit-history-use-squash-merge) to `main`
- Versioning and npm package publishing is handled by the [Release Please](https://github.com/google-github-actions/release-please-action) GitHub action

---

## Continuous integration

When changes are pushed to `main` branch on GitHub, [Github Actions][github-actions] will:

- Build and publish the package to npm
- Deploy the [Storybook website on GH pages](https://ogcio.github.io/ogcio-ds/)
- Deploy the [Storybook website](https://storybook.design-system.ogcio.gov.ie/)

[github-actions]: https://github.com/ogcio/ogcio-ds/tree/main/.github/workflows

## Contributing

Contributors to OGCIO repositories are expected to follow the [Contributor Guide](https://ogcio.github.io/ogcio-ds-website/help/how-to-contribute/).
