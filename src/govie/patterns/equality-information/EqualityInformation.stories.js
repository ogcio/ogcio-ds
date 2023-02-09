import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as radios } from '../../components/radios/Radio.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as details } from '../../components/details/Details.stories'
import { Default as button } from '../../components/button/PrimaryButton.stories'
import { Default as dateInput } from '../../components/date-input/DateInput.stories'

export default {
  title: 'Patterns/Equality information',
  parameters: {
    docs: {
      description: {
        component:
          'Collecting equality information in a consistent way across the public sector makes the data more useful. For example, an organisation can benchmark its own services against other public sector services or the population in general. And it can adjust its approach if it finds a particular group is under-represented.',
      },
    },
  },
  argTypes: {
    type: {
      options: [
        'default',
        'birthdate',
        'marriage or civil partnership status',
        'religion',
        'sex and gender',
        'sexual orientation',
      ],
      control: { type: 'radio' },
    },
    errorMessage: { control: 'text' },
  },
  args: {
    type: 'default',
  },
}

const createEquityForm = () => {
  const container = []

  container.push(
    parseHtmlString(heading({ text: 'We have received your application' }))
  )

  container.push(
    parseHtmlString(
      paragraph({
        text: 'Before you finish using the service, we’d like to ask some equality questions.',
      })
    )
  )

  container.push(
    parseHtmlString(
      radios({
        id: 'equalities-info',
        size: 'medium',
        label: 'Do you want to answer the equality questions?',
        options: [
          'Yes, answer the equality questions (takes 2 minutes)',
          'No, skip the equality questions',
        ],
        // TODO: use paragraph story
        generalHint: `
        <p class="govie-!-margin-top-0">These questions are optional. [Add a couple of sentences explaining why you’re asking the questions and what you’ll do with the information].</p>
        <p>Your answers will not affect your application.</p>
      `,
      })
    )
  )

  container.push(
    parseHtmlString(
      details({
        summary: 'Why we ask equality questions',
        text: '[Consider adding an optional longer explanation of what you’re asking the questions and what you’ll do with the information].',
      })
    )
  )

  return container
}

const createBirthForm = () => {
  const date = dateInput({
    legend: 'What is your date of birth?',
    hint: 'For example, 31 3 1980. If you prefer not to say, continue without entering any information.',
    legendAsHeading: true,
  })

  return parseHtmlString(date)
}

const createMarriageForm = () => {
  const radio = radios({
    id: 'marriage-civil-partnership',
    size: 'large',
    label: 'What is your legal marital or registered civil partnership status?',
    options: [
      'Never married and never registered in a civil partnership',
      'Married',
      'In a registered civil partnership',
      'Separated, but still legally married',
      'Separated, but still legally in a civil partnership',
      'Divorced',
      'Formerly in a civil partnership which is now legally dissolved',
      'Widowed',
      'Surviving partner from a registered civil partnership',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const createReligionForm = () => {
  const radio = radios({
    id: 'religion',
    size: 'large',
    label: 'What is your religion?',
    options: [
      'No religion',
      'Christian',
      'Buddhist',
      'Hindu',
      'Jewish',
      'Muslim',
      'Sikh',
      'Any other religion',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
    optionsHint: [
      null,
      'Including Church of England, Catholic, Protestant and all other Christian denominations.',
    ],
  })

  return parseHtmlString(radio)
}

const createSexAndGenderForm = () => {
  const components = []

  components.push(parseHtmlString(heading({ text: 'Sex and gender identity' })))

  const sexRadio = radios({
    id: 'sex',
    size: 'medium',
    label: 'What is your sex?',
    options: ['Female', 'Male', 'Prefer not to say'],
  })

  components.push(parseHtmlString(sexRadio))

  const identify = radios({
    id: 'gender-identity',
    size: 'medium',
    label:
      'Is the gender you identify with the same as your sex registered at birth?',
    options: ['Yes', 'No', 'Prefer not to say'],
  })

  components.push(parseHtmlString(identify))
  return components
}

const createSexualOrientationForm = () => {
  const radio = radios({
    id: 'sexual-orientation',
    size: 'large',
    label: 'Which of the following best describes your sexual orientation?',
    options: [
      'Heterosexual or straight',
      'Gay or lesbian',
      'Bisexual',
      'Other',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
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
      container.appendChild(createBirthForm())
      break
    case 'marriage or civil partnership status':
      container.appendChild(createMarriageForm())
      break
    case 'religion':
      container.appendChild(createReligionForm())
      break
    case 'sex and gender':
      container.append(...createSexAndGenderForm())
      break
    case 'sexual orientation':
      container.append(createSexualOrientationForm())
      break
    default:
      container.append(...createEquityForm())
  }

  container.appendChild(parseHtmlString(button({ label: 'Continue' })))
  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}

export const DateOfBirth = Template.bind({})
DateOfBirth.args = {
  type: 'birthdate',
}
DateOfBirth.parameters = {
  docs: {
    description: {
      story: 'Use this approach to ask for the user’s date of birth.',
    },
  },
}

export const Marriage = Template.bind({})
Marriage.args = {
  type: 'marriage or civil partnership status',
}
Marriage.parameters = {
  docs: {
    description: {
      story:
        'Use this approach to ask about marriage or civil partnership status.',
    },
  },
}

export const Religion = Template.bind({})
Religion.args = {
  type: 'religion',
}

export const SexAndGender = Template.bind({})
SexAndGender.args = {
  type: 'sex and gender',
}

export const SexualOrientation = Template.bind({})
SexualOrientation.args = {
  type: 'sexual orientation',
}
