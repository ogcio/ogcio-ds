import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import {
  heading,
  paragraph,
  list,
  link,
  insetText,
  details
} from '../../../../.storybook/helpers/reactStoriesAsHtml'

export default {
  title: 'Patterns/Contact a department or service',
  parameters: {
    docs: {
      description: {
        component:
          'Use this pattern whenever you need to help users contact your team or department. Carry out contextual user research to decide exactly where to use this pattern in a page or service.'
      }
    }
  },
  argTypes: {
    type: {
      options: ['Full', 'Contact information', 'Expading contact information'],
      control: { type: 'radio' }
    }
  },
  args: {
    type: 'Full'
  }
}

const createHeading = (text, size = 's', element = 'h3') =>
  parseHtmlString(heading({ text, size, element }))

const createParagraph = (text) => parseHtmlString(paragraph({ text }))

const createParagraphLink = (text) => {
  const noReceivedLink = link({ label: text })
  const linkParagraph = paragraph({ text: noReceivedLink })

  return linkParagraph
}

const createListContactList = ({ title, items }) => [
  createHeading(title),
  parseHtmlString(list({ items }))
]

const createFullPage = (args) => {
  const components = []

  components.push(createHeading('Get help with your application', 'm', 'h2'))
  components.push(createHeading('Telephone'))
  components.push(
    createParagraph(
      'If you have a unique reference number, have it with you when you call.'
    )
  )

  const infoList = parseHtmlString(
    list({
      items: [
        'Telephone: 000 000000',
        'Textphone: 000 000000',
        'Monday to Friday, 8am to 6pm',
        'Saturday and Sunday, 10am to 4pm'
      ]
    })
  )
  components.push(infoList)
  components.push(
    parseHtmlString(createParagraphLink('Find out about call charges'))
  )

  components.push(
    ...createListContactList({
      title: 'Email',
      items: [
        link({ label: 'name@example.com' }),
        'We aim to respond within 2 working days'
      ]
    })
  )

  components.push(
    ...createListContactList({
      title: 'Webchat',
      items: [
        link({ label: 'Speak to an adviser now' }),
        'Current waiting time is 17 minutes'
      ]
    })
  )

  components.push(createHeading('Address'))
  components.push(
    createParagraph('Address line 1<br>Address line 2<br>City<br>Eir code')
  )

  components.push(createHeading('Social media'))
  components.push(
    createParagraph(
      'You can use Twitter to get general help. We cannot discuss specific cases or individual applications, so please do not give any personal details.'
    )
  )
  components.push(createParagraph('Twitter: @govdotie'))

  return components
}

const createContactInformation = () => {
  const components = []

  components.push(createHeading('Talk to an advisor', 'm', 'h2'))

  const contactList = parseHtmlString(
    list({
      items: [
        'Telephone: 000 000000',
        'Textphone: 000 000000',
        'Monday to Friday, 9am to 5pm (except public holidays)'
      ]
    })
  )
  components.push(contactList)
  components.push(
    parseHtmlString(createParagraphLink('Find out about call charges'))
  )

  const container = parseHtmlString(insetText({ text: '' }))
  components.forEach((item) => container.appendChild(item))

  return container
}

const createExpandingContactInformation = () => {
  const contactsList = list({
    items: [
      'Telephone: 000 000000',
      'Monday to Friday, 8am to 6pm (except public holidays)',
      'Saturday and Sunday, 10am to 4pm'
    ]
  })

  const chargesText = createParagraphLink('Find out about call charges')

  const emailList = list({
    items: [
      link({ label: 'name@example.com' }),
      'We aim to respond within 2 working days'
    ]
  })

  return parseHtmlString(
    details({
      summary: 'If you need help completing this form',
      text: `${contactsList} ${chargesText} ${emailList}`
    })
  )
}

const createMainWrapper = (args) => {
  if (args.type === 'Contact information') {
    return createContactInformation()
  } else if (args.type === 'Expading contact information') {
    return createExpandingContactInformation()
  }

  const mainWrapper = document.createElement('div')
  const content = createFullPage(args)
  content.forEach((item) => {
    mainWrapper.appendChild(item)
  })

  return mainWrapper
}

const Template = (args) => {
  const body = createMainWrapper(args)
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}

export const ContactInformation = Template.bind({})
ContactInformation.args = {
  type: 'Contact information'
}

export const ExpandingContactInformation = Template.bind({})
ExpandingContactInformation.args = {
  type: 'Expading contact information'
}
