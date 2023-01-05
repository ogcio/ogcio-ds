import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Form/Text Input',
  parameters: {
    docs: {
      component:
        'Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number.',
    },
  },
  argTypes: {
    fluid: {
      control: 'boolean',
      description:
        'Use the fluid text inputs to scale the width in accordance to the column grid layout you are using. By default, the first variation is ‘Full’ where the input will fill the container.',
    },
    fluidWidth: {
      control: { type: 'radio' },
      options: [
        'full',
        'three-quarters',
        'two-thirds',
        'one-half',
        'one-third',
        'one-quarter',
      ],
      description:
        'Use the width override classes to reduce the width of an input in relation to its parent container, for example, to two-thirds.',
    },
    characterWidth: {
      control: 'number',
      description:
        'Use fixed width inputs for content that has a specific, known length. For example, postcode inputs should be postcode-sized.',
    },
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
    prefix: {
      control: 'text',
      description:
        'Use prefixes and suffixes to help users enter things like currencies and measurements.',
    },
    suffix: {
      control: 'text',
      description:
        'Use prefixes and suffixes to help users enter things like currencies and measurements.',
    },
    errorMessage: { control: 'text' },
    inputExtraClasses: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
    autocomplete: { control: 'text' },
  },
}

const getTextInputDescribedBy = (args) => {
  const describedBy = []

  if (args.hint) {
    describedBy.push(`${args.fieldId}-hint`)
  }

  if (args.errorMessage) {
    describedBy.push(`${args.fieldId}-error`)
  }

  return describedBy
}

const getTextInputClassNames = (args) => {
  const inputClassNames = ['govie-input']

  if (
    !args.fluid &&
    Boolean(args.characterWidth) &&
    !isNaN(args.characterWidth)
  ) {
    inputClassNames.push(`govie-input--width-${args.characterWidth}`)
  }

  if (args.fluid && args.fluidWidth) {
    inputClassNames.push(`govie-!-width-${args.fluidWidth}`)
  }

  if (args.errorMessage) {
    inputClassNames.push('govie-input--error')
  }

  if (args.inputExtraClasses) {
    inputClassNames.push(args.inputExtraClasses)
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

const createAffixElement = (text, isPrefix) => {
  const affix = document.createElement('div')
  affix.setAttribute('aria-hidden', 'true')
  affix.className = isPrefix ? 'govie-input__prefix' : 'govie-input__suffix'
  affix.innerHTML = text

  return affix
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

const createTextInputElement = (args) => {
  const textInputDescribedBy = getTextInputDescribedBy(args)
  const textInput = document.createElement('input')

  textInput.setAttribute('type', args.type ?? 'text')
  textInput.id = args.fieldId
  textInput.name = args.fieldName
  textInput.className = getTextInputClassNames(args).join(' ')

  if (args.value) {
    textInput.setAttribute('value', args.value)
  }

  if (args.autocomplete) {
    textInput.setAttribute('autocomplete', args.autocomplete)
  }

  if (textInputDescribedBy.length > 0) {
    textInput.setAttribute('aria-describedby', textInputDescribedBy.join(' '))
  }

  if (!args.prefix && !args.suffix) {
    return textInput
  }

  textInput.spellcheck = 'false'
  const ipnutWrapper = document.createElement('div')
  ipnutWrapper.className = 'govie-input__wrapper'

  if (args.prefix) {
    ipnutWrapper.appendChild(createAffixElement(args.prefix, true))
  }

  ipnutWrapper.appendChild(textInput)

  if (args.suffix) {
    ipnutWrapper.appendChild(createAffixElement(args.suffix, false))
  }

  return ipnutWrapper
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

  formGroup.appendChild(createTextInputElement(args))

  return beautifyHtmlNode(formGroup)
}

export const Default = Template.bind({})
Default.args = {
  fieldId: 'default-input',
  fieldName: 'default-input',
  fluid: true,
  label: 'What is the name of the page?',
  labelAsHeading: true,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: 'Input with label',
  fieldId: 'input-field',
  fieldName: 'input-field',
  fluid: true,
}

export const WithLabelAsHeading = Template.bind({})
WithLabelAsHeading.args = {
  label: 'Input with label',
  labelAsHeading: true,
  fieldId: 'input-field',
  fieldName: 'input-field',
  fluid: true,
}

export const WithLabelAndHint = Template.bind({})
WithLabelAndHint.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  label: 'Input with label',
  hint: 'And hint',
  fluid: true,
}

export const WithHint = Template.bind({})
WithHint.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  hint: 'Input with hint',
  fluid: true,
}

export const WithoutLabelOrHint = Template.bind({})
WithoutLabelOrHint.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  fluid: true,
}

export const FluidWidth = Template.bind({})
FluidWidth.args = {
  label: 'Full fluid with (default)',
  fieldId: 'input-field',
  fieldName: 'input-field',
  fluid: true,
}

export const HalfFluidWidth = Template.bind({})
HalfFluidWidth.args = {
  label: 'Half fluid width',
  fieldId: 'input-field',
  fieldName: 'input-field',
  fluid: true,
  fluidWidth: 'one-half',
}

export const FixedWidth = Template.bind({})
FixedWidth.args = {
  label: '4 character width',
  fieldId: 'input-field',
  fieldName: 'input-field',
  fluid: false,
  characterWidth: 4,
}

export const WithBothAffix = Template.bind({})
WithBothAffix.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  prefix: '€',
  suffix: 'per item',
}

export const WithPrefix = Template.bind({})
WithPrefix.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  prefix: '€',
}

export const WithSuffix = Template.bind({})
WithSuffix.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  suffix: 'kg',
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  label: 'What is the page name?',
  hint: 'Some hint',
  errorMessage: 'Enter a page name',
}

export const WithErrorMessageAndAffix = Template.bind({})
WithErrorMessageAndAffix.args = {
  fieldId: 'input-field',
  fieldName: 'input-field',
  label: 'What is the cost per item, in Euros?',
  labelAsHeading: true,
  errorMessage: 'Enter a cost per item, in Euros',
  prefix: '€',
  suffix: 'per item',
}
