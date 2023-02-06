import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as link } from '../../components/typography/Link.stories'
import { Default as iconButton } from '../../components/icon-button/IconButton.stories'

export default {
  title: 'Application/Actions',
  argTypes: {
    type: {
      options: ['icons', 'links'],
      control: { type: 'radio' },
    },
    tooltipPosition: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
    links: { control: 'array' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'icons',
    disabled: false,
    tooltipPosition: 'right',
    links: ['Edit', 'View', 'Delete']
  },
}

const createLinksCell = (links) => {
  const container = document.createElement('div')

  links.forEach((action) => {
    const actionLink = parseHtmlString(link({ label: action, href: '#' }))
    actionLink.className += ' govie-!-margin-right-3'
    container.appendChild(actionLink)
  })

  return container
}

const createActionsCell = (position, disabled) => {
  const container = document.createElement('div')

  const actions = [
    iconButton({
      icon: `<svg class="govie-!-margin-right-3" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.25 16.25L6.75 14.675L3.2625 16.025C3.0125 16.125 2.78125 16.0968 2.56875 15.9403C2.35625 15.7843 2.25 15.575 2.25 15.3125V4.8125C2.25 4.65 2.297 4.50625 2.391 4.38125C2.4845 4.25625 2.6125 4.1625 2.775 4.1L6.75 2.75L11.25 4.325L14.7375 2.975C14.9875 2.875 15.2188 2.903 15.4313 3.059C15.6438 3.2155 15.75 3.425 15.75 3.6875V14.1875C15.75 14.35 15.703 14.4938 15.609 14.6188C15.5155 14.7438 15.3875 14.8375 15.225 14.9L11.25 16.25ZM10.5 14.4125V5.6375L7.5 4.5875V13.3625L10.5 14.4125Z" fill="#0B0C0C"/>
    </svg>
    `,
      tooltipLabel: 'Map',
      position,
      disabled,
    }),
    iconButton({
      icon: `<svg class="govie-!-margin-right-3" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.975 2.675L8.925 6.725L10.275 8.075L15 3.35V2.675M8.25 9.0875C8.16049 9.0875 8.07465 9.05194 8.01135 8.98865C7.94806 8.92536 7.9125 8.83951 7.9125 8.75C7.9125 8.66049 7.94806 8.57465 8.01135 8.51135C8.07465 8.44806 8.16049 8.4125 8.25 8.4125C8.33951 8.4125 8.42536 8.44806 8.48865 8.51135C8.55194 8.57465 8.5875 8.66049 8.5875 8.75C8.5875 8.83951 8.55194 8.92536 8.48865 8.98865C8.42536 9.05194 8.33951 9.0875 8.25 9.0875ZM4.2 14.15C3.84196 14.15 3.49858 14.0078 3.24541 13.7546C2.99223 13.5014 2.85 13.158 2.85 12.8C2.85 12.442 2.99223 12.0986 3.24541 11.8454C3.49858 11.5922 3.84196 11.45 4.2 11.45C4.55804 11.45 4.90142 11.5922 5.15459 11.8454C5.40777 12.0986 5.55 12.442 5.55 12.8C5.55 13.158 5.40777 13.5014 5.15459 13.7546C4.90142 14.0078 4.55804 14.15 4.2 14.15ZM4.2 6.05C3.84196 6.05 3.49858 5.90777 3.24541 5.65459C2.99223 5.40142 2.85 5.05804 2.85 4.7C2.85 4.34196 2.99223 3.99858 3.24541 3.74541C3.49858 3.49223 3.84196 3.35 4.2 3.35C4.55804 3.35 4.90142 3.49223 5.15459 3.74541C5.40777 3.99858 5.55 4.34196 5.55 4.7C5.55 5.05804 5.40777 5.40142 5.15459 5.65459C4.90142 5.90777 4.55804 6.05 4.2 6.05ZM6.657 5.807C6.81225 5.4695 6.9 5.09825 6.9 4.7C6.9 3.98392 6.61554 3.29716 6.10919 2.79081C5.60284 2.28446 4.91608 2 4.2 2C3.48392 2 2.79716 2.28446 2.29081 2.79081C1.78446 3.29716 1.5 3.98392 1.5 4.7C1.5 5.41608 1.78446 6.10284 2.29081 6.60919C2.79716 7.11554 3.48392 7.4 4.2 7.4C4.59825 7.4 4.9695 7.31225 5.307 7.157L6.9 8.75L5.307 10.343C4.9695 10.1877 4.59825 10.1 4.2 10.1C3.48392 10.1 2.79716 10.3845 2.29081 10.8908C1.78446 11.3972 1.5 12.0839 1.5 12.8C1.5 13.5161 1.78446 14.2028 2.29081 14.7092C2.79716 15.2155 3.48392 15.5 4.2 15.5C4.91608 15.5 5.60284 15.2155 6.10919 14.7092C6.61554 14.2028 6.9 13.5161 6.9 12.8C6.9 12.4018 6.81225 12.0305 6.657 11.693L8.25 10.1L12.975 14.825H15V14.15L6.657 5.807Z" fill="#0B0C0C"/>
    </svg>
    `,
      tooltipLabel: 'Cut',
      position,
      disabled,
    }),
    iconButton({
      icon: `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 14.25C2.45 14.25 1.97933 14.1033 1.588 13.8097C1.196 13.5157 1 13.1625 1 12.75V3H0V1.5H5V0.75H11V1.5H16V3H15V12.75C15 13.1625 14.8043 13.5157 14.413 13.8097C14.021 14.1033 13.55 14.25 13 14.25H3ZM13 3H3V12.75H13V3ZM5 11.25H7V4.5H5V11.25ZM9 11.25H11V4.5H9V11.25ZM3 3V12.75V3Z" fill="#0B0C0C"/>
      </svg>      
    `,
      tooltipLabel: 'Delete',
      position,
      disabled,
    }),
  ]

  actions.forEach((action) => {
    const actionLink = parseHtmlString(action)
    container.appendChild(actionLink)
  })

  return container
}

const Template = (args) => {
  const table = document.createElement('div')

  if (args.type === 'icons') {
    table.appendChild(createActionsCell(args.tooltipPosition, args.disabled))
  } else {
    table.appendChild(createLinksCell(args.links))
  }

  return beautifyHtmlNode(table)
}

export const Icons = Template.bind({})
Icons.args = {}

export const Links = Template.bind({})
Links.args = {
  type: 'links'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
