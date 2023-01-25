import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Error Sumamry',
  parameters: {
    docs: {
      description: {
        component:
          'Use this component at the top of a page to summarise any errors a user has made.',
      },
    },
  },
  argTypes: {
    summaryHeader: {
      control: 'text',
      type: { name: 'text', required: true },
    },
    errors: {
      control: 'array',
      type: { name: 'array', required: true },
    },
  },
  args: {
    summaryHeader: 'There is a problem',
    errors: [
      {
        message: 'The date your passport was issued must be in the past',
        url: '#passport-issued-day',
      },
      {
        message: 'Enter a postcode, like AA1 1AA',
        url: '#postcode-input',
      },
    ],
  },
}

const createErrorListItem = (error) => {
  const listItemLink = document.createElement('a')
  listItemLink.href = error.url
  listItemLink.innerText = error.message

  const listItem = document.createElement('li')
  listItem.appendChild(listItemLink)

  return listItem
}

const createErrorList = (args) => {
  const errorList = document.createElement('ul')
  errorList.className = 'govie-list govie-error-summary__list'

  if (Array.isArray(args.errors) && args.errors.length > 0) {
    args.errors.forEach((error) => {
      errorList.appendChild(createErrorListItem(error))
    })
  }

  return errorList
}

const Template = (args) => {
  const alertBody = document.createElement('div')
  alertBody.className = 'govie-error-summary__body'
  alertBody.appendChild(createErrorList(args))

  const alertHeader = document.createElement('h2')
  alertHeader.className = 'govie-error-summary__title'
  alertHeader.innerText = args.summaryHeader

  const alert = document.createElement('div')
  alert.setAttribute('role', 'alert')
  alert.appendChild(alertHeader)
  alert.appendChild(alertBody)

  const errorSummary = document.createElement('div')
  errorSummary.className = 'govie-error-summary'
  errorSummary.setAttribute('data-module', 'govie-error-summary')
  errorSummary.appendChild(alert)

  return beautifyHtmlNode(errorSummary)
}

export const Default = Template.bind({})
Default.args = {}
