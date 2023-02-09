import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as radios } from '../../components/radios/Radio.stories'
import { Default as button } from '../../components/button/PrimaryButton.stories'

export default {
  title: 'Patterns/Equality information/Disability',
  parameters: {
    docs: {
      description: {
        component: 'Use this approach to ask about disability.',
      },
    },
  },
  argTypes: {
    type: {
      options: ['default', 'disability impact'],
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'default',
  },
}

const createDisabilityForm = () => {
  const radio = radios({
    id: 'disability',
    size: 'large',
    label:
      'Do you have any physical or mental health conditions or illness lasting or expected to last 12 months or more?',
    options: ['Yes', 'No'],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const createDisabilityImpactForm = () => {
  const radio = radios({
    id: 'disability',
    size: 'large',
    generalHint: 'For example eating, washing, walking or going shopping.',
    label:
      'Do any of your conditions or illnesses reduce your ability to carry out day to day activities?',
    options: ['Yes, a lot', 'Yes, a little', 'No at all'],
    extraOptionsDivider: 'or',
    extraOptions: ['Prefer not to say'],
  })

  return parseHtmlString(radio)
}

const Template = (args) => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  switch (args.type) {
    case 'disability impact':
      container.appendChild(createDisabilityImpactForm())
      break
    default:
      container.append(createDisabilityForm())
  }

  container.appendChild(parseHtmlString(button({ label: 'Continue' })))
  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}

export const ImpactOfDisability = Template.bind({})
ImpactOfDisability.args = {
  type: 'disability impact',
}
ImpactOfDisability.parameters = {
  docs: {
    description: {
      story:
        'If the user answers ‘yes’ for the disability, ask about the impact of their condition or illness.',
    },
  },
}
