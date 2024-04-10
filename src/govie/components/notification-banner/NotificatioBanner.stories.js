import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Layout/Notification Panel',
  parameters: {
    docs: {
      description: {
        component:
          'Use a notification banner to tell the user about something they need to know about, but that’s not directly related to the page content.'
      }
    }
  },
  argTypes: {
    header: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The notification banner header text content'
    },
    content: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The notification banner text content'
    },
    success: {
      control: 'boolean',
      description:
        'Use the green version of the notification banner to confirm that something they’re expecting to happen has happened.'
    }
  },
  args: {
    success: false
  }
}

const Template = (args) => {
  const panel = document.createElement('div')
  panel.className = `govie-notification-banner ${
    args.success ? 'govie-notification-banner--success' : ''
  }`

  panel.setAttribute('role', args.success ? 'alert' : 'region')
  panel.setAttribute('aria-labelledby', 'govie-notification-banner-title')
  panel.setAttribute('data-module', 'govie-notification-banner')

  const header = document.createElement('div')
  header.className = 'govie-notification-banner__header'

  const h2 = document.createElement('h2')
  h2.className = 'govie-notification-banner__title'
  h2.setAttribute('id', 'govie-notification-banner-title')
  h2.innerText = args.header

  header.appendChild(h2)
  panel.appendChild(header)

  const content = document.createElement('div')
  content.className = 'govie-notification-banner__content'

  const p = document.createElement('p')
  p.className = 'govie-notification-banner__heading'
  p.innerHTML = args.content

  content.appendChild(p)
  panel.appendChild(content)

  return beautifyHtmlNode(panel)
}

export const Default = Template.bind({})
Default.args = {
  header: 'Important',
  content:
    'There may be a delay in processing your application because of the coronavirus outbreak.'
}

export const Success = Template.bind({})
Success.args = {
  header: 'Important',
  content: 'Training outcome recorded and trainee withdrawn.',
  success: true
}

export const WithLink = Template.bind({})
WithLink.args = {
  header: 'Important',
  content: `
    You have 7 days left to send your application.
    <a class="govie-notification-banner__link" href="#">View application</a>.
  `
}
