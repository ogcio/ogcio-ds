import { cookie } from 'express-validator'
import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Cookie banner',
  parameters: {
    docs: {
      component:
        'Allow users to accept or reject cookies which are not essential to making your service work..',
    },
  },
  argTypes: {
    confirmed: {
      control: 'boolean',
    },
    cookieOption: {
      options: ['accepted', 'rejected'],
      control: { type: 'radio' },
      description:
        '`Default`: For the main call to action on a page.<br>`Secondary`: For secondary calls to action on a page.<br>`Warning`: Are designed to make users think carefully before they use them. <br/>`Start`: For the main call to action on your service’s start page.',
    },
  },
  args: {
    confirmed: false,
  },
}

const createContent = (title, confirmed, cookie) => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'

  const rowContent = document.createElement('div')
  rowContent.className = 'govie-grid-column-two-thirds'

  const cookieContent = document.createElement('div')
  cookieContent.className = 'govie-cookie-banner__content'

  if (confirmed) {
    cookieContent.innerHTML =
      `<p class="govie-body">You’ve ${cookie} analytics cookies. You can <a class="govie-link" href="#">change your cookie settings</a> at any time.</p>`
  } else {
    cookieContent.innerHTML = `
    <p class="govie-body">We use some essential cookies to make this service work.</p>
    <p class="govie-body">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>`

    const cookieTitle = document.createElement('h2')
    cookieTitle.className = 'govie-cookie-banner__heading govie-heading-m'
    cookieTitle.innerText = title

    rowContent.appendChild(cookieTitle)
  }

  rowContent.appendChild(cookieContent)

  row.appendChild(rowContent)
  return row
}

const createButton = (label, value) => {
  const button = document.createElement('button')
  button.setAttribute('data-module', 'govie-button')

  button.className = 'govie-button'
  button.innerText = label

  if (value) {
    button.value = value
    button.setAttribute('type', 'button')
    button.setAttribute('name', 'cookies')
  }

  return button
}

const createActions = (confirmed) => {
  const buttonGroup = document.createElement('div')
  buttonGroup.className = 'govie-button-group'

  if (confirmed) {
    const hideButton = createButton('Hide cookie message')
    buttonGroup.appendChild(hideButton)
  } else {
    const acceptButton = createButton('Accept analytics cookies', 'accept')
    const rejectButton = createButton('Reject analytics cookies', 'reject')

    buttonGroup.appendChild(acceptButton)
    buttonGroup.appendChild(rejectButton)

    const link = document.createElement('a')
    link.className = 'govie-link'
    link.href = '#'
    link.innerText = 'View Cookies'

    buttonGroup.appendChild(link)
  }

  return buttonGroup
}

const createCookieMessage = (title, confirmationMessage, showConfirmation, cookieOption) => {
  const cookieContent = document.createElement('div')
  cookieContent.className = 'govie-cookie-banner__message govie-width-container'
  cookieContent.hidden = showConfirmation

  cookieContent.appendChild(createContent(title, confirmationMessage, cookieOption))
  cookieContent.appendChild(createActions(confirmationMessage))

  return cookieContent
}

const Template = (args) => {
  const title = 'Cookies on [name of service]'

  const cookieContainer = document.createElement('div')
  cookieContainer.className = 'govie-cookie-banner'

  cookieContainer.setAttribute('role', 'region')
  cookieContainer.setAttribute('aria-label', title)
  cookieContainer.setAttribute('data-nosnippet', true)

  const cookieContent = createCookieMessage(title, false, args.confirmed)
  const cookieAnswerContent = createCookieMessage(title, true, !args.confirmed, args.cookieOption)
  
  cookieContainer.appendChild(cookieContent)
  cookieContainer.appendChild(cookieAnswerContent)

  return beautifyHtmlNode(cookieContainer)
}

export const Default = Template.bind({})
Default.args = {}

export const ConfirmationMessage = Template.bind({})
ConfirmationMessage.args = {
  confirmed: true,
}

export const CookieAccepted = Template.bind({})
CookieAccepted.args = {
  confirmed: true,
  cookieOption: 'accepted'
}

export const CookiesRejected = Template.bind({})
CookiesRejected.args = {
  confirmed: true,
  cookieOption: 'rejected'
}
