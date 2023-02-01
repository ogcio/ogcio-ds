import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

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
  container.innerText = 'Hover me'

  const tooltip = document.createElement('span')
  tooltip.className = 'govie-tooltip'
  tooltip.innerText = args.label

  container.appendChild(tooltip)

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}
