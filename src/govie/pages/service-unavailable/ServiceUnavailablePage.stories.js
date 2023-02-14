import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import {
  createPageHeader,
  createPageFooter
} from '../../../../.storybook/helpers/commonPageComponents'
import {
  heading,
  paragraph
} from '../../../../.storybook/helpers/reactStoriesAsHtml'

export default {
  title: 'Pages/Service Unavailable',
  parameters: {
    docs: {
      description: {
        component:
          'This pattern is currently experimental because more research is needed to validate it.\n\n' +
          'This guidance is for government teams that build online services. <a href="https://www.gov.ie/">To find information and services for the public, go to gov.ie</a>.\n\n' +
          'Tell the user a service is unavailable on purpose. These are also known as 503 and shutter pages.'
      }
    }
  }
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
      text: 'Sorry, the service is unavailable',
      size: 'l',
      captionSize: 'l',
      nestedCaption: false
    })
  )
  column.appendChild(pageNotFoundHeading)

  const firstIntroParagraph = parseHtmlString(
    paragraph({ text: 'You will be able to use the service later.' })
  )
  column.appendChild(firstIntroParagraph)

  const secondIntroParagraph = parseHtmlString(
    paragraph({
      text: 'We saved your answers. They will be available for 30 days.'
    })
  )
  column.appendChild(secondIntroParagraph)

  const link =
    '<a href="#" class="govie-link">Contact the [service] Helpline</a>'
  const thirdIntroParagraph = parseHtmlString(
    paragraph({
      text: `${link} if you need to make changes to your claim or speak to someone about your [service].`
    })
  )
  column.appendChild(thirdIntroParagraph)

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
