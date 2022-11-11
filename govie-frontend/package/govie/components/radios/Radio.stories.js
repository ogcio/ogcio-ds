export default {
  title: 'Radio',
  parameters: {
    docs: {
      description: {
        component:
          'Use the radios component when users can only select one option from a list.',
      },
    },
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    id: {
      type: { required: true },
      control: 'text',
    },
    label: {
      type: { required: true },
      control: 'text',
    },
    options: {
      type: { required: true },
      control: 'text',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    generalHint: { control: 'text' },
    optionsHint: { control: 'array' },
    extraOptions: { control: 'text' },
    extraOptionsDivider: { control: 'text' },
    extraOptionsHint: { control: 'array' },
    inline: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
  args: {
    inline: false,
    size: 'large',
  },
}

const sizesMap = {
  small: 's',
  medium: 'm',
  large: 'l',
}

const createLegend = (label, size) => {
  const legend = document.createElement('legend')

  legend.className = `govie-fieldset__legend govie-fieldset__legend--${sizesMap[size]}`

  const h1 = document.createElement('h1')
  h1.className = 'govie-fieldset__heading'
  h1.innerHTML = label

  legend.appendChild(h1)

  return legend
}

const createRadioItem = ({ id, value, name, label, optionHint }) => {
  const item = document.createElement('div')
  item.className = 'govie-radios__item'

  const input = document.createElement('input')
  input.id = id
  input.name = name
  input.type = 'radio'
  input.value = value
  input.className = 'govie-radios__input'

  const labelComponent = document.createElement('label')
  labelComponent.className = 'govie-labal govie-radios__label'
  labelComponent.for = id
  labelComponent.innerText = label

  item.appendChild(input)
  item.appendChild(labelComponent)

  if (optionHint) {
    const hint = document.createElement('div')
    hint.className = 'govie-hint govie-radios__hint'
    hint.id = `${id}-hint`
    hint.innerText = optionHint

    item.appendChild(hint)
  }

  return item
}

const Template = (args) => {
  const container = document.createElement('div')
  const error = args.errorMessage ? 'govie-form-group--error' : ''

  container.className = ['govie-form-group', error].join(' ')

  const fieldset = document.createElement('fieldset')
  fieldset.className = 'govie-fieldset'

  container.appendChild(createLegend(args.label, args.size))

  if (args.errorMessage) {
    const p = document.createElement('p')
    p.id = `${args.id}-error`
    p.className = 'govie-error-message'
    
    const span = document.createElement('span')
    span.className = 'govie-visually-hidden'
    span.innerText = 'Error:'

    p.appendChild(span)
    p.insertAdjacentText('beforeend', args.errorMessage)

    container.appendChild(p)
  }

  if (args.generalHint) {
    const hint = document.createElement('div')
    hint.id = args.id
    hint.className = 'govie-hint'
    hint.innerText = args.generalHint

    container.appendChild(hint)
  }

  const group = document.createElement('div')

  const inline = args.inline ? 'govie-radios--inline' : ''
  group.className = [`govie-radios govie-radios--${args.size}`, inline].join(
    ' '
  )
  group.setAttribute('data-module', 'govie-radios')

  args.options?.split(',').forEach((label, index) => {
    group.appendChild(
      createRadioItem({
        id: `${args.id}-${index}`,
        name: args.id,
        value: label.toLowerCase(),
        label,
        optionHint: args.optionsHint ? args.optionsHint[index] : null,
      })
    )
  })

  if (args.extraOptions) {
    const divider = document.createElement('div')
    divider.className = 'govie-radios__divider'
    divider.innerText = args.extraOptionsDivider

    group.appendChild(divider)

    args.extraOptions?.split(',').forEach((label, index) => {
      group.appendChild(
        createRadioItem({
          id: `${args.id}-${args.options.length + index}`,
          name: args.id,
          value: label.toLowerCase(),
          label,
          optionHint: args.extraOptionsHint
            ? args.extraOptionsHint[index]
            : null,
        })
      )
    })
  }

  container.appendChild(group)

  return container
}

export const Radio = Template.bind({})
Radio.args = {
  id: 'where-do-you-live',
  label: 'Where do you live?',
  options: 'England,Scottland,Ireland',
}

export const SubheadingRadio = Template.bind({})
SubheadingRadio.args = {
  id: 'where-do-you-live',
  label: 'Where do you live?',
  options: 'England,Scottland,Ireland',
  title: false,
}

export const InlineRadio = Template.bind({})
InlineRadio.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  inline: true,
}

export const SmallRadio = Template.bind({})
SmallRadio.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  size: 'small',
}

export const RadioWithHints = Template.bind({})
RadioWithHints.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  generalHint:
    'This includes changing your last name or spelling your name differently.',
}

export const RadioWithOptionsHints = Template.bind({})
RadioWithOptionsHints.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  generalHint:
    'This includes changing your last name or spelling your name differently.',
  optionsHint: ['Yes, I have changed my name', "No, I didn't change my name"],
}

export const RadioWithDivider = Template.bind({})
RadioWithDivider.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  extraOptionsDivider: 'or',
  extraOptions: 'Not sure',
}

export const RadioWithError = Template.bind({})
RadioWithError.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  errorMessage: 'Select an option',
}
