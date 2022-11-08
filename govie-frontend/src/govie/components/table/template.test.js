const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('Table', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('table')
  })

  it('passes basic accessibility tests', async () => {
    const $ = render('table', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('can have additional classes', () => {
    const $ = render('table', examples.classes)

    expect($('.govie-table').hasClass('custom-class-goes-here')).toBeTruthy()
  })

  it('can have additional attributes', () => {
    const $ = render('table', examples.attributes)

    expect($('.govie-table').attr('data-foo')).toEqual('bar')
  })

  // =========================================================
  // Captions
  // =========================================================

  describe('captions', () => {
    it('can have custom text', () => {
      const $ = render('table', examples['table with head and caption'])
      const $caption = $('.govie-table__caption')

      expect($caption.text()).toBe('Caption 1: Months and rates')
    })

    it('can have additional classes', () => {
      const $ = render('table', examples['table with head and caption'])
      const $caption = $('.govie-table__caption')

      expect($caption.hasClass('govie-heading-m')).toBeTruthy()
    })
  })

  // =========================================================
  // Column headers
  // =========================================================

  describe('column headers', () => {
    it('can be specified', () => {
      const args = examples['table with head']
      const $ = render('table', args)

      const headings = $('.govie-table').find('thead tr th')
        .map((_, e) => $(e).text())
        .get()

      expect(headings).toEqual([
        'Month you apply',
        'Rate for bicycles',
        'Rate for vehicles'
      ])
    })

    it('have HTML escaped when passed as text', () => {
      const $ = render('table', examples['html as text'])

      const $th = $('.govie-table thead tr th')

      expect($th.html()).toEqual('Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;')
    })

    it('allow HTML when passed as HTML', () => {
      const $ = render('table', examples.html)

      const $th = $('.govie-table thead tr th')

      expect($th.html()).toEqual('Foo <span>bar</span>')
    })

    it('can have a format specified', () => {
      const $ = render('table', examples['table with head'])

      const $th = $('.govie-table thead tr th')

      expect($th.hasClass('govie-table__header--numeric')).toBeTruthy()
    })

    it('can have additional classes', () => {
      const $ = render('table', examples['head with classes'])

      const $th = $('.govie-table thead tr th')

      expect($th.hasClass('my-custom-class')).toBeTruthy()
    })

    it('can have rowspan specified', () => {
      const $ = render('table', examples['head with rowspan and colspan'])

      const $th = $('.govie-table thead tr th')

      expect($th.attr('rowspan')).toEqual('2')
    })

    it('can have colspan specified', () => {
      const $ = render('table', examples['head with rowspan and colspan'])

      const $th = $('.govie-table thead tr th')

      expect($th.attr('colspan')).toEqual('2')
    })

    it('can have additional attributes', () => {
      const $ = render('table', examples['head with attributes'])

      const $th = $('.govie-table thead tr th')

      expect($th.attr('data-fizz')).toEqual('buzz')
    })
  })

  // =========================================================
  // Row headers
  // =========================================================

  describe('row headers', () => {
    describe('when firstCellIsHeader is false', () => {
      it('are not included', () => {
        const $ = render('table', examples.default)

        const cells = $('.govie-table').find('tbody tr td')
          .map((_, e) => $(e).text())
          .get()

        expect(cells).toEqual(
          ['January', '£85', '£95', 'February', '£75', '£55', 'March', '£165', '£125']
        )
      })
    })

    describe('when firstCellIsHeader is true', () => {
      it('are included', () => {
        const $ = render('table', examples['with firstCellIsHeader true'])

        const headings = $('.govie-table').find('tbody tr th')
          .map((_, e) => $(e).text())
          .get()

        expect(headings).toEqual(['January', 'February', 'March'])
      })

      it('have HTML escaped when passed as text', () => {
        const $ = render('table', examples['firstCellIsHeader with html as text'])

        const $th = $('.govie-table tbody tr th')

        expect($th.html()).toEqual('Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;')
      })

      it('allow HTML when passed as HTML', () => {
        const $ = render('table', examples['firstCellIsHeader with html'])

        const $th = $('.govie-table tbody tr th')

        expect($th.html()).toEqual('Foo <span>bar</span>')
      })

      it('are associated with their rows using scope="row"', () => {
        const $ = render('table', examples['with firstCellIsHeader true'])

        const $th = $('.govie-table').find('tbody tr th')

        expect($th.attr('scope')).toEqual('row')
      })

      it('have the govie-table__header class', () => {
        const $ = render('table', examples['with firstCellIsHeader true'])

        const $th = $('.govie-table').find('tbody tr th')

        expect($th.hasClass('govie-table__header')).toBeTruthy()
      })

      it('can have additional classes', () => {
        const $ = render('table', examples['firstCellIsHeader with classes'])

        const $th = $('.govie-table').find('tbody tr th')

        expect($th.hasClass('my-custom-class')).toBeTruthy()
      })

      it('can have rowspan specified', () => {
        const $ = render('table', examples['firstCellIsHeader with rowspan and colspan'])

        const $th = $('.govie-table').find('tbody tr th')

        expect($th.attr('rowspan')).toEqual('2')
      })

      it('can have colspan specified', () => {
        const $ = render('table', examples['firstCellIsHeader with rowspan and colspan'])

        const $th = $('.govie-table').find('tbody tr th')

        expect($th.attr('colspan')).toEqual('2')
      })

      it('can have additional attributes', () => {
        const $ = render('table', examples['firstCellIsHeader with attributes'])

        const $th = $('.govie-table').find('tbody tr th')

        expect($th.attr('data-fizz')).toEqual('buzz')
      })
    })
  })

  // =========================================================
  // Cells
  // =========================================================

  describe('cells', () => {
    it('can be specified', () => {
      const $ = render('table', examples.default)

      const cells = $('.govie-table').find('tbody tr')
        .map((_, tr) => {
          return [$(tr).find('td').map((_, td) => $(td).text()).get()]
        })
        .get()

      expect(cells).toEqual([
        ['January', '£85', '£95'],
        ['February', '£75', '£55'],
        ['March', '£165', '£125']
      ])
    })

    it('can be skipped when falsely', () => {
      const $ = render('table', examples['with falsey items'])

      const cells = $('.govie-table').find('tbody tr')
        .map((_, tr) => {
          return [$(tr).find('td').map((_, td) => $(td).text()).get()]
        })
        .get()

      expect(cells).toEqual([
        ['A', '1'],
        ['B', '2'],
        ['C', '3']
      ])
    })

    it('have HTML escaped when passed as text', () => {
      const $ = render('table', examples['html as text'])

      const $td = $('.govie-table td')

      expect($td.html()).toEqual('Foo &lt;script&gt;hacking.do(1337)&lt;/script&gt;')
    })

    it('allow HTML when passed as HTML', () => {
      const $ = render('table', examples.html)

      const $td = $('.govie-table td')

      expect($td.html()).toEqual('Foo <span>bar</span>')
    })

    it('can have a format specified', () => {
      const $ = render('table', examples.default)

      const $td = $('.govie-table td')

      expect($td.hasClass('govie-table__cell--numeric')).toBeTruthy()
    })

    it('can have additional classes', () => {
      const $ = render('table', examples['rows with classes'])

      const $td = $('.govie-table td')

      expect($td.hasClass('my-custom-class')).toBeTruthy()
    })

    it('can have rowspan specified', () => {
      const $ = render('table', examples['rows with rowspan and colspan'])

      const $td = $('.govie-table td')

      expect($td.attr('rowspan')).toEqual('2')
    })

    it('can have colspan specified', () => {
      const $ = render('table', examples['rows with rowspan and colspan'])

      const $td = $('.govie-table td')

      expect($td.attr('colspan')).toEqual('2')
    })

    it('can have additional attributes', () => {
      const $ = render('table', examples['rows with attributes'])

      const $td = $('.govie-table td')

      expect($td.attr('data-fizz')).toEqual('buzz')
    })
  })
})
