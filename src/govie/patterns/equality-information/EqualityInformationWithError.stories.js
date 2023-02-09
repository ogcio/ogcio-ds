import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as radios } from '../../components/radios/Radio.stories'
import { Default as button } from '../../components/button/PrimaryButton.stories'
import { Default as dateInput } from '../../components/date-input/DateInput.stories'

export default {
  title: 'Patterns/Equality information/With error',
  parameters: {
    docs: {
      description: {
        component:
          'If a user enters information that’s valid but incomplete, accept it. For example, they might just enter their year of birth without the day or month.\nError messages should be styled like this:',
      },
    },
  },
  argTypes: {
    type: {
      options: ['default', 'birthdate'],
      control: { type: 'radio' },
    },
    errorMessage: { control: 'text' },
  },
  args: {
    type: 'default',
  },
}

const createBirthForm = (errorMessage) => {
  const date = dateInput({
    legend: 'What is your date of birth?',
    hint: 'For example, 31 3 1980. If you prefer not to say, continue without entering any information.',
    legendAsHeading: true,
    errorMessage,
  })

  return parseHtmlString(date)
}

const createWithErrorForm = (errorMessage) => {
  const radio = radios({
    id: 'ethnicity',
    size: 'large',
    label: 'What is your ethnic group?',
    options: [
      'White',
      'Mixed or multiple ethnic groups',
      'Asian or Asian British',
      'Black, African, Caribbean or Black British',
      'Other ethnic group',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
    errorMessage,
  })

  return parseHtmlString(radio)
}

const Template = (args) => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  switch (args.type) {
    case 'birthdate':
      container.appendChild(createBirthForm(args.errorMessage))
      break
    default:
      container.append(createWithErrorForm(args.errorMessage))
  }

  container.appendChild(parseHtmlString(button({ label: 'Continue' })))
  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {
  errorMessage: 'Select an ethnic group or ‘Prefer not to say’',
}

export const DateOfBirth = Template.bind({})
DateOfBirth.args = {
  type: 'birthdate',
  errorMessage: 'Enter your date of birth or leave blank',
}
