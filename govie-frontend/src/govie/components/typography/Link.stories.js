export default {
  title: 'Navigation/Link',
  parameters: {
    docs: {
      description: {
        component:
          'Links are blue and underlined by default. If your link is at the end of a sentence or paragraph, make sure that the linked text does not include the full stop.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    href: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    noVisited: {
      control: 'boolean',
      description:
        'Where it is not helpful to distinguish between visited and unvisited states, for example when linking to pages with frequently-changing content such as the dashboard for an admin interface.',
    },
    external: {
      control: 'boolean',
      description: 'To open the link in a new tab',
    },
    dark: {
      control: 'boolean',
      description:
        'Show white links on dark backgrounds — for example, in headers, custom components, and patterns with darker backgrounds.',
    },
    noUnderline: {
      control: 'boolean',
      description: 'To remove underlines from links.',
    },
  },
  args: {
    href: '#',
    noVisited: false,
    external: false,
    dark: false,
    noUnderline: false,
  },
}

const Template = (args) => {
  const link = document.createElement('a')

  const classes = ['govie-link']

  if (args.noVisited) {
    classes.push('govie-link--no-visited-state')
  }
  if (args.dark) {
    classes.push('govie-link--inverse')
  }
  if (args.noUnderline) {
    classes.push('govie-link--no-underline')
  }

  link.className = classes.join(' ')
  link.href = args.href
  link.innerText = args.label

  if (args.external) {
    link.rel = 'noreferrer noopener'
    link.target = '_blank'
  }

  return link
}

export const Default = Template.bind({})
Default.args = {
  label: 'Link text',
}

export const NoVisitedState = Template.bind({})
NoVisitedState.args = {
  label: 'Link text',
  noVisited: true,
}

export const External = Template.bind({})
External.args = {
  label: 'Link text (opens in a new tab)',
  external: true,
}

export const DarkBackground = Template.bind({})
DarkBackground.parameters = {
  backgrounds: {
    default: 'dark',
    values: [{ name: 'dark', value: '#1d70b8' }],
  },
}

DarkBackground.args = {
  label: 'Link text (on dark background)',
  dark: true,
}

export const WithoutUnderline = Template.bind({})
WithoutUnderline.args = {
  label: 'Link text (with no underline)',
  noUnderline: true,
}
