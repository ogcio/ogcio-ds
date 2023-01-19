import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import primary, { Default as button } from './PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Outlined button',
}

const Template = (args) => {
  const btn = parseHtmlString(button(args))
  btn.className = [...btn.classList, 'govie-button--outlined'].join(' ')

  return beautifyHtmlNode(btn)
}

export const Default = Template.bind({})
Default.args = {
  label: 'Outlined button',
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium outlined button',
  size: 'medium',
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small outlined button',
  size: 'small',
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Outlined button with left icon',
  icon: 'left',
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Outlined button with right icon',
  icon: 'right',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled outlined button',
  disabled: true,
}
