const { getExamples } = require('../../../../lib/jest-helpers')
const { renderAndInitialise, goToComponent } = require('../../../../lib/puppeteer-helpers')

describe('Notification banner, when type is set to "success"', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('notification-banner')
  })

  it('has the correct tabindex attribute to be focused with JavaScript', async () => {
    await goToComponent(page, 'notification-banner', {
      exampleName: 'with-type-as-success'
    })

    const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))

    expect(tabindex).toEqual('-1')
  })

  it('is automatically focused when the page loads', async () => {
    await goToComponent(page, 'notification-banner', {
      exampleName: 'with-type-as-success'
    })

    const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

    expect(activeElement).toBe('govie-notification-banner')
  })

  it('removes the tabindex attribute on blur', async () => {
    await goToComponent(page, 'notification-banner', {
      exampleName: 'with-type-as-success'
    })

    await page.$eval('.govie-notification-banner', el => el.blur())

    const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))
    expect(tabindex).toBeNull()
  })

  describe('and auto-focus is disabled using data attributes', () => {
    beforeAll(async () => {
      await goToComponent(page, 'notification-banner', {
        exampleName: 'auto-focus-disabled,-with-type-as-success'
      })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('govie-notification-banner')
    })
  })

  describe('and auto-focus is disabled using JavaScript configuration', () => {
    beforeAll(async () => {
      await renderAndInitialise(page, 'notification-banner', {
        nunjucksParams: examples['with type as success'],
        javascriptConfig: {
          disableAutoFocus: true
        }
      })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('govie-notification-banner')
    })
  })

  describe('and auto-focus is disabled using options passed to initAll', () => {
    beforeAll(async () => {
      await renderAndInitialise(page, 'notification-banner', {
        nunjucksParams: examples['with type as success'],
        initialiser () {
          window.GOVIEFrontend.initAll({
            notificationBanner: {
              disableAutoFocus: true
            }
          })
        }
      })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('govie-notification-banner')
    })
  })

  describe('and autofocus is disabled in JS but enabled in data attributes', () => {
    beforeAll(async () => {
      await renderAndInitialise(page, 'notification-banner', {
        nunjucksParams: examples['auto-focus explicitly enabled, with type as success'],
        javascriptConfig: {
          disableAutoFocus: true
        }
      })
    })

    it('has the correct tabindex attribute to be focused with JavaScript', async () => {
      const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toEqual('-1')
    })

    it('is automatically focused when the page loads', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).toBe('govie-notification-banner')
    })
  })

  describe('and role is overridden to "region"', () => {
    beforeAll(async () => {
      await goToComponent(page, 'notification-banner', {
        exampleName: 'role=alert-overridden-to-role=region,-with-type-as-success'
      })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('govie-notification-banner')
    })
  })

  describe('and a custom tabindex is set', () => {
    beforeAll(async () => {
      await goToComponent(page, 'notification-banner', {
        exampleName: 'custom-tabindex'
      })
    })

    it('does not remove the tabindex attribute on blur', async () => {
      await page.$eval('.govie-notification-banner', el => el.blur())

      const tabindex = await page.$eval('.govie-notification-banner', el => el.getAttribute('tabindex'))
      expect(tabindex).toEqual('2')
    })
  })
})
