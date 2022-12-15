/* eslint-disable no-unused-vars */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'
import { DocsContainer } from '@storybook/addon-docs/blocks';
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'
import darkTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/dark.css'
import defaultTheme from '!!style-loader?injectType=lazyStyleTag!css-loader!./assets/themes/default.css'

export const decorators = [cssVariablesTheme]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  cssVariables: {
    files: {
      'Dark theme': darkTheme,
      'Default theme': defaultTheme
    },
    defaultTheme: 'Default theme'
  },
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
      cssVariablesTheme(c => newContext = c, context)

      return (
        <DocsContainer context={newContext}>
            {children}
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
    },
  },
  options: {
    storySort: {
      order: ['Docs', 'Form', 'Typography', 'Navigation', 'Page & Layout'],
    }
  }
}
