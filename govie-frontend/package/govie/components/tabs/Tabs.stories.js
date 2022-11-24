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
    withTableContent: { control: 'boolean' },
  },
  args: {
    tabs: ['Tab 1', 'Tab 2'],
    withTableContent: false,
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
    if (args.withTableContent) {
      panel.innerHTML = `
        <table class="govie-table">
        <thead class="govie-table__head">
          <tr class="govie-table__row">
            <th class="govie-table__header" scope="col">Date</th>
            <th class="govie-table__header" scope="col">Amount</th>
          </tr>
        </thead>
        <tbody class="govie-table__body">
          <tr class="govie-table__row">
            <th class="govie-table__header" scope="row">${index+3} weeks</th>
            <td class="govie-table__cell">€109.80 per week</td>
          </tr>
          <tr class="govie-table__row">
            <th class="govie-table__header" scope="row">Next ${index+3} weeks</th>
            <td class="govie-table__cell">€10.80 per week</td>
          </tr>
        </tbody>
      </table>
        `
    } else {
      const h2 = document.createElement('h2')
      h2.className = 'govie-heading-s'
      h2.innerText = `${args.tabs[index]} content`

      panel.appendChild(h2)
    }

    tabs.appendChild(panel)
  })

  tabs.innerHTML = getNodeFormattedInnerHtml(tabs)
  return tabs
}

export const Default = Template.bind({})
Default.args = {}

export const WithTableContent = Template.bind({})
WithTableContent.args = {
  withTableContent: true,
}
