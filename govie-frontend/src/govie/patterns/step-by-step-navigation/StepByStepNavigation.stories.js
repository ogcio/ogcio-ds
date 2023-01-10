import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs.stories'

export default {
  title: 'Patterns/Step By Step Navigation',
  parameters: {
    docs: {
      description: {
        component:
          'The step by step navigation pattern presents an end to end journey in logical steps, with links to content that helps users complete each step.',
      },
    },
  },
}

///////////////////////////////////////////////////////////////////////////////
// App Step Componenets Section ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const createStepNavParagraph = (text) => {
  const stepNavParagraph = document.createElement('p')
  stepNavParagraph.className = 'app-step-nav__paragraph'
  stepNavParagraph.innerText = text

  return stepNavParagraph
}

const createStepNavListItem = (dataPostion, link) => {
  const listItem = document.createElement('li')
  listItem.className = 'app-step-nav__list-item js-list-item '

  const anchor = document.createElement('a')
  anchor.setAttribute('data-position', dataPostion)
  anchor.className = 'app-step-nav__link js-link'
  anchor.setAttribute('href', '#')
  anchor.innerHTML = link

  listItem.appendChild(anchor)

  return listItem
}

const createStepNavList = (dataPostion, links) => {
  const list = document.createElement('ol')
  list.className = 'app-step-nav__list '
  list.setAttribute('data-length', links.length)

  links.forEach((link, index) => {
    const anchorDataPostion = `${dataPostion}.${index + 1}`
    list.appendChild(createStepNavListItem(anchorDataPostion, link))
  })

  return list
}

///////////////////////////////////////////////////////////////////////////////
// Data Section ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const steps = [
  {
    id: 'step-panel-check-you-re-allowed-to-drive-1',
    dataPosition: 1,
    title: "Check you're allowed to drive",
    stepNumber: 1,
    contentNodes: [
      createStepNavParagraph(
        'Most people can start learning to drive when they’re 17.'
      ),
      createStepNavList(1, [
        'Check what age you can drive',
        'Requirements for driving legally',
        'Driving eyesight rules',
      ]),
    ],
  },
  {
    id: 'step-panel-get-a-provisional-licence-2',
    dataPosition: 2,
    title: 'Get a provisional licence',
    stepNumber: 2,
    contentNodes: [
      createStepNavList(2, [
        'Apply for your first provisional driving licence <span class="app-step-nav__context">€34 to €43</span>',
      ]),
    ],
  },
  {
    id: 'step-panel-driving-lessons-and-practice-3',
    dataPosition: 3,
    title: 'Driving lessons and practice',
    stepNumber: 3,
    contentNodes: [
      createStepNavParagraph(
        'You need a provisional driving licence to take lessons or practice.'
      ),
      createStepNavList(3, [
        'The Highway Code',
        'Taking driving lessons',
        'Find driving schools, lessons and instructors',
        'Practise vehicle safety questions',
      ]),
    ],
  },
  {
    id: 'step-panel-prepare-for-your-theory-test-4',
    dataPosition: 4,
    title: 'Prepare for your theory test',
    stepLogic: 'and',
    contentNodes: [
      createStepNavList(4, [
        'Theory test revision and practice',
        'Take a practice theory test',
        'Theory and hazard perception test app',
      ]),
    ],
  },
  {
    id: 'step-panel-book-and-manage-your-theory-test-5',
    dataPosition: 5,
    title: 'Book and manage your theory test',
    stepNumber: 4,
    contentNodes: [
      createStepNavParagraph(
        'You need a provisional driving licence to book your theory test.'
      ),
      createStepNavList(5, [
        'Book your theory test <span class="app-step-nav__context">€23</span>',
        'What to take to your test',
        'Change your theory test appointment',
        'Check your theory test appointment details',
        'Cancel your theory test',
      ]),
    ],
  },
  {
    id: 'step-panel-book-and-manage-your-driving-test-6',
    dataPosition: 6,
    title: 'Book and manage your driving test',
    stepNumber: 5,
    contentNodes: [
      createStepNavParagraph(
        'You must pass your theory test before you can book your driving test.'
      ),
      createStepNavList(6, [
        'Book your driving test <span class="app-step-nav__context">€62 to €75</span>',
        'What to take to your test',
        'Change your driving test appointment',
        'Check your driving test appointment details',
        'Cancel your driving test',
      ]),
    ],
  },
  {
    id: 'step-panel-when-you-pass-7',
    dataPosition: 7,
    title: 'When you pass',
    stepNumber: 6,
    contentNodes: [
      createStepNavParagraph(
        'You can start driving as soon as you pass your driving test.'
      ),
      createStepNavParagraph(
        'You must have an insurance policy that allows you to drive without supervision.'
      ),
      createStepNavList(7, ['Find out about Pass Plus training courses']),
    ],
  },
]

