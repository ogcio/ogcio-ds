import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as PageHeader } from '../../components/header/Header.stories'
import { Default as PageFooter } from '../../components/footer/Footer.stories'
import { Default as Heading } from '../../components/typography/Heading.stories'
import { Default as Table } from '../../components/table/Table.stories'
import { Default as Lists } from '../../components/typography/Lists.stories'
import { Default as Radios } from '../../components/radios/Radio.stories'
import { Default as Button } from '../../components/button/Button.stories'

export default {
  title: 'Pages/Cookies Page',
  parameters: {
    docs: {
      description: {
        component:
          'This pattern is currently experimental because more research is needed to validate it.\n\n' +
          'Tell users about the cookies you’re setting on their device and let them accept or reject different types of non-essential cookies.',
      },
    },
  },
  argTypes: {
    headingText: {
      control: 'text',
      type: { name: 'string', required: true },
      description:
        'It’s meant for a high-level explanation of what has happened.',
    },
    bodyHtml: {
      control: 'text',
      description:
        'Use this component instead of the heading text if you need to give detailed information, or more context.',
    },
  },
}

const createParagraph = (text) => {
  const paragraph = document.createElement('p')
  paragraph.className = 'govie-body'
  paragraph.innerText = text

  return paragraph
}

const createMainWrapper = () => {
  const mainWrapper = document.createElement('div')
  mainWrapper.className = 'govie-main-wrapper govie-width-container'

  const cookiesHeading = parseHtmlString(
    Heading({
      text: 'Cookies',
      size: 'l',
      captionSize: 'l',
      nestedCaption: false,
    })
  )
  mainWrapper.appendChild(cookiesHeading)

  const firstIntroText =
    'Cookies are small files saved on your phone, tablet or computer when you visit a website.'
  mainWrapper.appendChild(createParagraph(firstIntroText))

  const secondIntroText =
    'We use cookies to make GOV.UK Notify work and collect information about how you use our service.'
  mainWrapper.appendChild(createParagraph(secondIntroText))

  const essentialCookiesHeading = parseHtmlString(
    Heading({
      text: 'Essential cookies',
      size: 'm',
      captionSize: 'm',
      nestedCaption: false,
    })
  )
  mainWrapper.appendChild(essentialCookiesHeading)

  const essentialCookiesText =
    'Essential cookies keep your information secure while you use Notify. We do not need to ask permission to use them.'
  mainWrapper.appendChild(createParagraph(essentialCookiesText))

  const essentialCookiesTable = parseHtmlString(
    Table({
      headers: ['Name', 'Purpose', 'Expires'],
      rows: [
        ['notify_admin_session', 'Used to keep you signed in', '20 hours'],
        ['cookie_policy', 'Saves your cookie consent settings', '1 year'],
      ],
    })
  )
  mainWrapper.appendChild(essentialCookiesTable)

  const analyticsCookiesHeading = parseHtmlString(
    Heading({
      text: 'Analytics cookies (optional)',
      size: 'm',
      captionSize: 'm',
      nestedCaption: false,
    })
  )
  mainWrapper.appendChild(analyticsCookiesHeading)

  const firstAnalyticsCookiesText =
    'With your permission, we use Google Analytics to collect data about how you use Notify. This information helps us to improve our service.'
  mainWrapper.appendChild(createParagraph(firstAnalyticsCookiesText))

  const secondAnalyticsCookiesText =
    'Google is not allowed to use or share our analytics data with anyone.'
  mainWrapper.appendChild(createParagraph(secondAnalyticsCookiesText))

  const thirdAnalyticsCookiesText =
    'Google Analytics stores anonymised information about:'
  mainWrapper.appendChild(createParagraph(thirdAnalyticsCookiesText))

  const googleAnalyticsInfoList = parseHtmlString(
    Lists({
      items: [
        'how you got to [service]',
        'the pages you visit on [service] and how long you spend on them',
        'any errors you see while using [service]',
      ],
      type: 'bullet',
    })
  )
  mainWrapper.appendChild(googleAnalyticsInfoList)

  const analyticsCookiesTable = parseHtmlString(
    Table({
      headers: ['Name', 'Purpose', 'Expires'],
      rows: [
        [
          '_ga',
          'Checks if you’ve visited Notify before. This helps us count how many people visit our site.',
          '2 years',
        ],
        [
          '_gid',
          'Checks if you’ve visited Notify before. This helps us count how many people visit our site.',
          '24 hours',
        ],
      ],
    })
  )
  mainWrapper.appendChild(analyticsCookiesTable)

  const form = document.createElement('form')

  const acceptRadioButtons = parseHtmlString(
    Radios({
      options: 'Yes,No',
      label: 'Do you want to accept analytics cookies?',
      size: 'medium',
      inline: true,
    })
  )
  form.appendChild(acceptRadioButtons)

  const saveSettingsButton = parseHtmlString(
    Button({ mode: 'default', label: 'Save cookie settings' })
  )
  form.appendChild(saveSettingsButton)

  mainWrapper.appendChild(form)

  return mainWrapper
}

const Template = (args) => {
  const body = document.createElement('body')

  const pageHeader = parseHtmlString(
    PageHeader({
      navigationLinks:
        'Navigation item 1, Navigation item 2, Navigation item 3',
    })
  )
  body.appendChild(pageHeader)

  body.appendChild(createMainWrapper())

  const pageFooter = parseHtmlString(PageFooter({}))
  body.appendChild(pageFooter)

  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {
  headingText: 'Application complete',
}
