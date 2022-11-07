const { axe, render, getExamples, htmlWithClassName } = require('../../../../lib/jest-helpers')

describe('Phase banner', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('phase-banner')
  })

  describe('by default', () => {
    it('passes accessibility tests', async () => {
      const $ = render('phase-banner', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('allows additional classes to be added to the component', () => {
      const $ = render('phase-banner', examples.classes)

      const $component = $('.govie-phase-banner')
      expect($component.hasClass('extra-class one-more-class')).toBeTruthy()
    })

    it('renders banner text', () => {
      const $ = render('phase-banner', examples.text)
      const phaseBannerText = $('.govie-phase-banner__text').text().trim()

      expect(phaseBannerText).toEqual('This is a new service – your feedback will help us to improve it')
    })

    it('allows body text to be passed whilst escaping HTML entities', () => {
      const $ = render('phase-banner', examples['html as text'])

      const phaseBannerText = $('.govie-phase-banner__text').html().trim()
      expect(phaseBannerText).toEqual('This is a new service - your &lt;a href="#" class="govie-link"&gt;feedback&lt;/a&gt; will help us to improve it.')
    })

    it('allows body HTML to be passed un-escaped', () => {
      const $ = render('phase-banner', examples.default)

      const phaseBannerText = $('.govie-phase-banner__text').html().trim()
      expect(phaseBannerText).toEqual('This is a new service - your <a href="#" class="govie-link">feedback</a> will help us to improve it.')
    })

    it('allows additional attributes to be added to the component', () => {
      const $ = render('phase-banner', examples.attributes)

      const $component = $('.govie-phase-banner')
      expect($component.attr('first-attribute')).toEqual('foo')
      expect($component.attr('second-attribute')).toEqual('bar')
    })
  })

  describe('with dependant components', () => {
    it('renders the tag component text', () => {
      const $ = render('phase-banner', examples.default)

      expect(htmlWithClassName($, '.govie-phase-banner__content__tag')).toMatchSnapshot()
    })

    it('renders the tag component html', () => {
      const $ = render('phase-banner', examples['tag html'])

      expect(htmlWithClassName($, '.govie-phase-banner__content__tag')).toMatchSnapshot()
    })

    it('renders the tag component classes', () => {
      const $ = render('phase-banner', examples['tag classes'])

      expect(htmlWithClassName($, '.govie-phase-banner__content__tag')).toMatchSnapshot()
    })
  })
})
