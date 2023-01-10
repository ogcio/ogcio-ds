import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as backLink } from '../../components/back-link/BackLink.stories'
import { Default as button } from '../../components/button/Button.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as summaryList } from '../../components/summary-list/SummaryList.stories'

export default {
  title: 'Patterns/Check answers',
  parameters: {
    docs: {
      description: {
        component:
          'Let users check their answers before submitting information to a service.',
      },
    },
  },
}

const createBackLink = () => parseHtmlString(backLink({}))

const createSummaryList = (data) => {
  const rows = data.map(({ key, value }) => ({
    key,
    value,
    actions: [{ label: 'Change', url: '#' }],
  }))

  return parseHtmlString(summaryList({ rows, useBorders: true }))
}

const createFormSubmition = () => {
  const form = document.createElement('form')
  form.setAttribute('action', '/form-handler')
  form.setAttribute('method', 'post')
  form.setAttribute('novalidate', 'true')

  const input = document.createElement('input')
  input.name = 'answers-checked'
  input.type = 'hidden'
  input.value = 'true'

  const confirmationButton = parseHtmlString(
    button({ label: 'Accept and send' })
  )

  form.appendChild(input)
  form.appendChild(confirmationButton)

  return form
}

const createColumn = () => {
  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds-from-desktop'

  const checkAnswersHeading = parseHtmlString(
    heading({
      text: 'Check your answers before sending your application',
    })
  )
  column.appendChild(checkAnswersHeading)

  const personalSubHeading = parseHtmlString(
    heading({ text: 'Personal details', size: 'm', element: 'h2' })
  )
  column.appendChild(personalSubHeading)

  const personalDetailsSummary = createSummaryList([
    {
      key: 'Name',
      value: 'Sarah Philips',
    },
    {
      key: 'Date of birth',
      value: '5 January 1978',
    },

    {
      key: 'Address',
      value: 'Address line 1<br>Address line 2<br>City<br>Eircode',
    },
    {
      key: 'Contact details',
      value: ['000 000000', 'sarah.phillips@example.com'],
    },
  ])
  column.appendChild(personalDetailsSummary)

  const applicationSubHeading = parseHtmlString(
    heading({ text: 'Application details', size: 'm', element: 'h2' })
  )
  column.appendChild(applicationSubHeading)

  const applicationDetailsSummary = createSummaryList([
    {
      key: 'Previous application number',
      value: '502135326',
    },
    {
      key: 'Licence type',
      value: 'For personal use',
    },

    {
      key: 'Home address',
      value: 'Address line 1<br>Address line 2<br>City<br>Eircode',
    },
    {
      key: 'Licence period',
      value: 'Valid for 6 months',
    },
  ])
  column.appendChild(applicationDetailsSummary)

  const sendApplicationSubHeading = parseHtmlString(
    heading({ text: 'Now send your application', size: 'm', element: 'h2' })
  )
  column.appendChild(sendApplicationSubHeading)

  const confirmationParagraph = parseHtmlString(
    paragraph({
      text: 'By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct.',
    })
  )
  column.appendChild(confirmationParagraph)
  column.appendChild(createFormSubmition())

  return column
}

const createMainWrapper = () => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'
  row.appendChild(createColumn())

  const mainWrapper = document.createElement('main')
  mainWrapper.className = 'govie-main-wrapper'
  mainWrapper.id = 'main-content'
  mainWrapper.role = 'main'
  mainWrapper.appendChild(row)

  const container = document.createElement('div')
  container.className = 'govie-width-container'
  container.appendChild(createBackLink())
  container.appendChild(mainWrapper)

  return container
}

const Template = (args) => {
  const body = createBody(createMainWrapper(), true)
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
