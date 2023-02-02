import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as checkbox } from '../../components/checkboxes/Checkboxes.stories'
import { Default as tick } from '../../components/tick/Tick.stories'
import { Default as tag } from '../../components/tag/Tag.stories'
import { Default as link } from '../../components/typography/Link.stories'

export default {
  title: 'Application/Table',
  parameters: {
    docs: {
      description: {
        component:
          'Use the table component to make information easier to compare and scan for users.',
      },
    },
  },
}

const createTableHeader = () => {
  const headers = [
    'Header',
    '',
    '',
    'County',
    'Header',
    'Status',
    'Actions',
    'Header',
    'Total',
  ]

  const thead = document.createElement('thead')
  thead.className = 'govie-table__head'

  const trHead = document.createElement('tr')
  trHead.className = 'govie-table__row'

  headers.forEach((header, index) => {
    const th = document.createElement('th')
    th.setAttribute('scope', 'col')

    const classes = ['govie-table__header']
    if (index === headers.length - 1) {
      classes.push('govie-table__header--numeric')
    }

    th.className = classes.join(' ')
    th.innerText = header

    trHead.appendChild(th)
  })

  thead.appendChild(trHead)
  return thead
}

const createTableCell = (cell, firstColumn, numeric) => {
  if (firstColumn) {
    const th = document.createElement('th')
    th.className = 'govie-table__header govie-table__header--vertical-centralized'
    th.setAttribute('scope', 'row')
    th.innerHTML = cell

    return th
  } else {
    const td = document.createElement('td')

    const classes = [
      'govie-table__cell',
      'govie-table__cell--vertical-centralized',
    ]

    if (numeric) {
      classes.push('govie-table__cell--numeric')
    }

    td.className = classes.join(' ')
    td.innerHTML = cell

    return td
  }
}

const createLinksCell = () => {
  const container = document.createElement('div')

  const actions = ['Edit', 'View', 'Delete']
  actions.forEach((action) => {
    const actionLink = parseHtmlString(link({ label: action, href: '#' }))
    actionLink.className += ' govie-!-margin-right-3'
    container.appendChild(actionLink)
  })

  return container
}

