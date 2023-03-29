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

    if (header === '') {
      th.innerHTML = '<span class="govie-visually-hidden">Check column</span>'
    }

    trHead.appendChild(th)
  })

  thead.appendChild(trHead)
  return thead
}

const createTableCell = (cell, firstColumn, numeric) => {
  if (firstColumn) {
    const th = document.createElement('th')
    th.className =
      'govie-table__header govie-table__header--vertical-centralized govie-body-s'
    th.setAttribute('scope', 'row')
    th.innerHTML = cell

    return th
  } else {
    const td = document.createElement('td')

    const classes = [
      'govie-table__cell',
      'govie-table__cell--vertical-centralized',
      'govie-body-s',
    ]

    if (numeric) {
      classes.push('govie-table__cell--numeric')
    }

    td.className = classes.join(' ')
    td.innerHTML = cell

    return td
  }
}

const createTableRow = ({ text, type }, total, index) => {
  const formattedCheckbox = checkbox({
    items: [{ label: `checkbox-${index}`, value: 'check' }],
    useSmallerBoxes: true,
    fieldId: `checkbox-${index}`,
    hiddenLabel: true,
  })

  const row = [
    { cell: 'Row Leader', firstColumn: true },
    { cell: formattedCheckbox },
    { cell: tick({ filled: true, checked: true }) },
    { cell: 'IrishTown' },
    { cell: tick({ value: 'tick', checked: true }) },
    { cell: tag({ text, type, extraClass: 'govie-body-s' }) },
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
  const tableData = [
    { tag: { text: 'Approved', type: 'green' }, total: '12345' },
    { tag: { text: 'Approved', type: 'green' }, total: '12345' },
    { tag: { text: 'Approved', type: 'green' }, total: '12345' },
    { tag: { text: 'Approved', type: 'green' }, total: '12345' },
    { tag: { text: 'Pending', type: 'blue' }, total: '12345' },
    { tag: { text: 'Rejected', type: 'red' }, total: '12345' },
    { tag: { text: 'Rejected', type: 'red' }, total: '12345' },
    { tag: { text: 'Pending', type: 'blue' }, total: '74,070' },
  ]

  const tbody = document.createElement('tbody')
  tbody.className = 'govie-table__body'

  tableData.forEach(({ tag, total }, index) => {
    tbody.appendChild(
      createTableRow({ text: tag.text, type: tag.type }, total, index)
    )
  })

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
