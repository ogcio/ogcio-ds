import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as link } from '../../components/typography/Link.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as button } from '../../components/button/Button.stories'
import { Default as input } from '../../components/input/TextInput.stories'

export default {
  title: 'Patterns/Confirm phone number',
  parameters: {
    docs: {
      description: {
        component:
          'Check that a user has access to a specific mobile phone number using a security code sent by text message.',
      },
    },
  },
}

const createInput = () => {
  const securityInput = parseHtmlString(
    input({
      fieldId: 'security-code',
      fieldName: 'security-code',
      label: 'Security code',
      inputExtraClasses: 'govie-input--width-4'
    })
  )

  return securityInput
}

const createLink = () => {
  const noReceivedLink = link({ label: 'Not received a text message?' })
  const linkParagraph = parseHtmlString(paragraph({ text: noReceivedLink }))

  return linkParagraph
}

const createContent = () => {
  const components = []

  const header = parseHtmlString(
    heading({ text: 'Checek your phone', size: 'l' })
  )

  const message = parseHtmlString(
    paragraph({
      text: 'We’ve sent you a text message with a security code.',
    })
  )

  const confirmationButton = parseHtmlString(button({ label: 'Continue' }))

  components.push(header)
  components.push(message)
  components.push(createInput())
  components.push(confirmationButton)
  components.push(createLink())

  return components
}

const createMainWrapper = () => {
  const mainWrapper = document.createElement('div')

  const content = createContent()
  content.forEach((item) => mainWrapper.appendChild(item))

  return mainWrapper
}

const Template = (args) => {
  const body = createMainWrapper()
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
