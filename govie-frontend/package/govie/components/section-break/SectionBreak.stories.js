import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'

export default {
  title: 'Typography/Section Break',
  parameters: {
    docs: {
      component:
        'You can use the Section Break to create a thematic break between sections of content.',
    },
  },
  argTypes: {
    size: {
      options: ['default', 'xl', 'l', 'm', 's'],
      control: { type: 'radio' },
      description: 'Modifiers for different size margins.',
      type: { required: true }
    },
  },
  args: {
    size: 'default'
  },
}

const Template = (args) => {
  const text = document.createElement('hr')
  const classes = ['govie-section-break', 'govie-section-break--visible']

  if (args.size !== 'default') {
    classes.push(`govie-section-break--${args.size}`)
  }

  text.className = classes.join(' ')
  text.innerHTML = getNodeFormattedInnerHtml(text)

  return text
}

export const Default = Template.bind({})
Default.args = {}

export const WithDifferentSize = Template.bind({})
WithDifferentSize.args = {
  size: 'l',
}
