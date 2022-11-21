export default {
  title: 'File Upload',
  parameters: {
    docs: {
      component:
        'Help users select and upload a file. You should only ask users to upload something if it’s critical to the delivery of your service.',
    },
  },
  argTypes: {
    fieldId: {
      type: { name: 'string', required: true },
      control: 'text',
    },
    label: {
      control: 'text',
    },
    hint: {
      control: 'text',
      description:
        'Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
    },
    errorMessage: {
      control: 'text',
    },
  },
  args: {
    fieldId: 'example-file-upload',
    label: 'Upload a file',
  },
}

const createHint = (args) => {
  const hint = document.createElement('div')
  hint.id = `${args.fieldId}-hint`
  hint.className = 'govie-hint'
  hint.innerHTML = `
    ${args.hint}
  `

  return hint.outerHTML
}

const createErrorMessage = (args) => {
  const errorSpan = document.createElement('span')
  errorSpan.className = 'govie-visually-hidden'
  errorSpan.innerText = 'Error:'

  const errorMessage = document.createElement('p')
  errorMessage.id = `${args.fieldId}-error`
  errorMessage.className = 'govie-error-message'
  errorMessage.innerHTML = `
    ${errorSpan.outerHTML} ${args.errorMessage}
  `

  return errorMessage.outerHTML
}

const createLabel = (args) => {
  const label = document.createElement('label')
  label.className = 'govie-label'
  label.setAttribute('for', `${args.fieldId}`)
  label.innerHTML = `
    ${args.label}
  `

  return label.outerHTML
}

const createInput = (args) => {
  const classNames = ['govie-file-upload']
  const describedby = []

  if (args.hint) {
    describedby.push(`${args.fieldId}-hint`)
  }

  if (args.errorMessage) {
    classNames.push('govie-input--error')
    describedby.push(`${args.fieldId}-error`)
  }

  const input = document.createElement('input')
  input.className = classNames.join(' ')
  input.id = `${args.fieldId}`
  input.name = `${args.fieldId}`
  input.type = 'file'
  input.setAttribute('aria-describedby', describedby.join(' '))

  return input.outerHTML
}

const Template = (args) => {
  const classNames = ['govie-form-group']
  if (args.errorMessage) {
    classNames.push('govie-form-group--error')
  }

  const formGroupElements = []
  formGroupElements.push(createLabel(args))

  if (args.hint) {
    formGroupElements.push(createHint(args))
  }

  if (args.errorMessage) {
    formGroupElements.push(createErrorMessage(args))
  }

  formGroupElements.push(createInput(args))

  const formGroup = document.createElement('div')
  formGroup.className = classNames.join(' ')
  formGroup.innerHTML = `
  ${formGroupElements.join('\n  ')}
`

  return formGroup
}

export const DefaultDateInput = Template.bind({})
DefaultDateInput.args = {}

export const WithHint = Template.bind({})
WithHint.args = {
  hint: 'File formats accepted: pdf, doc, docx',
}

export const InError = Template.bind({})
InError.args = {
  errorMessage: 'The file must be smaller than 2MB',
}
