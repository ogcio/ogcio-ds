const { goToComponent, goToExample, getProperty, getAttribute, isVisible } = require('../../../../lib/puppeteer-helpers.js')

describe('Radios with conditional reveals', () => {
  describe('when JavaScript is unavailable or fails', () => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(false)
    })

    afterAll(async () => {
      await page.setJavaScriptEnabled(true)
    })

    describe('with conditional items', () => {
      let $component
      let $inputs
      let $conditionals

      beforeAll(async () => {
        await goToComponent(page, 'radios', {
          exampleName: 'with-conditional-items'
        })

        $component = await page.$('.govie-radios')
        $inputs = await $component.$$('.govie-radios__input')
        $conditionals = await $component.$$('.govie-radios__conditional')

        expect($inputs.length).toBe(3)
        expect($conditionals.length).toBe(3)
      })

      it('has no ARIA attributes applied', async () => {
        const $inputsWithAriaExpanded = await $component.$$('.govie-radios__input[aria-expanded]')
        const $inputsWithAriaControls = await $component.$$('.govie-radios__input[aria-controls]')

        expect($inputsWithAriaExpanded.length).toBe(0)
        expect($inputsWithAriaControls.length).toBe(0)
      })

      it('falls back to making all conditional content visible', async () => {
        return Promise.all($conditionals.map(async ($conditional) => {
          return expect(await isVisible($conditional)).toBe(true)
        }))
      })
    })
  })

  describe('when JavaScript is available', () => {
    describe('with conditional item checked', () => {
      let $component
      let $inputs

      beforeEach(async () => {
        await goToComponent(page, 'radios', {
          exampleName: 'with-conditional-item-checked'
        })

        $component = await page.$('.govie-radios')
        $inputs = await $component.$$('.govie-radios__input')
      })

      it('has conditional content revealed that is associated with a checked input', async () => {
        const $input = $inputs[0] // First input, checked
        const $conditional = await $component.$(`[id="${await getAttribute($input, 'aria-controls')}"]`)

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await isVisible($conditional)).toBe(true)
      })

      it('has no conditional content revealed that is associated with an unchecked input', async () => {
        const $input = $inputs[$inputs.length - 1] // Last input, unchecked
        const $conditional = await $component.$(`[id="${await getAttribute($input, 'aria-controls')}"]`)

        expect(await getProperty($input, 'checked')).toBe(false)
        expect(await isVisible($conditional)).toBe(false)
      })
    })

    describe('with conditional items', () => {
      let $component
      let $inputs

      beforeEach(async () => {
        await goToComponent(page, 'radios', {
          exampleName: 'with-conditional-items'
        })

        $component = await page.$('.govie-radios')
        $inputs = await $component.$$('.govie-radios__input')
      })

      it('indicates when conditional content is collapsed or revealed', async () => {
        const $input = $inputs[0] // First input, with conditional content

        // Initially collapsed
        expect(await getProperty($input, 'checked')).toBe(false)
        expect(await getAttribute($input, 'aria-expanded')).toBe('false')

        // Toggle revealed
        await $input.click()

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await getAttribute($input, 'aria-expanded')).toBe('true')

        // Stays revealed (unlike radios)
        await $input.click()

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await getAttribute($input, 'aria-expanded')).toBe('true')
      })

      it('toggles the conditional content when clicking an input', async () => {
        const $input = $inputs[0] // First input, with conditional content
        const $conditional = await $component.$(`[id="${await getAttribute($input, 'aria-controls')}"]`)

        // Initially collapsed
        expect(await getProperty($input, 'checked')).toBe(false)
        expect(await isVisible($conditional)).toBe(false)

        // Toggle revealed
        await $input.click()

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await isVisible($conditional)).toBe(true)

        // Stays revealed (unlike radios)
        await $input.click()

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await isVisible($conditional)).toBe(true)
      })

      it('toggles the conditional content when using an input with a keyboard', async () => {
        const $input = $inputs[0] // First input, with conditional content
        const $conditional = await $component.$(`[id="${await getAttribute($input, 'aria-controls')}"]`)

        // Initially collapsed
        expect(await getProperty($input, 'checked')).toBe(false)
        expect(await isVisible($conditional)).toBe(false)

        // Toggle revealed
        await $input.focus()
        await page.keyboard.press('Space')

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await isVisible($conditional)).toBe(true)

        // Stays revealed (unlike radios)
        await page.keyboard.press('Space')

        expect(await getProperty($input, 'checked')).toBe(true)
        expect(await isVisible($conditional)).toBe(true)
      })
    })

    describe('with conditional items with special characters', () => {
      it('does not error when ID of revealed content contains special characters', async () => {
        // Errors logged to the console will cause this test to fail
        await goToComponent(page, 'radios', {
          exampleName: 'with-conditional-items-with-special-characters'
        })
      })
    })
  })
})

describe('Radios with multiple groups', () => {
  describe('when JavaScript is available', () => {
    let $inputsWarm
    let $inputsCool
    let $inputsNotInForm

    beforeEach(async () => {
      await goToExample(page, 'multiple-radio-groups')

      $inputsWarm = await page.$$('.govie-radios__input[id^="warm"]')
      $inputsCool = await page.$$('.govie-radios__input[id^="cool"]')
      $inputsNotInForm = await page.$$('.govie-radios__input[id^="question-not-in-form"]')
    })

    it('toggles conditional reveals in other groups', async () => {
      const $conditionalWarm = await page.$(`[id="${await getAttribute($inputsWarm[0], 'aria-controls')}"]`)
      const $conditionalCool = await page.$(`[id="${await getAttribute($inputsCool[0], 'aria-controls')}"]`)

      // Select red in warm colours
      await $inputsWarm[0].click()

      expect(await isVisible($conditionalWarm)).toBe(true)
      expect(await isVisible($conditionalCool)).toBe(false)

      // Select blue in cool colours
      await $inputsCool[0].click()

      expect(await isVisible($conditionalWarm)).toBe(false)
      expect(await isVisible($conditionalCool)).toBe(true)
    })

    it('toggles conditional reveals when not in a form', async () => {
      const $conditionalWarm = await page.$(`[id="${await getAttribute($inputsWarm[0], 'aria-controls')}"]`)

      // Select first input in radios not in a form
      await $inputsNotInForm[0].click()

      expect(await isVisible($conditionalWarm)).toBe(false)
    })
  })
})

describe('Radios with multiple groups and conditional reveals', () => {
  describe('when JavaScript is available', () => {
    let $inputsPrimary
    let $inputsOther

    beforeEach(async () => {
      await goToExample(page, 'conditional-reveals')

      $inputsPrimary = await page.$$('.govie-radios__input[id^="fave-primary"]')
      $inputsOther = await page.$$('.govie-radios__input[id^="fave-other"]')
    })

    it('hides conditional reveals in other groups', async () => {
      const $conditionalPrimary = await page.$(`[id="${await getAttribute($inputsPrimary[1], 'aria-controls')}"]`)

      // Choose the second radio in the first group, which reveals additional content
      await $inputsPrimary[1].click()

      // Assert that conditional content is revealed
      expect(await isVisible($conditionalPrimary)).toBe(true)

      // Choose a different radio with the same name, but in a different group
      await $inputsOther[1].click()

      // Expect conditional content to have been collapsed
      expect(await isVisible($conditionalPrimary)).toBe(false)
    })
  })
})
