import { addDecorator } from '@storybook/react'; // <- or your storybook framework
import { withThemes } from 'storybook-addon-themes/react';
import govie from '../themes/govie';
import garda from '../themes/garda';
import { ThemeProvider } from '../utils/ThemeProvider/ThemeProvider'; // <- or your storybook framework

const themes = { govie, garda }

addDecorator(withThemes);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'govie',
    Decorator: ({theme, children}) => <ThemeProvider theme={themes[theme.name]}>{children}</ThemeProvider>,
    list: [
      { name: 'govie', class: 'theme-govie', color: '#004D44' },
      { name: 'garda', class: 'theme-garda', color: '#bfdbff' }
    ],
  },
}