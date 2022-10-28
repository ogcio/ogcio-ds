import { Button } from './Button';
export default {
  title: 'Button',
  component: Button
};
export const Default = args => /*#__PURE__*/React.createElement(Button, args, "test");
Default.args = {};
export const Primary = args => /*#__PURE__*/React.createElement(Button, args, "test");
Primary.args = {
  variant: 'primary'
};