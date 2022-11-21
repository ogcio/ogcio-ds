import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'

export default {
  title: 'Form/Textarea',
  parameters: {
    docs: {
      component:
        'Use the textarea component when you need to let users enter an amount of text that’s longer than a single line.',
    },
  },
  argTypes: {
    fieldName: {
      control: 'text',
    },
    fieldId: {
      type: { name: 'string', required: true },
      control: 'text',
    },
    label: {
      control: 'text',
    },
    labelAsHeading: {
      control: 'boolean',
      description:
        'If you’re asking just one question per page as recommended, you can set the contents of the `<label>` as the page heading. This is good practice as it means that users of screen readers will only hear the contents once.',
    },
    hint: {
      control: 'text',
      description:
        'Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
    },
    rows: {
      control: 'number',
      description:
        'Make the height of a textarea proportional to the amount of text you expect users to enter. You can set the height of a textarea by by specifying the `rows` attribute.',
    },
    errorMessage: {
      control: 'text',
    },
  },
}

const getTextareaDescribedBy = (args) => {
  const describedBy = []

  if (args.hint) {
    describedBy.push(`${args.fieldId}-hint`)
  }

  if (args.errorMessage) {
    describedBy.push(`${args.fieldId}-error`)
  }

  return describedBy
}

const getTextareaClassNames = (args) => {
  const inputClassNames = ['govie-textarea']

  if (args.errorMessage) {
    inputClassNames.push('govie-input--error')
  }

  return inputClassNames
}

const getFormGroupClassNames = (args) => {
  const formGroupClassNames = ['govie-form-group']

  if (args.errorMessage) {
    formGroupClassNames.push('govie-form-group--error')
  }

  return formGroupClassNames
}

const createHintElement = (args) => {
  const hint = document.createElement('div')
  hint.className = 'govie-hint'
  hint.id = `${args.fieldId}-hint`
  hint.innerText = args.hint

  return hint
}

const createLabelElement = (args) => {
  const labelClassNames = ['govie-label']

  if (args.labelAsHeading) {
    labelClassNames.push('govie-label--l')
  }

  const label = document.createElement('label')
  label.setAttribute('for', args.fieldId)
  label.innerText = args.label
  label.className = labelClassNames.join(' ')

  if (args.labelAsHeading) {
    const labelWrapper = document.createElement('h1')
    labelWrapper.className = 'govie-label-wrapper'
    labelWrapper.appendChild(label)

    return labelWrapper
  }

  return label
}

const createErrorMessageElement = (args) => {
  const hiddenErrorSpan = document.createElement('span')
  hiddenErrorSpan.className = 'govie-visually-hidden'
  hiddenErrorSpan.innerText = 'Error:'

  const errorMessage = document.createElement('p')
  errorMessage.id = `${args.fieldId}-error`
  errorMessage.className = 'govie-error-message'
  errorMessage.innerHTML = `${hiddenErrorSpan.outerHTML} ${args.errorMessage}`

  return errorMessage
}

const createTextareaElement = (args) => {
  const textareaDescribedBy = getTextareaDescribedBy(args)
  const textarea = document.createElement('textarea')

  textarea.id = args.fieldId
  textarea.name = args.fieldName
  textarea.className = getTextareaClassNames(args).join(' ')

  if (args.rows) {
    textarea.rows = args.rows
  }

  if (textareaDescribedBy.length > 0) {
    textarea.setAttribute('aria-describedby', textareaDescribedBy.join(' '))
  }

  return textarea
}

const Template = (args) => {
  const formGroup = document.createElement('div')
  formGroup.className = getFormGroupClassNames(args).join(' ')

  if (args.label) {
    formGroup.appendChild(createLabelElement(args))
  }

  if (args.hint) {
    formGroup.appendChild(createHintElement(args))
  }

  if (args.errorMessage) {
    formGroup.appendChild(createErrorMessageElement(args))
  }

  formGroup.appendChild(createTextareaElement(args))

  formGroup.innerHTML = getNodeFormattedInnerHtml(formGroup)

  return formGroup
}

export const DefaultTextarea = Template.bind({})
DefaultTextarea.args = {
  fieldId: 'default-textarea',
  fieldName: 'default-textarea',
  label: 'Can you provide more detail?',
  labelAsHeading: true,
  rows: 5,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  fieldId: 'default-textarea',
  fieldName: 'default-textarea',
  label: 'Can you provide more detail?',
  labelAsHeading: false,
  rows: 5,
}

export const WithLableAndHint = Template.bind({})
WithLableAndHint.args = {
  fieldId: 'default-textarea',
  fieldName: 'default-textarea',
  label: 'Can you provide more detail?',
  labelAsHeading: false,
  hint: 'Do not include personal or financial information, like your National Insurance number or credit card details.',
  rows: 5,
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  fieldId: 'default-textarea',
  fieldName: 'default-textarea',
  label: 'Can you provide more detail?',
  labelAsHeading: false,
  hint: 'Do not include personal or financial information, like your National Insurance number or credit card details.',
  errorMessage: 'Enter more detail',
  rows: 5,
}
