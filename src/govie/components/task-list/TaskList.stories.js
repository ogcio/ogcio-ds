import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Task list',
  parameters: {
    docs: {
      description: {
        component:
          'Only use a task list page for longer transactions involving multiple tasks that users may need to complete over a number of sessions.'
      }
    }
  },
  argTypes: {
    content: { control: 'array', type: { required: true } }
  },
  args: {
    content: [
      {
        header: 'Check before you start',
        taskList: [
          {
            action: { name: 'Check eligibility' },
            tag: { name: 'COMPLETED' }
          },
          {
            action: { name: 'Read declaration' },
            tag: { name: 'COMPLETED' }
          }
        ]
      }
    ]
  }
}

const createHeader = (num, text) => {
  const header = document.createElement('h2')
  header.className = 'govie-task-list__section'

  const sectionNumber = document.createElement('span')
  sectionNumber.className = 'govie-task-list__section-number'
  sectionNumber.innerHTML = num

  header.innerHTML = `${sectionNumber.outerHTML} ${text}`

  return header
}

const createTag = ({ name, type }) => {
  const tag = document.createElement('strong')

  tag.className = `govie-tag govie-task-list__tag ${
    type ? `govie-tag--${type}` : ''
  }`
  tag.innerText = name

  return tag
}

const createUnorderedList = (taskList) => {
  const list = document.createElement('ul')
  list.className = 'govie-task-list__items'

  taskList.forEach(({ action, tag }) => {
    const item = document.createElement('li')
    item.className = 'govie-task-list__item'

    const taskName = document.createElement('span')
    taskName.className = 'govie-task-list__task-name'

    if (action.link) {
      const link = document.createElement('a')
      link.href = '#'
      link.setAttribute('aria-describedby', 'eligibility-status')
      link.innerText = action.name
      taskName.appendChild(link)
    } else {
      taskName.innerText = action.name
    }

    item.appendChild(taskName)

    item.appendChild(createTag(tag))
    list.appendChild(item)
  })

  return list
}

const createListItem = ({ num, header, taskList }) => {
  const list = document.createElement('li')

  list.appendChild(createHeader(num, header))
  list.appendChild(createUnorderedList(taskList))

  return list
}

const Template = (args) => {
  const orderedList = document.createElement('ol')
  orderedList.className = 'govie-task-list'

  args.content.forEach((item, index) => {
    orderedList.appendChild(
      createListItem({
        num: index + 1,
        header: item.header,
        taskList: item.taskList
      })
    )
  })

  return beautifyHtmlNode(orderedList)
}

export const Default = Template.bind({})
Default.args = {}

export const WithLinks = Template.bind({})
WithLinks.args = {
  content: [
    {
      header: 'Check before you start',
      taskList: [
        {
          action: { name: 'Check eligibility', link: true },
          tag: { name: 'COMPLETED' }
        },
        {
          action: { name: 'Read declaration', link: true },
          tag: { name: 'COMPLETED' }
        }
      ]
    }
  ]
}

export const WithMultipleSections = Template.bind({})
WithMultipleSections.args = {
  content: [
    {
      header: 'Check before you start',
      taskList: [
        {
          action: { name: 'Check eligibility', link: true },
          tag: { name: 'COMPLETED' }
        },
        {
          action: { name: 'Read declaration', link: true },
          tag: { name: 'COMPLETED' }
        }
      ]
    },
    {
      header: 'Apply',
      taskList: [
        {
          action: { name: 'Submit and pay' },
          tag: { name: 'CANNOT START YET', type: 'grey' }
        }
      ]
    }
  ]
}
