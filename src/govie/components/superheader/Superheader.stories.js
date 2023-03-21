import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Layout/Superheader',
  parameters: {
    docs: {
      description: {
        component: 'The GOV.IE superheader.',
      },
    },
  },
  // argTypes: {},
}

const topicMenuList = [
  'Benefits',
  'Births, death, marriages and care',
  'Business and self-employed',
  'Childcare and parenting',
  'Citizenship and living in the UK',
  'Crime, justice and the law',
  'Disabled people',
  'Driving and transport',
  'Education and learning',
  'Employing people',
  'Environment and countryside',
  'Housing and local services',
  'Money and tax',
  'Passports, travel and living abroad',
  'Visas and immigration',
  'Working, jobs and pensions',
]

const governmentActivitiesMenuList = [
  'Departments',
  'News',
  'Guidance and regulation',
  'Research and statistics',
  'Policy papers and consultations',
  'Transparency',
  'How government works',
  'Get involved',
]

const searchMenuList = [
  'Check benefits and financial support you can get',
  'Find out about the Energy Bills Support Scheme',
  'Find a job',
  'Coronavirus (COVID-19)',
  'Universal Credit account: sign in',
]

const createLogo = () => {
  const container = document.createElement('div')
  container.className = 'govie-width-container'

  const superContainer = document.createElement('div')
  superContainer.className = 'govie-superheader__container'

  const logoContainer = document.createElement('div')
  logoContainer.className = 'govie-superheader__header-logo'

  const a = document.createElement('a')
  a.href = '#'
  a.className = 'govie-header__link govie-header__link--homepage'
  a.title = 'Go to the gov.ie homepage'
  a.innerHTML = `
    <span class="govie-header__logotype">
      <img id="logo-image" src="./@ogcio/assets/images/logo-full.png" class="govie-header__logotype-fallback-image">
    </span>
  `

  logoContainer.appendChild(a)
  superContainer.appendChild(logoContainer)
  container.appendChild(superContainer)

  return container
}

const createNav = () => {
  const nav = document.createElement('nav')
  nav.className = 'govie-superheader__content js-module-initialised'
  nav.setAttribute('data-module', 'super-navigation-superheader')

  const hiddenTitle = document.createElement('h2')
  hiddenTitle.className = 'govie-visually-hidden'
  hiddenTitle.innerText = 'Navigation menu'

  const container = document.createElement('div')
  container.className =
    'govie-width-container govie-superheader__button-width-container'

  const buttonsContainer = document.createElement('div')
  buttonsContainer.className = 'govie-superheader__button-container'
  buttonsContainer.appendChild(createNavItem())
  buttonsContainer.appendChild(createSearchItem())

  container.appendChild(buttonsContainer)

  nav.appendChild(hiddenTitle)
  nav.appendChild(container)
  nav.appendChild(createDropdownMenu())
  nav.appendChild(createSearchContainer())

  return nav
}

const createNavItem = () => {
  const navigationItem = document.createElement('div')
  navigationItem.className = 'govie-superheader__navigation-item'

  const link = document.createElement('a')
  link.className = 'govie-superheader__navigation-item-link'
  link.href = '#'
  link.hidden = 'hidden'

  const inner = document.createElement('span')
  inner.className = 'govie-superheader__navigation-item-link-inner'
  inner.innerText = 'Menu'

  const navButton = document.createElement('button')
  navButton.className = 'govie-superheader__navigation-top-toggle-button'
  navButton.type = 'button'
  navButton.ariaLabel = 'Show navigation menu'
  navButton.ariaExpanded = false
  navButton.id = 'super-navigation-menu-4b386e09-toggle'

  navButton.setAttribute('aria-controls', 'super-navigation-menu-4b386e09')
  navButton.setAttribute('data-text-for-hide', 'Hide navigation menu')
  navButton.setAttribute('data-text-for-show', 'Show navigation menu')
  navButton.setAttribute('data-toggle-desktop-group', 'top')
  navButton.setAttribute('data-toggle-mobile-group', 'top')

  const navButtonInner = document.createElement('span')
  navButtonInner.className =
    'govie-superheader__navigation-top-toggle-button-inner'
  navButtonInner.innerText = 'Menu'
  navButton.appendChild(navButtonInner)

  navigationItem.appendChild(link)
  navigationItem.appendChild(navButton)

  return navigationItem
}