///////////////////////////////////////////////////////////////////////////////
// Template Section ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const createHeaderRow = () => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'

  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const pageHeading = parseHtmlString(
    heading({
      text: 'Learn to drive a car: step by step',
      element: 'h1',
      size: 'l',
    })
  )
  const introParagraph = parseHtmlString(
    paragraph({ text: 'Check what you need to do to learn to drive.' })
  )

  column.appendChild(pageHeading)
  column.appendChild(introParagraph)

  row.appendChild(column)

  return row
}

const createNavigationControls = () => {
  const controls = document.createElement('div')
  controls.className = 'app-step-nav__controls govie-!-display-none-print'

  const button = document.createElement('button')
  button.setAttribute('aria-expanded', false)
  button.className =
    'app-step-nav__button app-step-nav__button--controls js-step-controls-button'
  button.setAttribute(
    'aria-controls',
    'step-panel-check-you-re-allowed-to-drive-1'
  )

  const chevronSpan = document.createElement('span')
  chevronSpan.className =
    'app-step-nav__chevron js-step-controls-button-icon app-step-nav__chevron--down'
  button.appendChild(chevronSpan)

  const textSpan = document.createElement('span')
  textSpan.className =
    'app-step-nav__button-text app-step-nav__button-text--all js-step-controls-button-text'
  textSpan.innerText = 'Show all steps'
  button.appendChild(textSpan)

  controls.appendChild(button)

  return controls
}

const createStepNumber = (stepNumber) => {
  const stepNumberSpan = document.createElement('span')
  stepNumberSpan.className = 'app-step-nav__circle app-step-nav__circle--number'

  const innerCircle = document.createElement('span')
  innerCircle.className = 'app-step-nav__circle-inner'

  const circleBackground = document.createElement('span')
  circleBackground.className = 'app-step-nav__circle-background'

  const hiddenStepLabel = document.createElement('span')
  hiddenStepLabel.className = 'govie-visually-hidden govie-!-display-none-print'
  hiddenStepLabel.innerText = 'Step'
  circleBackground.appendChild(hiddenStepLabel)

  circleBackground.append(` ${stepNumber}`)

  const hiddenColonSymbol = document.createElement('span')
  hiddenColonSymbol.className =
    'govie-visually-hidden govie-!-display-none-print'
  hiddenColonSymbol.setAttribute('aria-hidden', true)
  hiddenColonSymbol.innerText = ':'
  circleBackground.appendChild(hiddenColonSymbol)

  innerCircle.appendChild(circleBackground)

  stepNumberSpan.appendChild(innerCircle)

  return stepNumberSpan
}

const createStepLogic = (stepLogic) => {
  const stepLogicSpan = document.createElement('span')
  stepLogicSpan.className = 'app-step-nav__circle app-step-nav__circle--logic'

  const innerCircle = document.createElement('span')
  innerCircle.className = 'app-step-nav__circle-inner'

  const circleBackground = document.createElement('span')
  circleBackground.className = 'app-step-nav__circle-background'
  circleBackground.innerText = ` ${stepLogic} `

  innerCircle.appendChild(circleBackground)
  stepLogicSpan.appendChild(innerCircle)

  return stepLogicSpan
}

const createStepTitleFocusSpan = (title) => {
  const titleTextFocusSpan = document.createElement('span')
  titleTextFocusSpan.className = 'app-step-nav____title-text-focus'

  const titleTextSpan = document.createElement('span')
  titleTextSpan.className = 'app-step-nav__title-text js-step-title-text'
  titleTextSpan.innerText = title
  titleTextFocusSpan.appendChild(titleTextSpan)

  const titleHiddenDivider = document.createElement('span')
  titleHiddenDivider.className =
    'govie-visually-hidden app-step-nav__section-heading-divider'
  titleHiddenDivider.innerText = ', '
  titleTextFocusSpan.appendChild(titleHiddenDivider)

  return titleTextFocusSpan
}

const createStepToggleLink = () => {
  const stepToggleLinkSpan = document.createElement('span')
  stepToggleLinkSpan.className =
    'app-step-nav__toggle-link js-toggle-link govie-!-display-none-print'

  const toggleLinkFocusSpan = document.createElement('span')
  toggleLinkFocusSpan.className = 'app-step-nav__toggle-link-focus'

  const toggleChevronSpan = document.createElement('span')
  toggleChevronSpan.className =
    'app-step-nav__chevron js-toggle-link-icon app-step-nav__chevron--down'
  toggleLinkFocusSpan.appendChild(toggleChevronSpan)

  const toggleTextSpan = document.createElement('span')
  toggleTextSpan.className = 'app-step-nav__button-text js-toggle-link-text'
  toggleTextSpan.innerText = 'Show'
  toggleLinkFocusSpan.appendChild(toggleTextSpan)

  stepToggleLinkSpan.appendChild(toggleLinkFocusSpan)

  const hiddenSectionTextSpan = document.createElement('span')
  hiddenSectionTextSpan.className = 'govie-visually-hidden'
  hiddenSectionTextSpan.innerText = ' this section'
  stepToggleLinkSpan.appendChild(hiddenSectionTextSpan)

  return stepToggleLinkSpan
}

