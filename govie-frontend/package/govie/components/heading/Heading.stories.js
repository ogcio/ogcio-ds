export default {
  title: 'Typography/Heading',
  parameters: {
    docs: {
      description: {
        component:
          'Use heading tags, such as h1, h2 and so on, to tag the headings on a page.',
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
      type: { required: true }
    },
    captionSize: {
      options: ['xl', 'l', 'm'],
      control: { type: 'radio' },
    },
    caption: {
      control: 'text',
    },
  },
  args: {
    size: 'l',
    captionSize: 'l',
  },
}

const Template = (args) => {
  const component = document.createElement('h1')
  component.className = `govie-heading-${args.size}`
  component.innerText = args.text
  
  const container = document.createElement('div')
  if (args.caption) {
    const caption = document.createElement('span')
    caption.className = `govie-caption-${args.captionSize}`
    caption.innerText = args.caption
    container.innerHTML = `
    ${caption.outerHTML}`
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
