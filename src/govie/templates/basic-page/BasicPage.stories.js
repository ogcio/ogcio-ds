import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Templates/Basic page',
  parameters: {
    docs: {
      description: {
        component: 'A template for a basic page.',
      },
    },
  },
}

const Template = () => {
  const html = document.createElement('html')
  html.innerHTML = `<!DOCTYPE html>
  <html lang="en" class="govie-template ">
  
  <head>
    <meta charset="utf-8">
    <title>OGCIO-DS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#0b0c0c">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/assets/images/favicon.ico" type="image/x-icon">
    <link rel="mask-icon" href="/assets/images/mask-icon.svg" color="#0b0c0c">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/assets/images/apple-touch-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
    <link href="/stylesheet/govie/all.css" rel="stylesheet">
  </head>
  
  <body class="govie-template__body ">
    <script>
      document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');
    </script>
    <a href="#main-content" class="govie-skip-link" data-module="govie-skip-link">Skip to main content</a>
    <header role="banner" data-module="govie-header" class="govie-header">
      <div class="govie-header__container govie-width-container">
        <div class="govie-header__logo">
          <a href="#" class="govie-header__link govie-header__link--homepage">
            <span class="govie-header__logotype">
              <img id="logo-image" src="./@ogcio/assets/images/logo-full.png" class="govie-header__logotype-fallback-image">
            </span>
          </a>
        </div>
      </div>
    </header>
    <div class="govie-width-container ">
      <main class="govie-main-wrapper " id="main-content" role="main">
        <h1 class="govie-heading-xl">Default page template</h1>
      </main>
    </div>
    <footer class="govie-footer" role="contentinfo">
      <div class="govie-width-container">
        <div class="govie-footer__meta">
          <div class="govie-footer__meta-item govie-footer__meta-item--grow">
            <svg aria-hidden="true" focusable="false" class="govie-footer__licence-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 483.2 195.7" height="17" width="41">
              <path fill="currentColor" d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"></path>
            </svg>
            <span class="govie-footer__licence-description"> All content is available under the <a class="govie-footer__link" href="#" rel="license"> Open Government Licence v3.0 </a>, except where otherwise stated </span>
          </div>
          <div class="govie-footer__meta-item">
            <a class="govie-footer__link govie-footer__copyright-logo" href="#"></a>
          </div>
        </div>
      </div>
    </footer>
    <script src="/javascript/all.js"></script>
    <script>
      window.GOVIEFrontend.initAll()
    </script>
  </body>
  
  </html>`
  return beautifyHtmlNode(html)
}

export const Default = Template.bind({})
Default.args = {}
