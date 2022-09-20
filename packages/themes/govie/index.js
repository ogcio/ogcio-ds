import ButtonTheme from './button';
import {
  transformComponentVariables,
  transformGlobalVariables,
} from '@ogcio-ds/utils';
import tokens from '@ogcio-ds/tokens/govie';

// TODO: transform these using a build script
const theme = {
  ...transformGlobalVariables(tokens),
  ...transformComponentVariables('button', ButtonTheme),
};

export default theme;
