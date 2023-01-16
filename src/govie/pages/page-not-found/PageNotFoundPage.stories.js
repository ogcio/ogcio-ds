import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'

export default {
  title: 'Pages/Page not found',
  parameters: {
    docs: {
      description: {
        component:
          'This pattern is currently experimental because more research is needed to validate it.\n\n' +
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
      text: 'Page not found',
      size: 'l',
      captionSize: 'l',
      nestedCaption: false,
    })
  )
  column.appendChild(pageNotFoundHeading)

  const firstIntroParagraph = parseHtmlString(
    paragraph({ text: 'If you typed the web address, check it is correct.' })
  )
  column.appendChild(firstIntroParagraph)

  const secondIntroParagraph = parseHtmlString(
    paragraph({
      text: 'If you pasted the web address, check you copied the entire address.',
    })
  )
  column.appendChild(secondIntroParagraph)

  const link =
    '<a href="#" class="govie-link">contact the [service] Helpline</a>'
  const thirdIntroParagraph = parseHtmlString(
    paragraph({
      text: `If the web address is correct or you selected a link or button, ${link} if you need to speak to someone about your [service].`,
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
