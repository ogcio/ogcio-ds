import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as input } from '../../components/input/TextInput.stories'
import { Default as textarea } from '../../components/textarea/Textarea.stories'

export default {
  title: 'Patterns/Addresses',
  parameters: {
    docs: {
      description: {
        component:
          'This guidance is for government teams that build online services.',
      },
    },
  },
  argTypes: {
    errorMessage: { control: 'text' },
    textArea: { control: 'boolean' },
  },
  args: {
    textArea: false,
  },
}

const createLegend = () => {
  const legend = document.createElement('legend')
  legend.className = 'govie-fieldset__legend govie-fieldset__legend--l'

  const header = parseHtmlString(heading({ text: 'What is your address?' }))
  legend.appendChild(header)

  return legend
}

const createInput = ({
  id,
  label,
  autocomplete,
  inputExtraClasses,
  errorMessage,
}) => {
  const addressInput = input({
    fieldId: id,
    fieldName: id,
    fluid: true,
    label,
    inputExtraClasses,
    autocomplete,
    errorMessage,
  })

  return parseHtmlString(addressInput)
}

const createForm = () => {
  const form = document.createElement('fieldset')
  form.className = 'govie-fieldset'
  form.appendChild(createLegend())

  form.appendChild(
    createInput({
      id: 'address-line-1',
      label: 'Address line 1',
      autocomplete: 'address-line1',
    })
  )

  form.appendChild(
    createInput({
      id: 'address-line-2',
      label: 'Address line 2 (optional)',
      autocomplete: 'address-line2',
    })
  )

  form.appendChild(
    createInput({
      id: 'address-town',
      label: 'Town or city',
      inputExtraClasses: 'govie-!-width-two-thirds',
    })
  )

  form.appendChild(
    createInput({
      id: 'address-country',
      label: 'Country (optional)',
      inputExtraClasses: 'govie-!-width-two-thirds',
    })
  )

  form.appendChild(
    createInput({
      id: 'address-postcode',
      label: 'Postcode',
      autocomplete: 'postal-code',
      inputExtraClasses: 'govie-input--width-10',
    })
  )

  return form
}

const createFormWithError = () => {
  return createInput({
    id: 'address-postcode',
    label: 'Postcode',
    errorMessage: 'Enter a real postcode',
    inputExtraClasses: 'govie-input--width-10',
    value: 'Not a postcode',
    autocomplete: 'postal-code',
  })
}

const createFormWithTextArea = () => {
  const textArea = textarea({
    fieldId: 'address',
    fieldName: 'address',
    label: 'What is your address?',
    rows: 5,
    autocomplete: 'street-address',
  })

  return parseHtmlString(textArea)
}

const Template = (args) => {
  if (args.errorMessage) {
    return beautifyHtmlNode(createFormWithError())
  }

  if (args.textArea) {
    return beautifyHtmlNode(createFormWithTextArea())
  }

  return beautifyHtmlNode(createForm())
}

export const Default = Template.bind({})
Default.args = {}

export const WithError = Template.bind({})
WithError.parameters = {
  docs: {
    description: {
      story: 'Error messages should be styled like this:',
    },
  },
}
WithError.args = {
  errorMessage: 'Enter a real postcode',
}

export const WithTextarea = Template.bind({})
WithTextarea.parameters = {
  docs: {
    description: {
      story: 'Use a textarea if you expect a broad range of address formats and you do not need to format the address for print or use specific sub-parts of the address (for example, street or postcode).',
    },
  },
}

WithTextarea.args = {
  textArea: true,
}
