/* eslint-disable no-unused-vars */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect } from 'react';
import { DocsContainer } from '@storybook/addon-docs';
// import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

// import hseTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/hse.css';
// import agsTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/ags.css';
// import defaultTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!../storybook/dist/@ogcio/ogcio-ds.min.css';
// let selectedTheme;

// export const decorators = [cssVariablesTheme]

function cleanHtmlString(htmlString) {
  // Remove the leading and trailing backticks and braces
  if (htmlString.startsWith('{`') && htmlString.endsWith('`}')) {
    htmlString = htmlString.slice(2, -2);
  }
  return htmlString;
}

export const decorators = [
  (Story, context) => {
    useEffect(() => {
      window.GOVIEFrontend.initAll();
    }, []);

    const storyResult = Story(context);

    if (typeof storyResult === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: storyResult }} />;
    }

    return storyResult;
  },
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: 'requiredFirst',
  },
  docs: {
    source: {
      transform: (code) => {
        // Work around solution to remove extra parenthesis like ` and {}
        return cleanHtmlString(code);
      },
    },
    container: ({ children, context }) => {
      return (
        <DocsContainer context={context}>
          <div className="sb-unstyled">{children}</div>
        </DocsContainer>
      );
    },
    components: {
      a: ({ children, ...args }) => (
        <a className="govie-link" {...args}>
          {children}
        </a>
      ),
      p: ({ children, ...args }) => (
        <p className="govie-body" {...args}>
          {children}
        </p>
      ),
      h1: ({ children, ...args }) => (
        <h1 className="govie-heading-xl" {...args}>
          {children}
        </h1>
      ),
      h2: ({ children, ...args }) => (
        <h2 className="govie-heading-l" {...args}>
          {children}
        </h2>
      ),
      h3: ({ children, ...args }) => (
        <h3 className="govie-heading-m" {...args}>
          {children}
        </h3>
      ),
      h4: ({ children, ...args }) => (
        <h4 className="govie-heading-s" {...args}>
          {children}
        </h4>
      ),
      ol: ({ children, ...args }) => (
        <ol className="govie-list govie-list--number" {...args}>
          {children}
        </ol>
      ),
      ul: ({ children, ...args }) => (
        <ul className="govie-list govie-list--bullet" {...args}>
          {children}
        </ul>
      ),
      li: ({ children, ...args }) => (
        <li className="govie-body" {...args}>
          {children}
        </li>
      ),
      td: ({ children, ...args }) => (
        <td className="govie-body" {...args}>
          {children}
        </td>
      ),
      th: ({ children, ...args }) => (
        <th className="govie-body" {...args}>
          {children}
        </th>
      ),
      // code: ({ children, ...args }) => (
      //   <code
      //     className="govie-!-font-size-19"
      //     style={{
      //       background: '#f9f9f8',
      //       border: '1px solid #bfc1c3',
      //     }}
      //     {...args}
      //   >
      //     {children}
      //   </code>
      // ),
    },
  },
  options: {
    controls: { expanded: true },
    storySort: {
      order: [
        'Docs',
        [
          'Get started',
          'Install with npm',
          'Update with npm',
          'Install using precompiled files',
          'Import CSS, assets and JavaScript',
          'Configure components with JavaScript',
          'Localise OGCIO-DS',
          'Support Internet Explorer 8',
          'JavaScript API Reference',
          'Sass API Reference',
          'Colours',
          'Typography',
        ],
        'Form',
        [
          'Button',
          ['Primary button', 'Secondary button', 'Tertiary button', '*'],
          '*',
        ],
        'Typography',
        'Navigation',
        'Layout',
        'Templates',
        'Patterns',
        'Application',
      ],
    },
  },
};

///
/// Change logo according to the selected theme
///

// document.addEventListener('storybookcssvariables:theme:change', (event) => {
//   // set theme selectedTheme variable to the current select theme
//   selectedTheme = event?.detail?.theme;
//   loadLogo();
// });

window.addEventListener('DOMContentLoaded', (event) => {
  // reload the logo when the DOM finish loading because
  // the pages have an iframe inside that took longer
  // to fully load
  loadLogo();
});

const loadLogo = () => {
  const logo = document.getElementById('logo-image');

  if (logo) {
    // to avoid errors when the iframe has not completed loading yet
    // if (selectedTheme === 'AGS theme') {
    //   logo.src = './themes/ags.png';
    //   logo.style = 'width: 166px;';
    // } else if (selectedTheme === 'HSE theme') {
    //   logo.src = './themes/hse.png';
    //   logo.style = 'width: 52px;';
    // } else {
    //   logo.src = './@ogcio/assets/images/logo-full.png';
    //   logo.style = 'width: 116px;';
    // }
  }
};
