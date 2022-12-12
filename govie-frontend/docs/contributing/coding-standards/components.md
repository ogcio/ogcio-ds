# Components

You can find components in `src/govie/components`.

## Name your components

Generally, folder and file names should be singular, for example ‘accordion’, ‘backlink’, ‘button’. Only use plural names when the component is usually used in groups, for example ‘breadcrumbs’, ‘checkboxes’, ‘radios’.

## Structure your component folder

When creating your component, you should create the following files in the component’s folder:

- `README.md` - Summary documentation with links to the installation instructions and component documentation on <https://design-system.service.gov.uk/>
- `_[component-name].scss` - An SCSS file to generate the styles for this component only. It delegates the CSS generation to the _index.scss file.
- `_index.scss` - The actual styles for the component that you can import in 2 ways -  [on their own using `[component-name].scss`](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#import-specific-parts-of-the-css) or [alongside other components in `components/_all.scss`](https://frontend.design-system.service.gov.uk/importing-css-assets-and-javascript/#import-specific-parts-of-the-css)

If your component uses JavaScript, you must also create the following files in the component’s folder:

- `[component-name].mjs` - A JavaScript module with the implementation of any behaviour needed by the component. See the [JavaScript documentation]('./js.md#skeleton) for a skeleton and more details on that file's structure
- `[component-name].unit.test.mjs` - Unit tests to verify any component-specific lower-level logic.
- `[component-name].test.js` - Functional tests to verify the behaviour of the whole component

## Building your components

If you need help building a component, [contact the Design System team](https://design-system.service.gov.uk/get-in-touch/) and we'll support you.

Learn more about styling components in our [CSS style guide](./css.md). Our [JavaScript style guide](./js.md) has more information on coding components.
