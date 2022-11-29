export default {
  title: 'Navigation/Back link',
  parameters: {
    docs: {
      description: {
        component:
          'Use the back link component to help users go back to the previous page in a multi-page transaction.',
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
  args: {
    url: '#',
  },
}

const Template = (args) => {
  const backLink = document.createElement('a')
  backLink.href = args.url
  backLink.className = 'govie-back-link'
  backLink.innerText = 'Back'

  return backLink
}

export const Default = Template.bind({})
Default.args = {}
