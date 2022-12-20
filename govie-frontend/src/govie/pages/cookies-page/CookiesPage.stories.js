import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import createParagraph from '../../../../.storybook/helpers/createParagraph'

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
}

const createColumn = () => {
  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const cookiesHeading = parseHtmlString(
    Heading({
      text: 'Cookies',
      size: 'l',
      captionSize: 'l',
      nestedCaption: false,
    })
  )
  column.appendChild(cookiesHeading)

  const firstIntroText =
    'Cookies are small files saved on your phone, tablet or computer when you visit a website.'
  column.appendChild(createParagraph(firstIntroText))

  const secondIntroText =
    'We use cookies to make GOV.UK Notify work and collect information about how you use our service.'
  column.appendChild(createParagraph(secondIntroText))

  const essentialCookiesHeading = parseHtmlString(
    Heading({
      text: 'Essential cookies',
      size: 'm',
      captionSize: 'm',
      nestedCaption: false,
    })
  )
  column.appendChild(essentialCookiesHeading)

  const essentialCookiesText =
    'Essential cookies keep your information secure while you use Notify. We do not need to ask permission to use them.'
  column.appendChild(createParagraph(essentialCookiesText))

  const essentialCookiesTable = parseHtmlString(
    Table({
      headers: ['Name', 'Purpose', 'Expires'],
      rows: [
        ['notify_admin_session', 'Used to keep you signed in', '20 hours'],
        ['cookie_policy', 'Saves your cookie consent settings', '1 year'],
      ],
    })
  )
  column.appendChild(essentialCookiesTable)

  const analyticsCookiesHeading = parseHtmlString(
    Heading({
      text: 'Analytics cookies (optional)',
      size: 'm',
      captionSize: 'm',
      nestedCaption: false,
    })
  )
  column.appendChild(analyticsCookiesHeading)

  const firstAnalyticsCookiesText =
    'With your permission, we use Google Analytics to collect data about how you use Notify. This information helps us to improve our service.'
  column.appendChild(createParagraph(firstAnalyticsCookiesText))

  const secondAnalyticsCookiesText =
    'Google is not allowed to use or share our analytics data with anyone.'
  column.appendChild(createParagraph(secondAnalyticsCookiesText))

  const thirdAnalyticsCookiesText =
    'Google Analytics stores anonymised information about:'
  column.appendChild(createParagraph(thirdAnalyticsCookiesText))

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
  column.appendChild(googleAnalyticsInfoList)

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
  column.appendChild(analyticsCookiesTable)

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

  column.appendChild(form)

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
Default.args = {}
