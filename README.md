# OGCIO Design System

OGCIO-DS contains the code you need to start building a user interface for government platforms and services.

See live examples of OGCIO components, and guidance on when to use them in your service, in the [OGCIO Design System](https://storybook.design-system.ogcio.gov.ie/).

## Contact the team

If you want to know more about OGCIO-DS, you can go to the [Contact us](https://www.design-system.ogcio.gov.ie/contact/) page.

## Quick start

There are 2 ways to start using OGCIO-DS components in your app.

Once installed, you will be able to use the code from the examples in the OGCIO-DS in your service.

### 1. Install with npm (recommended)

We recommend [installing OGCIO-DS using node package manager
(npm)](https://storybook.design-system.ogcio.gov.ie/?path=/docs/docs-install-with-npm--page).

### 2. Install using compiled files

You can also install OGCIO-DS by [copying our CSS, JavaScript and asset files into your project](https://storybook.design-system.ogcio.gov.ie/?path=/docs/docs-install-using-precompiled-files--page).

## Accessibility

The OGCIO-DS team works hard to ensure that OGCIO-DS is accessible.

Using Frontend will help your service meet [level AA of WCAG 2.1](https://www.w3.org/TR/WCAG21/). But you must still check that your service meets accessibility requirements, especially if you extend or modify components.

You should also use:

- [the JavaScript from OGCIO-DS](https://storybook.design-system.ogcio.gov.ie/?path=/story/docs-import-css-assets-and-javascript--page/#import-javascript)
- [a separate stylesheet](https://storybook.design-system.ogcio.gov.ie/?path=/story/docs-support-internet-explorer-8--page) if you support Internet Explorer 8

You can also read the [accessibility statement for OGCIO-DS](https://www.design-system.ogcio.gov.ie/accessibility/)

## Getting updates

To be notified when there’s a new release, you can [watch the ogcio-ds Github repository](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository)

Find out how to [update with npm](https://storybook.design-system.ogcio.gov.ie/?path=/story/docs-update-with-npm--page/).

## Licence

Unless stated otherwise, the codebase is released under the MIT License. This
covers both the codebase and any sample code in the documentation.

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
- Versioning and npm package publishing is handled by the [Release Please GitHub action](https://github.com/google-github-actions/release-please-action)

---

## Continuous integration

When changes are pushed to `main` branch on GitHub, [Github Actions][github-actions] will:

- Build and publish the package to npm
- Deploy the [Storybook website on GH pages](https://ogcio.github.io/ogcio-ds/)
- Deploy the [Storybook website](https://storybook.design-system.ogcio.gov.ie/)

[github-actions]: https://github.com/ogcio/ogcio-ds/tree/main/.github/workflows

## Contributing

Contributors to OGCIO repositories are expected to follow the [Contributor Guide](https://ogcio.github.io/ogcio-ds-website/help/how-to-contribute/).
