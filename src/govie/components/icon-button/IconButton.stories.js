import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import { Default as tooltipDefault } from '../tooltip/Tooltip.stories'

export default {
  title: 'Form/Icon Button',
  parameters: {
    docs: {
      description: {
        component: 'Icon buttons are commonly found in app bars and toolbars.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
}

const Template = (args) => {
  const btn = document.createElement('button')
  const classes = ['govie-icon-button']

  btn.innerText = args.label
  btn.setAttribute('data-module', 'govie-icon-button')

  btn.innerHTML = `
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 8.5H8V14.5H6V8.5H0V6.5H6V0.5H8V6.5H14V8.5Z" />
    </svg>
    `

  if (args.disabled) {
    btn.setAttribute('disabled', true)
    btn.setAttribute('aria-disabled', true)
    classes.push('govie-button--disabled')
  }

  btn.className = classes.join(' ')

  const container = document.createElement('span')
  container.setAttribute('data-module', 'govie-tooltip')
  container.appendChild(btn)

  const tooltip = document.createElement('span')
  tooltip.className = 'govie-tooltip'
  tooltip.innerHTML = 'Add'

  container.appendChild(tooltip)

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
