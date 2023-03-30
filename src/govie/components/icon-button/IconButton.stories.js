import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import { xIcon } from '../../storybook/svgImages'

export default {
  title: 'Form/Icon Button',
  parameters: {
    docs: {
      description: {
        component: 'Icon buttons are commonly found in app bars and toolbars.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    tooltipLabel: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    icon: {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
  args: {
    disabled: false,
    tooltipLabel: 'Close',
    position: 'top',
  },
}

const Template = (args) => {
  const btn = document.createElement('button')
  const classes = ['govie-icon-button']

  btn.setAttribute('data-module', 'govie-icon-button')

  const hiddenLabel = document.createElement('span')
  hiddenLabel.className = 'govie-visually-hidden'
  hiddenLabel.innerText = args.tooltipLabel

  btn.innerHTML = 
    args.icon !== undefined
      ? args.icon
      : xIcon
  
  btn.appendChild(hiddenLabel)

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
  tooltip.className = `govie-tooltip govie-tooltip--${args.position}`
  tooltip.innerHTML = args.tooltipLabel

  container.appendChild(tooltip)

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}

export const WithDifferentTooltip = Template.bind({})
WithDifferentTooltip.args = {
  tooltipLabel: 'Other tooltip label',
}

export const WithDifferentTooltipPosition = Template.bind({})
WithDifferentTooltipPosition.args = {
  position: 'bottom',
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}
