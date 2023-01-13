import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as lists } from '../../components/typography/Lists.stories'
import { Default as table } from '../../components/table/Table.stories'
import { Default as radios } from '../../components/radios/Radio.stories'
import { Default as button } from '../../components/button/Button.stories'

export default {
  title: 'Pages/Cookies',
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

  const cookiesheading = parseHtmlString(
    heading({
      text: 'Cookies',
      size: 'l',
      captionSize: 'l',
    })
  )
  column.appendChild(cookiesheading)

  const firstIntroParagraph = parseHtmlString(
    paragraph({
      text: 'Cookies are small files saved on your phone, tablet or computer when you visit a website.',
    })
  )
  column.appendChild(firstIntroParagraph)

  const secondIntroParagraph = parseHtmlString(
    paragraph({
      text: 'We use cookies to make GOV.UK Notify work and collect information about how you use our service.',
    })
  )
  column.appendChild(secondIntroParagraph)

  const essentialCookiesheading = parseHtmlString(
    heading({
      text: 'Essential cookies',
      size: 'm',
      captionSize: 'm',
    })
  )
  column.appendChild(essentialCookiesheading)

  const essentialCookiesParagraph = parseHtmlString(
    paragraph({
      text: 'Essential cookies keep your information secure while you use Notify. We do not need to ask permission to use them.',
    })
  )
  column.appendChild(essentialCookiesParagraph)

  const essentialCookiestable = parseHtmlString(
    table({
      headers: ['Name', 'Purpose', 'Expires'],
      rows: [
        ['notify_admin_session', 'Used to keep you signed in', '20 hours'],
        ['cookie_policy', 'Saves your cookie consent settings', '1 year'],
      ],
    })
  )
  column.appendChild(essentialCookiestable)

  const analyticsCookiesheading = parseHtmlString(
    heading({
      text: 'Analytics cookies (optional)',
      size: 'm',
      captionSize: 'm',
    })
  )
  column.appendChild(analyticsCookiesheading)

  const firstAnalyticsCookiesParagraph = parseHtmlString(
    paragraph({
      text: 'With your permission, we use Google Analytics to collect data about how you use Notify. This information helps us to improve our service.',
    })
  )
  column.appendChild(firstAnalyticsCookiesParagraph)

  const secondAnalyticsCookiesParagraph = parseHtmlString(
    paragraph({
      text: 'Google is not allowed to use or share our analytics data with anyone.',
    })
  )
  column.appendChild(secondAnalyticsCookiesParagraph)

  const thirdAnalyticsCookiesParagraph = parseHtmlString(
    paragraph({
      text: 'Google Analytics stores anonymised information about:',
    })
  )
  column.appendChild(thirdAnalyticsCookiesParagraph)

  const googleAnalyticsInfoList = parseHtmlString(
    lists({
      items: [
        'how you got to [service]',
        'the pages you visit on [service] and how long you spend on them',
        'any errors you see while using [service]',
      ],
      type: 'bullet',
    })
  )
  column.appendChild(googleAnalyticsInfoList)

  const analyticsCookiestable = parseHtmlString(
    table({
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
  column.appendChild(analyticsCookiestable)

  const form = document.createElement('form')

  const acceptRadioButtons = parseHtmlString(
    radios({
      options: 'Yes,No',
      label: 'Do you want to accept analytics cookies?',
      size: 'medium',
      inline: true,
    })
  )
  form.appendChild(acceptRadioButtons)

  const saveSettingsButton = parseHtmlString(
    button({ mode: 'default', label: 'Save cookie settings' })
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
  const body = createBody({ mainContent: createMainWrapper() })
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
