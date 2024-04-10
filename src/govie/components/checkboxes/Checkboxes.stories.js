import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Form/Checkboxes',
  parameters: {
    docs: {
      description: {
        component:
          'Let users select one or more options by using the checkboxes component.'
      }
    }
  },
  argTypes: {
    fieldId: {
      control: 'text',
      type: { name: 'text', required: true }
    },
    legend: { control: 'text' },
    legendAsHeading: {
      control: 'boolean',
      description:
        "If you're asking just one question per page as recommended, you can set the contents of the `<legend>` as the page heading. This is good practice as it means that users of screen readers will only hear the contents once."
    },
    hint: { control: 'text' },
    haveNoneOption: {
      control: 'boolean',
      description:
        "When 'none' would be a valid answer, give users the option to check a box to say none of the other options apply to them — without this option, users would have to leave all of the boxes unchecked. Giving users this option also makes sure they do not skip the question by accident."
    },
    noneOptionLabel: { control: 'text' },
    useSmallerBoxes: {
      control: 'boolean',
      description:
        "Use standard-sized checkboxes in most cases. However, smaller checkboxes work well on pages where it's helpful to make them less visually prominent.\n" +
        'For example, on a page of search results, the main user need is to see the results. Using smaller checkboxes lets users see and change search filters without distracting them from the main content.'
    },
    items: {
      control: 'array',
      type: { name: 'array', required: true }
    },
    errorMessage: { control: 'text' },
    hiddenLabel: { control: 'boolean' }
  },
  args: {
    fieldId: 'checkboxes-default',
    legendAsHeading: true,
    useSmallerBoxes: false,
    haveNoneOption: false,
    items: [],
    hiddenLabel: false
  }
}

const createLegendNode = (args) => {
  const classNames = ['govie-fieldset__legend']
  if (args.useSmallerBoxes) {
    classNames.push('govie-fieldset__legend--m')
  } else if (args.legendAsHeading) {
    classNames.push('govie-fieldset__legend--l')
  }

  const legend = document.createElement('legend')
  legend.className = classNames.join(' ')

  if (args.legendAsHeading) {
    const heading = document.createElement('h1')
    heading.className = 'govie-fieldset__heading'
    heading.innerText = args.legend
    legend.appendChild(heading)
  } else {
    legend.innerText = args.legend
  }

  return legend
}

const createHintNode = (args) => {
  const hint = document.createElement('div')
  hint.id = `${args.fieldId}-hint`
  hint.className = 'govie-hint'
  hint.innerText = args.hint

  return hint
}

const createInputId = (fieldId, index) => {
  if (index < 2) {
    return fieldId
  }

  return `${fieldId}-${index}`
}

const createInputHintId = (fieldId, index) => {
  if (index < 2) {
    return `${fieldId}-item-hint`
  }

  return `${fieldId}-item-${index}-hint`
}

const createInputNode = (fieldId, index, itemData, isExclusive) => {
  const input = document.createElement('input')
  input.className = 'govie-checkboxes__input'
  input.id = createInputId(fieldId, index)
  input.name = fieldId
  input.type = 'checkbox'
  input.value = itemData.value

  if (itemData.hint) {
    input.setAttribute('aria-describedby', createInputHintId(fieldId, index))
  }

  if (isExclusive) {
    input.setAttribute('data-behaviour', 'exclusive')
  }

  if (itemData.conditionalInput) {
    input.setAttribute(
      'data-aria-controls',
      `conditional-${createInputId(fieldId, index)}`
    )
  }

  return input
}

const createInputLabelNode = (fieldId, index, itemData, hiddenLabel) => {
  const label = document.createElement('label')
  label.className = 'govie-label--s govie-checkboxes__label'
  label.setAttribute('for', createInputId(fieldId, index))
  if (hiddenLabel) {
    label.innerHTML = `<span class="govie-visually-hidden">${itemData.label}</span>`
  } else {
    label.innerText = itemData.label
  }

  return label
}

const createInputHintNode = (fieldId, index, itemData) => {
  const hint = document.createElement('div')
  hint.id = createInputHintId(fieldId, index)
  hint.className = 'govie-hint govie-checkboxes__hint'
  hint.innerText = itemData.hint

  return hint
}

