import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Accordion',
  parameters: {
    docs: {
      component:
        'The accordion component lets users show and hide sections of related content on a page.',
    },
  },
  argTypes: {
    accordionId: {
      control: 'text',
      type: { name: 'text', required: true },
    },
    items: {
      control: 'array',
      type: { name: 'array', required: true },
    },
  },
  args: {
    accordionId: 'accordion-default',
    items: [
      {
        heading: 'Writing well for the web',
        summary: 'Writing well for the web',
        content: 'This is the content for Writing well for the web.',
      },
    ],
  },
}

const createSectionHeader = (accordionId, sectionData, index) => {
  const headingSpan = document.createElement('span')
  headingSpan.className = 'govie-accordion__section-button'
  headingSpan.id = `${accordionId}-heading-${index}`
  headingSpan.innerText = sectionData.heading

  const heading = document.createElement('h2')
  heading.className = 'govie-accordion__section-heading'
  heading.appendChild(headingSpan)

  const header = document.createElement('div')
  header.className = 'govie-accordion__section-header'
  header.appendChild(heading)

  if (sectionData.summary) {
    const summary = document.createElement('div')
    summary.className = 'govie-accordion__section-summary govie-body'
    summary.id = `${accordionId}-summary-${index}`
    summary.innerText = sectionData.summary

    header.appendChild(summary)
  }

  return header
}

const createContent = (accordionId, contentHtml, index) => {
  const content = document.createElement('div')
  content.id = `${accordionId}-content-${index}`
  content.className = 'govie-accordion__section-content'
  content.setAttribute('aria-labelledby', `${accordionId}-${index}`)
  content.innerHTML = contentHtml

  return content
}

const createSection = (accordionId, sectionData, index) => {
  const header = createSectionHeader(accordionId, sectionData, index)
  const content = createContent(accordionId, sectionData.content, index)

  const section = document.createElement('div')
  section.className = 'govie-accordion__section '
  section.appendChild(header)
  section.appendChild(content)

  return section
}

const Template = (args) => {
  const accordion = document.createElement('div')
  accordion.className = 'govie-accordion'
  accordion.setAttribute('data-module', 'govie-accordion')
  accordion.id = args.accordionId

  if (Array.isArray(args.items) && args.items.length > 0) {
    args.items.forEach((sectionData, index) => {
      // In the DOM attributes start the indexing from 1.
      accordion.appendChild(
        createSection(args.accordionId, sectionData, index + 1)
      )
    })
  }

  return beautifyHtmlNode(accordion)
}

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      heading: 'Writing well for the web',
      content:
        "<p class='govie-body'>This is the content for Writing well for the web.</p>",
    },
    {
      heading: 'Writing well for specialists',
      content:
        "<p class='govie-body'>This is the content for Writing well for specialists.</p>",
    },
    {
      heading: 'Know your audience',
      content:
        "<p class='govie-body'>This is the content for Know your audience.</p>",
    },
    {
      heading: 'How people read',
      content:
        "<p class='govie-body'>This is the content for How people read.</p>",
    },
  ],
}

export const WithSummary = Template.bind({})
WithSummary.args = {
  items: [
    {
      heading: 'Understanding agile project management',
      summary: 'Introductions, methods, core features.',
      content: `<ul class="govie-list">
        <li>
          <a class="govie-link" href="#">Agile and government services: an introduction</a>
        </li>
        <li>
          <a class="govie-link" href="#">Agile methods: an introduction</a>
        </li>
        <li>
          <a class="govie-link" href="#">Core principles of agile</a>
        </li>
      </ul>`,
    },
    {
      heading: 'Working with agile methods',
      summary: 'Workspaces, tools and techniques, user stories, planning.',
      content: `<ul class="govie-list">
        <li>
          <a class="govie-link" href="#">Creating an agile working environment</a>
        </li>
        <li>
          <a class="govie-link" href="#">Agile tools and techniques</a>
        </li>
        <li>
          <a class="govie-link" href="#">Set up a team wall</a>
        </li>
        <li>
          <a class="govie-link" href="#">Writing user stories</a>
        </li>
        <li>
          <a class="govie-link" href="#">Planning in agile</a>
        </li>
        <li>
          <a class="govie-link" href="#">Deciding on priorities</a>
        </li>
        <li>
          <a class="govie-link" href="#">Developing a roadmap</a>
        </li>
      </ul>`,
    },
    {
      heading: 'Governing agile services',
      summary: 'Principles, measuring progress, spending money.',
      content: `<ul class="govie-list">
        <li>
          <a class="govie-link" href="#">Governance principles for agile service delivery</a>
        </li>
        <li>
          <a class="govie-link" href="#">Measuring and reporting progress</a>
        </li>
        <li>
          <a class="govie-link" href="#">Spend controls: check if you need approval to spend money on a service</a>
        </li>
        <li>
          <a class="govie-link" href="#">Spend controls: apply for approval to spend money on a service</a>
        </li>
        <li>
          <a class="govie-link" href="#">Spend controls: the new pipeline process</a>
        </li>
        <li>
          <a class="govie-link" href="#">Working across organisational boundaries</a>
        </li>
      </ul>`,
    },
  ],
}
