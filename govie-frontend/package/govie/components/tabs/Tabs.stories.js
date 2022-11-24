import getNodeFormattedInnerHtml from '../../../../.storybook/helpers/getNodeFormattedInnerHtml'
import { slugify } from '../../../../.storybook/helpers/utils'

export default {
  title: 'Navigation/Tabs',
  parameters: {
    docs: {
      description: {
        component:
          'The tabs component lets users navigate between related sections of content, displaying one section at a time.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: 'array',
      type: { name: 'array', required: true },
    },
  },
  args: {
    tabs: ['Panel 1', 'Panel 2'],
  },
}

const Template = (args) => {
  const tabs = document.createElement('div')
  tabs.className = 'govie-tabs'
  tabs.setAttribute('data-module', 'govie-tabs')

  const title = document.createElement('h2')
  title.className = 'govie-tabs__title'
  title.innerText = 'Contents'

  tabs.appendChild(title)

  const ul = document.createElement('ul')
  ul.className = 'govie-tabs__list'

  const panels = []
  args.tabs.forEach((tab, index) => {
    const href = slugify(tab)
    panels.push(href)

    const li = document.createElement('li')
    li.className = `govie-tabs__list-item ${
      index === 0 ? 'govie-tabs__list-item--selected' : ''
    }`

    const link = document.createElement('a')
    link.className = 'govie-tabs__tab'
    link.href = `#${href}`
    link.innerText = tab

    li.appendChild(link)
    ul.appendChild(li)
  })

  tabs.appendChild(ul)

  panels.forEach((id, index) => {
    const panel = document.createElement('div')
    panel.className = `govie-tabs__panel ${
      index !== 0 ? 'govie-tabs__panel--hidden' : ''
    }`
    panel.setAttribute('id', id)
    
    const h2 = document.createElement('h2')
    h2.className = 'govie-heading-s'
    h2.innerText = `Tab content ${index}`

    panel.appendChild(h2)
    tabs.appendChild(panel)
  })

  tabs.innerHTML = getNodeFormattedInnerHtml(tabs)
  return tabs
}

export const Default = Template.bind({})
Default.args = {}
