import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Application/Tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'Tooltips display informative text when users hover over an element.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  args: {
    label: 'Tooltip text',
    position: 'top',
  },
};

const Template = (args) => {
  const container = document.createElement('span');
  container.setAttribute('data-module', 'govie-tooltip');
  container.innerHTML = 'Hover me';

  const tooltip = document.createElement('span');
  tooltip.className = `govie-tooltip govie-tooltip--${args.position}`;
  tooltip.innerHTML = args.label;

  container.appendChild(tooltip);

  return beautifyHtmlNode(container);
};

export const Top = Template.bind({});
Top.args = {
  label: 'Top tooltip',
  position: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
  label: 'Bottom tooltip',
  position: 'bottom',
};

export const Left = Template.bind({});
Left.args = {
  label: 'Left tooltip',
  position: 'left',
};

export const Right = Template.bind({});
Right.args = {
  label: 'Right tooltip',
  position: 'right',
};
