const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('Tag', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('tag')
  })

  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('tag', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders the default example with strong element and text', () => {
      const $ = render('tag', examples.default)

      const $component = $('.govie-tag')
      expect($component.get(0).tagName).toEqual('strong')
      expect($component.text()).toContain('alpha')
    })

    it('renders classes', () => {
      const $ = render('tag', examples.inactive)

      const $component = $('.govie-tag')
      expect($component.hasClass('govie-tag--grey')).toBeTruthy()
    })
  })

  describe('custom options', () => {
    it('renders custom text', () => {
      const $ = render('tag', examples.grey)

      const $component = $('.govie-tag')
      expect($component.html()).toContain('Grey')
    })

    it('renders attributes', () => {
      const $ = render('tag', examples.attributes)

      const $component = $('.govie-tag')
      expect($component.attr('data-test')).toEqual('attribute')
      expect($component.attr('id')).toEqual('my-tag')
    })
  })

  describe('html', () => {
    it('renders escaped html when passed to text', () => {
      const $ = render('tag', examples['html as text'])

      const $component = $('.govie-tag')
      expect($component.html()).toContain('&lt;span&gt;alpha&lt;/span&gt;')
    })

    it('renders html', () => {
      const $ = render('tag', examples.html)

      const $component = $('.govie-tag')
      expect($component.html()).toContain('<span>alpha</span>')
    })
  })
})
