export default {
  title: 'Form/Button',
  parameters: {
    docs: {
      description: {
        component:
          'Use the button component to help users carry out an action like starting an application or saving their information.',
      },
    },
  },
  argTypes: {
    mode: {
      options: ['primary', 'secondary', 'warning', 'start'],
      control: { type: 'radio' },
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    mode: 'primary',
    disabled: false,
  },
}

const Template = (args) => {
  const start = args.mode === 'start'
  const btn = document.createElement(start ? 'a' : 'button')

  btn.innerText = args.label
  btn.setAttribute('data-module', 'govie-button')

  if (start) {
    btn.href = '#'
    btn.setAttribute('role', 'button')
    btn.setAttribute('draggable', 'false')
    btn.innerHTML = `
      ${args.label} 
      <svg
        class="govie-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    `
  }

  const classes = {
    primary: '',
    secondary: 'govie-button--secondary',
    warning: 'govie-button--warning',
    start: 'govie-button--start',
  }

  btn.className = ['govie-button', classes[args.mode]].join(' ')

  if (args.disabled) {
    btn.setAttribute('disabled', true)
    btn.setAttribute('aria-disabled', true)
  }

  return btn
}

export const DefaultButton = Template.bind({})
DefaultButton.args = {
  label: 'Save and Continue',
}

export const StartButton = Template.bind({})
StartButton.args = {
  mode: 'start',
  label: 'Start now',
}

export const Secondary = Template.bind({})
Secondary.args = {
  mode: 'secondary',
  label: 'Secondary button',
}

export const Warning = Template.bind({})
Warning.args = {
  mode: 'warning',
  label: 'Delete account',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled account',
  disabled: true,
}
