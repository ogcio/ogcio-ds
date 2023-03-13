import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as panel } from '../../components/panel/Panel.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'

export default {
  title: 'Templates/Confirmation',
  parameters: {
    docs: {
      description: {
        component:
          "Use this pattern to let users know they've completed a transaction.",
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

  const confirmationParagraph = parseHtmlString(
    paragraph({
      text: 'We have sent you a confirmation email.',
    })
  )
  column.appendChild(confirmationParagraph)

  const whatHappensNextHeading = parseHtmlString(
    heading({
      text: 'What happens next',
      size: 'm',
      captionSize: 'm',
    })
  )
  column.appendChild(whatHappensNextHeading)

  const whatHappensNextFirstParagraph = parseHtmlString(
    paragraph({
      text: "We've sent your application to Hackney Electoral Register Office.",
    })
  )
  column.appendChild(whatHappensNextFirstParagraph)

  const whatHappensNextSecondParagraph = parseHtmlString(
    paragraph({
      text: 'They will contact you either to confirm your registration, or to ask for more information.',
    })
  )
  column.appendChild(whatHappensNextSecondParagraph)

  const whatHappensNextThirdParagraph = parseHtmlString(
    paragraph({
      text: '<a href="#" class="govie-link">What did you think of this service?</a> (takes 30 seconds)',
    })
  )
  column.appendChild(whatHappensNextThirdParagraph)

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
  const body = createBody({ mainContent: createMainWrapper() })
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
