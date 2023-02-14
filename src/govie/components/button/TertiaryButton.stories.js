import TertiaryButton from './TertiaryButton'
import primary from './PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Tertiary button'
}

const Template = (args) => {
  return (
    <TertiaryButton icon={args.icon} disabled={args.disabled} size={args.size}>
      {args.label}
    </TertiaryButton>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Tertiary button'
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium tertiary button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small tertiary button',
  size: 'small'
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Tertiary button with left icon',
  icon: 'left'
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Tertiary button with right icon',
  icon: 'right'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled tertiary button',
  disabled: true
}
