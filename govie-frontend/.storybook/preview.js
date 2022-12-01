
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    },
    sort: 'requiredFirst'
  },
  docs: { source: { format: false } },
  options: {
    storySort: {
      order: ['Docs', 'Form', 'Typography', 'Navigation', 'Page & Layout'],
    }
  }
}