// TODO: use iconButtons when it is available
const createActionsCell = () => {
  const container = document.createElement('div')

  const actions = [
    `<svg class="govie-!-margin-right-3" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.25 16.25L6.75 14.675L3.2625 16.025C3.0125 16.125 2.78125 16.0968 2.56875 15.9403C2.35625 15.7843 2.25 15.575 2.25 15.3125V4.8125C2.25 4.65 2.297 4.50625 2.391 4.38125C2.4845 4.25625 2.6125 4.1625 2.775 4.1L6.75 2.75L11.25 4.325L14.7375 2.975C14.9875 2.875 15.2188 2.903 15.4313 3.059C15.6438 3.2155 15.75 3.425 15.75 3.6875V14.1875C15.75 14.35 15.703 14.4938 15.609 14.6188C15.5155 14.7438 15.3875 14.8375 15.225 14.9L11.25 16.25ZM10.5 14.4125V5.6375L7.5 4.5875V13.3625L10.5 14.4125Z" fill="#0B0C0C"/>
    </svg>
    `,
    `<svg class="govie-!-margin-right-3" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.975 2.675L8.925 6.725L10.275 8.075L15 3.35V2.675M8.25 9.0875C8.16049 9.0875 8.07465 9.05194 8.01135 8.98865C7.94806 8.92536 7.9125 8.83951 7.9125 8.75C7.9125 8.66049 7.94806 8.57465 8.01135 8.51135C8.07465 8.44806 8.16049 8.4125 8.25 8.4125C8.33951 8.4125 8.42536 8.44806 8.48865 8.51135C8.55194 8.57465 8.5875 8.66049 8.5875 8.75C8.5875 8.83951 8.55194 8.92536 8.48865 8.98865C8.42536 9.05194 8.33951 9.0875 8.25 9.0875ZM4.2 14.15C3.84196 14.15 3.49858 14.0078 3.24541 13.7546C2.99223 13.5014 2.85 13.158 2.85 12.8C2.85 12.442 2.99223 12.0986 3.24541 11.8454C3.49858 11.5922 3.84196 11.45 4.2 11.45C4.55804 11.45 4.90142 11.5922 5.15459 11.8454C5.40777 12.0986 5.55 12.442 5.55 12.8C5.55 13.158 5.40777 13.5014 5.15459 13.7546C4.90142 14.0078 4.55804 14.15 4.2 14.15ZM4.2 6.05C3.84196 6.05 3.49858 5.90777 3.24541 5.65459C2.99223 5.40142 2.85 5.05804 2.85 4.7C2.85 4.34196 2.99223 3.99858 3.24541 3.74541C3.49858 3.49223 3.84196 3.35 4.2 3.35C4.55804 3.35 4.90142 3.49223 5.15459 3.74541C5.40777 3.99858 5.55 4.34196 5.55 4.7C5.55 5.05804 5.40777 5.40142 5.15459 5.65459C4.90142 5.90777 4.55804 6.05 4.2 6.05ZM6.657 5.807C6.81225 5.4695 6.9 5.09825 6.9 4.7C6.9 3.98392 6.61554 3.29716 6.10919 2.79081C5.60284 2.28446 4.91608 2 4.2 2C3.48392 2 2.79716 2.28446 2.29081 2.79081C1.78446 3.29716 1.5 3.98392 1.5 4.7C1.5 5.41608 1.78446 6.10284 2.29081 6.60919C2.79716 7.11554 3.48392 7.4 4.2 7.4C4.59825 7.4 4.9695 7.31225 5.307 7.157L6.9 8.75L5.307 10.343C4.9695 10.1877 4.59825 10.1 4.2 10.1C3.48392 10.1 2.79716 10.3845 2.29081 10.8908C1.78446 11.3972 1.5 12.0839 1.5 12.8C1.5 13.5161 1.78446 14.2028 2.29081 14.7092C2.79716 15.2155 3.48392 15.5 4.2 15.5C4.91608 15.5 5.60284 15.2155 6.10919 14.7092C6.61554 14.2028 6.9 13.5161 6.9 12.8C6.9 12.4018 6.81225 12.0305 6.657 11.693L8.25 10.1L12.975 14.825H15V14.15L6.657 5.807Z" fill="#0B0C0C"/>
    </svg>
    `,
    `<svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 16.25C6.45 16.25 5.97933 16.1033 5.588 15.8097C5.196 15.5157 5 15.1625 5 14.75V5H4V3.5H9V2.75H15V3.5H20V5H19V14.75C19 15.1625 18.8043 15.5157 18.413 15.8097C18.021 16.1033 17.55 16.25 17 16.25H7ZM17 5H7V14.75H17V5ZM9 13.25H11V6.5H9V13.25ZM13 13.25H15V6.5H13V13.25ZM7 5V14.75V5Z" fill="#0B0C0C"/>
    </svg>
    `,
  ]

  actions.forEach((action) => {
    const actionLink = parseHtmlString(action)
    container.appendChild(actionLink)
  })

  return container
}

const createTableRow = ({ text, type }, total) => {
  const row = [
    { cell: 'Row Leader', firstColumn: true },
    {
      cell: checkbox({
        items: [{ label: '', value: 'check' }],
        useSmallerBoxes: true,
      }),
    },
    { cell: tick({ filled: true, checked: true }) },
    { cell: 'IrishTown' },
    { cell: tick({ value: 'tick', checked: true }) },
    { cell: tag({ text, type }) },
    { cell: createActionsCell().outerHTML },
    { cell: createLinksCell().outerHTML },
    { cell: total, numeric: true },
  ]

  const tr = document.createElement('tr')
  tr.className = 'govie-table__row'

  row.forEach(({ cell, firstColumn, numeric }, index) => {
    tr.appendChild(createTableCell(cell, firstColumn, numeric))
  })

  return tr
}

const createTableBody = () => {
  const tbody = document.createElement('tbody')
  tbody.className = 'govie-table__body'

  tbody.appendChild(
    createTableRow({ text: 'Approved', type: 'green' }, '12345')
  )
  tbody.appendChild(
    createTableRow({ text: 'Approved', type: 'green' }, '12345')
  )
  tbody.appendChild(
    createTableRow({ text: 'Approved', type: 'green' }, '12345')
  )
  tbody.appendChild(
    createTableRow({ text: 'Approved', type: 'green' }, '12345')
  )
  tbody.appendChild(createTableRow({ text: 'Pending', type: 'blue' }, '12345'))
  tbody.appendChild(createTableRow({ text: 'Rejected', type: 'red' }, '12345'))
  tbody.appendChild(createTableRow({ text: 'Rejected', type: 'red' }, '12345'))
  tbody.appendChild(createTableRow({ text: 'Pending', type: 'blue' }, '74,070'))

  return tbody
}

const Template = () => {
  const table = document.createElement('table')
  table.className = 'govie-table'

  table.appendChild(createTableHeader())
  table.appendChild(createTableBody())

  return beautifyHtmlNode(table)
}

export const Default = Template.bind({})
Default.args = {}
