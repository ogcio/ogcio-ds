# Gov IE Design System

Gov IE DS contains the code you need to start building a user interface for government platforms and services.

See live examples of Gov IE components, and guidance on when to use them in your service, in the [Gov IE Design System](https://ogcio.github.io/ogcio-ds/).

## Contact the team

If you want to know more about Gov IE Design System, you can go to the [Contact us](https://www.design-system.ogcio.gov.ie/contact/) page.

## Quick start

There are 2 ways to start using Gov IE Design System components in your app.

Once installed, you will be able to use the code from the examples in the Gov IE Design System in your service.

### 1. Install with npm (recommended)

We recommend [installing Gov IE Design System using node package manager
(npm)](https://ogcio.github.io/ogcio-ds/?path=/docs/docs-install-with-npm--docs).

### 2. Install using compiled files

You can also install Gov IE Design System by [copying our CSS, JavaScript and asset files into your project](https://ogcio.github.io/ogcio-ds/?path=/docs/docs-install-using-precompiled-files--docs).

## Accessibility

The Gov IE DS team works hard to ensure that Gov IE DS is accessible.

Using Frontend will help your service meet [level AA of WCAG 2.1](https://www.w3.org/TR/WCAG21/). But you must still check that your service meets accessibility requirements, especially if you extend or modify components.

You should also use:

- [the JavaScript from Gov IE DS](https://ogcio.github.io/ogcio-ds/?path=/docs/docs-import-css-assets-and-javascript--docs)

You can also read the [accessibility statement for Gov IE DS](https://www.design-system.ogcio.gov.ie/accessibility/)

## Getting updates

To be notified when there’s a new release, you can [watch the Gov IE DS Github repository](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository)

Find out how to [update with npm](https://ogcio.github.io/ogcio-ds/?path=/story/docs-update-with-npm--docs/).

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

## Husky Install Script

This repository contains a script to install and uninstall Husky hooks.

### Installation

To install Husky hooks, run the following command:

```bash
npm run husky:install
```

### Uninstall

To uninstall Husky hooks, run the following command:

```bash
npm run husky:uninstall
```

## Gov IE DS package publishing

- Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and [squash commits](https://github.com/googleapis/release-please?tab=readme-ov-file#linear-git-commit-history-use-squash-merge) to `main`
- Versioning and npm package publishing is handled by the [Release Please GitHub action](https://github.com/google-github-actions/release-please-action)

---

## Continuous integration

When changes are pushed to `main` branch on GitHub, [Github Actions][github-actions] will:

- Build and publish the package to npm
- Deploy the [Storybook website on GH pages](https://ogcio.github.io/ogcio-ds/)
- Deploy the [Storybook website to AWS](https://storybook.design-system.ogcio.gov.ie/)

[github-actions]: https://github.com/ogcio/ogcio-ds/tree/main/.github/workflows

## Contributing

Contributors to Gov IE repositories are expected to follow the [Contributor Guide](https://ogcio.github.io/ogcio-ds-website/help/how-to-contribute/).
