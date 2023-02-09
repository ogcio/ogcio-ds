import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Form/Radio',
  parameters: {
    docs: {
      description: {
        component:
          'Use the radios component when users can only select one option from a list.',
      },
    },
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
      control: 'array',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      type: { required: true },
    },
    generalHint: { control: 'text' },
    optionsHint: { control: 'array' },
    extraOptions: { control: 'array' },
    extraOptionsDivider: { control: 'text' },
    extraOptionsHint: { control: 'array' },
    inline: { control: 'boolean' },
    errorMessage: { control: 'text' },
    conditionals: { control: 'text' },
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

const createRadioItem = ({
  id,
  value,
  name,
  label,
  optionHint,
  conditional,
}) => {
  const items = []
  const item = document.createElement('div')
  item.className = 'govie-radios__item'

  const input = document.createElement('input')
  input.id = id
  input.name = name
  input.type = 'radio'
  input.value = value
  input.className = 'govie-radios__input'
  conditional && input.setAttribute('data-aria-controls', `conditional-${id}`)

  const labelComponent = document.createElement('label')
  labelComponent.className = 'govie-label govie-radios__label'
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

  items.push(item)

  if (conditional) {
    const conditionalItem = document.createElement('div')
    conditionalItem.className =
      'govie-radios__conditional govie-radios__conditional--hidden'
    conditionalItem.id = `conditional-${id}`

    const itemGroup = document.createElement('div')
    itemGroup.className = 'govie-form-group'

    const conditionalLabel = document.createElement('label')
    conditionalLabel.className = 'govie-label'
    conditionalLabel.for = `${id}-conditional`
    conditionalLabel.innerText = conditional

    itemGroup.appendChild(conditionalLabel)

    const conditionalInput = document.createElement('input')
    conditionalInput.id = `${id}-conditional`
    conditionalInput.type = 'text'
    conditionalInput.false = value
    conditionalInput.className = 'govie-input govie-!-width-one-third'

    itemGroup.appendChild(conditionalInput)

    conditionalItem.appendChild(itemGroup)
    items.push(conditionalItem)
  }

  return items
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
    hint.id = `${args.id}-hint`
    hint.className = 'govie-hint'
    hint.innerHTML = args.generalHint

    container.appendChild(hint)
  }

  const group = document.createElement('div')
  group.setAttribute('data-module', 'govie-radios')
  const inline = args.inline ? 'govie-radios--inline' : ''
  group.className = [`govie-radios govie-radios--${args.size}`, inline].join(
    ' '
  )
  group.setAttribute('data-module', 'govie-radios')

  const conditionals = args.conditionals?.split(',')
  args.options.forEach((label, index) => {
    group.append(
      ...createRadioItem({
        id: `${args.id}-${index}`,
        name: args.id,
        value: label.toLowerCase(),
        label,
        optionHint: args.optionsHint ? args.optionsHint[index] : null,
        conditional: conditionals ? conditionals[index] : null,
      })
    )
  })

  if (args.extraOptions) {
    const divider = document.createElement('div')
    divider.className = 'govie-radios__divider'
    divider.innerText = args.extraOptionsDivider

    group.appendChild(divider)

    args.extraOptions.forEach((label, index) => {
      group.append(
        ...createRadioItem({
          id: `${args.id}-${args.options.length + index}`,
          name: args.id,
          value: label.toLowerCase(),
          label,
          optionHint: args.extraOptionsHint
            ? args.extraOptionsHint[index]
            : null,
          conditional: conditionals ? conditionals[index] : null,
        })
      )
    })
  }

  container.appendChild(group)

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {
  id: 'where-do-you-live',
  label: 'Where do you live?',
  options: ['England', 'Scotland', 'Ireland'],
}

export const Inline = Template.bind({})
Inline.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: ['Yes', 'No'],
  inline: true,
}

export const Small = Template.bind({})
Small.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: ['Yes', 'No'],
  size: 'small',
}

export const WithHints = Template.bind({})
WithHints.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: ['Yes', 'No'],
  generalHint:
    'This includes changing your last name or spelling your name differently.',
}

export const WithOptionsHints = Template.bind({})
WithOptionsHints.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: ['Yes', 'No'],
  generalHint:
    'This includes changing your last name or spelling your name differently.',
  optionsHint: ['Yes, I have changed my name', "No, I didn't change my name"],
}

export const WithDivider = Template.bind({})
WithDivider.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: ['Yes', 'No'],
  extraOptionsDivider: 'or',
  extraOptions: ['Not sure'],
}

export const WithError = Template.bind({})
WithError.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: ['Yes', 'No'],
  errorMessage: 'Select an option',
}

export const WithConditional = Template.bind({})
WithConditional.args = {
  id: 'contact',
  label: 'How would you prefer to be contacted?',
  options: ['Email', 'Phone'],
  conditionals: 'Email address,Phone number',
}
