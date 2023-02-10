import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as taskList } from '../../components/task-list/TaskList.stories'

export default {
  title: 'Pages/Task list',
  parameters: {
    docs: {
      description: {
        component: `Task list pages help users understand:
          <ul>
          <li>the tasks involved in completing a transaction</li>
          <li>the order they should complete tasks in</li>
          <li>when they’ve completed tasks</li>
          </ul>
          `,
      },
    },
  },
}

const createTaskList = () => {
  const content = [
    {
      header: 'Check before you start',
      taskList: [
        {
          action: { name: 'Check eligibility', link: true },
          tag: { name: 'COMPLETED' },
        },
        {
          action: { name: 'Read declaration', link: true },
          tag: { name: 'COMPLETED' },
        },
      ],
    },
    {
      header: 'Prepare application',
      taskList: [
        {
          action: { name: 'Company information', link: true },
          tag: { name: 'COMPLETED' },
        },
        {
          action: { name: 'Your contact details', link: true },
          tag: { name: 'IN PROGRESS', type: 'blue' },
        },
        {
          action: { name: 'List convictions', link: true },
          tag: { name: 'NOT STARTED', type: 'grey' },
        },
        {
          action: { name: 'Provide financial evidence' },
          tag: { name: 'CANNOT START YET', type: 'grey' },
        },
        {
          action: { name: 'Give medical information' },
          tag: { name: 'CANNOT START YET', type: 'grey' },
        },
      ],
    },
    {
      header: 'Apply',
      taskList: [
        {
          action: { name: 'Submit and pay' },
          tag: { name: 'CANNOT START YET', type: 'grey' },
        },
      ],
    },
  ]

  const list = parseHtmlString(taskList({ content }))
  return list
}

const createColumn = () => {
  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const checkAnswersHeading = parseHtmlString(
    heading({
      text: 'Service name goes here',
      size: 'xl',
    })
  )
  column.appendChild(checkAnswersHeading)

  const personalSubHeading = parseHtmlString(
    heading({
      text: 'Application incomplete',
      size: 's',
      element: 'h2',
    })
  )
  personalSubHeading.className += ' govie-!-margin-bottom-2'
  column.appendChild(personalSubHeading)

  const completedSectionParagraph = parseHtmlString(
    paragraph({ text: 'You have completed 3 of 8 sections.' })
  )
  completedSectionParagraph.className += ' govie-!-margin-bottom-7'
  column.appendChild(completedSectionParagraph)

  column.appendChild(createTaskList())

  return column
}

const createMainWrapper = () => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'
  row.appendChild(createColumn())

  const mainWrapper = document.createElement('main')
  mainWrapper.className = 'govie-main-wrapper'
  mainWrapper.id = 'main-content'
  mainWrapper.role = 'main'
  mainWrapper.appendChild(row)

  const container = document.createElement('div')
  container.className = 'govie-width-container'
  container.appendChild(mainWrapper)

  return container
}

const Template = (args) => {
  const body = createBody({
    mainContent: createMainWrapper(),
    shortFooter: true,
  })
  return beautifyHtmlNode(body)
}

export const Default = Template.bind({})
Default.args = {}
