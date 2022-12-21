import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Paragraph',
  parameters: {
    docs: {
      description: {
        component: 'A simple paragraph for displaying text.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
}

const Template = (args) => {
  const paragraph = document.createElement('p')
  paragraph.className = 'govie-body'
  paragraph.innerHTML = args.text

  return beautifyHtmlNode(paragraph)
}

export const Default = Template.bind({})
Default.args = {
  text: 'We have sent you a confirmation email.',
}
