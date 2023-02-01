import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

export default {
  title: 'Application/Tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'Tooltips display informative text when users hover over an element.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
  },
  args: {
    label: 'Tooltip text',
  },
}

const Template = (args) => {
  const container = document.createElement('span')
  container.setAttribute('data-module', 'govie-tooltip')
  container.innerHTML = 'Hover me'

  const tooltip = document.createElement('span')
  tooltip.className = 'govie-tooltip'
  tooltip.innerHTML = args.label

  container.appendChild(tooltip)

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}
