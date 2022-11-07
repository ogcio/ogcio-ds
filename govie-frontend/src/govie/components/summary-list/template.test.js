const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('Summary list', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('summary-list')
  })

  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('summary-list', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })
  })

  describe('custom options', () => {
    it('renders classes', async () => {
      const $ = render('summary-list', examples['no-border'])

      const $component = $('.govie-summary-list')
      expect($component.hasClass('govie-summary-list--no-border')).toBeTruthy()
    })

    it('renders with attributes', () => {
      const $ = render('summary-list', examples.attributes)

      const $component = $('.govie-summary-list')
      expect($component.attr('data-attribute-1')).toEqual('value-1')
      expect($component.attr('data-attribute-2')).toEqual('value-2')
    })
  })

  describe('rows', () => {
    it('renders list without falsely values', async () => {
      const $ = render('summary-list', examples['with falsey values'])

      const $component = $('.govie-summary-list')
      const $row = $component.find('.govie-summary-list__row')
      expect($row.length).toBe(2)
    })

    it('renders classes', async () => {
      const $ = render('summary-list', examples['rows with classes'])

      const $component = $('.govie-summary-list')
      const $row = $component.find('.govie-summary-list__row')
      expect($row.hasClass('app-custom-class')).toBeTruthy()
    })

    describe('keys', () => {
      it('renders text', async () => {
        const $ = render('summary-list', examples.default)

        const $component = $('.govie-summary-list')
        const $key = $component.find('dt.govie-summary-list__key')

        expect($key.html()).toContain('Name')
      })

      it('renders html', async () => {
        const $ = render('summary-list', examples['key with html'])

        const $component = $('.govie-summary-list')
        const $key = $component.find('dt.govie-summary-list__key')

        expect($key.html()).toContain('<b>Name</b>')
      })

      it('renders classes', async () => {
        const $ = render('summary-list', examples['key with classes'])

        const $component = $('.govie-summary-list')
        const $key = $component.find('dt.govie-summary-list__key')
        expect($key.hasClass('app-custom-class')).toBeTruthy()
      })
    })

    describe('values', () => {
      it('renders text', async () => {
        const $ = render('summary-list', examples.default)

        const $component = $('.govie-summary-list')
        const $value = $component.find('dd.govie-summary-list__value')

        expect($value.html()).toContain('Firstname Lastname')
      })

      it('renders html', async () => {
        const $ = render('summary-list', examples['value with html'])

        const $component = $('.govie-summary-list')
        const $value = $component.find('dd.govie-summary-list__value')

        expect($value.html()).toContain('<span>email@email.com</span>')
      })

      it('renders classes', async () => {
        const $ = render('summary-list', examples['overridden-widths'])

        const $component = $('.govie-summary-list')
        const $value = $component.find('dd.govie-summary-list__value')
        expect($value.hasClass('govie-!-width-one-quarter')).toBeTruthy()
      })
    })

    describe('actions', () => {
      it('renders href', async () => {
        const $ = render('summary-list', examples['actions href'])

        const $component = $('.govie-summary-list')
        const $actionLink = $component.find('.govie-summary-list__actions > a')

        expect($actionLink.attr('href')).toBe('https://www.gov.uk')
      })

      it('renders text', async () => {
        const $ = render('summary-list', examples['with actions'])

        const $component = $('.govie-summary-list')
        const $actionLink = $component.find('.govie-summary-list__actions > a')

        expect($actionLink.text().trim()).toContain('Change date of birth')
      })

      it('renders html', async () => {
        const $ = render('summary-list', examples['actions with html'])

        const $component = $('.govie-summary-list')
        const $actionLink = $component.find('.govie-summary-list__actions > a')

        expect($actionLink.html()).toContain('Edit<span class="visually-hidden"> name</span>')
      })

      it('allows the visually hidden prefix to be removed and then manually added with HTML', async () => {
        const $ = render('summary-list', examples.translated)

        const $component = $('.govie-summary-list')
        const $actionLink = $component.find('.govie-summary-list__actions > a')

        expect($actionLink.html()).toContain('Golygu<span class="govie-visually-hidden"> dyddiad geni</span>')
      })

      it('renders custom accessible name', async () => {
        const $ = render('summary-list', examples['with actions'])

        const $component = $('.govie-summary-list')
        const $actionLink = $component.find('.govie-summary-list__actions > a')
        expect($actionLink.text().trim()).toContain('Change date of birth')
      })

      it('renders classes', async () => {
        const $ = render('summary-list', examples['actions with classes'])

        const $component = $('.govie-summary-list')
        const $actionList = $component.find('.govie-summary-list__actions')

        expect($actionList.hasClass('app-custom-class')).toBeTruthy()
      })

      it('renders attributes', async () => {
        const $ = render('summary-list', examples['actions with attributes'])

        const $component = $('.govie-summary-list')
        const $actionLink = $component.find('.govie-summary-list__actions > a')

        expect($actionLink.attr('data-test-attribute')).toEqual('value')
        expect($actionLink.attr('data-test-attribute-2')).toEqual('value-2')
      })

      it('renders a single anchor with one action', async () => {
        const $ = render('summary-list', examples['single action with anchor'])

        const $component = $('.govie-summary-list')
        const $action = $component.find('.govie-summary-list__actions > a')

        expect($action.html().trim()).toBe('First action')
      })

      it('renders a list with mutliple actions', async () => {
        const $ = render('summary-list', examples['with some actions'])

        const $component = $('.govie-summary-list')
        const $actionList = $component.find('.govie-summary-list__actions')
        const $secondAction = $actionList.find('.govie-summary-list__actions-list-item:last-child')

        expect($secondAction.text().trim()).toBe('Delete name')
      })

      it('renders classes on actions', async () => {
        const $ = render('summary-list', examples['classes on items'])

        const $component = $('.govie-summary-list')
        const $action = $component.find('.govie-summary-list__actions > a')

        expect($action.hasClass('govie-link--no-visited-state')).toBeTruthy()
      })

      it('skips the action column when no array is provided', async () => {
        const $ = render('summary-list', examples.default)

        const $component = $('.govie-summary-list')
        const $action = $component.find('.govie-summary-list__actions')

        expect($action.length).toEqual(0)
      })

      it('skips the action column when no items are in the array provided', async () => {
        const $ = render('summary-list', examples['empty items array'])

        const $component = $('.govie-summary-list')
        const $action = $component.find('.govie-summary-list__actions')

        expect($action.length).toEqual(0)
      })

      describe('when only some rows have actions', () => {
        let $
        let $component

        beforeAll(() => {
          $ = render('summary-list', examples['with some actions'])
          $component = $('.govie-summary-list')
        })

        it('passes accessibility tests', async () => {
          const results = await axe($.html())
          expect(results).toHaveNoViolations()
        })

        it('does not add no-actions modifier class to rows with actions', () => {
          // The first row has actions
          const $firstRow = $component.find('.govie-summary-list__row:first-child')
          expect($firstRow.hasClass('govie-summary-list__row--no-actions')).toBeFalsy()
        })

        it('adds no-actions modifier class to rows without actions', () => {
          // The second row does not have actions
          const $secondRow = $component.find('.govie-summary-list__row:nth-child(2)')
          expect($secondRow.hasClass('govie-summary-list__row--no-actions')).toBeTruthy()
        })
      })

      describe('when no rows have actions', () => {
        let $
        let $component

        beforeAll(() => {
          $ = render('summary-list', examples.default)
          $component = $('.govie-summary-list')
        })

        it('passes accessibility tests', async () => {
          const results = await axe($.html())
          expect(results).toHaveNoViolations()
        })

        it('does not add no-actions modifier class to any of the rows', () => {
          // The first row has actions
          const $rows = $component.find('.govie-summary-list__row')
          expect($rows.hasClass('govie-summary-list__row--no-actions')).toBeFalsy()
        })
      })
    })
  })
})
