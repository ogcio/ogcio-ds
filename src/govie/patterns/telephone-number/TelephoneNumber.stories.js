import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { textInput } from '../../../../.storybook/helpers/reactStoriesAsHtml'

export default {
  title: 'Patterns/Telephone numbers',
  parameters: {
    docs: {
      description: {
        component:
          'Only collect telephone numbers from people if you genuinely need them. Not everyone has or can use a telephone, so make sure you give users a choice about how they can be contacted.'
      }
    }
  },
  argTypes: {
    errorMessage: { control: 'text' }
  }
}

const createTelephoneInput = (args) => {
  const telephoneInput = parseHtmlString(
    textInput({
      fieldId: 'telephone-number',
      fieldName: 'telephone-number',
      label: 'Telephone number',
      errorMessage: args.errorMessage,
      autocomplete: 'tel',
      type: 'tel',
      hint: args.hint,
      inputExtraClasses: 'govie-input--width-20'
    })
  )

  return telephoneInput
}

const Template = (args) => {
  const body = createTelephoneInput(args)
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}

export const WithHint = Template.bind({})
WithHint.args = {
  hint: 'For international numbers include the country code'
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  errorMessage: 'Enter a telephone number'
}
