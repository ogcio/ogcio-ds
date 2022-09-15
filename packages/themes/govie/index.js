import ButtonTheme from './button.js';
import { transformVariables } from '../../utils/transformVariables.js';

// TODO: transform these using a build script
const theme = {
  ...transformVariables('button', ButtonTheme),
};

export default theme;
