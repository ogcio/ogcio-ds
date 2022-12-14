import React from 'react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: 'requiredFirst'
  },
  docs: {
    source: { format: false },
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
      )
    }
  },
  options: {
    storySort: {
      order: ['Docs', 'Form', 'Typography', 'Navigation', 'Page & Layout']
    }
  },
  designToken: {
    defaultTab: 'Colors',
    showSearch: false
  }
}
