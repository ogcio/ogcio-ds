import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Form/Button group',
  parameters: {
    docs: {
      description: {
        component:
          'Use the button component to help users carry out an action.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['standard', 'small', 'medium'],
      control: { type: 'radio' },
    },
    buttonLabels: { control: 'array', required: true },
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
    size: 'standard',
    icon: 'standard',
  },
}

const Template = (args) => {
  const group = document.createElement('div')
  group.className = 'govie-conjoined-button-group'

  const classes = {
    standard: '',
    small: 'govie-button--small',
    medium: 'govie-button--medium',
  }

  if (args.buttonLabels && args.buttonLabels.length > 0) {
    args.buttonLabels.forEach((label) => {
      const btn = document.createElement('button')

      btn.innerText = label
      btn.setAttribute('data-module', 'govie-button')

      if (args.disabled) {
        btn.setAttribute('disabled', true)
        btn.setAttribute('aria-disabled', true)
        btn.className = 'govie-button--disabled'
      }

      btn.className = [
        'govie-button',
        classes[args.size],
      ].join(' ')

      group.appendChild(btn)
    })
  }

  return beautifyHtmlNode(group)
}

export const Default = Template.bind({})
Default.args = {
  buttonLabels: ['Button', 'Button', 'Button'],
}
