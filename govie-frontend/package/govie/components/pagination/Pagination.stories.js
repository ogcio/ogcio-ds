import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Navigation/Pagination',
  parameters: {
    docs: {
      description: {
        component:
          'Help users navigate forwards and backwards through a series of pages.',
      },
    },
  },
  argTypes: {
    mode: {
      options: ['default', 'first', 'last', 'ellipsis', 'small number of pages'],
      control: { type: 'radio' },
      type: { required: true },
      description:
        '`Default`: Show both next and previous page link.<br>' +
        '`First`: Do not show the previous page link on the first page.<br>' +
        '`Last`: Do not show the next page link on the last page.<br>' +
        '`Small number of pages`: Use ‘Previous’ and ‘Next’ links to let users navigate through a small number of pages.',
    },
    previousLabel: {
      control: 'text',
      if: { arg: 'mode', eq: 'small number of pages' },
    },
    nextLabel: {
      control: 'text',
      if: { arg: 'mode', eq: 'small number of pages' },
    },
  },
  args: {
    mode: 'default',
  },
}

const createPreviousButton = (small, label) => {
  const previous = document.createElement('div')
  previous.className = 'govie-pagination__prev'

  const link = document.createElement('a')
  link.className = 'govie-link govie-pagination__link'
  link.href = '#'
  link.setAttribute('role', 'prev')

  link.innerHTML = `
    <svg class="govie-pagination__icon govie-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </svg>
    <span class="govie-pagination__link-title">Previous</span>`

  if (small) {
    link.insertAdjacentHTML(
      'beforeend',
      `<span class="govie-visually-hidden">:</span><span class="govie-pagination__link-label">
        ${label || '1 of 3'}
      </span>`
    )
  }

  previous.appendChild(link)
  return previous
}

const createNextButton = (small, label) => {
  const next = document.createElement('div')
  next.className = 'govie-pagination__next'

  const link = document.createElement('a')
  link.className = 'govie-link govie-pagination__link'
  link.href = '#'
  link.setAttribute('role', 'next')

  link.innerHTML = `
    <svg class="govie-pagination__icon govie-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
      <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </svg>`

  link.insertAdjacentHTML(
    small ? 'beforeend' : 'afterbegin',
    '<span class="govie-pagination__link-title">Next</span>'
  )

  if (small) {
    link.insertAdjacentHTML(
      'beforeend',
      `<span class="govie-visually-hidden">:</span><span class="govie-pagination__link-label">
      ${label || '3 of 3'}
      </span>`
    )
  }

  next.appendChild(link)
  return next
}

const createList = (mode) => {
  const list = document.createElement('ul')
  const listClasses = ['govie-pagination__list']

  if (mode !== 'first') {
    list.appendChild(createPreviousButton())
  }

  Array(5)
    .fill('')
    .forEach((_, index) => {
      const item = document.createElement('li')

      const classes = ['govie-pagination__item']
      if (
        (mode === 'first' && index === 0) ||
        (mode === 'last' && index === 4) ||
        (mode === 'default' && index === 2)
      ) {
        classes.push('govie-pagination__item--current')
      }

      item.className = classes.join(' ')

      const link = document.createElement('a')
      link.className = 'govie-link govie-pagination__link'
      link.href = '#'
      link.ariaLabel = `Page ${index + 1}`
      link.ariaCurrent = 'page'
      link.innerText = index + 1

      item.appendChild(link)
      list.appendChild(item)
    })

  if (mode !== 'last') {
    list.appendChild(createNextButton())
  }

  list.className = listClasses.join(' ')
  return list
}

const Template = (args) => {
  const navigation = document.createElement('nav')

  const navigationClasses = ['govie-pagination']

  navigation.ariaLabel = 'results'
  navigation.setAttribute('role', 'navigation')

  if (args.mode !== 'small number of pages') {
    navigation.appendChild(createList(args.mode))
  } else {
    navigationClasses.push('govie-pagination--block')
    navigation.appendChild(createPreviousButton(true, args.previousLabel))
    navigation.appendChild(createNextButton(true, args.nextLabel))
  }

  navigation.className = navigationClasses.join(' ')
  navigation.innerHTML = beautifyHtmlNode(navigation)
  return navigation
}

export const Default = Template.bind({})
Default.args = {}

export const FirstPageSelected = Template.bind({})
FirstPageSelected.args = {
  mode: 'first',
}

export const LastPageSelected = Template.bind({})
LastPageSelected.args = {
  mode: 'last',
}

export const SmallNumberOfPages = Template.bind({})
SmallNumberOfPages.args = {
  mode: 'small number of pages',
}

export const SmallNumberOfPagesWithLabel = Template.bind({})
SmallNumberOfPagesWithLabel.args = {
  mode: 'small number of pages',
  previousLabel: 'Applying for a provisional bus licence',
  nextLabel: 'Driver CPC part 1 test: theory',
}
