import { createGlobalStyle } from 'styled-components';

const LatoRegularWoff = require('../fonts/lato-regular.woff');
const LatoRegularWoff2 = require('../fonts/lato-regular.woff2');

const LatoBoldWoff = require('../fonts/lato-bold.woff');
const LatoBoldWoff2 = require('../fonts/lato-bold.woff2');

/**
 * A Styled Component to apply global style for use with govuk-react.
 *
 * - https://govuk-react.github.io/govuk-react/?path=/docs/global-style
 */
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    src: url(${LatoRegularWoff2}) format('woff2'), /* Super Modern Browsers */
         url(${LatoRegularWoff}) format('woff') /* Modern Browsers */
  }

  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    src: url(${LatoBoldWoff2}) format('woff2'), /* Super Modern Browsers */
         url(${LatoBoldWoff}) format('woff') /* Modern Browsers */
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Lato', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

GlobalStyle.displayName = 'GlobalStyle';

export default GlobalStyle;
