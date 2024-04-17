import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Typography/Warning Text',
  parameters: {
    docs: {
      description: {
        component:
          'Use the warning text component when you need to warn users about something important.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'text', required: true },
    },
  },
  args: {
    text: 'You can be fined up to €5,000 if you do not register.',
  },
};

const Template = (args) => {
  const icon = document.createElement('span');
  icon.className = 'govie-warning-text__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.innerText = '!';

  const assistiveSpan = document.createElement('span');
  assistiveSpan.className = 'govie-warning-text__assistive';
  assistiveSpan.innerText = 'Warning';

  const text = document.createElement('strong');
  text.className = 'govie-warning-text__text';
  text.appendChild(assistiveSpan);
  text.append(args.text);

  const warningText = document.createElement('div');
  warningText.className = 'govie-warning-text';
  warningText.appendChild(icon);
  warningText.appendChild(text);

  return beautifyHtmlNode(warningText);
};

export const Default = Template.bind({});
Default.args = {};
