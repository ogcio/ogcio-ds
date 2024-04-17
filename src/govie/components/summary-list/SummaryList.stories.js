import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Typography/Summary List',
  parameters: {
    docs: {
      description: {
        component:
          'Use the summary list to summarise information, for example, a user’s responses at the end of a form.',
      },
    },
  },
  argTypes: {
    useBorders: {
      control: 'boolean',
      description:
        'The summary list includes some separating borders to help users read each row and its action. These can be turend off.\n' +
        'To remove borders on a single row, use the `govie-summary-list__row--no-border` class.',
    },
    mixedActions: {
      control: 'boolean',
      description:
        'If you have a mix of rows with and without actions, add the `govie-summary-list__row--no-actions` modifier class to the rows without actions.',
    },
    rows: {
      control: 'array',
      type: { name: 'array', required: true },
    },
  },
  args: {
    useBorders: true,
    mixedActions: false,
    rows: [
      {
        key: 'Name',
        value: 'John Smith',
        actions: [{ label: 'Change', url: '#' }],
      },
      {
        key: 'Name',
        value: 'John Smith',
        noBorder: true,
        actions: [{ label: 'Change', url: '#' }],
      },
    ],
  },
};

const createActionLink = (rowKey, actionData) => {
  const rowKeySpan = document.createElement('span');
  rowKeySpan.className = 'govie-visually-hidden';
  rowKeySpan.innerText = ` ${rowKey.toLowerCase()}`;

  const action = document.createElement('a');
  action.className = 'govie-link';
  action.href = actionData.url;
  action.append(actionData.label);
  action.appendChild(rowKeySpan);

  return action;
};

const createRow = (rowData, mixedActions) => {
  const row = document.createElement('div');
  const classNames = ['govie-summary-list__row'];

  if (rowData.noBorder) {
    classNames.push('govie-summary-list__row--no-border');
  }

  if (mixedActions && (!rowData.actions || rowData.actions.length < 1)) {
    classNames.push('govie-summary-list__row--no-actions');
  }

  row.className = classNames.join(' ');

  const rowKey = document.createElement('dt');
  rowKey.className = 'govie-summary-list__key';
  rowKey.innerHTML = rowData.key;
  row.appendChild(rowKey);

  const rowValue = document.createElement('dd');
  rowValue.className = 'govie-summary-list__value';
  if (Array.isArray(rowData.value)) {
    rowData.value.forEach((item) => {
      const valueItem = document.createElement('p');
      valueItem.className = 'govie-body';
      valueItem.innerText = item;

      rowValue.appendChild(valueItem);
    });
  } else {
    rowValue.innerHTML = rowData.value;
  }

  row.appendChild(rowValue);

  if (
    rowData.actions &&
    Array.isArray(rowData.actions) &&
    rowData.actions.length > 0
  ) {
    const actionsContainer = document.createElement('dd');
    actionsContainer.className = 'govie-summary-list__actions';

    rowData.actions.forEach((actionData) => {
      actionsContainer.appendChild(createActionLink(rowData.key, actionData));
    });

    row.appendChild(actionsContainer);
  }

  return row;
};

const Template = (args) => {
  const summaryList = document.createElement('dl');
  const classNames = ['govie-summary-list'];

  if (!args.useBorders) {
    classNames.push('govie-summary-list--no-border');
  }

  summaryList.className = classNames.join(' ');

  if (args.rows && Array.isArray(args.rows) && args.rows.length > 0) {
    args.rows.forEach((rowData) => {
      summaryList.appendChild(createRow(rowData, args.mixedActions));
    });
  }

  return beautifyHtmlNode(summaryList);
};

export const Default = Template.bind({});
Default.args = {
  rows: [
    {
      key: 'Name',
      value: 'John Smith',
      actions: [{ label: 'Change', url: '#' }],
    },
    {
      key: 'Date of birth',
      value: '8 November 1982',
      actions: [{ label: 'Change', url: '#' }],
    },

    {
      key: 'Address',
      value: '72 Guild Street<br>London<br>SE23 6FH',
      actions: [{ label: 'Change', url: '#' }],
    },
    {
      key: 'Contact details',
      value: ['07700 864523', 'john.smith@example.com'],
      actions: [{ label: 'Change', url: '#' }],
    },
  ],
};

export const WithMixedBorders = Template.bind({});
WithMixedBorders.args = {
  rows: [
    {
      key: 'Name',
      value: 'John Smith',
      actions: [{ label: 'Change', url: '#' }],
    },
    {
      key: 'Date of birth',
      value: '8 November 1982',
      actions: [{ label: 'Change', url: '#' }],
      noBorder: true,
    },

    {
      key: 'Address',
      value: '72 Guild Street<br>London<br>SE23 6FH',
      actions: [{ label: 'Change', url: '#' }],
    },
  ],
};

export const WithMixedActions = Template.bind({});
WithMixedActions.args = {
  mixedActions: true,
  rows: [
    {
      key: 'Name',
      value: 'John Smith',
    },
    {
      key: 'Date of birth',
      value: '8 November 1982',
      actions: [{ label: 'Change', url: '#' }],
    },

    {
      key: 'Address',
      value: '72 Guild Street<br>London<br>SE23 6FH',
      actions: [{ label: 'Change', url: '#' }],
    },
  ],
};

export const WithoutBorders = Template.bind({});
WithoutBorders.args = {
  useBorders: false,
  rows: [
    {
      key: 'Name',
      value: 'John Smith',
    },
    {
      key: 'Date of birth',
      value: '8 November 1982',
    },

    {
      key: 'Address',
      value: '72 Guild Street<br>London<br>SE23 6FH',
    },
  ],
};
