import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const Default = (args) => <Button {...args}>test</Button>;
Default.args = {};

export const Primary = (args) => <Button {...args}>test</Button>;
Primary.args = {
  variant: 'primary',
};
