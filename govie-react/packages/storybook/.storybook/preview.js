import React from "react";
import { GlobalStyle } from '@govie-react/global-style';

export const parameters = {
  chromatic: {
    viewports: [320, 1200],
  },
  options: {
    storySort: {
      order: ['Welcome', 'Example Application', 'Form', 'Typography', 'Page & Layout', 'Navigation', 'Utility', 'Docs'],
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      {Story()}
    </>
  ),
];