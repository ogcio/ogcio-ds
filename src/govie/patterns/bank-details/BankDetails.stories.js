import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as input } from '../../components/input/TextInput.stories'
import { Default as button } from '../../components/button/PrimaryButton.stories'
import { Default as radios } from '../../components/radios/Radio.stories'

export default {
  title: 'Patterns/Bank details',
  parameters: {
    docs: {
      description: {
        component:
          'Follow this pattern if you need users to provide their bank details so you can pay them.'
      }
    }
  },
  argTypes: {
    type: {
      options: [
        'default',
        'branching question',
        'international bank account details',
        'with error'
      ],
      control: { type: 'radio' }
    }
  },
  args: {
    type: 'default'
  }
}

const createInput = ({
  id,
  label,
  autocomplete,
  inputExtraClasses,
  errorMessage,
  hint
}) => {
  const bankInput = input({
    fieldId: id,
    fieldName: id,
    fluid: true,
    label,
    inputExtraClasses,
    autocomplete,
    errorMessage,
    hint
  })

  return parseHtmlString(bankInput)
}

const createForm = () => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  container.appendChild(
    parseHtmlString(
      heading({ text: 'Bank or building society account details' })
    )
  )

  const name = createInput({
    id: 'name-on-the-account',
    label: 'Name on the account',
    autocomplete: 'name'
  })
  name.setAttribute('spellcheck', false)
  container.appendChild(name)

  const sortCode = createInput({
    id: 'sort-code',
    label: 'Sort code',
    inputExtraClasses: 'govie-input--width-5'
  })
  sortCode.setAttribute('spellcheck', false)
  sortCode.setAttribute('inputmode', 'numeric')
  container.appendChild(sortCode)

  const accountNumber = createInput({
    id: 'account-number',
    label: 'Account number',
    hint: 'Must be between 6 and 8 digits long',
    inputExtraClasses: 'govie-input--width-10'
  })
  accountNumber.setAttribute('spellcheck', false)
  accountNumber.setAttribute('inputmode', 'numeric')
  container.appendChild(accountNumber)

  const societyRollNumber = createInput({
    id: 'roll-number',
    label: 'Building society roll number (if you have one)',
    hint: 'You can find it on your card, statement or passbook',
    inputExtraClasses: 'govie-input--width-10'
  })
  societyRollNumber.setAttribute('spellcheck', false)
  container.appendChild(societyRollNumber)

  container.appendChild(parseHtmlString(button({ label: 'Continue' })))

  return container
}

const createFormWithError = () => {
  const inputError = createInput({
    id: 'sort-code',
    label: 'Sort code',
    errorMessage: 'Enter a valid sort code like 309430',
    inputExtraClasses: 'govie-input--width-5',
    value: 12,
    hint: 'Must be 6 digits long'
  })

  inputError.setAttribute('inputmode', 'numeric')
  inputError.setAttribute('spellcheck', false)

  return inputError
}

const createPaymentForm = () => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  const radio = radios({
    id: 'method-of-payment',
    size: 'large',
    label: 'How do you want to be paid?',
    options: [
      'UK bank or building society account',
      'Non-UK bank account',
      'Cheque',
      'None of the above'
    ],
    optionsHint: [null, null, null, "We'll contact you to arrange payment"]
  })

  container.appendChild(parseHtmlString(radio))
  container.appendChild(parseHtmlString(button({ label: 'Continue' })))

  return container
}

const createInternationalBankAccountForm = () => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  const bicCode = createInput({
    id: 'bic-code',
    label: 'BIC or SWIFT code',
    inputExtraClasses: 'govie-input--width-10',
    hint: 'Must be between 8 and 11 characters long. You can ask your bank or check your bank statement'
  })
  bicCode.setAttribute('spellcheck', false)
  container.appendChild(bicCode)

  const iban = createInput({
    id: 'iban',
    label: 'IBAN',
    inputExtraClasses: 'govie-input--width-10',
    hint: 'You can ask your bank or check your bank statement'
  })
  iban.setAttribute('spellcheck', false)

  container.appendChild(iban)
  return container
}

const Template = (args) => {
  switch (args.type) {
    case 'with error':
      return beautifyHtmlNode(createFormWithError())
    case 'branching question':
      return beautifyHtmlNode(createPaymentForm())
    case 'international bank account details':
      return beautifyHtmlNode(createInternationalBankAccountForm())
    default:
      return beautifyHtmlNode(createForm())
  }
}

export const Default = Template.bind({})
Default.args = {}

export const PaymentForm = Template.bind({})
PaymentForm.args = {
  type: 'branching question'
}

export const InternationalBankAccountDetails = Template.bind({})
InternationalBankAccountDetails.args = {
  type: 'international bank account details'
}

export const WithError = Template.bind({})
WithError.parameters = {
  docs: {
    description: {
      story: 'Error messages should be styled like this:'
    }
  }
}
WithError.args = {
  type: 'with error'
}