const createSearchItem = () => {
  const searchContainer = document.createElement('div')
  searchContainer.className = 'govie-superheader__search-item'

  const openSearchMenuButton = document.createElement('button')
  openSearchMenuButton.className = 'govie-superheader__search-toggle-button'
  openSearchMenuButton.type = 'button'
  openSearchMenuButton.ariaLabel = 'Show search menu'
  openSearchMenuButton.ariaExpanded = false
  openSearchMenuButton.id = 'super-search-menu-toggle'

  openSearchMenuButton.setAttribute('aria-controls', 'super-search-menu')
  openSearchMenuButton.setAttribute('data-text-for-hide', 'Hide search menu')
  openSearchMenuButton.setAttribute('data-text-for-show', 'Show search menu')
  openSearchMenuButton.setAttribute('data-toggle-mobile-group', 'top')
  openSearchMenuButton.setAttribute('data-toggle-desktop-group', 'top')

  const openSearchMenuButtonInner = document.createElement('span')
  openSearchMenuButtonInner.className = 'govie-visually-hidden'
  openSearchMenuButtonInner.innerText = 'Search gov.ie'

  const closeIcon = document.createElement('span')
  closeIcon.ariaHidden = true
  closeIcon.className = 'govie-superheader__navigation-top-toggle-close-icon'
  closeIcon.setAttribute('focusable', 'false')
  closeIcon.innerHTML = `
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
    </svg>
`

  const searchIcon = `
    <svg
      class="govie-superheader__search-toggle-button-link-icon"
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12.0161"
        cy="11.0161"
        r="8.51613"
        stroke="currentColor"
        stroke-width="3"
      ></circle>
      <line
        x1="17.8668"
        y1="17.3587"
        x2="26.4475"
        y2="25.9393"
        stroke="currentColor"
        stroke-width="3"
      ></line>
    </svg>
  `

  openSearchMenuButton.appendChild(openSearchMenuButtonInner)
  openSearchMenuButton.appendChild(closeIcon)
  openSearchMenuButton.insertAdjacentHTML('beforeend', searchIcon)

  const searchLink = document.createElement('a')
  searchLink.className = 'govie-superheader__search-item-link'
  searchLink.href = '/search'
  searchLink.hidden = 'hidden'

  const searchLinkInner = document.createElement('span')
  searchLinkInner.className = 'govie-visually-hidden'
  searchLinkInner.innerText = 'Search gov.ie'

  searchLink.appendChild(searchLinkInner)
  searchLink.insertAdjacentHTML(
    'beforeend',
    `
      <svg
        class="govie-superheader__search-item-link-icon"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="12.0161"
          cy="11.0161"
          r="8.51613"
          stroke="currentColor"
          stroke-width="3"
        ></circle>
        <line
          x1="17.8668"
          y1="17.3587"
          x2="26.4475"
          y2="25.9393"
          stroke="currentColor"
          stroke-width="3"
        ></line>
      </svg>
    `
  )

  searchContainer.appendChild(openSearchMenuButton)
  searchContainer.appendChild(searchLink)

  return searchContainer
}

const createListItems = (text, title, list) => {
  const container = document.createElement('div')

  container.className = `${
    text === 'topics'
      ? 'govie-grid-column-two-thirds-from-desktop'
      : 'govie-grid-column-one-third-from-desktop'
  } govie-superheader__column--${text}`

  const listTitle = document.createElement('h3')
  listTitle.className = 'govie-heading-m govie-superheader__column-header'
  listTitle.innerText = title

  const listElement = document.createElement('ul')
  listElement.className = `govie-superheader__navigation-second-items govie-superheader__navigation-second-items--${text}`

  list.forEach((item) => {
    const itemList = document.createElement('li')
    itemList.className = 'govie-superheader__dropdown-list-item'

    const link = document.createElement('a')
    link.className =
      'govie-superheader__navigation-second-item-link govie-link govie-link--no-visited-state'
    link.href = '/#'
    link.innerText = item

    itemList.appendChild(link)
    listElement.appendChild(itemList)
  })

  container.appendChild(listTitle)
  container.appendChild(listElement)

  return container
}

const createDropdownMenu = () => {
  const container = document.createElement('div')
  container.className = 'govie-superheader__navigation-dropdown-menu'
  container.hidden = 'hidden'
  container.id = 'super-navigation-menu-4b386e09'

  const widthContainer = document.createElement('div')
  widthContainer.className = 'govie-width-container'

  const navigationItemsContainer = document.createElement('div')
  navigationItemsContainer.className =
    'govie-grid-row govie-superheader__navigation-items'

  navigationItemsContainer.appendChild(
    createListItems('topics', 'Topics', topicMenuList)
  )
  navigationItemsContainer.appendChild(
    createListItems(
      'government-activity',
      'Government activity',
      governmentActivitiesMenuList
    )
  )
  widthContainer.appendChild(navigationItemsContainer)
  container.appendChild(widthContainer)

  return container
}

