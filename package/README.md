# GOV.IE Frontend

GOV.IE Frontend contains the code you need to start building a user interface
for government platforms and services.

See live examples of GOV.IE Frontend components, and guidance on when to use
them in your service, in the [GOV.UK Design System](https://ogcio.github.io/ogcio-ds/).

## Quick start

There are 2 ways to start using GOV.IE Frontend in your app.

Once installed, you will be able to use the code from the examples in the
[GOV.IE Design System](https://ogcio.github.io/ogcio-ds/) in your service.

### 1. Install with npm (recommended)

We recommend [installing GOV.IE Frontend using node package manager
(npm)](https://github.com/ogcio/ogcio-ds/pkgs/npm/ogcio-ds).

### 2. Install by using compiled files

You can also [download the compiled and minified assets (CSS, JavaScript) from
GitHub](https://github.com/ogcio/ogcio-ds/tree/main/dist).

## Importing styles

You need to import the GOV.IE Frontend styles into the main Sass file in your
project. You should place the below code before your own Sass rules (or Sass
imports) if you want to override GOV.IE Frontend with your own styles.

To import add the below to your Sass file:

  ```scss
  @import "node_modules/govie-frontend/govie/all";
  ```
<!-- 
[More details on importing styles](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#css) -->

## Importing JavaScript

Some of the JavaScript included in GOV.IE Frontend improves the usability and
accessibility of the components. You should make sure that you are importing and
initialising Javascript in your application to ensure that all users can use it successfully.

You can include Javascript for all components either by copying the `all.js` from `node_modules/govie-frontend/govie/` into your application or referencing the file directly:

```html
<script src="<path-to-govie-frontend-all-file>/all.js"></script>
```
Next you need to initialise the script by adding:

```html
<script>window.GOVIEFrontend.initAll()</script>
```
<!-- 
[More details on importing Javascript and advanced options](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#javascript) -->


## Importing assets

In order to import GOV.IE Frontend images and fonts to your project, you should configure your application to reference or copy the relevant GOV.IE Frontend assets.
<!-- 
[More details on importing assets](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#font-and-image-assets) -->


## Getting updates

To be notified when there’s a new release, you can:

- [watch the govie-frontend Github repository](https://help.github.com/en/articles/watching-and-unwatching-repositories)

<!-- Find out how to [update with npm](https://frontend.design-system.service.gov.uk/updating-with-npm/). -->

## Licence

Unless stated otherwise, the codebase is released under the MIT License. This
covers both the codebase and any sample code in the documentation. The
documentation is &copy; Crown copyright and available under the terms of the
Open Government 3.0 licence.
<!-- 
## Contribution guidelines

If you want to help us build GOV.IE Frontend, view our [contribution
guidelines](https://github.com/ogcio/ogcio-ds/blob/main/CONTRIBUTING.md). -->
