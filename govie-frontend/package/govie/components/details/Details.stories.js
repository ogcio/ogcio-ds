import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'

export default {
  title: 'Typography/Details',
  parameters: {
    docs: {
      component:
        'Make a page easier to scan by letting users reveal more detailed information only if they need it.',
    },
  },
  argTypes: {
    summary: {
      control: 'text',
      type: { name: 'text', required: true },
    },
    text: {
      control: 'text',
      type: { name: 'text', required: true },
    },
  },
  args: {
    summary: 'Help with nationality',
    text: 'We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.',
  },
}

const Template = (args) => {
  const summarySpan = document.createElement('span')
  summarySpan.className = 'govie-details__summary-text'
  summarySpan.innerText = args.summary

  const summary = document.createElement('summary')
  summary.className = 'govie-details__summary'
  summary.appendChild(summarySpan)

  const text = document.createElement('div')
  text.className = 'govie-details__text'
  text.innerText = args.text

  const details = document.createElement('details')
  details.className = 'govie-details'
  details.setAttribute('data-module', 'govie-details')
  details.appendChild(summary)
  details.appendChild(text)
  details.innerHTML = getNodeFormattedInnerHtml(details)

  return details
}

export const Default = Template.bind({})
Default.args = {}
