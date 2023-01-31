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
    position: {
      options: ['top', 'bottom', 'right', 'left'],
      control: { type: 'radio' },
    },
  },
  args: {
    position: 'bottom',
  },
}

const Template = (args) => {
  const container = document.createElement('div')
  container.className = 'govie-tooltip govie-body'

  const classes = {
    top: 'govie-tooltip--top',
    bottom: 'govie-tooltip--bottom',
    left: 'govie-tooltip--left',
    right: 'govie-tooltip--right',
  }

  const tooltip = document.createElement('span')
  tooltip.className = ['govie-tooltip-text', classes[args.position]].join(' ')
  tooltip.innerText = 'Tooltip text'

  container.innerText = 'Hover over me'
  container.appendChild(tooltip)

  return beautifyHtmlNode(container)
}

export const Bottom = Template.bind({})
Bottom.args = {
  position: 'bottom',
}

export const Top = Template.bind({})
Top.args = {
  position: 'top',
}

export const Left = Template.bind({})
Left.args = {
  position: 'left',
}

export const Right = Template.bind({})
Right.args = {
  position: 'right',
}
