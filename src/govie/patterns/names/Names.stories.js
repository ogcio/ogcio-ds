import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { textInput } from '../../../../.storybook/helpers/reactStoriesAsHtml'

export default {
  title: 'Patterns/Names',
  parameters: {
    docs: {
      description: {
        component:
          'You should follow this pattern whenever you need to ask for a user’s name as part of your service. Only ask for people’s names if you need that information to deliver a service.'
      }
    }
  },
  argTypes: {
    errorMessage: { control: 'text' }
  }
}

const createNameInput = (args) => {
  const nameInput = parseHtmlString(
    textInput({
      fieldId: 'full-name',
      fieldName: 'full-name',
      label: 'Full name',
      errorMessage: args.errorMessage,
      autocomplete: 'name'
    })
  )

  return nameInput
}

const Template = (args) => {
  const body = createNameInput(args)
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  errorMessage: 'Enter your full name'
}
