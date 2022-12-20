import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import createParagraph from '../../../../.storybook/helpers/createParagraph'
import {
  createPageHeader,
  createPageFooter,
} from '../../../../.storybook/helpers/commonPageComponents'

import { Default as panel } from '../../components/panel/Panel.stories'
import { Default as heading } from '../../components/typography/Heading.stories'

export default {
  title: 'Pages/Confirmation',
  parameters: {
    docs: {
      description: {
        component:
          'Use this pattern to let users know they’ve completed a transaction.',
      },
    },
  },
}

const createColumn = () => {
  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const applicationCompletePanel = parseHtmlString(
    panel({
      headingText: 'Application complete',
      bodyHtml: 'Your reference number<br><strong>HDJ2123F</strong>',
    })
  )
  column.appendChild(applicationCompletePanel)

  const confirmationText = 'We have sent you a confirmation email.'
  column.appendChild(createParagraph(confirmationText))

  const whatHappensNextHeading = parseHtmlString(
    heading({
      text: 'What happens next',
      size: 'm',
      captionSize: 'm',
    })
  )
  column.appendChild(whatHappensNextHeading)

  const whatHappensNextFirstText = `We've sent your application to Hackney Electoral Register Office.`
  column.appendChild(createParagraph(whatHappensNextFirstText))

  const whatHappensNextSecondText =
    'They will contact you either to confirm your registration, or to ask for more information.'
  column.appendChild(createParagraph(whatHappensNextSecondText))

  const whatHappensNextThirdText =
    '<a href="#" class="govie-link">What did you think of this service?</a> (takes 30 seconds)'
  column.appendChild(createParagraph(whatHappensNextThirdText))

  return column
}

const createMainWrapper = () => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'
  row.appendChild(createColumn())

  const mainWrapper = document.createElement('div')
  mainWrapper.className = 'govie-main-wrapper govie-width-container'
  mainWrapper.appendChild(row)

  return mainWrapper
}

const Template = (args) => {
  const body = document.createElement('body')
  body.appendChild(createPageHeader())
  body.appendChild(createMainWrapper())
  body.appendChild(createPageFooter())

  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
