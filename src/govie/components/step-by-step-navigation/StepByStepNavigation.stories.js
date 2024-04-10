import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Layout/Step By Step Navigation',
  parameters: {
    docs: {
      description: {
        component:
          'The step by step navigation component presents an end to end journey in logical steps, with links to content that helps users complete each step.'
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
// App Step Componenets Section ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const createStepNavParagraph = (text) => {
  const stepNavParagraph = document.createElement('p')
  stepNavParagraph.className = 'govie-step-nav__paragraph'
  stepNavParagraph.innerText = text

  return stepNavParagraph
}

const createStepNavListItem = (dataPostion, link) => {
  const listItem = document.createElement('li')
  listItem.className = 'govie-step-nav__list-item js-list-item '

  const anchor = document.createElement('a')
  anchor.setAttribute('data-position', dataPostion)
  anchor.className = 'govie-step-nav__link js-link'
  anchor.setAttribute('href', '#')
  anchor.innerHTML = link

  listItem.appendChild(anchor)

  return listItem
}

const createStepNavList = (dataPostion, links) => {
  const list = document.createElement('ol')
  list.className = 'govie-step-nav__list '
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
        'Driving eyesight rules'
      ])
    ]
  },
  {
    id: 'step-panel-get-a-provisional-licence-2',
    dataPosition: 2,
    title: 'Get a provisional licence',
    stepNumber: 2,
    contentNodes: [
      createStepNavList(2, [
        'Apply for your first provisional driving licence <span class="govie-step-nav__context">€34 to €43</span>'
      ])
    ]
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
        'Practise vehicle safety questions'
      ])
    ]
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
        'Theory and hazard perception test app'
      ])
    ]
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
        'Book your theory test <span class="govie-step-nav__context">€23</span>',
        'What to take to your test',
        'Change your theory test appointment',
        'Check your theory test appointment details',
        'Cancel your theory test'
      ])
    ]
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
        'Book your driving test <span class="govie-step-nav__context">€62 to €75</span>',
        'What to take to your test',
        'Change your driving test appointment',
        'Check your driving test appointment details',
        'Cancel your driving test'
      ])
    ]
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
      createStepNavList(7, ['Find out about Pass Plus training courses'])
    ]
  }
]

///////////////////////////////////////////////////////////////////////////////
// Template Section ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const createStepNumber = (stepNumber) => {
  const stepNumberSpan = document.createElement('span')
  stepNumberSpan.className =
    'govie-step-nav__circle govie-step-nav__circle--number'

  const innerCircle = document.createElement('span')
  innerCircle.className = 'govie-step-nav__circle-inner'

  const circleBackground = document.createElement('span')
  circleBackground.className = 'govie-step-nav__circle-background'

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
  stepLogicSpan.className =
    'govie-step-nav__circle govie-step-nav__circle--logic'

  const innerCircle = document.createElement('span')
  innerCircle.className = 'govie-step-nav__circle-inner'

  const circleBackground = document.createElement('span')
  circleBackground.className = 'govie-step-nav__circle-background'
  circleBackground.innerText = ` ${stepLogic} `

  innerCircle.appendChild(circleBackground)
  stepLogicSpan.appendChild(innerCircle)

  return stepLogicSpan
}

const createStepHeader = (title, stepNumber, stepLogic, dataPosition) => {
  const stepHeader = document.createElement('div')
  stepHeader.className = 'govie-step-nav__header js-toggle-panel'
  stepHeader.setAttribute('data-position', dataPosition)

  const stepHeading = document.createElement('h2')
  stepHeading.className = 'govie-step-nav__title'
  if (stepLogic) {
    stepHeading.appendChild(createStepLogic(stepLogic))
  } else {
    stepHeading.appendChild(createStepNumber(stepNumber))
  }

  const stepTitleSpan = document.createElement('span')
  stepTitleSpan.className = 'js-step-title'
  stepTitleSpan.innerText = title
  stepHeading.appendChild(stepTitleSpan)

  stepHeader.appendChild(stepHeading)

  return stepHeader
}

const createStepContent = (id, contentNodes) => {
  const contentWrapper = document.createElement('div')
  contentWrapper.className = 'govie-step-nav__panel js-panel'
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
  stepListItem.className = 'govie-step-nav__step js-step'
  stepListItem.id = `id-${id}`

  stepListItem.appendChild(
    createStepHeader(title, stepNumber, stepLogic, dataPosition)
  )
  stepListItem.appendChild(createStepContent(id, contentNodes))

  return stepListItem
}

const createStepsList = () => {
  const list = document.createElement('ol')
  list.className = 'govie-step-nav__steps'

  steps.forEach((step) => {
    const { id, title, stepNumber, stepLogic, dataPosition, contentNodes } =
      step

    list.appendChild(
      createStep(id, title, stepNumber, stepLogic, dataPosition, contentNodes)
    )
  })

  return list
}

const Template = (args) => {
  const stepByStepNavigation = document.createElement('div')
  stepByStepNavigation.setAttribute('data-module', 'appstepnav')
  stepByStepNavigation.setAttribute('id', 'govie-step-by-step-navigation')
  stepByStepNavigation.className = 'govie-step-nav govie-step-nav--large'
  stepByStepNavigation.setAttribute('data-show-text', 'Show')
  stepByStepNavigation.setAttribute('data-hide-text', 'Hide')
  stepByStepNavigation.setAttribute('data-show-all-text', 'Show all steps')
  stepByStepNavigation.setAttribute('data-hide-all-text', 'Hide all steps')

  stepByStepNavigation.appendChild(createStepsList())

  return beautifyHtmlNode(stepByStepNavigation)
}

export const Default = Template.bind({})
Default.args = {}
