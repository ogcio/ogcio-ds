import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'

export default {
  title: 'Form/Character count',
  parameters: {
    docs: {
      component:
        'Help users know how much text they can enter when there is a limit on the number of characters.',
    },
  },
  argTypes: {
    fieldName: {
      control: 'text',
    },
    fieldId: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    maxLength: {
      control: 'number',
    },
    maxWords: {
      control: 'number',
      description:
        'In some cases it may be more helpful to show a word count. For example, if your question requires a longer answer.',
    },
    limitedByCharacter: {
      control: 'boolean',
    },
    threshold: {
      control: 'number',
      description:
        'If the limit is much higher than most users are likely to reach, you can choose to only display the message after a user has entered a certain amount.' +
        '\nTo do this, set a threshold in the component markup. For example, `data-threshold="75"` will show the count message only when users have entered 75% of the limit.',
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
  args: {
    rows: 5,
    limitedByCharacter: true,
    maxLength: 200,
    fieldId: 'character-count',
    fieldName: 'character-count',
    labelAsHeading: false,
  },
}

const getTextareaDescribedBy = (args) => {
  const describedBy = [`${args.fieldId}-info`]

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
  inputClassNames.push('govie-js-character-count')

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

const createFormGroupElement = (args) => {
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

  return formGroup
}

const createInfoElement = (args) => {
  const info = document.createElement('div')
  info.className = 'govie-hint govie-character-count__message'
  info.id = `${args.fieldId}-info`

  if (args.limitedByCharacter) {
    info.innerText = `You can enter up to ${args.maxLength} characters`
  } else {
    info.innerText = `You can enter up to ${args.maxWords} words`
  }

  return info
}

const Template = (args) => {
  const formGroupElement = createFormGroupElement(args)
  const infoElement = createInfoElement(args)
  const characterCount = document.createElement('div')
  characterCount.className = 'govie-character-count'
  characterCount.setAttribute('data-module', 'govie-character-count')

  if (args.maxLength && args.limitedByCharacter) {
    characterCount.setAttribute('data-maxlength', args.maxLength)
  }

  if (args.maxWords && !args.limitedByCharacter) {
    characterCount.setAttribute('data-maxwords', args.maxWords)
  }

  if (args.threshold) {
    characterCount.setAttribute('data-threshold', args.threshold)
  }

  characterCount.appendChild(formGroupElement)
  characterCount.appendChild(infoElement)

  characterCount.innerHTML = getNodeFormattedInnerHtml(characterCount)

  return characterCount
}

export const DefaultTextarea = Template.bind({})
DefaultTextarea.args = {
  fieldId: 'with-hint',
  fieldName: 'with-hint',
  label: 'Can you provide more detail?',
  hint: 'Do not include personal or financial information like your National Insurance number or credit card details.',
  labelAsHeading: true,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Can you provide more detail?',
}

export const WithLableAndHint = Template.bind({})
WithLableAndHint.args = {
  label: 'Can you provide more detail?',
  hint: 'Do not include personal or financial information, like your National Insurance number or credit card details.',
}

export const WithWordCountLimit = Template.bind({})
WithWordCountLimit.args = {
  label: 'Can you provide more detail?',
  limitedByCharacter: false,
  maxWords: 150,
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  fieldId: 'exceeding-characters',
  label: 'Can you provide more detail?',
  errorMessage: 'Enter more detail',
  labelAsHeading: true,
}
