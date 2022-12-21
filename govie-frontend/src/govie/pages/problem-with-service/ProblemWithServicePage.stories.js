import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import {
  createPageHeader,
  createPageFooter,
} from '../../../../.storybook/helpers/commonPageComponents'

import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as heading } from '../../components/typography/Heading.stories'

export default {
  title: 'Pages/Problem With Service',
  parameters: {
    docs: {
      description: {
        component:
          'This pattern is currently experimental because more research is needed to validate it.\n\n' +
          'This guidance is for government teams that build online services. <a href="https://www.gov.ie/">To find information and services for the public, go to gov.ie</a>.\n\n' +
          'Tell the user there is something wrong with the service. These are also known as 500 and internal server error pages.',
      },
    },
  },
}

const createMainWrapper = () => {
  const mainWrapper = document.createElement('div')
  mainWrapper.className = 'govie-main-wrapper govie-width-container'

  const row = document.createElement('div')
  row.className = 'govie-grid-row'

  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const pageNotFoundHeading = parseHtmlString(
    heading({
      text: 'Sorry, there is a problem with the service',
      size: 'l',
      captionSize: 'l',
    })
  )
  column.appendChild(pageNotFoundHeading)

  const firstIntroText = 'Try again later.'
  column.appendChild(paragraph(firstIntroText))

  const secondIntroText =
    'We saved your answers. They will be available for 30 days.'
  column.appendChild(paragraph(secondIntroText))

  const link =
    '<a href="#" class="govie-link">Contact the [service] Helpline</a>'
  const thirdIntroText = `${link} if you need to make changes to your claim or speak to someone about your [service].`
  column.appendChild(paragraph(thirdIntroText))

  row.appendChild(column)
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
