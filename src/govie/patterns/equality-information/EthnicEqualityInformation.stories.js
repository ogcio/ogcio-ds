import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as radios } from '../../components/radios/Radio.stories'
import { Default as button } from '../../components/button/PrimaryButton.stories'

export default {
  title: 'Patterns/Equality information/Ethnic group',
  argTypes: {
    type: {
      options: [
        'default',
        'white background',
        'multiple ethnic groups',
        'asian or asian british',
        'black, african, caribbean or black british',
        'other backgrounds',
      ],
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'default',
  },
}

const createEthnicForm = () => {
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
  })

  return parseHtmlString(radio)
}

const createWhiteEthnicForm = () => {
  const radio = radios({
    id: 'ethnicity-detail',
    size: 'large',
    label: 'Which of the following best describes your White background?',
    options: [
      'English, Welsh, Scottish, Northern Irish or British',
      'Irish',
      'Gypsy or Irish Traveller',
      'Any other White background',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const createMultipleEthnicForm = () => {
  const radio = radios({
    id: 'ethnicity-detail',
    size: 'large',
    label:
      'Which of the following best describes your mixed or multiple ethnic groups background?',
    options: [
      'White and Black Caribbean',
      'White and Black African',
      'White and Asian',
      'Any other mixed or multiple ethnic background',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const createAsianEthnicForm = () => {
  const radio = radios({
    id: 'ethnicity-detail',
    size: 'large',
    label:
      'Which of the following best describes your Asian or Asian British background?',
    options: [
      'Indian',
      'Pakistani',
      'Bangladeshi',
      'Chinese',
      'Any other Asian background',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const createBlackEthnicForm = () => {
  const radio = radios({
    id: 'ethnicity-detail',
    size: 'large',
    label:
      'Which of the following best describes your Black, African, Caribbean or Black British background?',
    options: [
      'African',
      'Caribbean',
      'Any other Black, African or Caribbean background',
    ],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const createOtherEthnicForm = () => {
  const radio = radios({
    id: 'ethnicity-detail',
    size: 'large',
    label: 'Which of the following best describes your background?',
    options: ['Arab', 'Any other ethnic group'],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const Template = (args) => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  switch (args.type) {
    case 'white background':
      container.appendChild(createWhiteEthnicForm())
      break
    case 'multiple ethnic groups':
      container.appendChild(createMultipleEthnicForm())
      break
    case 'asian or asian british':
      container.appendChild(createAsianEthnicForm())
      break
    case 'black, african, caribbean or black british':
      container.appendChild(createBlackEthnicForm())
      break
    case 'other backgrounds':
      container.appendChild(createOtherEthnicForm())
      break
    default:
      container.append(createEthnicForm())
  }

  container.appendChild(parseHtmlString(button({ label: 'Continue' })))
  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}

export const White = Template.bind({})
White.storyName = 'White background'
White.args = {
  type: 'white background',
}

export const MixedEthnicGroups = Template.bind({})
MixedEthnicGroups.storyName = 'Mixed or multiple ethnic groups background'
MixedEthnicGroups.args = {
  type: 'multiple ethnic groups',
}

export const AsianOrAsianBritish = Template.bind({})
AsianOrAsianBritish.storyName = 'Asian or Asian British background'
AsianOrAsianBritish.args = {
  type: 'asian or asian british',
}

export const Black = Template.bind({})
Black.storyName = 'Black, African, Caribbean Or Black British background'
Black.args = {
  type: 'black, african, caribbean or black british',
}

export const OtherEthnicGroups = Template.bind({})
OtherEthnicGroups.storyName = 'Other backgrounds'
OtherEthnicGroups.args = {
  type: 'other backgrounds',
}
