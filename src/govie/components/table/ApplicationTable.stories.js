import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as checkbox } from '../../components/checkboxes/Checkboxes.stories'
import { Default as tick } from '../../components/tick/Tick.stories'
import { Default as tag } from '../../components/tag/Tag.stories'
import { Default as actions } from '../../components/actions/Actions.stories'

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
    th.className =
      'govie-table__header govie-table__header--vertical-centralized'
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
    { cell: parseHtmlString(actions({ type: 'icons' })).outerHTML },
    { cell: parseHtmlString(actions({ type: 'links' })).outerHTML },
    { cell: total, numeric: true },
  ]

  const tr = document.createElement('tr')
  tr.className = 'govie-table__row'

  row.forEach(({ cell, firstColumn, numeric }) => {
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
