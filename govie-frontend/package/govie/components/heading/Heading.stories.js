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
    },
  },
  args: {
    size: 'l',
    captionSize: 'l',
  },
}

const Template = (args) => {
  const container = document.createElement('div')
  
  const component = document.createElement('h1')
  component.className = `govie-heading-${args.size}`
  component.innerText = args.text

  if (args.caption) {
    const caption = document.createElement('span')
    caption.className = `govie-caption-${args.captionSize}`
    caption.innerText = args.caption

    if (args.nestedCaption) {
      component.insertAdjacentHTML('afterbegin', caption.outerHTML)
      return component
    } else {
      container.innerHTML = `
      ${caption.outerHTML}`
    }
  } else {
    return component
  }

  container.innerHTML = `${container.innerHTML}
    ${component.outerHTML}
  `
  return container
}

export const Default = Template.bind({})
Default.args = {
  text: 'Heading',
}

export const Small = Template.bind({})
Small.args = {
  text: 'Small heading',
  size: 's',
  captionSize: 'm',
}

export const WithCaption = Template.bind({})
WithCaption.args = {
  text: 'Heading',
  caption: 'Caption',
}

export const WithNestedCaption = Template.bind({})
WithNestedCaption.args = {
  text: 'Heading',
  caption: 'Nested caption',
  nestedCaption: true
}
