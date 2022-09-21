import ButtonTheme from './button';
import { transformComponentVariables } from '@ogcio-ds/utils';

// TODO: transform these using a build script (possibly a style-dictionary transform)
const theme = {
  ...transformComponentVariables('button', ButtonTheme),
};

export default theme;
