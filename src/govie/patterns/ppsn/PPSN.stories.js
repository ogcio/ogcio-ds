import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as input } from '../../components/input/TextInput.stories'

export default {
  title: 'Patterns/PPSN',
  parameters: {
    docs: {
      description: {
        component:
          'Ask users to provide their Personal Public Service (PPS) number.'
      }
    }
  },
  argTypes: {
    errorMessage: { control: 'text' }
  }
}

const createInput = (errorMessage) => {
  const textInput = input({
    fieldId: 'personal-public-service',
    fieldName: 'personal-public-service',
    label: 'Personal public service (PPS) number',
    errorMessage: errorMessage
      ? 'Enter a PPS number in the correct format'
      : null,
    inputExtraClasses: 'govie-input--width-10',
    hint: 'A PPS Number is always a 7 numbers followed by either one or 2 letters. It is sometimes called PPSN.'
  })

  return parseHtmlString(textInput)
}

const Template = (args) => {
  const ppsnInput = createInput(args.errorMessage)
  return beautifyHtmlNode(ppsnInput)
}

export const Default = Template.bind({})
Default.args = {}

export const WithError = Template.bind({})
WithError.parameters = {
  docs: {
    description: {
      story: 'Error messages should be styled like this:'
    }
  }
}
WithError.args = {
  errorMessage: 'Enter a PPS number in the correct format'
}
