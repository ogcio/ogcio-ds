import ButtonTheme from './button';
import { transformVariables } from '../../utils/transformVariables';

// TODO: transform these using a build script
const theme = {
  ...transformVariables('button', ButtonTheme),
};

export default theme;
