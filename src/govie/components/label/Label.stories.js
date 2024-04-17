import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Typography/Label',
  parameters: {
    docs: {
      description: {
        component: 'A simple label for displaying text.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    for: {
      control: 'text',
      type: { name: 'string' },
    },
  },
};

const Template = (args) => {
  const label = document.createElement('label');
  label.className = 'govie-label--s';
  label.innerHTML = args.text;

  return beautifyHtmlNode(label);
};

export const Default = Template.bind({});
Default.args = {
  text: 'We have sent you a confirmation email.',
};
