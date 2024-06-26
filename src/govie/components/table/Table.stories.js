import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Typography/Table',
  parameters: {
    docs: {
      description: {
        component:
          'Use the table component to make information easier to compare and scan for users.',
      },
    },
  },
  argTypes: {
    caption: {
      control: 'text',
      description:
        'Describe a table in the same way you would use a heading. A caption helps users find, navigate and understand tables.',
    },
    captionSize: {
      options: ['s', 'm', 'l', 'xl'],
      control: { type: 'radio' },
      description:
        'Use to make the caption larger or smaller from the default.',
    },
    headers: {
      control: 'array',
      type: { name: 'string', required: true },
      description:
        'Use table headers to tell users what the rows and columns represent.',
    },
    rows: {
      control: 'array',
      type: { name: 'string', required: true },
    },
    numeric: {
      control: 'boolean',
      description:
        'When comparing columns of numbers, align the numbers to the right in table cells.',
    },
    boldFirstColumn: {
      control: 'boolean',
    },
  },
  args: {
    captionSize: 'm',
    numeric: false,
    boldFirstColumn: true,
  },
};

const createTableHeader = (headers, numeric) => {
  const thead = document.createElement('thead');
  thead.className = 'govie-table__head';

  const trHead = document.createElement('tr');
  trHead.className = 'govie-table__row';

  headers.forEach((header, index) => {
    const th = document.createElement('th');
    th.setAttribute('scope', 'col');

    const classes = ['govie-table__header'];
    if (index !== 0 && numeric) {
      classes.push('govie-table__header--numeric');
    }

    th.className = classes.join(' ');
    th.innerText = header;

    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  return thead;
};

const createTableBody = (rows, numeric, boldFirstColumn) => {
  const tbody = document.createElement('tbody');
  tbody.className = 'govie-table__body';

  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.className = 'govie-table__row';

    row.forEach((cell, index) => {
      if (index === 0 && boldFirstColumn) {
        const th = document.createElement('th');
        th.className = 'govie-table__header';
        th.setAttribute('scope', 'row');
        th.innerText = cell;

        tr.appendChild(th);
      } else {
        const td = document.createElement('td');

        const classes = ['govie-table__cell'];

        if (numeric) {
          classes.push('govie-table__cell--numeric');
        }

        td.className = classes.join(' ');
        td.innerText = cell;

        tr.appendChild(td);
      }
    });

    tbody.appendChild(tr);
  });
  return tbody;
};

const Template = (args) => {
  const table = document.createElement('table');
  table.className = 'govie-table';

  if (args.caption) {
    const caption = document.createElement('caption');

    const classes = ['govie-table__caption'];
    if (args.captionSize) {
      classes.push(`govie-table__caption--${args.captionSize}`);
    }

    caption.className = classes.join(' ');
    caption.innerText = args.caption;

    table.appendChild(caption);
  }

  table.appendChild(createTableHeader(args.headers, args.numeric));
  table.appendChild(
    createTableBody(args.rows, args.numeric, args.boldFirstColumn),
  );

  return beautifyHtmlNode(table);
};

export const Default = Template.bind({});
Default.args = {
  headers: ['Date', 'Amount'],
  rows: [
    ['First 6 weeks', '€109.80 per week'],
    ['Next 33 weeks', '€109.80 per week'],
    ['Total estimated pay', '€4,282.20'],
  ],
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  caption: 'Dates and amounts',
  headers: ['Date', 'Amount'],
  rows: [
    ['First 6 weeks', '€109.80 per week'],
    ['Next 33 weeks', '€109.80 per week'],
    ['Total estimated pay', '€4,282.20'],
  ],
};

export const WithNumericValues = Template.bind({});
WithNumericValues.args = {
  caption: 'Months and rates',
  headers: ['Month you apply', 'Rate for bicycles', 'Rate for vehicles'],
  rows: [
    ['January', '€85', '€5'],
    ['February', '€75', '€55'],
    ['March', '€185', '€125'],
  ],
  numeric: true,
};
