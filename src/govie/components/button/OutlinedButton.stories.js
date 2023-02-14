import primary from './PrimaryButton.stories'
import OutlineButton from './OutlinedButton'

export default {
  ...primary,
  title: 'Form/Button/Outlined button'
}

const Template = (args) => {
  return (
    <OutlineButton icon={args.icon} disabled={args.disabled} size={args.size}>
      {args.label}
    </OutlineButton>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Outlined button'
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium outlined button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small outlined button',
  size: 'small'
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Outlined button with left icon',
  icon: 'left'
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Outlined button with right icon',
  icon: 'right'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled outlined button',
  disabled: true
}
