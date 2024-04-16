/* eslint-disable no-unused-vars */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'
import { DocsContainer } from '@storybook/addon-docs'
import { withThemeByClassName } from '@storybook/addon-themes'
// import hseTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/hse.css'
// import agsTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/ags.css'
// import defaultTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!../storybook/dist/@ogcio/ogcio-ds.min.css'

let selectedTheme

// export const decorators = [cssVariablesTheme]

export const decorators = [
  withThemeByClassName({
    themes: {
      ags: 'ags-theme',
      hse: 'hse-theme'
    },
    defaultTheme: 'ags',
    parentSelector: 'body'
  })
]

export const parameters = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      },
      sort: 'requiredFirst'
    },
    docs: {
      source: { format: false },
      container: ({ children, context }) => {
        let newContext
        // cssVariablesTheme((c) => (newContext = c), context)

        return (
          <DocsContainer context={newContext}>
            {context.name !== 'Page' && (
              <div
                className='govie-body'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  padding: '8px',
                  margin: 0,
                  background: '#fff4b0',
                  width: 'calc(100% - 18px)',
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  zIndex: 20
                }}
              >
                JavaScript does not work in the 'Docs' tab and this can cause
                some components to not behave as expected.
              </div>
            )}
            {children}
          </DocsContainer>
        )
      },
      components: {
        a: ({ children, ...args }) => (
          <a className='govie-link' {...args}>
            {children}
          </a>
        ),
        p: ({ children, ...args }) => (
          <p className='govie-body' {...args}>
            {children}
          </p>
        ),
        h1: ({ children, ...args }) => (
          <h1 className='govie-heading-xl' {...args}>
            {children}
          </h1>
        ),
        h2: ({ children, ...args }) => (
          <h2 className='govie-heading-l' {...args}>
            {children}
          </h2>
        ),
        h3: ({ children, ...args }) => (
          <h3 className='govie-heading-m' {...args}>
            {children}
          </h3>
        ),
        h4: ({ children, ...args }) => (
          <h4 className='govie-heading-s' {...args}>
            {children}
          </h4>
        ),
        ol: ({ children, ...args }) => (
          <ol className='govie-list govie-list--number' {...args}>
            {children}
          </ol>
        ),
        ul: ({ children, ...args }) => (
          <ul className='govie-list govie-list--bullet' {...args}>
            {children}
          </ul>
        ),
        li: ({ children, ...args }) => (
          <li className='govie-body' {...args}>
            {children}
          </li>
        ),
        td: ({ children, ...args }) => (
          <td className='govie-body' {...args}>
            {children}
          </td>
        ),
        th: ({ children, ...args }) => (
          <th className='govie-body' {...args}>
            {children}
          </th>
        ),
        code: ({ children, ...args }) => (
          <code
            className='govie-!-font-size-19'
            style={{
              background: '#f9f9f8',
              border: '1px solid #bfc1c3'
            }}
            {...args}
          >
            {children}
          </code>
        )
      }
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
            'Typography'
          ],
          'Form',
          [
            'Button',
            ['Primary button', 'Secondary button', 'Tertiary button', '*'],
            '*'
          ],
          'Typography',
          'Navigation',
          'Layout',
          'Templates',
          'Patterns',
          'Application'
        ]
      }
    }
  }
}

///
/// Change logo according to the selected theme
///

document.addEventListener('storybookcssvariables:theme:change', (event) => {
  // set theme selectedTheme variable to the current select theme
  selectedTheme = event?.detail?.theme
  loadLogo()
})

window.addEventListener('DOMContentLoaded', (event) => {
  // reload the logo when the DOM finish loading because
  // the pages have an iframe inside that took longer
  // to fully load
  loadLogo()
})

const loadLogo = () => {
  const logo = document.getElementById('logo-image')

  if (logo) {
    // to avoid errors when the iframe has not completed loading yet
    if (selectedTheme === 'AGS theme') {
      logo.src = './themes/ags.png'
      logo.style = 'width: 166px;'
    } else if (selectedTheme === 'HSE theme') {
      logo.src = './themes/hse.png'
      logo.style = 'width: 52px;'
    } else {
      logo.src = './@ogcio/assets/images/logo-full.png'
      logo.style = 'width: 116px;'
    }
  }
}
