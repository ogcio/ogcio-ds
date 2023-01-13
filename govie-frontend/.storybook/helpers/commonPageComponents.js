import parseHtmlString from './parseHtmlString'
import { Default as pageHeader } from '../../src/govie/components/header/Header.stories'
import { Default as pageFooter } from '../../src/govie/components/footer/Footer.stories'

export const createPageHeader = () => {
  return parseHtmlString(
    pageHeader({
      navigationLinks:
        'Navigation item 1, Navigation item 2, Navigation item 3',
    })
  )
}

export const createPageFooter = (shortFooter) => {
  return parseHtmlString(
    shortFooter
      ? pageFooter({})
      : pageFooter({
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

// mainContent: array of HTML nodes or single HTML node
// preMainContents: array of HTML Nodes to appear before the 'main' tag
// additionalWrapperClasses: array of strings
// shortFooter: boolean
export const createBody = ({
  mainContent,
  preMainContents,
  additionalWrapperClasses,
  shortFooter,
}) => {
  const body = document.createElement('body')
  body.className = 'govie-template__body'

  const jsEnabledScript = document.createElement('script')
  jsEnabledScript.innerHTML =
    "document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');"
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

  if (
    preMainContents &&
    Array.isArray(preMainContents) &&
    preMainContents.length > 0
  ) {
    preMainContents.forEach((htmlNode) => widthContainer.appendChild(htmlNode))
  }

  let wrapperClasses = ['govie-main-wrapper']
  if (
    additionalWrapperClasses &&
    Array.isArray(additionalWrapperClasses) &&
    additionalWrapperClasses.length > 0
  ) {
    wrapperClasses = wrapperClasses.concat(additionalWrapperClasses)
  }

  const mainContentWrapper = document.createElement('main')
  mainContentWrapper.className = wrapperClasses.join(' ')
  mainContentWrapper.id = 'main-content'
  mainContentWrapper.setAttribute('role', 'main')

  if (Array.isArray(mainContent) && mainContent.length > 0) {
    mainContent.forEach((item) => {
      mainContentWrapper.appendChild(item)
    })
  } else {
    mainContentWrapper.appendChild(mainContent)
  }

  widthContainer.appendChild(mainContentWrapper)

  body.appendChild(widthContainer)

  body.appendChild(createPageFooter(shortFooter))

  const initScriptTagsText = ` Include and uncomment the below script tags for your pages
    <script src="/govie-frontend/all.js" />
    <script>
      window.GOVIEFrontend.initAll()
    </script>
  `
  const initScriptTagsComment = document.createComment(initScriptTagsText)
  body.append('\n')
  body.appendChild(initScriptTagsComment)

  return body
}
