import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Lists',
  parameters: {
    docs: {
      description: {
        component:
          'Use lists to make blocks of text easier to read, and to break information into manageable chunks.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'array',
      type: { name: 'string', required: true },
      description: 'List of texts to be displayed',
    },
    text: {
      control: 'text',
    },
    link: {
      control: 'boolean',
      description: 'If each item is a link',
    },
    type: {
      options: ['normal', 'bullet', 'number'],
      control: { type: 'radio' },
      description:
        '`bullet`: Introduce bulleted lists with a lead-in line ending in a colon.<br>`number`: Use numbered lists instead of bulleted lists when the order of the items is relevant.',
    },
    spaced: {
      control: 'boolean',
      description:
        'If a list is hard to read because the items run across multiple lines you can add extra spacing.',
    },
  },
  args: {
    link: false,
    type: 'normal',
    spaced: false,
  },
}

const Template = (args) => {
  const list = document.createElement(args.numbered ? 'ol' : 'ul')
  list.className = `govie-list${
    args.type !== 'normal' ? ` govie-list--${args.type}` : ''
  }${args.spaced ? ' govie-list--spaced' : ''}`

  args.items.forEach((item) => {
    const li = document.createElement('li')

    if (args.link) {
      const a = document.createElement('a')
      a.className = 'govie-link'
      a.herf = '#'
      a.innerText = item

      li.appendChild(a)
    } else {
      li.innerText = item
    }

    list.appendChild(li)
  })

  return beautifyHtmlNode(list)
}

export const Default = Template.bind({})
Default.args = {
  items: [
    'Benefits calculators',
    'Benefit overpayments',
    'Benefit fraud',
    'More',
  ],
}

export const Link = Template.bind({})
Link.args = {
  items: [
    'Benefits calculators',
    'Benefit overpayments',
    'Benefit fraud',
    'More',
  ],
  link: true,
}

export const Bullet = Template.bind({})
Bullet.args = {
  items: ['apple', 'orange', 'pears'],
  text: 'You can buy',
  type: 'bullet',
}

export const Numbered = Template.bind({})
Numbered.args = {
  items: ['Delivery address', 'Payment', 'Confirmation'],
  type: 'number',
}

export const ExtraSpace = Template.bind({})
ExtraSpace.args = {
  items: [
    'constructing, altering, repairing, extending, demolishing or dismantling buildings or structures (whether permanent or not), including offshore installation services',
    'pipelines, reservoirs, water mains, wells, sewers, industrial plant and installations for purposes of land drainage, coast protection or defence',
    'painting or decorating the inside or the external surfaces of any building or structure',
  ],
  text: 'You will have to apply the reverse charge if you supply any of these services:',
  spaced: true,
  type: 'bullet',
}
