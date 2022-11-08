const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('Pagination', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('pagination')
  })

  describe('default examples', () => {
    it('passes accessibility tests', async () => {
      const $ = render('pagination', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders the correct URLs for each link', () => {
      const $ = render('pagination', examples.default)
      const $previous = $('.govie-pagination__prev .govie-pagination__link')
      const $next = $('.govie-pagination__next .govie-pagination__link')
      const $firstNumber = $('.govie-pagination__item:first-child .govie-pagination__link')
      const $secondNumber = $('.govie-pagination__item:nth-child(2) .govie-pagination__link')
      const $thirdNumber = $('.govie-pagination__item:last-child .govie-pagination__link')

      expect($previous.attr('href')).toEqual('/previous')
      expect($next.attr('href')).toEqual('/next')
      expect($firstNumber.attr('href')).toEqual('/page/1')
      expect($secondNumber.attr('href')).toEqual('/page/2')
      expect($thirdNumber.attr('href')).toEqual('/page/3')
    })

    it('renders the correct number within each pagination item', () => {
      const $ = render('pagination', examples.default)
      const $firstNumber = $('.govie-pagination__item:first-child')
      const $secondNumber = $('.govie-pagination__item:nth-child(2)')
      const $thirdNumber = $('.govie-pagination__item:last-child')

      expect($firstNumber.text().trim()).toEqual('1')
      expect($secondNumber.text().trim()).toEqual('2')
      expect($thirdNumber.text().trim()).toEqual('3')
    })

    // The current item is marked up with a visually hidden span and an aria-hidden span side by side
    // Instead of the aria-label solution used for the links in the pagination because of issues caused
    // by aria-label on non-interactive elements like li's
    it('marks up the current item correctly', () => {
      const $ = render('pagination', examples.default)
      const $currentNumber = $('.govie-pagination__item--current')
      const $currentNumberLink = $currentNumber.find('.govie-pagination__link')

      expect($currentNumberLink.attr('aria-current')).toEqual('page')
    })

    it('marks up pagination items as ellipses when specified', () => {
      const $ = render('pagination', examples['with many pages'])
      const $firstEllipsis = $('.govie-pagination__item:nth-child(2).govie-pagination__item--ellipses')

      expect($firstEllipsis).toBeTruthy()
      // Test for the unicode character of &ctdot;
      expect($firstEllipsis.text()).toEqual('\u22ef')
    })
  })

  describe('with custom text, labels and landmarks', () => {
    it('renders a custom navigation landmark', () => {
      const $ = render('pagination', examples['with custom navigation landmark'])
      const $nav = $('.govie-pagination')

      expect($nav.attr('aria-label')).toEqual('search')
    })

    it('renders custom pagination item and prev/next link text', () => {
      const $ = render('pagination', examples['with custom link and item text'])
      const $previous = $('.govie-pagination__prev')
      const $next = $('.govie-pagination__next')
      const $firstNumber = $('.govie-pagination__item:first-child')
      const $secondNumber = $('.govie-pagination__item:nth-child(2)')
      const $thirdNumber = $('.govie-pagination__item:last-child')

      expect($previous.text().trim()).toEqual('Previous page')
      expect($next.text().trim()).toEqual('Next page')
      expect($firstNumber.text().trim()).toEqual('one')
      expect($secondNumber.text().trim()).toEqual('two')
      expect($thirdNumber.text().trim()).toEqual('three')
    })

    it('renders custom accessible labels for pagination items', () => {
      const $ = render('pagination', examples['with custom accessible labels on item links'])
      const $firstNumber = $('.govie-pagination__item:first-child .govie-pagination__link')
      const $secondNumber = $('.govie-pagination__item:nth-child(2) .govie-pagination__link')
      const $thirdNumber = $('.govie-pagination__item:last-child .govie-pagination__link')

      expect($firstNumber.attr('aria-label')).toEqual('1st page')
      expect($secondNumber.attr('aria-label')).toEqual('2nd page (you are currently on this page)')
      expect($thirdNumber.attr('aria-label')).toEqual('3rd page')
    })
  })

  describe('previous and next links', () => {
    it('applies the correct rel attribute to each link so that they communicate to search engines the intent of the links', () => {
      const $ = render('pagination', examples.default)
      const $previous = $('.govie-pagination__prev .govie-pagination__link')
      const $next = $('.govie-pagination__next .govie-pagination__link')

      expect($previous.attr('rel')).toEqual('prev')
      expect($next.attr('rel')).toEqual('next')
    })

    it('sets aria-hidden="true" to each link so that they are ignored by assistive technology', () => {
      const $ = render('pagination', examples.default)
      const $previousSvg = $('.govie-pagination__icon--prev')
      const $nextSvg = $('.govie-pagination__icon--next')

      expect($previousSvg.attr('aria-hidden')).toEqual('true')
      expect($nextSvg.attr('aria-hidden')).toEqual('true')
    })

    it('sets focusable="false" so that IE does not treat it as an interactive element', () => {
      const $ = render('pagination', examples.default)
      const $previousSvg = $('.govie-pagination__icon--prev')
      const $nextSvg = $('.govie-pagination__icon--next')

      expect($previousSvg.attr('focusable')).toEqual('false')
      expect($nextSvg.attr('focusable')).toEqual('false')
    })
  })

  describe('prev/next only view', () => {
    it('changes the display to prev/next only if no items are provided', () => {
      const $ = render('pagination', examples['with prev and next only'])
      const $blockNav = $('.govie-pagination--block')
      const $previous = $('.govie-pagination__prev')
      const $next = $('.govie-pagination__next')

      expect($blockNav).toBeTruthy()
      expect($previous).toBeTruthy()
      expect($next).toBeTruthy()
    })

    it('applies labels when provided', () => {
      const $ = render('pagination', examples['with prev and next only and labels'])
      const $prevLabel = $('.govie-pagination__prev .govie-pagination__link-label')
      const $nextLabel = $('.govie-pagination__next .govie-pagination__link-label')

      expect($prevLabel.text()).toEqual('1 of 3')
      expect($nextLabel.text()).toEqual('3 of 3')
    })

    // This is for when pagination is in block mode but there isn't a label
    // We apply a decoration class and add a hover state to the main link text instead
    // of the label so that there's a clear underline hover state on the link
    it('adds the decoration class to the link title if no label is present', () => {
      const $ = render('pagination', examples['with prev and next only'])
      const $decoratedPreviousLinkTitle = $('.govie-pagination__prev .govie-pagination__link-title--decorated')
      const $decoratedNextLinkTitle = $('.govie-pagination__next .govie-pagination__link-title--decorated')

      expect($decoratedPreviousLinkTitle).toBeTruthy()
      expect($decoratedNextLinkTitle).toBeTruthy()
    })
  })
})
