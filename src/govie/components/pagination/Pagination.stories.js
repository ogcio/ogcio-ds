import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import { nextIcon, previousIcon } from '../../storybook/svgImages'

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
      options: [
        'default',
        'first selected',
        'last selected',
        'ellipsis',
        'smaller number of pages',
        'larger number of pages',
      ],
      control: { type: 'radio' },
      type: { required: true },
      description:
        '`Default`: Show both next and previous page link.<br>' +
        '`First selected`: Do not show the previous page link on the first page.<br>' +
        '`Last selected`: Do not show the next page link on the last page.<br>' +
        '`Smaller number of pages`: Use ‘Previous’ and ‘Next’ links to let users navigate through a smaller number of pages.<br>' +
        '`Larger number of pages`: Use a list-type layout if users need to navigate through large numbers of pages.',
    },
    previousLabel: {
      control: 'text',
      if: { arg: 'mode', eq: 'smaller number of pages' },
    },
    nextLabel: {
      control: 'text',
      if: { arg: 'mode', eq: 'smaller number of pages' },
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

  link.innerHTML = `
    ${previousIcon}
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

  link.innerHTML = nextIcon

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

  ;[1, 6, 7, 8, 40].forEach((number, index) => {
    const item = document.createElement('li')
    const classes = ['govie-pagination__item']

    if (mode === 'larger number of pages' && (index === 1 || index === 4)) {
      const ellipsis = document.createElement('li')
      ellipsis.className = `${classes[0]} govie-pagination__item--ellipses`
      ellipsis.innerHTML = '&ctdot;'
      list.appendChild(ellipsis)
    }

    if (
      (mode === 'first selected' && index === 0) ||
      (mode === 'last selected' && index === 4) ||
      ((mode === 'default' || mode === 'larger number of pages') && index === 2)
    ) {
      classes.push('govie-pagination__item--current')
    }

    item.className = classes.join(' ')

    const link = document.createElement('a')
    link.className = 'govie-link govie-pagination__link'
    link.href = '#'
    link.ariaLabel = `Page ${index + 1}`
    link.ariaCurrent = 'page'
    link.innerText = mode !== 'larger number of pages' ? index + 1 : number

    item.appendChild(link)
    list.appendChild(item)
  })

  list.className = 'govie-pagination__list'
  return list
}

const Template = (args) => {
  const navigation = document.createElement('nav')

  const navigationClasses = ['govie-pagination']

  navigation.ariaLabel = 'navigation results'
  navigation.setAttribute('role', 'navigation')

  if (args.mode !== 'smaller number of pages') {
    if (args.mode !== 'first selected') {
      navigation.appendChild(createPreviousButton())
    }
    navigation.appendChild(createList(args.mode))
    if (args.mode !== 'last selected') {
      navigation.appendChild(createNextButton())
    }
  } else {
    navigationClasses.push('govie-pagination--block')
    navigation.appendChild(createPreviousButton(true, args.previousLabel))
    navigation.appendChild(createNextButton(true, args.nextLabel))
  }

  navigation.className = navigationClasses.join(' ')
  return beautifyHtmlNode(navigation)
}

export const Default = Template.bind({})
Default.args = {}

export const FirstPageSelected = Template.bind({})
FirstPageSelected.args = {
  mode: 'first selected',
}

export const LastPageSelected = Template.bind({})
LastPageSelected.args = {
  mode: 'last selected',
}

export const SmallerNumberOfPages = Template.bind({})
SmallerNumberOfPages.args = {
  mode: 'smaller number of pages',
}

export const SmallerNumberOfPagesWithLabel = Template.bind({})
SmallerNumberOfPagesWithLabel.args = {
  mode: 'smaller number of pages',
  previousLabel: 'Applying for a provisional bus licence',
  nextLabel: 'Driver CPC part 1 test: theory',
}

export const LargerNumberofPages = Template.bind({})
LargerNumberofPages.args = {
  mode: 'larger number of pages',
}
