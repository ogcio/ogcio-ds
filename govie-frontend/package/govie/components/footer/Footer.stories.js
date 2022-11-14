export default {
  title: 'Footer',
  parameters: {
    docs: {
      description: {
        component:
          'The footer provides copyright, licensing and other information about your service.',
      },
    },
  },
  // argTypes: {
  //   mode: {
  //     options: ['primary', 'secondary', 'warning', 'start'],
  //     control: { type: 'radio' },
  //   },
  //   label: { control: 'text' },
  //   disabled: { control: 'boolean' },
  // },
}

const Template = (args) => {
  const footer = document.createElement('footer')
  footer.className = 'govie-footer'
  footer.setAttribute('role', 'contentinfo')

  const widthContainer = document.createElement('div')
  widthContainer.className = 'govie-width-container'

  const meta = document.createElement('div')
  meta.className = 'govie-footer__meta'

  const metaItem = document.createElement('div')
  metaItem.className = 'govie-footer__meta-item govie-footer__meta-item--grow'

  const metaItemLogo = document.createElement('div')
  metaItemLogo.className = 'govie-footer__meta-item'
  metaItemLogo.innerHTML = `
    <a 
      class="govie-footer__link govie-footer__copyright-logo"
      href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
    ></a>
  `

  const license = document.createElement('span')
  license.className = 'govie-footer__licence-description'
  license.innerHTML = `
    All content is available under the
    <a 
      class="govie-footer__link" 
      href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" 
      rel="license"
    >
      Open Government Licence v3.0
    </a>, except where otherwise stated
  `
  metaItem.insertAdjacentHTML(
    'afterbegin',
    `
      <svg aria-hidden="true" focusable="false" class="govie-footer__licence-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.2 195.7" height="17" width="41">
        <path fill="currentColor" d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145" />
      </svg>
    `
  )

  metaItem.appendChild(license)
  meta.appendChild(metaItem)
  meta.appendChild(metaItemLogo)
  widthContainer.appendChild(meta)
  footer.appendChild(widthContainer)

  return footer
}

export const Footer = Template.bind({})
Footer.args = {
}
