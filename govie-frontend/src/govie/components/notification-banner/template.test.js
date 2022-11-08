const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

describe('Notification-banner', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('notification-banner')
  })

  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('notification-banner', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('aria-labelledby attribute matches the title id', () => {
      const $ = render('notification-banner', examples.default)
      const ariaAttr = $('.govie-notification-banner').attr('aria-labelledby')
      const titleId = $('.govie-notification-banner__title').attr('id')

      expect(ariaAttr).toEqual(titleId)
    })

    it('has role=region attribute', () => {
      const $ = render('notification-banner', examples.default)
      const $component = $('.govie-notification-banner')

      expect($component.attr('role')).toEqual('region')
    })

    it('has data-module attribute to initialise JavaScript', () => {
      const $ = render('notification-banner', examples.default)
      const $component = $('.govie-notification-banner')

      expect($component.attr('data-module')).toEqual('govie-notification-banner')
    })

    it('renders header container', () => {
      const $ = render('notification-banner', examples.default)
      const $header = $('.govie-notification-banner__header')

      expect($header.length).toBeTruthy()
    })

    it('renders default heading level', () => {
      const $ = render('notification-banner', examples.default)
      const $title = $('.govie-notification-banner__title')

      expect($title.get(0).tagName).toEqual('h2')
    })

    it('renders default title text', () => {
      const $ = render('notification-banner', examples.default)
      const $title = $('.govie-notification-banner__title')

      expect($title.html().trim()).toEqual('Important')
    })

    it('renders content', () => {
      const $ = render('notification-banner', examples.default)
      const $content = $('.govie-notification-banner__heading')

      expect($content.html().trim()).toEqual('This publication was withdrawn on 7 March 2014.')
    })
  })

  describe('custom options', () => {
    it('renders custom title', () => {
      const $ = render('notification-banner', examples['custom title'])
      const $title = $('.govie-notification-banner__title')

      expect($title.html().trim()).toEqual('Important information')
    })

    it('renders custom content', () => {
      const $ = render('notification-banner', examples['custom text'])
      const $content = $('.govie-notification-banner__heading')

      expect($content.html().trim()).toEqual('This publication was withdrawn on 7 March 2014.')
    })

    it('renders custom heading level', () => {
      const $ = render('notification-banner', examples['custom title heading level'])
      const $title = $('.govie-notification-banner__title')

      expect($title.get(0).tagName).toEqual('h3')
    })

    it('renders custom role', () => {
      const $ = render('notification-banner', examples['custom role'])
      const $component = $('.govie-notification-banner')

      expect($component.attr('role')).toEqual('banner')
    })

    it('renders aria-labelledby attribute matching the title id when role overridden to region', () => {
      const $ = render('notification-banner', examples['role=alert overridden to role=region, with type as success'])
      const ariaAttr = $('.govie-notification-banner').attr('aria-labelledby')
      const titleId = $('.govie-notification-banner__title').attr('id')

      expect(ariaAttr).toEqual(titleId)
    })

    it('renders custom title id', () => {
      const $ = render('notification-banner', examples['custom title id'])
      const $title = $('.govie-notification-banner__title')

      expect($title.attr('id')).toEqual('my-id')
    })

    it('has an aria-labelledby attribute matching the title id', () => {
      const $ = render('notification-banner', examples['custom title id'])
      const ariaAttr = $('.govie-notification-banner').attr('aria-labelledby')

      expect(ariaAttr).toEqual('my-id')
    })

    it('adds data-disable-auto-focus="true" if disableAutoFocus is true', () => {
      const $ = render('notification-banner', examples['auto-focus disabled, with type as success'])

      const $component = $('.govie-notification-banner')
      expect($component.attr('data-disable-auto-focus')).toBe('true')
    })

    it('adds data-disable-auto-focus="false" if disableAutoFocus is false', () => {
      const $ = render('notification-banner', examples['auto-focus explicitly enabled, with type as success'])

      const $component = $('.govie-notification-banner')
      expect($component.attr('data-disable-auto-focus')).toBe('false')
    })

    it('renders classes', () => {
      const $ = render('notification-banner', examples.classes)

      const $component = $('.govie-notification-banner')
      expect($component.hasClass('app-my-class')).toBeTruthy()
    })

    it('renders attributes', () => {
      const $ = render('notification-banner', examples.attributes)

      const $component = $('.govie-notification-banner')
      expect($component.attr('my-attribute')).toEqual('value')
    })
  })

  describe('html', () => {
    it('renders title as escaped html when passed as text', () => {
      const $ = render('notification-banner', examples['title html as text'])
      const $title = $('.govie-notification-banner__title')

      expect($title.html().trim()).toEqual('&lt;span&gt;Important information&lt;/span&gt;')
    })

    it('renders nested components using `call`', () => {
      const $ = render('notification-banner', {}, '<div class="app-nested-component"></div>')

      expect($('.govie-notification-banner .app-nested-component').length).toBeTruthy()
    })

    it('renders title as html', () => {
      const $ = render('notification-banner', examples['title as html'])
      const $title = $('.govie-notification-banner__title')

      expect($title.html().trim()).toEqual('<span>Important information</span>')
    })

    it('renders content as escaped html when passed as text', () => {
      const $ = render('notification-banner', examples['html as text'])
      const $content = $('.govie-notification-banner__content')

      expect($content.html().trim()).toEqual('<p class="govie-notification-banner__heading">&lt;span&gt;This publication was withdrawn on 7 March 2014.&lt;/span&gt;</p>')
    })

    it('renders content as html', () => {
      const $ = render('notification-banner', examples['with text as html'])
      const $contentHtml = $('.govie-notification-banner__content')

      expect($contentHtml.html().trim()).toEqual('<h3 class="govie-notification-banner__heading">This publication was withdrawn on 7 March 2014</h3><p class="govie-body">Archived and replaced by the <a href="#" class="govie-notification-banner__link">new planning guidance</a> launched 6 March 2014 on an external website</p>')
    })
  })

  describe('when success type is passed', () => {
    it('renders with appropriate class', () => {
      const $ = render('notification-banner', examples['with type as success'])

      const $component = $('.govie-notification-banner')
      expect($component.hasClass('govie-notification-banner--success')).toBeTruthy()
    })

    it('has role=alert attribute', () => {
      const $ = render('notification-banner', examples['with type as success'])

      const $component = $('.govie-notification-banner')
      expect($component.attr('role')).toEqual('alert')
    })

    it('does render aria-labelledby', () => {
      const $ = render('notification-banner', examples['with type as success'])
      const $component = $('.govie-notification-banner')

      expect($component.attr('aria-labelledby')).toEqual('govie-notification-banner-title')
    })

    it('renders a title id for aria-labelledby', () => {
      const $ = render('notification-banner', examples['with type as success'])
      const $component = $('.govie-notification-banner__title')

      expect($component.attr('id')).toEqual('govie-notification-banner-title')
    })

    it('renders default success title text', () => {
      const $ = render('notification-banner', examples['with type as success'])
      const $title = $('.govie-notification-banner__title')

      expect($title.html().trim()).toEqual('Success')
    })

    it('renders custom title id and aria-labelledby', () => {
      const $ = render('notification-banner', examples['custom title id with type as success'])
      const $component = $('.govie-notification-banner')
      const $title = $('.govie-notification-banner__title')

      expect($component.attr('aria-labelledby')).toEqual('my-id')
      expect($title.attr('id')).toEqual('my-id')
    })
  })

  describe('when type that is invalid is passed', () => {
    it('has role=region attribute', () => {
      const $ = render('notification-banner', examples['with invalid type'])
      const $component = $('.govie-notification-banner')

      expect($component.attr('role')).toEqual('region')
    })

    it('aria-labelledby attribute matches the title id', () => {
      const $ = render('notification-banner', examples['with invalid type'])
      const ariaAttr = $('.govie-notification-banner').attr('aria-labelledby')
      const titleId = $('.govie-notification-banner__title').attr('id')

      expect(ariaAttr).toEqual(titleId)
    })
  })
})
