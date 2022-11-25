import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'

export default {
  title: 'Page & Layout/Panel',
  parameters: {
    docs: {
      description: {
        component:
          'The panel component is a visible container used on confirmation or results pages to highlight important content.',
      },
    },
  },
  argTypes: {
    headingText: {
      control: 'text',
      type: { name: 'string', required: true },
      description:
        'It’s meant for a high-level explanation of what has happened.',
    },
    bodyHtml: {
      control: 'text',
      description:
        'Use this component instead of the heading text if you need to give detailed information, or more context.',
    },
  },
}

const Template = (args) => {
  const panel = document.createElement('div')
  panel.className = 'govie-panel govie-panel--confirmation'

  const header = document.createElement('h1')
  header.className = 'govie-panel__title'
  header.innerText = args.headingText

  panel.appendChild(header)

  if (args.bodyHtml) {
    const body = document.createElement('div')
    body.className = 'govie-panel__body'
    body.innerHTML = args.bodyHtml
    panel.appendChild(body)
  }

  panel.innerHTML = getNodeFormattedInnerHtml(panel)
  return panel
}

export const Default = Template.bind({})
Default.args = {
  headingText: 'Application complete',
}

export const WithHeaderAndBody = Template.bind({})
WithHeaderAndBody.args = {
  headingText: 'Application complete',
  bodyHtml: 'Your reference number<br><strong>HDJ2123F</strong>',
}
