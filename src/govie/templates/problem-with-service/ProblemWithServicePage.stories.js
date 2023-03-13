import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'

export default {
  title: 'Templates/Problem with service',
  parameters: {
    docs: {
      description: {
        component:
          'This template is currently experimental because more research is needed to validate it.\n\n' +
          'A page not found tells someone we cannot find the page they were trying to view. They are also known as 404 pages.',
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

  const firstIntroParagraph = parseHtmlString(
    paragraph({ text: 'Try again later.' })
  )
  column.appendChild(firstIntroParagraph)

  const secondIntroParagraph = parseHtmlString(
    paragraph({
      text: 'We saved your answers. They will be available for 30 days.',
    })
  )
  column.appendChild(secondIntroParagraph)

  const link =
    '<a href="#" class="govie-link">Contact the [service] Helpline</a>'
  const thirdIntroParagraph = parseHtmlString(
    paragraph({
      text: `${link} if you need to make changes to your claim or speak to someone about your [service].`,
    })
  )
  column.appendChild(thirdIntroParagraph)

  row.appendChild(column)
  mainWrapper.appendChild(row)

  return mainWrapper
}

const Template = (args) => {
  const body = createBody({ mainContent: createMainWrapper() })
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
