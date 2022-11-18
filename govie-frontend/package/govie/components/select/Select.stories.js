export default {
  title: 'Select',
  parameters: {
    docs: {
      description: {
        component:
          'The select component should only be used as a last resort in public-facing services because research shows that some users find selects very difficult to use.',
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
    hint: { 
      control: 'text',
      description: 'You can add hint text to help the user understand the options and choose one of them.'
    },
    errorMessage: { control: 'text' },
    options: { control: 'object' },
  },
  args: {
    id: 'default-select',
    label: 'Default select',
    options: {
      choose: 'Default select',
      northeast: 'Option 1',
      northwest: 'Option 2',
      southeast: 'Option 3',
      southwest: 'Option 4',
    },
  },
}

const Template = (args) => {
  const group = document.createElement('div')
  const classnames = ['govie-form-group']

  const label = document.createElement('label')
  label.className = 'govie-label'
  label.setAttribute('for', args.id)
  label.innerText = args.label

  group.appendChild(label)

  if (args.hint) {
    const hint = document.createElement('div')
    hint.className = 'govie-hint'
    hint.id = `${args.id}-hint`
    hint.innerText = args.hint
    group.appendChild(hint)
  }

  const select = document.createElement('select')
  select.className = 'govie-select'
  select.id = args.id
  select.name = args.id

  Object.entries(args.options).forEach(([value, label]) => {
    const option = document.createElement('option')
    option.innerText = label
    option.value = value

    select.appendChild(option)
  })

  if (args.errorMessage) {
    classnames.push('govie-form-group--error')
    group.insertAdjacentHTML('beforeend',  
      `<p id="default-select-error" class="govie-error-message">
        <span class="govie-visually-hidden">Error:</span> ${args.errorMessage}
      </p>
    `)
  }

  group.className = classnames.join(' ')
  group.appendChild(select)

  return group
}

export const Select = Template.bind({})
Select.args = {}

export const SelectWithHint = Template.bind({})
SelectWithHint.args = {
  hint: 'This can be different to where you went before'
}

export const SelectWithError = Template.bind({})
SelectWithError.args = {
  errorMessage: 'Error message'
}
