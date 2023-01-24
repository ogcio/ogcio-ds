/* eslint-disable no-unused-vars */
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect } from 'react'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

import hseTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/hse.css'
import agsTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/ags.css'
import defaultTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!../storybook/dist/govie-frontend.min.css'

let selectedTheme

export const decorators = [cssVariablesTheme]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  cssVariables: {
    files: {
      'HSE theme': hseTheme,
      'AGS theme': agsTheme,
      'OGCIO theme': defaultTheme,
    },
    defaultTheme: 'OGCIO theme',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: 'requiredFirst',
  },
  docs: {
    source: { format: false },
    container: ({ children, context }) => {
      let newContext
      cssVariablesTheme((c) => (newContext = c), context)

      return <DocsContainer context={newContext}>{children}</DocsContainer>
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
    },
  },
  options: {
    storySort: {
      order: [
        'Docs',
        'Form',
        'Typography',
        'Navigation',
        'Layout',
        'Pages',
        'Patterns',
      ],
    },
  },
}

document.addEventListener('storybookcssvariables:theme:change', (event) => {
  selectedTheme = event?.detail?.theme
  loadCorrectLogo()
})

window.addEventListener('DOMContentLoaded', (event) => {
  loadCorrectLogo()
})

const loadCorrectLogo = () => {
  const logo = document.getElementById('logo-image')

  if (logo) {
    if (selectedTheme === 'AGS theme') {
      logo.src = './themes/ags.png'
      logo.style = 'width: 166px;'
    } else if (selectedTheme === 'HSE theme') {
      logo.src = './themes/hse.png'
      logo.style = 'width: 52px;'
    } else {
      logo.src = './assets/images/logo-full.png'
      logo.style = 'width: 116px;'
    }
  }
}
