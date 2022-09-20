import { addDecorator } from '@storybook/react';

import { withThemes } from 'storybook-addon-themes/react';
import * as themes from '@ogcio-ds/themes';
import { ThemeProvider } from '@ogcio-ds/components';

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