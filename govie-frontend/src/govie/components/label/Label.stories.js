import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

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
}

const Template = (args) => {
  const paragraph = document.createElement('p')
  paragraph.className = 'govie-label'
  paragraph.innerHTML = args.text

  return beautifyHtmlNode(paragraph)
}

export const Default = Template.bind({})
Default.args = {
  text: 'We have sent you a confirmation email.',
}
