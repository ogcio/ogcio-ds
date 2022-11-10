const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('Tabs', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('tabs')
  })

  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('tabs', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders the first tab selected', () => {
      const $ = render('tabs', examples.default)

      const $tab = $('[href="#past-day"]').parent()
      expect($tab.hasClass('govie-tabs__list-item--selected')).toBeTruthy()
    })

    it('hides all but the first panel', () => {
      const $ = render('tabs', examples.default)

      expect($('#past-week').hasClass('govie-tabs__panel--hidden')).toBeTruthy()
      expect($('#past-month').hasClass('govie-tabs__panel--hidden')).toBeTruthy()
      expect($('#past-year').hasClass('govie-tabs__panel--hidden')).toBeTruthy()
    })
  })

  describe('custom options', () => {
    it('renders with classes', () => {
      const $ = render('tabs', examples.classes)

      const $component = $('.govie-tabs')
      expect($component.hasClass('app-tabs--custom-modifier')).toBeTruthy()
    })

    it('renders with id', () => {
      const $ = render('tabs', examples.id)

      const $component = $('.govie-tabs')
      expect($component.attr('id')).toEqual('my-tabs')
    })

    it('allows custom title text to be passed', () => {
      const $ = render('tabs', examples.title)

      const content = $('.govie-tabs__title').html().trim()
      expect(content).toEqual('Custom title for Contents')
    })

    it('renders with attributes', () => {
      const $ = render('tabs', examples.attributes)

      const $component = $('.govie-tabs')
      expect($component.attr('data-attribute')).toEqual('my data value')
    })
  })

  describe('items', () => {
    it('doesn\'t render a list if items is not defined', () => {
      const $ = render('tabs', examples['no item list'])

      const $component = $('.govie-tabs')
      expect($component.find('.govie-tabs__list').length).toEqual(0)
    })

    it('doesn\'t render a list if items is empty', () => {
      const $ = render('tabs', examples['empty item list'])

      const $component = $('.govie-tabs')
      expect($component.find('.govie-tabs__list').length).toEqual(0)
    })

    it('render a matching tab and panel using item id', () => {
      const $ = render('tabs', examples.default)

      const $component = $('.govie-tabs')

      const $firstTab = $component.find('.govie-tabs__list-item:first-child .govie-tabs__tab')
      const $firstPanel = $component.find('.govie-tabs__panel')
      expect($firstTab.attr('href')).toEqual('#past-day')
      expect($firstPanel.attr('id')).toEqual('past-day')
    })

    it('render without falsey values', () => {
      const $ = render('tabs', examples['with falsey values'])

      const $component = $('.govie-tabs')

      const $items = $component.find('.govie-tabs__list-item')
      expect($items.length).toEqual(2)
    })

    it('render a matching tab and panel using custom idPrefix', () => {
      const $ = render('tabs', examples.idPrefix)

      const $component = $('.govie-tabs')

      const $firstTab = $component.find('.govie-tabs__list-item:first-child .govie-tabs__tab')
      const $firstPanel = $component.find('.govie-tabs__panel')
      expect($firstTab.attr('href')).toEqual('#custom-1')
      expect($firstPanel.attr('id')).toEqual('custom-1')
    })

    it('render the label', () => {
      const $ = render('tabs', examples.default)

      const $component = $('.govie-tabs')

      const $firstTab = $component.find('.govie-tabs__list-item:first-child .govie-tabs__tab')
      expect($firstTab.text().trim()).toEqual('Past day')
    })

    it('render with panel content as text, wrapped in styled paragraph', () => {
      const $ = render('tabs', examples.default)
      const $component = $('.govie-tabs')
      const $lastTab = $component.find('.govie-tabs__panel').last()

      expect($lastTab.find('p').hasClass('govie-body')).toBeTruthy()
      expect($lastTab.text().trim()).toEqual('There is no data for this year yet, check back later')
    })

    it('render escaped html when passed to text content', () => {
      const $ = render('tabs', examples['html as text'])

      const $component = $('.govie-tabs')

      const $firstPanel = $component.find('.govie-tabs__panel .govie-body')
      expect($firstPanel.html().trim()).toEqual('&lt;p&gt;Panel 1 content&lt;/p&gt;')
    })

    it('render html when passed to content', () => {
      const $ = render('tabs', examples.html)

      const $component = $('.govie-tabs')

      const $firstPanel = $component.find('.govie-tabs__panel')
      expect($firstPanel.html().trim()).toEqual('<p>Panel 1 content</p>')
    })

    it('render a tab anchor with attributes', () => {
      const $ = render('tabs', examples['item with attributes'])

      const $tabItemLink = $('.govie-tabs__tab')
      expect($tabItemLink.attr('data-attribute')).toEqual('my-attribute')
      expect($tabItemLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    it('render a tab panel with attributes', () => {
      const $ = render('tabs', examples['panel with attributes'])

      const $tabPanelItems = $('.govie-tabs__panel')
      expect($tabPanelItems.attr('data-attribute')).toEqual('my-attribute')
      expect($tabPanelItems.attr('data-attribute-2')).toEqual('my-attribute-2')
    })
  })
})