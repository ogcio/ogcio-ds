import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as link } from '../../components/typography/Link.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as button } from '../../components/button/Button.stories'
import { Default as input } from '../../components/input/TextInput.stories'
import { Default as backLink } from '../../components/back-link/BackLink.stories'
import { Default as details } from '../../components/details/Details.stories'

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
  argTypes: {
    errorMessage: { control: 'boolean' },
    newCode: { control: 'boolean' },
  },
  args: {
    newCode: false,
  },
}

const createInput = (args) => {
  const securityInput = parseHtmlString(
    input({
      fieldId: 'security-code',
      fieldName: 'security-code',
      label: 'Security code',
      inputExtraClasses: 'govie-input--width-4',
      errorMessage: args.errorMessage,
    })
  )

  return securityInput
}

const createNotReceivedLink = () => {
  const noReceivedLink = link({ label: 'Not received a text message?' })
  const linkParagraph = parseHtmlString(paragraph({ text: noReceivedLink }))

  return linkParagraph
}

const createContent = (args) => {
  const components = []
  const confirmationButton = parseHtmlString(button({ label: 'Continue' }))

  if (args.newCode) {
    const requestlink = link({ label: 'contact the Tax Credits Helpline' })

    const requestCodeMsg = parseHtmlString(
      details({
        summary: 'I do not have access to the phone',
        text: `If you cannot access the phone number for this account, ${requestlink} to get help signing in.`,
      })
    )

    components.push(requestCodeMsg)
  } else {
    components.push(createInput(args))
    components.push(confirmationButton)
  }

  return components
}

const createPageContent = (args) => {
  const components = []

  const header = parseHtmlString(
    heading({
      text: args.newCode ? 'Request a new security code' : 'Checek your phone',
      size: 'l',
    })
  )

  const message = parseHtmlString(
    paragraph({
      text: args.newCode
        ? 'Text messages sometimes take a few minutes to arrive. If you do not receive the text message, you can request a new one.'
        : 'We’ve sent you a text message with a security code.',
    })
  )

  if (args.newCode) {
    const back = parseHtmlString(backLink({ url: '#' }))
    components.push(back)
  }

  components.push(header)
  components.push(message)
  components.push(...createContent(args))
  components.push(createNotReceivedLink())

  return components
}

const createMainWrapper = (args) => {
  const mainWrapper = document.createElement('div')

  const content = createPageContent(args)
  content.forEach((item) => {
    mainWrapper.appendChild(item)
  })

  return mainWrapper
}

const Template = (args) => {
  const body = createMainWrapper(args)
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  errorMessage: 'Enter a correct security code',
}

export const WithExpiredCodeErrorMessage = Template.bind({})
WithExpiredCodeErrorMessage.args = {
  errorMessage: 'The security code has expired. New code sent.',
}

export const RequestNewCode = Template.bind({})
RequestNewCode.args = {
  newCode: true,
}
