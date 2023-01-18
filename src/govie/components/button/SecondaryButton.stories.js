import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import primary, { Default as button } from '../../components/button/PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Secondary button',
}

const Template = (args) => {
  const btn = parseHtmlString(button(args))
  btn.className = `${btn.classList} govie-button--secondary`

  return beautifyHtmlNode(btn)
}

export const Default = Template.bind({})
Default.args = {
  label: 'Secondary button',
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium secondary button',
  size: 'medium',
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small secondary button',
  size: 'small',
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Secondary button with left icon',
  icon: 'left',
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Secondary button with right icon',
  icon: 'right',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled secondary button',
  disabled: true,
}