const createCheckboxItem = ({
  fieldId,
  index,
  itemData,
  isExclusive = false,
  hiddenLabel = false
}) => {
  const checkboxItem = document.createElement('div')
  checkboxItem.className = 'govie-checkboxes__item'

  checkboxItem.appendChild(
    createInputNode(fieldId, index, itemData, isExclusive)
  )

  checkboxItem.appendChild(
    createInputLabelNode(fieldId, index, itemData, hiddenLabel)
  )

  if (itemData.hint) {
    checkboxItem.appendChild(createInputHintNode(fieldId, index, itemData))
  }

  return checkboxItem
}

const createConditionalInputNode = (fieldId, index, inputData) => {
  const inputLabel = document.createElement('label')
  inputLabel.className = 'govie-label'
  inputLabel.setAttribute('for', inputData.id)
  inputLabel.innerText = inputData.label

  const input = document.createElement('input')
  input.className = 'govie-input govie-!-width-one-third'
  input.id = inputData.id
  input.name = inputData.id

  if (inputData.type) {
    input.type = inputData.type
  } else {
    input.type = 'text'
  }

  if (inputData.spellcheck) {
    input.setAttribute('spellcheck', inputData.spellcheck)
  }

  if (inputData.autocomplete) {
    input.setAttribute('autocomplete', inputData.autocomplete)
  }

  const formGroup = document.createElement('div')
  formGroup.className = 'govie-form-group'
  formGroup.appendChild(inputLabel)
  formGroup.appendChild(input)

  const container = document.createElement('div')
  container.className =
    'govie-checkboxes__conditional govie-checkboxes__conditional--hidden'
  container.id = `conditional-${createInputId(fieldId, index)}`
  container.appendChild(formGroup)

  return container
}

const createCheckboxesNode = (args) => {
  const classNames = ['govie-checkboxes']

  if (args.useSmallerBoxes) {
    classNames.push('govie-checkboxes--small')
  }

  const checkboxes = document.createElement('div')
  checkboxes.className = classNames.join(' ')
  checkboxes.setAttribute('data-module', 'govie-checkboxes')

  args.items.forEach((checkboxItem, index) => {
    // Start indexes from 1 in the DOM
    checkboxes.appendChild(
      createCheckboxItem({
        fieldId: args.fieldId,
        index: index + 1,
        itemData: checkboxItem,
        hiddenLabel: args.hiddenLabel
      })
    )

    if (checkboxItem.conditionalInput) {
      checkboxes.appendChild(
        createConditionalInputNode(
          args.fieldId,
          index + 1,
          checkboxItem.conditionalInput
        )
      )
    }
  })

  if (args.haveNoneOption) {
    const divider = document.createElement('div')
    divider.className = 'govie-checkboxes__divider'
    divider.innerText = 'or'

    checkboxes.appendChild(divider)

    const noneOptionItemData = {
      label: args.noneOptionLabel,
      value: 'none'
    }
    // Start indexes from 1 in the DOM with skipping 1 index for the divider
    checkboxes.appendChild(
      createCheckboxItem({
        fieldId: args.fieldId,
        index: args.items.length + 2,
        itemData: noneOptionItemData,
        isExclusive: true,
        hiddenLabel: args.hiddenLabel
      })
    )
  }

  return checkboxes
}

const createErrorMessageNode = (args) => {
  const errorMessageSpan = document.createElement('span')
  errorMessageSpan.className = 'govie-visually-hidden'
  errorMessageSpan.innerText = 'Error:'

  const errorMessage = document.createElement('p')
  errorMessage.id = `${args.fieldId}-error`
  errorMessage.className = 'govie-error-message'

  errorMessage.appendChild(errorMessageSpan)
  errorMessage.append(` ${args.errorMessage}`)

  return errorMessage
}

const collectFieldSetDescribedby = (args) => {
  const describedby = []
  if (args.hint) {
    describedby.push(`${args.fieldId}-hint`)
  }

  if (args.errorMessage) {
    describedby.push(`${args.fieldId}-error`)
  }

  return describedby
}

