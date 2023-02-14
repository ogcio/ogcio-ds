import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { textInput } from '../../../../.storybook/helpers/reactStoriesAsHtml'

export default {
  title: 'Patterns/Email addresses',
  parameters: {
    docs: {
      description: {
        component:
          'Follow this pattern whenever you need to capture an email address.'
      }
    }
  },
  argTypes: {
    errorMessage: { control: 'text' }
  }
}

const createEmailInput = (args) => {
  const emailInput = parseHtmlString(
    textInput({
      fieldId: 'email',
      fieldName: 'email',
      label: 'Email address',
      errorMessage: args.errorMessage,
      autocomplete: 'email',
      type: 'email',
      hint: 'We’ll only use this to send you a receipt',
      value: args.errorMessage ? 'Not an email address' : null
    })
  )

  return emailInput
}

const Template = (args) => {
  const body = createEmailInput(args)
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  errorMessage:
    'Enter an email address in the correct format, like name@example.com'
}
