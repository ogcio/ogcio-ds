import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as PageHeader } from '../../components/header/Header.stories'
import { Default as PageFooter } from '../../components/footer/Footer.stories'
import { Default as Heading } from '../../components/typography/Heading.stories'

export default {
  title: 'Pages/Service Unavailable',
  parameters: {
    docs: {
      description: {
        component:
          'This pattern is currently experimental because more research is needed to validate it.\n\n' +
          'This guidance is for government teams that build online services. <a href="https://www.gov.ie/">To find information and services for the public, go to gov.ie</a>.\n\n' +
          'Tell the user a service is unavailable on purpose. These are also known as 503 and shutter pages.',
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
      text: 'Sorry, the service is unavailable',
      size: 'l',
      captionSize: 'l',
      nestedCaption: false,
    })
  )
  column.appendChild(pageNotFoundHeading)

  const firstIntroText = 'You will be able to use the service later.'
  column.appendChild(createParagraph(firstIntroText))

  const secondIntroText =
    'We saved your answers. They will be available for 30 days.'
  column.appendChild(createParagraph(secondIntroText))

  const link =
    '<a href="#" class="govie-link">Contact the [service] Helpline</a>'
  const thirdIntroText = `${link} if you need to make changes to your claim or speak to someone about your [service].`
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
