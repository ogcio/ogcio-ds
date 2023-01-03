import parseHtmlString from './parseHtmlString'
import { Default as pageHeader } from '../../src/govie/components/header/Header.stories'
import { Default as pageFooter } from '../../src/govie/components/footer/Footer.stories'

export const createPageHeader = () => {
  return parseHtmlString(
    pageHeader({
      navigationLinks:
        'Navigation item 1, Navigation item 2, Navigation item 3'
    })
  )
}

export const createPageFooter = () => {
  return parseHtmlString(
    pageFooter({
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
          'Working, jobs and pensions'
        ],
        [
          'Departments',
          'News',
          'Guidance and regulation',
          'Research and statistics',
          'Policy papers and consultations',
          'Transparency',
          'How government works',
          'Get involved'
        ]
      ]
    })
  )
}

// It expects a single HTML node as the mainContent
// TODO: Add support for extra content above the main element
export const createBody = (mainContent) => {
  const body = document.createElement('body')
  body.className = 'govie-template__body'

  const jsEnabledScript = document.createElement('script')
  jsEnabledScript.innerHTML = 'document.body.className = ((document.body.className) ? document.body.className + \' js-enabled\' : \'js-enabled\');'
  body.appendChild(jsEnabledScript)

  const skipToMainLink = document.createElement('a')
  skipToMainLink.href = '#main-content'
  skipToMainLink.className = 'govie-skip-link'
  skipToMainLink.setAttribute('data-module', 'govie-skip-link')
  skipToMainLink.innerText = 'Skip to main content'
  body.appendChild(skipToMainLink)

  body.appendChild(createPageHeader())

  const widthContainer = document.createElement('div')
  widthContainer.className = 'govie-width-container '

  const mainContentWrapper = document.createElement('main')
  mainContentWrapper.className = 'govie-main-wrapper '
  mainContentWrapper.id = 'main-content'
  mainContentWrapper.setAttribute('role', 'main')
  mainContentWrapper.appendChild(mainContent)

  widthContainer.appendChild(mainContentWrapper)

  body.appendChild(widthContainer)

  body.appendChild(createPageFooter())

  const allJsReference = document.createElement('script')
  allJsReference.src = '/govie-frontend/all.js'
  body.appendChild(allJsReference)

  const initAllScript = document.createElement('script')
  initAllScript.innerHTML = 'window.GOVIEFrontend.initAll()'
  body.appendChild(initAllScript)

  return body
}
