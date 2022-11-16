const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('header', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('header')
  })

  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('header', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('has a role of `banner`', () => {
      const $ = render('header', examples.default)

      const $component = $('.govie-header')
      expect($component.attr('role')).toEqual('banner')
    })
  })

  describe('custom options', () => {
    it('renders attributes correctly', () => {
      const $ = render('header', examples.attributes)

      const $component = $('.govie-header')
      expect($component.attr('data-test-attribute')).toEqual('value')
      expect($component.attr('data-test-attribute-2')).toEqual('value-2')
    })

    it('renders classes', () => {
      const $ = render('header', examples.classes)

      const $component = $('.govie-header')
      expect($component.hasClass('app-header--custom-modifier')).toBeTruthy()
    })

    it('renders custom container classes', () => {
      const $ = render('header', examples['full width'])

      const $component = $('.govie-header')
      const $container = $component.find('.govie-header__container')

      expect($container.hasClass('govie-header__container--full-width')).toBeTruthy()
    })

    it('renders custom navigation classes', () => {
      const $ = render('header', examples['full width with navigation'])

      const $component = $('.govie-header')
      const $container = $component.find('.govie-header__navigation')

      expect($container.hasClass('govie-header__navigation--end')).toBeTruthy()
    })

    it('renders home page URL', () => {
      const $ = render('header', examples['custom homepage url'])

      const $component = $('.govie-header')
      const $homepageLink = $component.find('.govie-header__link--homepage')
      expect($homepageLink.attr('href')).toEqual('/')
    })
  })

  describe('with product name', () => {
    it('renders product name', () => {
      const $ = render('header', examples['with product name'])

      const $component = $('.govie-header')
      const $productName = $component.find('.govie-header__product-name')
      expect($productName.text().trim()).toEqual('Product Name')
    })
  })

  describe('with service name', () => {
    it('renders service name', () => {
      const $ = render('header', examples['with service name'])

      const $component = $('.govie-header')
      const $serviceName = $component.find('.govie-header__service-name')
      expect($serviceName.text().trim()).toEqual('Service Name')
    })

    it('wraps the service name with a link when a url is provided', () => {
      const $ = render('header', examples['with service name'])

      const $component = $('.govie-header')
      const $serviceName = $component.find('.govie-header__service-name')
      expect($serviceName.get(0).tagName).toEqual('a')
      expect($serviceName.attr('href')).toEqual('/components/header')
    })

    it('does not use a link when no service url is provided', () => {
      const $ = render('header', examples['with service name but no service url'])

      const $component = $('.govie-header')
      const $serviceName = $component.find('.govie-header__service-name')
      expect($serviceName.get(0).tagName).toEqual('span')
      expect($serviceName.attr('href')).toBeUndefined()
    })
  })

  describe('with navigation', () => {
    it('passes accessibility tests', async () => {
      const $ = render('header', examples['with navigation'])

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders navigation', () => {
      const $ = render('header', examples['with navigation'])

      const $component = $('.govie-header')
      const $list = $component.find('ul.govie-header__navigation-list')
      const $items = $list.find('li.govie-header__navigation-item')
      const $firstItem = $items.find('a.govie-header__link:first-child')
      expect($items.length).toEqual(4)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders navigation default label correctly', () => {
      const $ = render('header', examples['with navigation'])

      const $component = $('.govie-header')
      const $nav = $component.find('nav')

      expect($nav.attr('aria-label')).toEqual('Menu')
    })

    it('renders navigation label correctly when custom menu button text is set', () => {
      const $ = render('header', examples['with custom menu button text'])

      const $component = $('.govie-header')
      const $nav = $component.find('nav')

      expect($nav.attr('aria-label')).toEqual('Dewislen')
    })

    it('allows navigation label to be customised', () => {
      const $ = render('header', examples['with custom navigation label'])

      const $component = $('.govie-header')
      const $nav = $component.find('nav')

      expect($nav.attr('aria-label')).toEqual('Custom navigation label')
    })

    it('renders navigation label and menu button text when these are both set', () => {
      const $ = render('header', examples['with custom navigation label and custom menu button text'])

      const $component = $('.govie-header')
      const $nav = $component.find('nav')
      const $button = $component.find('.govie-header__menu-button')

      expect($nav.attr('aria-label')).toEqual('Custom navigation label')
      expect($button.text()).toEqual('Custom menu button text')
    })

    it('renders navigation with active item', () => {
      const $ = render('header', examples['with navigation'])

      const $activeItem = $('li.govie-header__navigation-item:first-child')
      expect($activeItem.hasClass('govie-header__navigation-item--active')).toBeTruthy()
    })

    it('allows navigation item text to be passed whilst escaping HTML entities', () => {
      const $ = render('header', examples['navigation item with html as text'])

      const $navigationLink = $('.govie-header__navigation-item a')
      expect($navigationLink.html()).toContain('&lt;em&gt;Navigation item 1&lt;/em&gt;')
    })

    it('allows navigation item HTML to be passed un-escaped', () => {
      const $ = render('header', examples['navigation item with html'])

      const $navigationLink = $('.govie-header__navigation-item a')
      expect($navigationLink.html()).toContain('<em>Navigation item 1</em>')
    })

    it('renders navigation item with text without a link', () => {
      const $ = render('header', examples['navigation item with text without link'])

      const $navigationItem = $('.govie-header__navigation-item')
      expect($navigationItem.html().trim()).toEqual('Navigation item 1')
    })

    it('renders navigation item with html without a link', () => {
      const $ = render('header', examples['navigation item with html without link'])

      const $navigationItem = $('.govie-header__navigation-item')
      expect($navigationItem.html()).toContain('<em>Navigation item 1</em>')
    })

    it('renders navigation item anchor with attributes', () => {
      const $ = render('header', examples['navigation item with attributes'])

      const $navigationLink = $('.govie-header__navigation-item a')
      expect($navigationLink.attr('data-attribute')).toEqual('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    describe('menu button', () => {
      it('has an explicit type="button" so it does not act as a submit button', () => {
        const $ = render('header', examples['with navigation'])

        const $button = $('.govie-header__menu-button')

        expect($button.attr('type')).toEqual('button')
      })
      it('has a hidden attribute on load so that it does not show an unusable button without js', () => {
        const $ = render('header', examples['with navigation'])

        const $button = $('.govie-header__menu-button')

        expect($button.attr('hidden')).toBeTruthy()
      })
      it('renders default label correctly', () => {
        const $ = render('header', examples['with navigation'])

        const $button = $('.govie-header__menu-button')

        expect($button.attr('aria-label')).toEqual('Show or hide menu')
      })
      it('allows label to be customised', () => {
        const $ = render('header', examples['with custom menu button label'])

        const $button = $('.govie-header__menu-button')

        expect($button.attr('aria-label')).toEqual('Custom button label')
      })
      it('renders default text correctly', () => {
        const $ = render('header', examples['with navigation'])

        const $button = $('.govie-header__menu-button')

        expect($button.text()).toEqual('Menu')
      })
      it('allows text to be customised', () => {
        const $ = render('header', examples['with custom menu button text'])

        const $button = $('.govie-header__menu-button')

        expect($button.text()).toEqual('Dewislen')
      })
    })
  })

  describe('SVG logo', () => {
    let $
    let $svg

    beforeAll(() => {
      $ = render('header', examples.default)
      $svg = $('.govie-header__logotype-crown')
    })

    it('sets focusable="false" so that IE does not treat it as an interactive element', () => {
      expect($svg.attr('focusable')).toEqual('false')
    })

    it('sets aria-hidden="true" so that it is ignored by assistive technologies', () => {
      expect($svg.attr('aria-hidden')).toEqual('true')
    })

    describe('fallback PNG', () => {
      it('is invisible to modern browsers', () => {
        const $fallbackImage = $('.govie-header__logotype-harp-fallback-image')
        expect($fallbackImage.length).toEqual(0)
      })
    })
  })
})
