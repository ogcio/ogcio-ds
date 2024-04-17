import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Form/Button group',
  parameters: {
    docs: {
      description: {
        component: 'Use the group button component to group related buttons.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['standard', 'small', 'medium'],
      control: { type: 'radio' },
    },
    buttonLabels: { control: 'array', required: true },
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
    size: 'standard',
  },
};

const Template = (args) => {
  const group = document.createElement('div');
  group.className = 'govie-conjoined-button-group';

  const classes = {
    standard: '',
    small: 'govie-button--small',
    medium: 'govie-button--medium',
  };

  if (args.buttonLabels && args.buttonLabels.length > 0) {
    args.buttonLabels.forEach((label) => {
      const btn = document.createElement('button');

      btn.innerText = label;
      btn.setAttribute('data-module', 'govie-button');

      if (args.disabled) {
        btn.setAttribute('disabled', true);
        btn.setAttribute('aria-disabled', true);
        btn.className = 'govie-button--disabled';
      }

      btn.className = [
        'govie-button',
        ...btn.classList,
        classes[args.size],
      ].join(' ');

      group.appendChild(btn);
    });
  }

  return beautifyHtmlNode(group);
};

export const Default = Template.bind({});
Default.args = {
  buttonLabels: ['Button', 'Button', 'Button'],
};

export const Disabled = Template.bind({});
Disabled.args = {
  buttonLabels: ['Disabled', 'Disabled', 'Disabled'],
  disabled: true,
};

export const Medium = Template.bind({});
Medium.args = {
  buttonLabels: ['Medium button', 'Medium button', 'Medium button'],
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  buttonLabels: ['Small button', 'Small button', 'Small button'],
  size: 'small',
};
