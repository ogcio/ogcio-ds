import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Tag',
  parameters: {
    docs: {
      description: {
        component:
          'Use the tag component when it’s possible for something to have more than one status and it’s useful for the user to know about that status.'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'string', required: true }
    },
    type: {
      control: 'radio',
      options: [
        'default',
        'grey',
        'green',
        'turquoise',
        'blue',
        'purple',
        'pink',
        'red',
        'orange',
        'yellow'
      ]
    },
    extraClass: {
      control: 'text'
    }
  },
  args: {
    type: 'default'
  }
}

const Template = (args) => {
  const classNames = ['govie-tag']

  if (args.type && args.type.toLowerCase() !== 'default') {
    classNames.push(`govie-tag--${args.type}`)
  }

  if (args.extraClass) {
    classNames.push(args.extraClass)
  }

  const tag = document.createElement('strong')
  tag.className = classNames.join(' ')
  tag.innerHTML = args.text

  return beautifyHtmlNode(tag)
}

export const Default = Template.bind({})
Default.args = {
  text: 'Completed',
  type: 'default'
}

export const Grey = Template.bind({})
Grey.args = {
  text: 'Inactive',
  type: 'grey'
}

export const Green = Template.bind({})
Green.args = {
  text: 'New',
  type: 'green'
}

export const Turquoise = Template.bind({})
Turquoise.args = {
  text: 'Active',
  type: 'turquoise'
}

export const Blue = Template.bind({})
Blue.args = {
  text: 'Pending',
  type: 'blue'
}

export const Purple = Template.bind({})
Purple.args = {
  text: 'Received',
  type: 'purple'
}

export const Pink = Template.bind({})
Pink.args = {
  text: 'Sent',
  type: 'pink'
}

export const Red = Template.bind({})
Red.args = {
  text: 'Rejected',
  type: 'red'
}

export const Orange = Template.bind({})
Orange.args = {
  text: 'Declined',
  type: 'orange'
}

export const Yellow = Template.bind({})
Yellow.args = {
  text: 'Delayed',
  type: 'yellow'
}