const createFieldSetNode = (args) => {
  const fieldSet = document.createElement('fieldset')
  fieldSet.className = 'govie-fieldset'
  fieldSet.setAttribute('aria-describedby', collectFieldSetDescribedby(args))

  if (args.legend) {
    fieldSet.appendChild(createLegendNode(args))
  }

  if (args.hint) {
    fieldSet.appendChild(createHintNode(args))
  }

  if (args.errorMessage) {
    fieldSet.appendChild(createErrorMessageNode(args))
  }

  fieldSet.appendChild(createCheckboxesNode(args))

  return fieldSet
}

const Template = (args) => {
  const formGroupClassNames = ['govie-form-group']
  if (args.errorMessage) {
    formGroupClassNames.push('govie-form-group--error')
  }

  const formGroup = document.createElement('div')
  formGroup.className = formGroupClassNames.join(' ')

  formGroup.appendChild(createFieldSetNode(args))

  return beautifyHtmlNode(formGroup)
}

export const Default = Template.bind({})
Default.args = {
  legend: 'Organisation',
  items: [
    {
      label: 'Employment Tribunal',
      value: 'employment-tribunal'
    },
    {
      label: 'Ministry of Defence',
      value: 'MOD'
    },
    { label: 'Department for Transport', value: 'DfT' }
  ]
}

export const WithNormalLegend = Template.bind({})
WithNormalLegend.args = {
  legend: 'Organisation',
  legendAsHeading: false,
  items: [
    {
      label: 'Employment Tribunal',
      value: 'employment-tribunal'
    },
    {
      label: 'Ministry of Defence',
      value: 'MOD'
    },
    { label: 'Department for Transport', value: 'DfT' }
  ]
}

export const WithSmallCheckbox = Template.bind({})
WithSmallCheckbox.args = {
  fieldId: 'organisation',
  legend: 'Organisation',
  useSmallerBoxes: true,
  items: [
    {
      label: 'Employment Tribunal',
      value: 'employment-tribunal'
    },
    {
      label: 'Ministry of Defence',
      value: 'MOD'
    },
    { label: 'Department for Transport', value: 'DfT' }
  ]
}

export const WithHints = Template.bind({})
WithHints.args = {
  fieldId: 'nationality',
  legend: 'What is your nationality?',
  hint: 'If you have dual nationality, select all options that are relevant to you.',
  items: [
    {
      label: 'Irish',
      value: 'irish'
    },
    {
      label: 'British',
      value: 'british',
      hint: 'including English, Scottish, Welsh and Northern Irish'
    },
    {
      label: 'Citizen of another country',
      value: 'another-country'
    }
  ]
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  fieldId: 'nationality',
  legend: 'What is your nationality?',
  errorMessage:
    'Select if you are Irish, British or a citizen of a different country',
  hint: 'If you have dual nationality, select all options that are relevant to you.',
  items: [
    {
      label: 'Irish',
      value: 'irish'
    },
    {
      label: 'British',
      value: 'british',
      hint: 'including English, Scottish, Welsh and Northern Irish'
    },
    {
      label: 'Citizen of another country',
      value: 'another-country'
    }
  ]
}

export const WithNoneOption = Template.bind({})
WithNoneOption.args = {
  fieldId: 'travel',
  legend: 'Will you be travelling to any of these countries?',
  hint: 'Select all countries that apply',
  haveNoneOption: true,
  noneOptionLabel: 'No, I will not be travelling to any of these countries',
  items: [
    {
      label: 'France',
      value: 'france'
    },
    {
      label: 'Portugal',
      value: 'portugal'
    },
    {
      label: 'Spain',
      value: 'spain'
    }
  ]
}

export const WithConditionalInput = Template.bind({})
WithConditionalInput.args = {
  fieldId: 'contact',
  legend: 'How would you like to be contacted?',
  hint: 'Select all options that are relevant to you.',
  items: [
    {
      label: 'Email',
      value: 'email',
      conditionalInput: {
        id: 'contact-by-email',
        label: 'Email address',
        type: 'email',
        spellcheck: false,
        autocomplete: 'email'
      }
    },
    {
      label: 'Phone',
      value: 'phone',
      conditionalInput: {
        id: 'contact-by-phone',
        label: 'Phone number',
        type: 'tel',
        autocomplete: 'tel'
      }
    },
    {
      label: 'Text message',
      value: 'text-message',
      conditionalInput: {
        id: 'contact-by-text',
        label: 'Mobile phone number',
        type: 'tel',
        autocomplete: 'tel'
      }
    }
  ]
}
