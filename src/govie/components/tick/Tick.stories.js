import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Application/Tick',
  parameters: {
    docs: {
      component: 'tick tick tick',
    },
  },
  argTypes: {
    filled: { control: 'boolean' },
    value: {
      control: 'text',
      type: { name: 'text', required: true },
    },
  },
  args: {
    filled: false,
  },
}

const Template = (args) => {
  const input = document.createElement('input')

  const classNames = ['govie-tick']

  if (args.filled) {
    classNames.push('govie-tick--filled')
  }

  input.className = classNames.join(' ')
  input.type = 'checkbox'
  input.value = args.value

  const label = document.createElement('label')
  label.setAttribute('data-module', 'govie-tick')
  label.appendChild(input)

  return beautifyHtmlNode(label)
}

export const Default = Template.bind({})
Default.args = {
  value: 'checkbox'
}

export const Filled = Template.bind({})
Filled.args = {
  value: 'checkbox',
  filled: true,
}
