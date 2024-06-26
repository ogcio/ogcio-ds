import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';
import { openGovernmentImage } from '../../storybook/svgImages';

export default {
  title: 'Layout/Footer',
  parameters: {
    docs: {
      description: {
        component:
          'The footer provides copyright, licensing and other information about your service.',
      },
    },
  },
  argTypes: {
    inlineLinks: { control: 'text' },
    secondaryNavigationLinks: { control: 'array' },
    secondaryNavigationLinkHeadings: { control: 'array' },
    logoLink: { control: 'text' },
    licenseLink: { control: 'text' },
  },
  args: {
    logoLink: '#',
    licenseLink: '#',
    secondaryNavigationLinks: [],
    secondaryNavigationLinkHeadings: ['Two column list', 'Single column list'],
  },
};

const createNavigationSection = (items, headingText, twoColumns) => {
  const section = document.createElement('div');

  section.className = `govie-footer__section ${
    twoColumns ? 'govie-grid-column-two-thirds' : 'govie-grid-column-one-third'
  }`;

  const heading = document.createElement('h2');
  heading.className = 'govie-footer__heading govie-heading-m';
  heading.innerText = headingText;

  const ul = document.createElement('ul');
  ul.className = `govie-footer__list ${
    twoColumns ? 'govie-footer__list--columns-2' : ''
  }`;

  items.forEach((item, index) => {
    ul.insertAdjacentHTML(
      'beforeend',
      `
      <li class="govie-footer__list-item">
        <a class="govie-footer__link" href="#${index + 1}">
          ${item}
        </a>
      </li>
    `,
    );
  });

  section.appendChild(heading);
  section.appendChild(ul);

  return section;
};

const createNavigation = (navigationLinks, navigationLinkHeadings) => {
  const [first, second] = navigationLinks;

  const navigation = document.createElement('div');
  navigation.className = 'govie-footer__navigation';

  navigation.appendChild(
    createNavigationSection(first, navigationLinkHeadings[0], true),
  );
  navigation.appendChild(
    createNavigationSection(second, navigationLinkHeadings[1]),
  );

  return navigation;
};

const createInlineLinks = (items) => {
  const ul = document.createElement('ul');
  ul.className = 'govie-footer__inline-list';

  items?.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'govie-footer__inline-list-item';

    const a = document.createElement('a');
    a.className = 'govie-footer__link';
    a.href = `#${index}`;
    a.innerText = item;

    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
};

const Template = (args) => {
  const footer = document.createElement('footer');
  footer.className = 'govie-footer';
  footer.setAttribute('role', 'contentinfo');

  const widthContainer = document.createElement('div');
  widthContainer.className = 'govie-width-container';

  if (
    args.secondaryNavigationLinks &&
    args.secondaryNavigationLinks.length > 0
  ) {
    widthContainer.appendChild(
      createNavigation(
        args.secondaryNavigationLinks,
        args.secondaryNavigationLinkHeadings,
      ),
    );
  }

  const meta = document.createElement('div');
  meta.className = 'govie-footer__meta';

  const metaItem = document.createElement('div');
  metaItem.className = 'govie-footer__meta-item govie-footer__meta-item--grow';

  if (args.inlineLinks) {
    const h2 = document.createElement('h2');
    h2.className = 'govie-visually-hidden';
    h2.innerText = 'Support links';

    metaItem.appendChild(h2);

    metaItem.appendChild(createInlineLinks(args.inlineLinks.split(',')));
  }

  const metaItemLogo = document.createElement('div');
  metaItemLogo.className = 'govie-footer__meta-item';
  metaItemLogo.innerHTML = `
    <a 
      class="govie-footer__link govie-footer__copyright-logo"
      href="${args.logoLink}"
    >
      <span class="govie-visually-hidden">Copyright logo</span>
    </a>
  `;

  const license = document.createElement('span');
  license.className = 'govie-footer__licence-description';
  license.innerHTML = `
    All content is available under the
    <a 
      class="govie-footer__link" 
      href="${args.licenseLink}" 
      rel="license"
    >
      Open Government Licence v3.0
    </a>, except where otherwise stated
  `;
  metaItem.insertAdjacentHTML('beforeend', openGovernmentImage);

  metaItem.insertAdjacentElement('beforeend', license);

  meta.appendChild(metaItem);
  meta.appendChild(metaItemLogo);

  widthContainer.appendChild(meta);
  footer.appendChild(widthContainer);

  return beautifyHtmlNode(footer);
};

export const Default = Template.bind({});
Default.args = {};

export const WithLinks = Template.bind({});
WithLinks.args = {
  inlineLinks: 'Item 1, Item 2, Item 3',
};

export const WithSecondaryNavigation = Template.bind({});
WithSecondaryNavigation.args = {
  secondaryNavigationLinks: [
    [
      'Navigation item 1',
      'Navigation item 2',
      'Navigation item 3',
      'Navigation item 4',
      'Navigation item 5',
      'Navigation item 6',
    ],
    ['Navigation item 1', 'Navigation item 2', 'Navigation item 3'],
  ],
};

export const WithSecondaryNavigationAndLinks = Template.bind({});
WithSecondaryNavigationAndLinks.args = {
  inlineLinks: 'Item 1, Item 2, Item 3',
  secondaryNavigationLinks: [
    [
      'Navigation item 1',
      'Navigation item 2',
      'Navigation item 3',
      'Navigation item 4',
      'Navigation item 5',
      'Navigation item 6',
    ],
    ['Navigation item 1', 'Navigation item 2', 'Navigation item 3'],
  ],
};
