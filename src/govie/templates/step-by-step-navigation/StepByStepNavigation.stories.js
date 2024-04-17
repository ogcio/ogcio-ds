import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString';
import { createBody } from '../../../../.storybook/helpers/commonPageComponents';

import { Default as heading } from '../../components/typography/Heading.stories';
import { Default as paragraph } from '../../components/typography/Paragraph.stories';
import { Default as breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs.stories';

import { Default as stepByStepNavigation } from '../../components/step-by-step-navigation/StepByStepNavigation.stories';

export default {
  title: 'Templates/Step By Step Navigation',
  parameters: {
    docs: {
      description: {
        component:
          'The step by step navigation template presents an end to end journey in logical steps, with links to content that helps users complete each step.',
      },
    },
  },
};

const createHeaderRow = () => {
  const row = document.createElement('div');
  row.className = 'govie-grid-row';

  const column = document.createElement('div');
  column.className = 'govie-grid-column-two-thirds';

  const pageHeading = parseHtmlString(
    heading({
      text: 'Learn to drive a car: step by step',
      element: 'h1',
      size: 'l',
    }),
  );
  const introParagraph = parseHtmlString(
    paragraph({ text: 'Check what you need to do to learn to drive.' }),
  );

  column.appendChild(pageHeading);
  column.appendChild(introParagraph);

  row.appendChild(column);

  return row;
};

const createStepByStepNavigationRow = () => {
  const row = document.createElement('div');
  row.className = 'govie-grid-row';

  const column = document.createElement('div');
  column.className = 'govie-grid-column-two-thirds';
  column.appendChild(parseHtmlString(stepByStepNavigation({})));

  row.appendChild(column);

  return row;
};

const Template = (args) => {
  const breadcrumbsNavigation = parseHtmlString(
    breadcrumbs({
      breadcrumbs: [
        'Home',
        'Driving and transport',
        'Driving tests and learning to drive or ride',
      ],
    }),
  );
  const headerRow = createHeaderRow();
  const stepByStepNavigationRow = createStepByStepNavigationRow();

  const body = createBody({
    mainContent: [headerRow, stepByStepNavigationRow],
    preMainContents: [breadcrumbsNavigation],
    additionalWrapperClasses: ['govie-main-wrapper--auto-spacing'],
  });

  return beautifyHtmlNode(body);
};

export const Default = Template.bind({});
Default.args = {};