const createSearchContainer = () => {
  const container = document.createElement('div')
  container.className = 'govie-superheader__navigation-dropdown-menu'
  container.hidden = false
  container.id = 'super-search-menu'

  const widthContainer = document.createElement('div')
  widthContainer.className =
    'govie-width-container govie-superheader__search-container govie-superheader__search-items'

  const title = document.createElement('h3')
  title.className = 'govie-visually-hidden'
  title.innerText = 'Search'

  const row = document.createElement('div')
  row.className = 'govie-grid-row'
  const column = document.createElement('div')
  column.className = 'govie-grid-column-full'

  const form = document.createElement('form')
  form.className = 'govie-superheader__search-form'
  form.id = 'search'
  form.role = 'search'
  form.method = 'get'
  form.action = '#'
  form.ariaLabel = 'Site-wide'

  const searchContainer = document.createElement('div')
  searchContainer.className =
    'govie-superheader-search govie-!-display-none-print govie-superheader-search--large govie-superheader-search--on-white govie-superheader-search--separate-label'

  const label = document.createElement('label')
  label.className = 'govie-label govie-label--m'
  label.innerText = 'Search gov.ie'

  searchContainer.appendChild(label)

  const searchItemWrapper = document.createElement('div')
  searchItemWrapper.className = 'govie-superheader-search__item-wrapper'

  const input = document.createElement('input')
  input.className =
    'govie-superheader-search__item govie-superheader-search__input js-class-toggle'
  input.name = 'Search'
  input.type = 'Search'
  input.value = ''

  const searchSubmitWrapper = document.createElement('div')
  searchSubmitWrapper.className =
    'govie-superheader-search__item govie-superheader-search__submit-wrapper'

  const searchButton = document.createElement('button')
  searchButton.className = 'govie-superheader-search__submit'
  searchButton.type = 'submit'
  searchButton.innerText = 'Search'

  searchButton.insertAdjacentHTML(
    'beforeend',
    `
    <svg
      class="govie-superheader-search__icon"
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12.0161"
        cy="11.0161"
        r="8.51613"
        stroke="currentColor"
        stroke-width="3"
      ></circle>
      <line
        x1="17.8668"
        y1="17.3587"
        x2="26.4475"
        y2="25.9393"
        stroke="currentColor"
        stroke-width="3"
      ></line>
    </svg>
`
  )

  searchSubmitWrapper.appendChild(searchButton)
  searchItemWrapper.appendChild(input)
  searchItemWrapper.appendChild(searchSubmitWrapper)
  searchContainer.appendChild(searchItemWrapper)

  form.appendChild(searchContainer)
  column.appendChild(form)

  const row2 = document.createElement('div')
  row2.className = 'govie-grid-row'
  const column2 = document.createElement('div')
  column2.className = 'govie-grid-column-full'

  const searchTitle = document.createElement('h3')
  searchTitle.className = 'govie-heading-m'
  searchTitle.innerText = 'Popular on gov.ie'

  const searchList = document.createElement('ul')
  searchList.className = 'govie-list'

  searchMenuList.forEach((item) => {
    const itemList = document.createElement('li')
    itemList.className = 'govie-superheader__popular-item'

    const link = document.createElement('a')
    link.className =
      'govie-superheader__popular-link govie-link govie-link--no-visited-state'
    link.href = '#'
    link.innerText = item

    itemList.append(link)

    searchList.appendChild(itemList)
  })

  column2.appendChild(searchTitle)
  column2.appendChild(searchList)

  row.appendChild(column)
  row.appendChild(column2)

  widthContainer.appendChild(title)
  widthContainer.appendChild(row)
  container.appendChild(widthContainer)

  return container
}

const Template = (args) => {
  const header = document.createElement('header')
  header.role = 'banner'
  header.className = 'govie-superheader'

  const superheaderContainer = document.createElement('div')
  superheaderContainer.className = 'govie-superheader__container govie-clearfix'

  superheaderContainer.appendChild(createLogo())
  superheaderContainer.appendChild(createNav())

  header.appendChild(superheaderContainer)

  return beautifyHtmlNode(header)
}

export const Default = Template.bind({})
Default.args = {}
