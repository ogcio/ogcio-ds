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
          'Ask the user to enter a security code when they need to sign in or complete a higher-risk task, such as changing a password.',
      },
    },
  },
  argTypes: {
    errorMessage: { control: 'boolean' },
    requestNewCode: { control: 'boolean' },
    phoneAccess: { control: 'boolean' },
  },
  args: {
    requestNewCode: false,
    phoneAccess: false,
  },
}

const createSecurityInput = (args) => {
  const securityInput = parseHtmlString(
    input({
      fieldId: 'security-code',
      fieldName: 'security-code',
      label: 'Security code',
      inputExtraClasses: 'govie-input--width-4',
      errorMessage: args.errorMessage,
      autocomplete: 'one-time-code',
    })
  )

  return securityInput
}

const createTelInput = () => {
  const securityInput = input({
    fieldId: 'mobile-number',
    fieldName: 'mobile-number',
    label: 'Mobile number',
    inputExtraClasses: 'govie-input--width-20',
    type: 'tel',
    value: '07700 900000',
    autocomplete: 'tel',
  })

  return securityInput
}

const createNotReceivedLink = () => {
  const noReceivedLink = link({ label: 'Not received a text message?' })
  const linkParagraph = parseHtmlString(paragraph({ text: noReceivedLink }))

  return linkParagraph
}

const createContent = (args) => {
  const components = []

  if (args.requestNewCode) {
    const requestCodeMsg = parseHtmlString(
      args.phoneAccess
        ? details({
          summary: 'Change where the text message is sent',
          text: createTelInput(),
        })
        : details({
          summary: 'I do not have access to the phone',
          text: `If you cannot access the phone number for this account, ${link(
              {
                label: 'contact the Tax Credits Helpline',
              }
            )} to get help signing in.`,
        })
    )

    components.push(requestCodeMsg)
  } else {
    components.push(createSecurityInput(args))
  }

  const confirmationButton = parseHtmlString(
    button({ label: args.requestNewCode ? 'Request a new code' : 'Continue' })
  )
  components.push(confirmationButton)

  return components
}

const createPageContent = (args) => {
  const components = []

  const header = parseHtmlString(
    heading({
      text: args.requestNewCode
        ? 'Request a new security code'
        : 'Checek your phone',
      size: 'l',
    })
  )

  const message = parseHtmlString(
    paragraph({
      text: args.requestNewCode
        ? 'Text messages sometimes take a few minutes to arrive. If you do not receive the text message, you can request a new one.'
        : 'We’ve sent you a text message with a security code.',
    })
  )

  if (args.requestNewCode) {
    const back = parseHtmlString(backLink({ url: '#' }))
    components.push(back)
  }

  components.push(header)
  components.push(message)
  components.push(...createContent(args))

  if (!args.requestNewCode) {
    components.push(createNotReceivedLink())
  }

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
  requestNewCode: true,
}

export const RequestNewCodeWithoutPhoneAccess = Template.bind({})
RequestNewCodeWithoutPhoneAccess.args = {
  requestNewCode: true,
  phoneAccess: true,
}
