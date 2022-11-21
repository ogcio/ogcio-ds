export default {
  title: 'Form/Date Input',
  parameters: {
    docs: {
      component:
        'Use the date input component to help users enter a memorable date or one they can easily look up.',
    },
  },
  argTypes: {
    fieldId: {
      type: { name: 'string', required: true },
      control: 'text',
    },
    legend: {
      control: 'text',
    },
    legendAsHeading: {
      control: 'boolean',
      description:
        'If you’re asking more than one question on the page, do not set the contents of the <legend> as the page heading.',
    },
    hint: {
      control: 'text',
      description:
        'Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
    },
    errorMessage: {
      control: 'text',
    },
    errorItemType: {
      control: { type: 'radio' },
      options: ['All', 'Day', 'Month', 'Year'],
    },
  },
  args: {
    fieldId: 'example-date',
    errorItemType: 'All',
    legendAsHeading: false,
  },
}

const createLegend = (args) => {
  const classNames = ['govie-fieldset__legend']
  const legend = document.createElement('legend')

  if (!args.legendAsHeading) {
    legend.className = classNames[0]
    legend.innerText = args.legend

    return legend.outerHTML
  }

  const legendHeading = document.createElement('h1')
  legendHeading.className = 'govie-fieldset__heading'
  legendHeading.innerHTML = `
        ${args.legend}
      `

  classNames.push('govie-fieldset__legend--l')
  legend.className = classNames.join(' ')
  legend.innerHTML = `
      ${legendHeading.outerHTML}
    `

  return legend.outerHTML
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

const createInputItemLabel = (fieldId, itemType) => {
  const label = document.createElement('label')
  label.className = 'govie-label govie-date-input__label'
  label.setAttribute('for', `${fieldId}-${itemType.toLowerCase()}`)
  label.innerHTML = `
            ${itemType}
          `

  return label.outerHTML
}

const createInputItem = (fieldId, itemType, width, didError) => {
  const classNames = [
    'govie-input',
    'govie-date-input__input',
    `govie-input--width-${width}`,
  ]
  if (didError) {
    classNames.push('govie-input--error')
  }

  const input = document.createElement('input')
  input.className = classNames.join(' ')
  input.id = `${fieldId}-${itemType.toLowerCase()}`
  input.name = `${fieldId}-${itemType.toLowerCase()}`
  input.type = 'text'
  input.setAttribute('inputmode', 'numeric')

  return input.outerHTML
}

const wrapInputItem = (label, input) => {
  const formGroup = document.createElement('div')
  formGroup.className = 'govie-form-group'
  formGroup.innerHTML = `
          ${label}
          ${input}
        `

  const inputItemWrapper = document.createElement('div')
  inputItemWrapper.className = 'govie-date-input__item'
  inputItemWrapper.innerHTML = `
        ${formGroup.outerHTML}
      `

  return inputItemWrapper.outerHTML
}

const didItemTypeError = (args, itemType) => {
  return (
    args.errorMessage &&
    (!args.errorItemType ||
      args.errorItemType === 'All' ||
      args.errorItemType === itemType)
  )
}

const createInputItems = (args) => {
  const itemTypes = [
    {
      name: 'Day',
      width: 2,
      didError: didItemTypeError(args, 'Day'),
    },
    {
      name: 'Month',
      width: 2,
      didError: didItemTypeError(args, 'Month'),
    },
    {
      name: 'Year',
      width: 4,
      didError: didItemTypeError(args, 'Year'),
    },
  ]

  return itemTypes.map((itemType) => {
    const label = createInputItemLabel(args.fieldId, itemType.name)
    const input = createInputItem(
      args.fieldId,
      itemType.name,
      itemType.width,
      itemType.didError
    )

    return wrapInputItem(label, input)
  })
}

const createInputItemsContainer = (args) => {
  const inputItemsContainer = document.createElement('div')
  inputItemsContainer.className = 'govie-date-input'
  inputItemsContainer.id = args.fieldId

  const inputItems = createInputItems(args)

  inputItemsContainer.innerHTML = `
      ${inputItems.join('\n      ')}
    `

  return inputItemsContainer.outerHTML
}

const createFieldSet = (args) => {
  const fieldsetInnerElements = [createLegend(args)]
  const describedby = [`${args.fieldId}-hint`]

  if (args.hint) {
    fieldsetInnerElements.push(createHint(args))
  }

  if (args.errorMessage) {
    describedby.push(`${args.fieldId}-error`)
    fieldsetInnerElements.push(createErrorMessage(args))
  }

  fieldsetInnerElements.push(createInputItemsContainer(args))

  const fieldset = document.createElement('fieldset')
  fieldset.className = 'govie-fieldset'
  fieldset.setAttribute('role', 'group')
  fieldset.setAttribute('aria-describedby', describedby.join(' '))

  fieldset.innerHTML = `
    ${fieldsetInnerElements.join('\n    ')}
  `

  return fieldset.outerHTML
}

const Template = (args) => {
  const classNames = ['govie-form-group']
  if (args.errorMessage) {
    classNames.push('govie-form-group--error')
  }

  const formGroup = document.createElement('div')
  formGroup.className = classNames.join(' ')
  formGroup.innerHTML = `
  ${createFieldSet(args)}
`

  return formGroup
}

export const DefaultDateInput = Template.bind({})
DefaultDateInput.args = {
  legend: 'When was your flight?',
  legendAsHeading: true,
  hint: 'For example, 12 8 2006',
}

export const WithNormalLegend = Template.bind({})
WithNormalLegend.args = {
  legend: 'When was your flight?',
  hint: 'For example, 12 8 2006',
}

export const WithoutHint = Template.bind({})
WithoutHint.args = {
  legend: 'When was your flight?',
}

export const WithAllFieldErrored = Template.bind({})
WithAllFieldErrored.args = {
  legend: 'When was your flight?',
  hint: 'For example, 12 8 2006',
  errorMessage: 'The date of your flight can not be in future',
}

export const WithOneFieldErrored = Template.bind({})
WithOneFieldErrored.args = {
  legend: 'When was your flight?',
  hint: 'For example, 12 8 2006',
  errorMessage: 'The date of your flight must include a month',
  errorItemType: 'Month',
}
