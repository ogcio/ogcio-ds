import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import { arrowRightIcon, plusIcon } from '../../storybook/svgImages'

export default {
  title: 'Form/Button/Primary button',
  parameters: {
    docs: {
      description: {
        component:
          'Use the button component to help users carry out an action like starting an application or saving their information.'
      }
    }
  },
  argTypes: {
    size: {
      options: ['standard', 'small', 'medium'],
      control: { type: 'radio' }
    },
    icon: {
      options: ['standard', 'left', 'right'],
      control: { type: 'radio' }
    },
    label: {
      control: 'text',
      type: { name: 'string', required: true }
    },
    disabled: { control: 'boolean' },
    id: { control: 'string' }
  },
  args: {
    disabled: false,
    size: 'standard',
    icon: 'standard'
  }
}

const Template = (args) => {
  const btn = document.createElement('button')

  btn.innerText = args.label
  btn.id = args.id || 'button'
  btn.setAttribute('data-module', 'govie-button')

  if (args.icon === 'left') {
    btn.innerHTML = `
      ${plusIcon}
      ${args.label} 
    `
  } else if (args.icon === 'right') {
    btn.innerHTML = `
      ${args.label} 
      ${arrowRightIcon}
    `
  }

  if (args.disabled) {
    btn.setAttribute('disabled', true)
    btn.setAttribute('aria-disabled', true)
    btn.className = 'govie-button--disabled'
  }

  const classes = {
    standard: '',
    small: 'govie-button--small',
    medium: 'govie-button--medium'
  }

  const iconClasses = {
    standard: '',
    left: 'govie-button--icon',
    right: 'govie-button--icon'
  }

  btn.className = [
    'govie-button',
    ...btn.classList,
    classes[args.size],
    iconClasses[args.icon]
  ].join(' ')

  return beautifyHtmlNode(btn)
}

export const Default = Template.bind({})
Default.args = {
  label: 'Primary button'
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium primary button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small primary button',
  size: 'small'
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Primary button with left icon',
  icon: 'left'
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Primary button with right icon',
  icon: 'right'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled primary button',
  disabled: true
}
