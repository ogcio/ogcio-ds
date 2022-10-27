const { goToComponent, goToExample } = require('../../../../lib/puppeteer-helpers')

describe('/components/accordion', () => {
  describe('/components/accordion/preview', () => {
    describe('when JavaScript is unavailable or fails', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(false)
      })

      afterAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      it('falls back to making all accordion sections visible', async () => {
        await goToComponent(page, 'accordion')

        const numberOfExampleSections = 2

        for (var i = 0; i < numberOfExampleSections; i++) {
          var isContentVisible = await page.waitForSelector('.govuk-accordion .govuk-accordion__section:nth-of-type(' + (i + 1) + ') .govuk-accordion__section-content',
            { visible: true, timeout: 1000 }
          )
          expect(isContentVisible).toBeTruthy()
        }
      })

      it('does not display "↓/↑" in the section headings', async () => {
        await goToComponent(page, 'accordion')

        const numberOfIcons = await page.evaluate(() => document.body.querySelectorAll('.govuk-accordion .govuk-accordion__section .govuk-accordion-nav__chevron').length)
        expect(numberOfIcons).toEqual(0)
      })
    })

    describe('when JavaScript is available', () => {
      afterEach(async () => {
        // clear accordion state
        await page.evaluate(() => window.sessionStorage.clear())
      })

      it('should indicate that the sections are not expanded', async () => {
        await goToComponent(page, 'accordion')

        const numberOfExampleSections = 2

        for (var i = 0; i < numberOfExampleSections; i++) {
          const sectionHeaderButtonExpanded = await page.evaluate(function (i) {
            return document.body.querySelector('.govuk-accordion .govuk-accordion__section:nth-of-type(' + (2 + i) + ') .govuk-accordion__section-button').getAttribute('aria-expanded')
          }, i)

          expect(sectionHeaderButtonExpanded).toEqual('false')
        }
      })

      it('should change the Show all sections button to Hide all sections when both sections are opened', async () => {
        await goToComponent(page, 'accordion')

        await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(2) .govuk-accordion__section-header')
        await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(3) .govuk-accordion__section-header')

        const openOrCloseAllButtonText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__show-all').textContent)
        await page.click('.govuk-accordion__show-all')

        expect(openOrCloseAllButtonText).toEqual('Hide all sections')
      })

      it('should open both sections when the Show all sections button is clicked', async () => {
        await goToComponent(page, 'accordion')

        await page.click('.govuk-accordion__show-all')

        const firstSectionHeaderButtonExpanded = await page.evaluate(() => document.body.querySelectorAll('.govuk-accordion__section').item(0).querySelector('.govuk-accordion__section-button').getAttribute('aria-expanded'))

        expect(firstSectionHeaderButtonExpanded).toBeTruthy()

        const secondSectionHeaderButtonExpanded = await page.evaluate(() => document.body.querySelectorAll('.govuk-accordion__section').item(1).querySelector('.govuk-accordion__section-button').getAttribute('aria-expanded'))

        expect(secondSectionHeaderButtonExpanded).toBeTruthy()
      })

      it('should already have all sections open if they have the expanded class', async () => {
        await goToComponent(page, 'accordion', {
          exampleName: 'with-all-sections-already-open'
        })

        const numberOfExampleSections = 2

        for (var i = 0; i < numberOfExampleSections; i++) {
          const sectionHeaderButtonExpanded = await page.evaluate(function (i) {
            return document.body.querySelector('.govuk-accordion .govuk-accordion__section:nth-of-type(' + (2 + i) + ') .govuk-accordion__section-button').getAttribute('aria-expanded')
          }, i)

          expect(sectionHeaderButtonExpanded).toEqual('true')
        }

        const openOrCloseAllButtonText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__show-all').textContent)

        expect(openOrCloseAllButtonText).toEqual('Hide all sections')
      })

      it('should maintain the expanded state after a page refresh', async () => {
        const sectionHeaderButton = '.govuk-accordion .govuk-accordion__section:nth-of-type(2) .govuk-accordion__section-button'

        await goToComponent(page, 'accordion')
        await page.click(sectionHeaderButton)

        const expandedState = await page.evaluate((sectionHeaderButton) => {
          return document.body.querySelector(sectionHeaderButton).getAttribute('aria-expanded')
        }, sectionHeaderButton)

        await page.reload({
          waitUntil: 'load'
        })

        const expandedStateAfterRefresh = await page.evaluate((sectionHeaderButton) => {
          return document.body.querySelector(sectionHeaderButton).getAttribute('aria-expanded')
        }, sectionHeaderButton)

        expect(expandedState).toEqual(expandedStateAfterRefresh)
      })

      it('should transform the button span to <button>', async () => {
        await goToComponent(page, 'accordion')

        const buttonTag = await page.evaluate(() => document.body.querySelector('.govuk-accordion .govuk-accordion__section-button').tagName)

        expect(buttonTag).toEqual('BUTTON')
      })

      it('should contain a heading text container', async () => {
        await goToComponent(page, 'accordion')

        const headingTextContainer = await page.evaluate(() => document.body.querySelector('.govuk-accordion .govuk-accordion__section-button > .govuk-accordion__section-heading-text'))

        expect(headingTextContainer).toBeTruthy()
      })

      describe('focus containers', () => {
        it('should contain a heading text focus container', async () => {
          await goToComponent(page, 'accordion')

          const headingTextFocusContainer = await page.evaluate(() => document.body.querySelector('.govuk-accordion .govuk-accordion__section-button .govuk-accordion__section-heading-text > .govuk-accordion__section-heading-text-focus'))

          expect(headingTextFocusContainer).toBeTruthy()
        })
        it('should contain a summary focus container', async () => {
          await goToComponent(page, 'accordion', {
            exampleName: 'with-additional-descriptions'
          })

          const summaryFocusContainer = await page.evaluate(() => document.body.querySelector('.govuk-accordion .govuk-accordion__section-button > .govuk-accordion__section-summary > .govuk-accordion__section-summary-focus'))

          expect(summaryFocusContainer).toBeTruthy()
        })
        it('should contain a show/hide focus container', async () => {
          await goToComponent(page, 'accordion')

          const headingTextFocusContainer = await page.evaluate(() => document.body.querySelector('.govuk-accordion .govuk-accordion__section-button .govuk-accordion__section-toggle > .govuk-accordion__section-toggle-focus'))

          expect(headingTextFocusContainer).toBeTruthy()
        })
      })

      describe('"↓/↑" icon', () => {
        it('should display "↓/↑" in the section headings', async () => {
          await goToComponent(page, 'accordion')

          const numberOfExampleSections = 2
          const numberOfIcons = await page.evaluate(() => document.body.querySelectorAll('.govuk-accordion .govuk-accordion__section .govuk-accordion-nav__chevron').length)

          expect(numberOfIcons).toEqual(numberOfExampleSections)
        })
      })

      describe('hidden comma', () => {
        it('should contain hidden comma " ," after the heading text for assistive technology', async () => {
          await goToComponent(page, 'accordion')

          const commaAfterHeadingTextClassName = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-heading-text').nextElementSibling.className)

          const commaAfterHeadingTextContent = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-heading-text').nextElementSibling.innerHTML)

          expect(commaAfterHeadingTextClassName).toEqual('govuk-visually-hidden govuk-accordion__section-heading-divider')

          expect(commaAfterHeadingTextContent).toEqual(', ')
        })

        it('should contain hidden comma " ," after the summary line for assistive technology', async () => {
          await goToComponent(page, 'accordion', {
            exampleName: 'with-additional-descriptions'
          })

          const commaAfterHeadingTextClassName = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-summary').nextElementSibling.className)

          const commaAfterHeadingTextContent = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-summary').nextElementSibling.innerHTML)

          expect(commaAfterHeadingTextClassName).toEqual('govuk-visually-hidden govuk-accordion__section-heading-divider')

          expect(commaAfterHeadingTextContent).toEqual(', ')
        })
      })

      describe('summary line', () => {
        describe('location of summary', () => {
          it('should move the additional description to the button text in the correct order', async () => {
            await goToComponent(page, 'accordion', {
              exampleName: 'with-additional-descriptions'
            })

            const summaryClass = 'govuk-accordion__section-summary govuk-body'
            const firstSummaryElement = await page.evaluate(() => document.body.querySelectorAll('.govuk-accordion__section-button > span')[2].className)
            expect(firstSummaryElement).toMatch(summaryClass)
          })
        })

        describe('div to span', () => {
          it('should have converted the div to a span tag', async () => {
            await goToComponent(page, 'accordion', {
              exampleName: 'with-additional-descriptions'
            })

            const firstSummaryElement = await page.evaluate(() => document.body.querySelector('.govuk-accordion .govuk-accordion__section .govuk-accordion__section-summary').outerHTML)

            expect(firstSummaryElement).toMatch(/<span[^>]*>/)
          })
        })
      })

      it('should change the (combined) Show[ this section] text to Hide[ this section ] when sections are opened', async () => {
        await goToComponent(page, 'accordion')
        await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(2) .govuk-accordion__section-header')
        await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(3) .govuk-accordion__section-header')

        const ShowOrHideButtonText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-toggle-text').textContent)

        expect(ShowOrHideButtonText).toEqual('Hide this section')
      })

      it('should have a data-nosnippet attribute on the "Show / hide this section" container to hide it from search result snippets', async () => {
        await goToComponent(page, 'accordion')

        const dataNoSnippetAttribute = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-toggle').getAttribute('data-nosnippet'))

        expect(dataNoSnippetAttribute).toEqual('')
      })

      describe('hidden text', () => {
        it('should contain hidden text " this section" for assistive technology', async () => {
          await goToComponent(page, 'accordion')

          const numberOfExampleSections = 2
          const hiddenText = await page.evaluate(() => document.body.querySelectorAll('.govuk-accordion .govuk-accordion__section .govuk-accordion__section-toggle-text .govuk-visually-hidden').length)

          expect(hiddenText).toEqual(numberOfExampleSections)
        })
      })

      describe('expandable content', () => {
        it('should have an aria-labelledby that matches the heading text ID', async () => {
          await goToComponent(page, 'accordion')

          const ariaLabelledByValue = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-content').getAttribute('aria-labelledby'))

          const headingTextId = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-heading-text').getAttribute('id'))

          expect(ariaLabelledByValue).toEqual(headingTextId)
        })
      })

      describe('localisation', () => {
        it('should localise "Show all sections" based on data attribute', async () => {
          await goToComponent(page, 'accordion', {
            exampleName: 'with-translations'
          })

          const showAllSectionsDataAttribute = await page.evaluate(() => document.body.querySelector('.govuk-accordion').getAttribute('data-i18n.show-all-sections'))
          const allSectionsToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__show-all-text').innerHTML)

          expect(allSectionsToggleText).toEqual(showAllSectionsDataAttribute)
        })

        it('should localise "Show all sections" based on JavaScript configuration', async () => {
          await goToExample(page, 'translated')

          const allSectionsToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__show-all-text').innerHTML)

          expect(allSectionsToggleText).toBe('Dangos adrannau')
        })

        it('should localise "Hide all sections" based on data attribute', async () => {
          await goToComponent(page, 'accordion', {
            exampleName: 'with-translations'
          })
          await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(2) .govuk-accordion__section-header')
          await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(3) .govuk-accordion__section-header')

          const hideAllSectionsDataAttribute = await page.evaluate(() => document.body.querySelector('.govuk-accordion').getAttribute('data-i18n.hide-all-sections'))
          const allSectionsToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__show-all-text').innerHTML)

          expect(allSectionsToggleText).toEqual(hideAllSectionsDataAttribute)
        })

        it('should localise "Hide all sections" based on JavaScript configuration', async () => {
          await goToExample(page, 'translated')
          await page.click('.govuk-accordion .govuk-accordion__show-all')

          const allSectionsToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__show-all-text').innerHTML)

          expect(allSectionsToggleText).toBe('Cuddio adrannau')
        })

        it('should localise "Show section" based on data attribute', async () => {
          await goToComponent(page, 'accordion', {
            exampleName: 'with-translations'
          })

          const showSectionDataAttribute = await page.evaluate(() => document.body.querySelector('.govuk-accordion').getAttribute('data-i18n.show-section'))
          const firstSectionToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-toggle-text').innerHTML)

          expect(firstSectionToggleText).toEqual(showSectionDataAttribute)
        })

        it('should localise "Show section" based on JavaScript configuration', async () => {
          await goToExample(page, 'translated')

          const firstSectionToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-toggle-text').innerHTML)

          expect(firstSectionToggleText).toBe('Dangos<span class="govuk-visually-hidden"> adran</span>')
        })

        it('should localise "Hide section" based on data attribute', async () => {
          await goToComponent(page, 'accordion', {
            exampleName: 'with-translations'
          })
          await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(2) .govuk-accordion__section-header')

          const hideSectionDataAttribute = await page.evaluate(() => document.body.querySelector('.govuk-accordion').getAttribute('data-i18n.hide-section'))
          const firstSectionToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-toggle-text').innerHTML)

          expect(firstSectionToggleText).toEqual(hideSectionDataAttribute)
        })

        it('should localise "Hide section" based on JavaScript configuration', async () => {
          await goToExample(page, 'translated')
          await page.click('.govuk-accordion .govuk-accordion__section:nth-of-type(2) .govuk-accordion__section-header')

          const firstSectionToggleText = await page.evaluate(() => document.body.querySelector('.govuk-accordion__section-toggle-text').innerHTML)

          expect(firstSectionToggleText).toBe('Cuddio<span class="govuk-visually-hidden"> adran</span>')
        })
      })
    })
  })
})
