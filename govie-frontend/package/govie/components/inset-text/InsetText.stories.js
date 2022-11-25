import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'

export default {
  title: 'Typography/Inset Text',
  parameters: {
    docs: {
      component:
        'Use the inset text component to differentiate a block of text from the content that surrounds it, for example: quotes, examples or additional information about the page.',
    },
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'text', required: true },
    },
  },
  args: {
    text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
  },
}

const Template = (args) => {
  const text = document.createElement('div')
  text.className = 'govie-inset-text'
  text.append(args.text)

  text.innerHTML = getNodeFormattedInnerHtml(text)

  return text
}

export const Default = Template.bind({})
Default.args = {}
