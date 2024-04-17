import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString';
import { createSvgIcon } from '../../../../.storybook/helpers/utils';

import { Default as link } from '../../components/typography/Link.stories';
import { Default as iconButton } from '../../components/icon-button/IconButton.stories';

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
    links: ['Edit', 'View', 'Delete'],
  },
};

const createLinksCell = (links) => {
  const container = document.createElement('div');

  links.forEach((action) => {
    const actionLink = parseHtmlString(link({ label: action, href: '#' }));
    actionLink.className += ' govie-!-margin-right-3';
    container.appendChild(actionLink);
  });

  return container;
};

const createActionsCell = (position, disabled) => {
  const container = document.createElement('div');

  const actions = [
    iconButton({
      icon: createSvgIcon(
        18,
        18,
        'M12 18L6 15.9L1.35 17.7C1.01667 17.8333 0.708333 17.7957 0.425 17.587C0.141667 17.379 0 17.1 0 16.75V2.75C0 2.53333 0.0626666 2.34167 0.188 2.175C0.312667 2.00833 0.483333 1.88333 0.7 1.8L6 0L12 2.1L16.65 0.3C16.9833 0.166667 17.2917 0.204 17.575 0.412C17.8583 0.620667 18 0.9 18 1.25V15.25C18 15.4667 17.9373 15.6583 17.812 15.825C17.6873 15.9917 17.5167 16.1167 17.3 16.2L12 18ZM11 15.55V3.85L7 2.45V14.15L11 15.55Z',
        'govie-!-margin-right-3',
      ).outerHTML,
      tooltipLabel: 'Map',
      position,
      disabled,
    }),
    iconButton({
      icon: createSvgIcon(
        18,
        18,
        'M15.3 0.9L9.9 6.3L11.7 8.1L18 1.8V0.9M9 9.45C8.88065 9.45 8.76619 9.40259 8.6818 9.3182C8.59741 9.23381 8.55 9.11935 8.55 9C8.55 8.88065 8.59741 8.76619 8.6818 8.6818C8.76619 8.59741 8.88065 8.55 9 8.55C9.11935 8.55 9.23381 8.59741 9.3182 8.6818C9.40259 8.76619 9.45 8.88065 9.45 9C9.45 9.11935 9.40259 9.23381 9.3182 9.3182C9.23381 9.40259 9.11935 9.45 9 9.45ZM3.6 16.2C3.12261 16.2 2.66477 16.0104 2.32721 15.6728C1.98964 15.3352 1.8 14.8774 1.8 14.4C1.8 13.9226 1.98964 13.4648 2.32721 13.1272C2.66477 12.7896 3.12261 12.6 3.6 12.6C4.07739 12.6 4.53523 12.7896 4.87279 13.1272C5.21036 13.4648 5.4 13.9226 5.4 14.4C5.4 14.8774 5.21036 15.3352 4.87279 15.6728C4.53523 16.0104 4.07739 16.2 3.6 16.2ZM3.6 5.4C3.12261 5.4 2.66477 5.21036 2.32721 4.87279C1.98964 4.53523 1.8 4.07739 1.8 3.6C1.8 3.12261 1.98964 2.66477 2.32721 2.32721C2.66477 1.98964 3.12261 1.8 3.6 1.8C4.07739 1.8 4.53523 1.98964 4.87279 2.32721C5.21036 2.66477 5.4 3.12261 5.4 3.6C5.4 4.07739 5.21036 4.53523 4.87279 4.87279C4.53523 5.21036 4.07739 5.4 3.6 5.4ZM6.876 5.076C7.083 4.626 7.2 4.131 7.2 3.6C7.2 2.64522 6.82072 1.72955 6.14558 1.05442C5.47045 0.379285 4.55478 0 3.6 0C2.64522 0 1.72955 0.379285 1.05442 1.05442C0.379285 1.72955 0 2.64522 0 3.6C0 4.55478 0.379285 5.47045 1.05442 6.14558C1.72955 6.82072 2.64522 7.2 3.6 7.2C4.131 7.2 4.626 7.083 5.076 6.876L7.2 9L5.076 11.124C4.626 10.917 4.131 10.8 3.6 10.8C2.64522 10.8 1.72955 11.1793 1.05442 11.8544C0.379285 12.5295 0 13.4452 0 14.4C0 15.3548 0.379285 16.2705 1.05442 16.9456C1.72955 17.6207 2.64522 18 3.6 18C4.55478 18 5.47045 17.6207 6.14558 16.9456C6.82072 16.2705 7.2 15.3548 7.2 14.4C7.2 13.869 7.083 13.374 6.876 12.924L9 10.8L15.3 17.1H18V16.2L6.876 5.076Z',
        'govie-!-margin-right-3',
      ).outerHTML,
      tooltipLabel: 'Cut',
      position,
      disabled,
    }),
    iconButton({
      icon: createSvgIcon(
        16,
        18,
        'M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.196 17.021 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.021 17.8043 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14ZM3 3V16V3Z',
      ).outerHTML,
      tooltipLabel: 'Delete',
      position,
      disabled,
    }),
  ];

  actions.forEach((action) => {
    const actionLink = parseHtmlString(action);
    container.appendChild(actionLink);
  });

  return container;
};

const Template = (args) => {
  const table = document.createElement('div');

  if (args.type === 'icons') {
    table.appendChild(createActionsCell(args.tooltipPosition, args.disabled));
  } else {
    table.appendChild(
      createLinksCell(args.links || ['Edit', 'View', 'Delete']),
    );
  }

  return beautifyHtmlNode(table);
};

export const Default = Template.bind({});
Default.args = {
  type: 'icons',
};

export const Links = Template.bind({});
Links.args = {
  type: 'links',
};

export const DifferentLinks = Template.bind({});
DifferentLinks.args = {
  type: 'links',
  links: ['Edit', 'Copy', 'Paste'],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  type: 'icons',
};
