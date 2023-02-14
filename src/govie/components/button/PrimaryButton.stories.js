import PrimaryButton from './PrimaryButton'

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
    disabled: { control: 'boolean' }
  },
  args: {
    disabled: false,
    size: 'standard',
    icon: 'standard'
  }
}

const Template = (args) => {
  return (
    <PrimaryButton icon={args.icon} disabled={args.disabled} size={args.size}>
      {args.label}
    </PrimaryButton>
  )
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
