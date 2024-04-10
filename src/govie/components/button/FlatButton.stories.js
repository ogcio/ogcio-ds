import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import primary, { Default as button } from './PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Flat button'
}

const Template = (args) => {
  const btn = parseHtmlString(button(args))
  btn.className = `${btn.classList} govie-button--flat`

  return beautifyHtmlNode(btn)
}

export const Default = Template.bind({})
Default.args = {
  label: 'Flat button'
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium flat button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small flat button',
  size: 'small'
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Flat button with left icon',
  icon: 'left'
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Flat button with right icon',
  icon: 'right'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled flat button',
  disabled: true
}
