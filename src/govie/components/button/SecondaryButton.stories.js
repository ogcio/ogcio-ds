import SecondaryButton from './SecondaryButton'
import primary from './PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Secondary button'
}

const Template = (args) => {
  return (
    <SecondaryButton icon={args.icon} disabled={args.disabled} size={args.size}>
      {args.label}
    </SecondaryButton>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Secondary button'
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium secondary button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small secondary button',
  size: 'small'
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Secondary button with left icon',
  icon: 'left'
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Secondary button with right icon',
  icon: 'right'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled secondary button',
  disabled: true
}
