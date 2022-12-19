import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as PageHeader } from '../../components/header/Header.stories'
import { Default as PageFooter } from '../../components/footer/Footer.stories'
import { Default as Heading } from '../../components/typography/Heading.stories'

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

const createParagraph = (text) => {
  const paragraph = document.createElement('p')
  paragraph.className = 'govie-body'
  paragraph.innerHTML = text

  return paragraph
}

const createMainWrapper = () => {
  const mainWrapper = document.createElement('div')
  mainWrapper.className = 'govie-main-wrapper govie-width-container'

  const row = document.createElement('div')
  row.className = 'govie-grid-row'

  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const pageNotFoundHeading = parseHtmlString(
    Heading({
      text: 'Page not found',
      size: 'l',
      captionSize: 'l',
      nestedCaption: false,
    })
  )
  column.appendChild(pageNotFoundHeading)

  const firstIntroText = 'If you typed the web address, check it is correct.'
  column.appendChild(createParagraph(firstIntroText))

  const secondIntroText =
    'If you pasted the web address, check you copied the entire address.'
  column.appendChild(createParagraph(secondIntroText))

  const link = '<a href="#" class="govie-link">contact the Helpline</a>'
  const thirdIntroText = `If the web address is correct or you selected a link or button, ${link} if you need to speak to someone about your tax credits.`
  column.appendChild(createParagraph(thirdIntroText))

  row.appendChild(column)
  mainWrapper.appendChild(row)

  return mainWrapper
}

const Template = (args) => {
  const body = document.createElement('body')

  const pageHeader = parseHtmlString(
    PageHeader({
      serviceName: 'Service name',
    })
  )
  body.appendChild(pageHeader)

  body.appendChild(createMainWrapper())

  const pageFooter = parseHtmlString(PageFooter({}))
  body.appendChild(pageFooter)

  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
