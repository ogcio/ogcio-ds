import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Form/Button/Secondary button',
  parameters: {
    docs: {
      description: {
        component:
          'Use the button component to help users carry out an action like starting an application or saving their information.',
      },
    },
  },
  argTypes: {
    size: {
      options: ['standard', 'small', 'medium'],
      control: { type: 'radio' },
    },
    icon: {
      options: ['standard', 'left', 'right'],
      control: { type: 'radio' },
    },
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
    size: 'standard',
    icon: 'standard',
  },
}

const Template = (args) => {
  const btn = document.createElement('button')

  btn.innerText = args.label
  btn.setAttribute('data-module', 'govie-button')

  if (args.icon === 'left') {
    btn.innerHTML = `
      <svg 
        class="govie-button__icon-left" 
        width="14" 
        height="15" 
        viewBox="0 0 14 15" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 8.5H8V14.5H6V8.5H0V6.5H6V0.5H8V6.5H14V8.5Z" fill="white"/>
      </svg>
      ${args.label} 
    `
  } else if (args.icon === 'right') {
    btn.innerHTML = `
      ${args.label} 
      <svg 
        class="govie-button__icon-right" 
        width="16" 
        height="17" 
        viewBox="0 0 16 17" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0.5L6.59 1.91L12.17 7.5H0V9.5H12.17L6.59 15.09L8 16.5L16 8.5L8 0.5Z" fill="white"/>
      </svg>
    `
  }

  if (args.disabled) {
    btn.setAttribute('disabled', true)
    btn.setAttribute('aria-disabled', true)
  }

  const classes = {
    standard: '',
    small: 'govie-button--small',
    medium: 'govie-button--medium',
  }

  const iconClasses = {
    standard: '',
    left: 'govie-button--icon',
    right: 'govie-button--icon',
  }

  btn.className = [
    'govie-button',
    classes[args.size],
    iconClasses[args.icon],
  ].join(' ')

  return beautifyHtmlNode(btn)
}

export const Default = Template.bind({})
Default.args = {
  label: 'Button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled button',
  disabled: true,
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium button',
  size: 'medium',
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small button',
  size: 'small',
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Button with left icon',
  icon: 'left',
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Button with right icon',
  icon: 'right',
}