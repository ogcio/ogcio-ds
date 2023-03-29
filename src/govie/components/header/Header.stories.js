import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import { logoImage } from '../../storybook/svgImages'

export default {
  title: 'Layout/Header',
  parameters: {
    docs: {
      description: {
        component:
          'The GOV.IE header shows users that they are on GOV.IE and which service they are using.',
      },
    },
  },
  argTypes: {
    serviceName: { control: 'text' },
    navigationLinks: { control: 'text' },
  },
}

const createNavigationList = (items) => {
  const navigation = document.createElement('ul')
  navigation.className = 'govie-header__navigation-list'

  items.forEach((item, index) => {
    const li = document.createElement('li')
    li.className = 'govie-header__navigation-item'

    li.innerHTML = `
      <a class="govie-header__link" href="#${index}">
        ${item}
      </a>
    `

    navigation.appendChild(li)
  })

  return navigation
}

const Template = (args) => {
  const header = document.createElement('header')
  header.setAttribute('role', 'banner')
  header.setAttribute('data-module', 'govie-header')
  header.className = 'govie-header'

  const wrapper = document.createElement('div')
  wrapper.className = 'govie-header__container govie-width-container'

  const logo = document.createElement('div')
  logo.className = 'govie-header__logo'

  const logoLink = document.createElement('a')
  logoLink.href = '#'
  logoLink.className = 'govie-header__link govie-header__link--homepage'

  logoLink.innerHTML = `
    <span class="govie-header__logotype">
      ${logoImage}
      <span class="govie-visually-hidden">gov.ie</span>
    </span>
  `

  logo.appendChild(logoLink)
  wrapper.appendChild(logo)

  if (args.serviceName || args.navigationLinks) {
    const content = document.createElement('div')
    content.className = 'govie-header__content'

    if (args.serviceName) {
      const service = document.createElement('a')
      service.href = '#'
      service.className = 'govie-header__link govie-header__service-name'
      service.innerText = args.serviceName

      content.appendChild(service)
    }

    if (args.navigationLinks) {
      const nav = document.createElement('nav')
      nav.className = 'govie-header__navigation'

      const btn = document.createElement('button')
      btn.className = 'govie-header__menu-button govie-js-header-toggle'
      btn.setAttribute('type', 'button')
      btn.setAttribute('aria-controls', 'navigation')
      btn.setAttribute('aria-label', 'Show or hide menu')
      btn.setAttribute('hidden', true)

      nav.appendChild(btn)

      const items = args.navigationLinks.split(',')
      nav.appendChild(createNavigationList(items))

      content.appendChild(nav)
    }

    wrapper.appendChild(content)
  }

  header.appendChild(wrapper)

  return beautifyHtmlNode(header)
}

export const Default = Template.bind({})
Default.args = {}

export const WithServiceName = Template.bind({})
WithServiceName.args = {
  serviceName: 'Service name',
}

export const WithNavigation = Template.bind({})
WithNavigation.args = {
  navigationLinks: 'Navigation item 1, Navigation item 2, Navigation item 3',
}

export const WithServiceNameAndNavigation = Template.bind({})
WithServiceNameAndNavigation.args = {
  serviceName: 'Service name',
  navigationLinks: 'Navigation item 1, Navigation item 2, Navigation item 3',
}
