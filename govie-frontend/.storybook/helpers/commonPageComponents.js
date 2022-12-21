import parseHtmlString from './parseHtmlString'
import { Default as PageHeader } from '../../src/govie/components/header/Header.stories'
import { Default as PageFooter } from '../../src/govie/components/footer/Footer.stories'

export const createPageHeader = () => {
  return parseHtmlString(
    PageHeader({
      navigationLinks:
        'Navigation item 1, Navigation item 2, Navigation item 3',
    })
  )
}

export const createPageFooter = () => {
  return parseHtmlString(
    PageFooter({
      inlineLinks:
        'Help, Privacy, Cookies, Accessibility statement, Contact, Terms and conditions, Government Digital Service',
      secondaryNavigationLinkHeadings: ['Topics', 'Government activity'],
      secondaryNavigationLinks: [
        [
          'Benefits',
          'Births, death, marriages and care',
          'Business and self-employed',
          'Childcare and parenting',
          'Citizenship and living in Ireland',
          'Crime, justice and the law',
          'Disabled people',
          'Driving and transport',
          'Education and learning',
          'Employing people',
          'Environment and countryside',
          'Housing and local services',
          'Money and tax',
          'Passports, travel and living abroad',
          'Visas and immigration',
          'Working, jobs and pensions',
        ],
        [
          'Departments',
          'News',
          'Guidance and regulation',
          'Research and statistics',
          'Policy papers and consultations',
          'Transparency',
          'How government works',
          'Get involved',
        ],
      ],
    })
  )
}
