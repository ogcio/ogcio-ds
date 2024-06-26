import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Typography/Heading',
  parameters: {
    docs: {
      description: {
        component:
          'Write all headings in sentence case. Using Headings as a component is useful when you want to design a page using auto-layout.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    size: {
      options: ['xl', 'l', 'm', 's'],
      control: { type: 'radio' },
      type: { required: true },
    },
    element: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'radio' },
      type: { required: true },
    },
    caption: {
      control: 'text',
      description:
        'Sometimes you may need to make it clear that a page is part of a larger section or group. To do this, you can use a heading with a caption above it.',
    },
    captionSize: {
      options: ['xl', 'l', 'm'],
      control: { type: 'radio' },
    },
    nestedCaption: {
      control: 'boolean',
      description:
        'If the caption should be considered part of the page heading, you can also nest the caption within the <h1>',
    },
  },
  args: {
    size: 'l',
    captionSize: 'l',
    nestedCaption: false,
    element: 'h1',
  },
};

const Template = (args) => {
  const container = document.createElement('div');

  const component = document.createElement(args.element ?? 'h1');
  component.className = `govie-heading-${args.size ?? 'l'}`;
  component.innerText = args.text;

  if (args.caption) {
    const caption = document.createElement('span');
    caption.className = `govie-caption-${args.captionSize}`;
    caption.innerText = args.caption;

    if (args.nestedCaption) {
      component.insertAdjacentHTML('afterbegin', caption.outerHTML);
      return beautifyHtmlNode(component);
    } else {
      container.appendChild(caption);
    }
  } else {
    return beautifyHtmlNode(component);
  }

  container.appendChild(component);

  return beautifyHtmlNode(container);
};

export const Default = Template.bind({});
Default.args = {
  text: 'Heading',
};

export const Small = Template.bind({});
Small.args = {
  text: 'Small heading',
  size: 's',
  captionSize: 'm',
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  text: 'Heading',
  caption: 'Caption',
};

export const WithNestedCaption = Template.bind({});
WithNestedCaption.args = {
  text: 'Heading',
  caption: 'Nested caption',
  nestedCaption: true,
};