const createStepTitle = (id, title) => {
  const stepTitleSpan = document.createElement('span')
  stepTitleSpan.className = 'js-step-title'

  const stepTitleButton = document.createElement('button')
  stepTitleButton.className =
    'app-step-nav__button app-step-nav__button--title js-step-title-button'
  stepTitleButton.setAttribute('aria-expanded', false)
  stepTitleButton.setAttribute('aria-controls', id)

  stepTitleButton.appendChild(createStepTitleFocusSpan(title))
  stepTitleButton.appendChild(createStepToggleLink())

  stepTitleSpan.appendChild(stepTitleButton)

  return stepTitleSpan
}

const createStepHeader = (id, title, stepNumber, stepLogic, dataPosition) => {
  const stepHeader = document.createElement('div')
  stepHeader.className = 'app-step-nav__header js-toggle-panel'
  stepHeader.setAttribute('data-position', dataPosition)

  const stepHeading = document.createElement('h2')
  stepHeading.className = 'app-step-nav__title'
  if (stepLogic) {
    stepHeading.appendChild(createStepLogic(stepLogic))
  } else {
    stepHeading.appendChild(createStepNumber(stepNumber))
  }

  const stepTitleSpan = document.createElement('span')
  stepTitleSpan.className = 'js-step-title'
  stepTitleSpan.innerText = title
  stepHeading.appendChild(stepTitleSpan)

  // stepHeading.appendChild(createStepTitle(id, title))

  stepHeader.appendChild(stepHeading)

  return stepHeader
}

const createStepContent = (id, contentNodes) => {
  const contentWrapper = document.createElement('div')
  contentWrapper.className = 'app-step-nav__panel js-panel'
  contentWrapper.id = id

  if (Array.isArray(contentNodes) && contentNodes.length > 0) {
    contentNodes.forEach((node) => contentWrapper.appendChild(node))
  }

  return contentWrapper
}

const createStep = (
  id,
  title,
  stepNumber,
  stepLogic,
  dataPosition,
  contentNodes
) => {
  const stepListItem = document.createElement('li')
  stepListItem.className = 'app-step-nav__step js-step'
  stepListItem.id = 'check-you-re-allowed-to-drive'

  stepListItem.appendChild(
    createStepHeader(id, title, stepNumber, stepLogic, dataPosition)
  )
  stepListItem.appendChild(createStepContent(id, contentNodes))

  return stepListItem
}

const createStepsList = () => {
  const list = document.createElement('ol')
  list.className = 'app-step-nav__steps'

  steps.forEach((step) => {
    const { id, title, stepNumber, stepLogic, dataPosition, contentNodes } =
      step

    list.appendChild(
      createStep(id, title, stepNumber, stepLogic, dataPosition, contentNodes)
    )
  })

  return list
}

const createStepByStepNavigation = () => {
  const stepByStepNavigation = document.createElement('div')
  stepByStepNavigation.setAttribute('data-module', 'appstepnav')
  stepByStepNavigation.setAttribute('id', 'step-by-step-navigation')
  stepByStepNavigation.className = 'app-step-nav js-hidden app-step-nav--large'
  stepByStepNavigation.setAttribute('data-show-text', 'Show')
  stepByStepNavigation.setAttribute('data-hide-text', 'Hide')
  stepByStepNavigation.setAttribute('data-show-all-text', 'Show all steps')
  stepByStepNavigation.setAttribute('data-hide-all-text', 'Hide all steps')

  // stepByStepNavigation.appendChild(createNavigationControls())
  stepByStepNavigation.appendChild(createStepsList())

  return stepByStepNavigation
}

const createStepByStepNavigationRow = () => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'

  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'
  column.appendChild(createStepByStepNavigation())

  row.appendChild(column)

  return row
}

const Template = (args) => {
  const breadcrumbsNavigation = parseHtmlString(
    breadcrumbs({
      breadcrumbs: [
        'Home',
        'Driving and transport',
        'Driving tests and learning to drive or ride',
      ],
    })
  )
  const headerRow = createHeaderRow()
  const stepByStepNavigationRow = createStepByStepNavigationRow()
  const body = createBody(
    [headerRow, stepByStepNavigationRow],
    [breadcrumbsNavigation]
  )

  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
