import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import primary, { Default as button } from './PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Tertiary button'
}

const Template = (args) => {
  const btn = parseHtmlString(button(args))
  btn.className = [...btn.classList, 'govie-button--tertiary'].join(' ')

  return beautifyHtmlNode(btn)
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
