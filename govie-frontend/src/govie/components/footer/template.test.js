const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('footer', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('footer')
  })

  it('default example passes accessibility tests', async () => {
    const $ = render('footer', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('entire component must have a role of `contentinfo`', () => {
    const $ = render('footer', examples.default)

    const $component = $('.govie-footer')
    expect($component.attr('role')).toEqual('contentinfo')
  })

  it('renders attributes correctly', () => {
    const $ = render('footer', examples.attributes)

    const $component = $('.govie-footer')
    expect($component.attr('data-test-attribute')).toEqual('value')
    expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  })

  it('renders classes', () => {
    const $ = render('footer', examples.classes)

    const $component = $('.govie-footer')
    expect($component.hasClass('app-footer--custom-modifier')).toBeTruthy()
  })

  it('renders custom container classes', () => {
    const $ = render('footer', examples['with container classes'])

    const $component = $('.govie-footer')
    const $container = $component.find('.govie-width-container')

    expect($container.hasClass('app-width-container')).toBeTruthy()
  })

  describe('meta', () => {
    it('passes accessibility tests', async () => {
      const $ = render('footer', examples['with meta'])

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders heading', () => {
      const $ = render('footer', examples['with meta'])

      const $component = $('.govie-footer')
      const $heading = $component.find('h2.govie-visually-hidden')
      expect($heading.text()).toEqual('Items')
    })

    it('renders default heading when none supplied', () => {
      const $ = render('footer', examples['with empty meta'])

      const $component = $('.govie-footer')
      const $heading = $component.find('h2.govie-visually-hidden')
      expect($heading.text()).toEqual('Support links')
    })

    it('doesn\'t render footer link list when no items are provided', () => {
      const $ = render('footer', examples['with empty meta items'])

      expect($('.govie-footer__inline-list').length).toEqual(0)
    })

    it('renders links', () => {
      const $ = render('footer', examples['with meta'])

      const $list = $('ul.govie-footer__inline-list')
      const $items = $list.find('li.govie-footer__inline-list-item')
      const $firstItem = $items.find('a.govie-footer__link:first-child')
      expect($items.length).toEqual(3)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Item 1')
    })

    it('renders custom meta text', () => {
      const $ = render('footer', examples['with custom meta'])

      const $custom = $('.govie-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders custom meta html as text', () => {
      const $ = render('footer', examples['meta html as text'])

      const $custom = $('.govie-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit <strong>v7.0.1</strong>')
    })

    it('renders custom meta html', () => {
      const $ = render('footer', examples['with meta html'])

      const $custom = $('.govie-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders attributes on meta links', () => {
      const $ = render('footer', examples['with meta item attributes'])

      const $metaLink = $('.govie-footer__meta .govie-footer__link')
      expect($metaLink.attr('data-attribute')).toEqual('my-attribute')
      expect($metaLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })
  })

  describe('navigation', () => {
    it('passes accessibility tests', async () => {
      const $ = render('footer', examples['with navigation'])

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('no items displayed when no item array is provided', () => {
      const $ = render('footer', examples['with empty navigation'])

      expect($('.govie-footer__navigation').length).toEqual(0)
    })

    it('renders headings', () => {
      const $ = render('footer', examples['with navigation'])

      const $firstSection = $('.govie-footer__section:first-child')
      const $lastSection = $('.govie-footer__section:last-child')
      const $firstHeading = $firstSection.find('h2.govie-footer__heading')
      const $lastHeading = $lastSection.find('h2.govie-footer__heading')
      expect($firstHeading.text()).toEqual('Two column list')
      expect($lastHeading.text()).toEqual('Single column list')
    })

    it('renders lists of links', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.govie-footer__list')
      const $items = $list.find('li.govie-footer__list-item')
      const $firstItem = $items.find('a.govie-footer__link:first-child')
      expect($items.length).toEqual(9)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders attributes on links', () => {
      const $ = render('footer', examples['with navigation item attributes'])

      const $navigationLink = $('.govie-footer__list .govie-footer__link')
      expect($navigationLink.attr('data-attribute')).toEqual('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    it('renders lists in columns', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.govie-footer__list')
      expect($list.hasClass('govie-footer__list--columns-2')).toBeTruthy()
    })

    it('renders one-column section full width by default', () => {
      const $ = render('footer', examples['with default width navigation (one column)'])

      const $section = $('.govie-footer__section')
      expect($section.hasClass('govie-grid-column-full')).toBeTruthy()
    })

    it('renders two-column section full width by default', () => {
      const $ = render('footer', examples['with default width navigation (two columns)'])

      const $section = $('.govie-footer__section')
      expect($section.hasClass('govie-grid-column-full')).toBeTruthy()
    })

    it('renders section custom width when width specified', () => {
      const $ = render('footer', examples['with navigation'])

      const $section = $('.govie-footer__section')
      expect($section.hasClass('govie-grid-column-two-thirds')).toBeTruthy()
    })
  })

  describe('section break', () => {
    it('renders when there is a navigation', () => {
      const $ = render('footer', examples['with navigation'])

      const $sectionBreak = $('hr.govie-footer__section-break')
      expect($sectionBreak.length).toBeTruthy()
    })

    it('renders nothing when there is only meta', () => {
      const $ = render('footer', examples['with meta'])

      const $sectionBreak = $('hr.govie-footer__section-break')
      expect($sectionBreak.length).toBeFalsy()
    })
  })

  describe('content licence', () => {
    it('is visible', () => {
      const $ = render('footer', examples.default)

      const $licenceMessage = $('.govie-footer__licence-description')
      expect($licenceMessage.text()).toContain('Open Government Licence v3.0')
    })

    it('can be customised with `text` parameter', () => {
      const $ = render('footer', examples['with custom text content licence and copyright notice'])

      const $licenceMessage = $('.govie-footer__licence-description')
      expect($licenceMessage.text()).toContain('Drwydded y Llywodraeth Agored v3.0')
    })

    it('can be customised with `html` parameter', () => {
      const $ = render('footer', examples['with custom HTML content licence and copyright notice'])

      const $licenceMessage = $('.govie-footer__licence-description')
      expect($licenceMessage.html()).toContain('<a class="govie-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license">Drwydded y Llywodraeth Agored v3.0</a>')
    })

    it('escapes HTML in the `text` parameter', () => {
      const $ = render('footer', examples['with HTML passed as text content'])

      const $licenceMessage = $('.govie-footer__licence-description')
      expect($licenceMessage.html()).toContain('&lt;a class="govie-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license"&gt;Drwydded y Llywodraeth Agored v3.0&lt;/a&gt;')
    })
  })

  describe('crown copyright', () => {
    it('is visible', () => {
      const $ = render('footer', examples.default)

      const $copyrightMessage = $('.govie-footer__copyright-logo')
      expect($copyrightMessage.text()).toContain('© Crown copyright')
    })

    it('can be customised with `text` parameter', () => {
      const $ = render('footer', examples['with custom text content licence and copyright notice'])

      const $copyrightMessage = $('.govie-footer__copyright-logo')
      expect($copyrightMessage.text()).toContain('© Hawlfraint y Goron')
    })

    it('can be customised with `html` parameter', () => {
      const $ = render('footer', examples['with custom HTML content licence and copyright notice'])

      const $copyrightMessage = $('.govie-footer__copyright-logo')
      expect($copyrightMessage.html()).toContain('<span>Hawlfraint y Goron</span>')
    })

    it('escapes HTML in the `text` parameter', () => {
      const $ = render('footer', examples['with HTML passed as text content'])

      const $copyrightMessage = $('.govie-footer__copyright-logo')
      expect($copyrightMessage.html()).toContain('&lt;span&gt;Hawlfraint y Goron&lt;/span&gt;')
    })
  })
})
