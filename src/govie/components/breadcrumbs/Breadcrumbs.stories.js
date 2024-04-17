import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Navigation/Breadcrumbs',
  parameters: {
    docs: {
      description: {
        component:
          'The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.',
      },
    },
  },
  argTypes: {
    breadcrumbs: {
      control: 'array',
      type: { name: 'array', required: true },
    },
  },
  args: {
    breadcrumbs: ['Home'],
  },
};

const createBreadcrumbNode = (breadcrumb) => {
  const anchor = document.createElement('a');
  anchor.className = 'govie-breadcrumbs__link';
  anchor.setAttribute('href', '#');
  anchor.innerText = breadcrumb;

  const listItem = document.createElement('li');
  listItem.className = 'govie-breadcrumbs__list-item';
  listItem.appendChild(anchor);

  return listItem;
};

const Template = (args) => {
  const list = document.createElement('ol');
  list.className = 'govie-breadcrumbs__list';

  args.breadcrumbs.forEach((breadcrumb) => {
    list.appendChild(createBreadcrumbNode(breadcrumb));
  });

  const breadcrumbsContainer = document.createElement('div');
  breadcrumbsContainer.className = 'govie-breadcrumbs';
  breadcrumbsContainer.appendChild(list);

  return beautifyHtmlNode(breadcrumbsContainer);
};

export const Default = Template.bind({});
Default.args = {
  breadcrumbs: ['Home', 'Passports, travel and living abroad', 'Travel abroad'],
};
