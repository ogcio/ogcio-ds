// Based on https://github.com/alphagov/govuk_publishing_components/blob/v29.11.0/app/assets/javascripts/govuk_publishing_components/components/step-by-step-nav.js
import '../../vendor/polyfills/Element/prototype/classList.mjs'
import '../../vendor/polyfills/Element/prototype/closest.mjs'

/**
 * Step By Step Navigation component
 *
 * @class
 * @param {HTMLElement} $module - The element this component controls
 */
function StepByStepNav($module) {
  if (!$module) {
    return
  }

  this.$module = $module
  this.$module.actions = {} // stores text for JS appended elements 'show' and 'hide' on steps, and 'show/hide all' button
  this.$module.rememberShownStep = false
  this.$module.stepNavSize = false
  this.$module.sessionStoreLink = 'govie-step-nav-active-link'
  this.$module.activeLinkClass = 'govie-step-nav__list-item--active'
  this.$module.activeStepClass = 'govie-step-nav__step--active'
  this.$module.activeLinkHref = '#content'
  this.$module.uniqueId = false
}

/**
 * Initialise component
 */
StepByStepNav.prototype.init = function () {
  if (!this.$module) {
    return
  }

  // Indicate that js has worked
  this.$module.classList.add('govie-step-nav--active')

  // Prevent FOUC, remove class hiding content
  this.$module.classList.remove('js-hidden')

  this.$module.stepNavSize = this.$module.classList.contains(
    'govie-step-nav--large'
  )
    ? 'Big'
    : 'Small'
  this.$module.rememberShownStep =
    !!this.$module.hasAttribute('data-remember') &&
    this.$module.stepNavSize === 'Big'

  this.$module.steps = this.$module.querySelectorAll('.js-step')
  this.$module.stepHeaders = this.$module.querySelectorAll('.js-toggle-panel')
  this.$module.totalSteps = this.$module.querySelectorAll('.js-panel').length
  this.$module.totalLinks = this.$module.querySelectorAll(
    '.govie-step-nav__link'
  ).length
  this.$module.showOrHideAllButton = false

  this.$module.uniqueId = this.$module.getAttribute('data-id') || false

  if (this.$module.uniqueId) {
    this.$module.sessionStoreLink =
      this.$module.sessionStoreLink + '_' + this.$module.uniqueId
  }

  this.getTextForInsertedElements()
  this.addButtonstoSteps()
  this.addShowHideAllButton()
  this.addShowHideToggle()
  this.addAriaControlsAttrForShowHideAllButton()

  this.ensureOnlyOneActiveLink()
  this.showPreviouslyOpenedSteps()

  this.bindToggleForSteps()
  this.bindToggleShowHideAllButton()
  this.bindComponentLinkClicks()
}

StepByStepNav.prototype.getTextForInsertedElements = function () {
  this.$module.actions.showText = this.$module.getAttribute('data-show-text')
  this.$module.actions.hideText = this.$module.getAttribute('data-hide-text')
  this.$module.actions.showAllText =
    this.$module.getAttribute('data-show-all-text')
  this.$module.actions.hideAllText =
    this.$module.getAttribute('data-hide-all-text')
}

StepByStepNav.prototype.addShowHideAllButton = function () {
  var showAll = document.createElement('div')
  var steps = this.$module.querySelectorAll('.govie-step-nav__steps')[0]

  showAll.className = 'govie-step-nav__controls govie-!-display-none-print'
  showAll.innerHTML =
    '<button aria-expanded="false" class="govie-step-nav__button govie-step-nav__button--controls js-step-controls-button">' +
    '<span class="govie-step-nav__chevron govie-step-nav__chevron--down js-step-controls-button-icon"></span>' +
    '<span class="govie-step-nav__button-text govie-step-nav__button-text--all js-step-controls-button-text">' +
    this.$module.actions.showAllText +
    '</span>' +
    '</button>'

  this.$module.insertBefore(showAll, steps)
  this.$module.showOrHideAllButton = this.$module.querySelectorAll(
    '.js-step-controls-button'
  )[0]
}

StepByStepNav.prototype.addShowHideToggle = function () {
  for (var i = 0; i < this.$module.stepHeaders.length; i++) {
    var thisel = this.$module.stepHeaders[i]

    if (!thisel.querySelectorAll('.js-toggle-link').length) {
      var showHideSpan = document.createElement('span')
      var showHideSpanText = document.createElement('span')
      var showHideSpanIcon = document.createElement('span')
      var showHideSpanFocus = document.createElement('span')
      var thisSectionSpan = document.createElement('span')

      showHideSpan.className =
        'govie-step-nav__toggle-link js-toggle-link govie-!-display-none-print'
      showHideSpanText.className =
        'govie-step-nav__button-text js-toggle-link-text'
      showHideSpanIcon.className = 'govie-step-nav__chevron js-toggle-link-icon'
      showHideSpanFocus.className = 'govie-step-nav__toggle-link-focus'
      thisSectionSpan.className = 'govie-visually-hidden'

      showHideSpan.appendChild(showHideSpanFocus)
      showHideSpanFocus.appendChild(showHideSpanIcon)
      showHideSpanFocus.appendChild(showHideSpanText)

      thisSectionSpan.innerHTML = ' this section'
      showHideSpan.appendChild(thisSectionSpan)

      thisel
        .querySelectorAll('.js-step-title-button')[0]
        .appendChild(showHideSpan)
    }
  }
}

StepByStepNav.prototype.headerIsOpen = function (stepHeader) {
  return typeof stepHeader.parentNode.getAttribute('show') !== 'undefined'
}

StepByStepNav.prototype.addAriaControlsAttrForShowHideAllButton = function () {
  var ariaControlsValue = this.$module
    .querySelectorAll('.js-panel')[0]
    .getAttribute('id')

  this.$module.showOrHideAllButton.setAttribute(
    'aria-controls',
    ariaControlsValue
  )
}

// called by show all/hide all, sets all steps accordingly
StepByStepNav.prototype.setAllStepsShownState = function (isShown) {
  var data = []

  for (var i = 0; i < this.$module.steps.length; i++) {
    var stepView = new this.StepView(this.$module.steps[i], this.$module)
    stepView.setIsShown(isShown)

    if (isShown) {
      data.push(this.$module.steps[i].getAttribute('id'))
    }
  }

  if (isShown) {
    this.saveToSessionStorage(this.$module.uniqueId, JSON.stringify(data))
  } else {
    this.removeFromSessionStorage(this.$module.uniqueId)
  }
}

// called on load, determines whether each step should be open or closed
StepByStepNav.prototype.showPreviouslyOpenedSteps = function () {
  var data = this.loadFromSessionStorage(this.$module.uniqueId) || []

  for (var i = 0; i < this.$module.steps.length; i++) {
    var thisel = this.$module.steps[i]
    var id = thisel.getAttribute('id')
    var stepView = new this.StepView(thisel, this.$module)
    var shouldBeShown = thisel.hasAttribute('data-show')

    // show the step if it has been remembered or if it has the 'data-show' attribute
    if (
      (this.$module.rememberShownStep && data.indexOf(id) > -1) ||
      (shouldBeShown && shouldBeShown !== 'undefined')
    ) {
      stepView.setIsShown(true)
    } else {
      stepView.setIsShown(false)
    }
  }

  if (data.length > 0) {
    this.$module.showOrHideAllButton.setAttribute('aria-expanded', true)
    this.setShowHideAllText()
  }
}

StepByStepNav.prototype.addButtonstoSteps = function () {
  for (var i = 0; i < this.$module.steps.length; i++) {
    var thisel = this.$module.steps[i]
    var title = thisel.querySelectorAll('.js-step-title')[0]
    var contentId = thisel.querySelectorAll('.js-panel')[0].getAttribute('id')
    var titleText = title.textContent || title.innerText // IE8 fallback

    title.outerHTML =
      '<span class="js-step-title">' +
      '<button ' +
      'class="govie-step-nav__button govie-step-nav__button--title js-step-title-button" ' +
      'aria-expanded="false" aria-controls="' +
      contentId +
      '">' +
      '<span class="govie-step-nav____title-text-focus">' +
      '<span class="govie-step-nav__title-text js-step-title-text">' +
      titleText +
      '</span>' +
      '<span class="govie-visually-hidden govie-step-nav__section-heading-divider">, </span>' +
      '</span>' +
      '</button>' +
      '</span>'
  }
}

StepByStepNav.prototype.bindToggleForSteps = function () {
  var that = this
  var togglePanels = this.$module.querySelectorAll('.js-toggle-panel')

  for (var i = 0; i < togglePanels.length; i++) {
    togglePanels[i].addEventListener('click', function (event) {
      var stepView = new that.StepView(this.parentNode, that.$module)
      stepView.toggle()

      var stepIsOptional = this.parentNode.hasAttribute('data-optional')
      var toggleClick = new that.StepToggleClick(
        event,
        stepView,
        stepIsOptional,
        that.$module.stepNavSize
      )

      that.setShowHideAllText()
      that.rememberStepState(this.parentNode)
    })
  }
}

// if the step is open, store its id in session store
// if the step is closed, remove its id from session store
StepByStepNav.prototype.rememberStepState = function (step) {
  if (this.$module.rememberShownStep) {
    var data =
      JSON.parse(this.loadFromSessionStorage(this.$module.uniqueId)) || []
    var thisstep = step.getAttribute('id')
    var shown = step.classList.contains('step-is-shown')

    if (shown) {
      data.push(thisstep)
    } else {
      var i = data.indexOf(thisstep)
      if (i > -1) {
        data.splice(i, 1)
      }
    }
    this.saveToSessionStorage(this.$module.uniqueId, JSON.stringify(data))
  }
}

// tracking click events on links in step content
StepByStepNav.prototype.bindComponentLinkClicks = function () {
  var jsLinks = this.$module.querySelectorAll('.js-link')
  var that = this

  for (var i = 0; i < jsLinks.length; i++) {
    jsLinks[i].addEventListener('click', function (event) {
      var dataPosition = this.getAttribute('data-position')
      var linkClick = new that.ComponentLinkClick(
        event,
        dataPosition,
        that.$module.stepNavSize
      )

      if (this.getAttribute('rel') !== 'external') {
        that.saveToSessionStorage(that.$module.sessionStoreLink, dataPosition)
      }

      if (this.getAttribute('href') === that.$module.activeLinkHref) {
        that.setOnlyThisLinkActive(this)
        that.setActiveStepClass()
      }
    })
  }
}

StepByStepNav.prototype.saveToSessionStorage = function (key, value) {
  window.sessionStorage.setItem(key, value)
}

StepByStepNav.prototype.loadFromSessionStorage = function (key, value) {
  return window.sessionStorage.getItem(key)
}

StepByStepNav.prototype.removeFromSessionStorage = function (key) {
  window.sessionStorage.removeItem(key)
}

StepByStepNav.prototype.setOnlyThisLinkActive = function (clicked) {
  var allActiveLinks = this.$module.querySelectorAll(
    '.' + this.$module.activeLinkClass
  )
  for (var i = 0; i < allActiveLinks.length; i++) {
    allActiveLinks[i].classList.remove(this.$module.activeLinkClass)
  }
  clicked.parentNode.classList.add(this.$module.activeLinkClass)
}

// if a link occurs more than once in a step nav, the backend doesn't know which one to highlight
// so it gives all those links the 'active' attribute and highlights the last step containing that link
// if the user clicked on one of those links previously, it will be in the session store
// this code ensures only that link and its corresponding step have the highlighting
// otherwise it accepts what the backend has already passed to the component
StepByStepNav.prototype.ensureOnlyOneActiveLink = function () {
  var activeLinks = this.$module.querySelectorAll(
    '.js-list-item.' + this.$module.activeLinkClass
  )

  if (activeLinks.length <= 1) {
    return
  }

  var loaded = this.loadFromSessionStorage(this.$module.sessionStoreLink)
  var activeParent = this.$module.querySelectorAll(
    '.' + this.$module.activeLinkClass
  )[0]
  var activeChild = activeParent.firstChild
  var foundLink = activeChild.getAttribute('data-position')
  var lastClicked = loaded || foundLink // the value saved has priority

  // it's possible for the saved link position value to not match any of the currently duplicate highlighted links
  // so check this otherwise it'll take the highlighting off all of them
  var checkLink = this.$module.querySelectorAll(
    '[data-position="' + lastClicked + '"]'
  )[0]

  if (checkLink) {
    if (
      !checkLink.parentNode.classList.contains(this.$module.activeLinkClass)
    ) {
      lastClicked = checkLink
    }
  } else {
    lastClicked = foundLink
  }

  this.removeActiveStateFromAllButCurrent(activeLinks, lastClicked)
  this.setActiveStepClass()
}

StepByStepNav.prototype.removeActiveStateFromAllButCurrent = function (
  activeLinks,
  current
) {
  for (var i = 0; i < activeLinks.length; i++) {
    var thisel = activeLinks[i]
    if (
      thisel
        .querySelectorAll('.js-link')[0]
        .getAttribute('data-position')
        .toString() !== current.toString()
    ) {
      thisel.classList.remove(this.$module.activeLinkClass)
      var visuallyHidden = thisel.querySelectorAll('.visuallyhidden')
      if (visuallyHidden.length) {
        visuallyHidden[0].parentNode.removeChild(visuallyHidden[0])
      }
    }
  }
}

StepByStepNav.prototype.setActiveStepClass = function () {
  // remove the 'active/open' state from all steps
  var allActiveSteps = this.$module.querySelectorAll(
    '.' + this.$module.activeStepClass
  )
  for (var i = 0; i < allActiveSteps.length; i++) {
    allActiveSteps[i].classList.remove(this.$module.activeStepClass)
    allActiveSteps[i].removeAttribute('data-show')
  }

  // find the current page link and apply 'active/open' state to parent step
  var activeLink = this.$module.querySelectorAll(
    '.' + this.$module.activeLinkClass
  )[0]
  if (activeLink) {
    var activeStep = activeLink.closest('.govie-step-nav__step')
    activeStep.classList.add(this.$module.activeStepClass)
    activeStep.setAttribute('data-show', '')
  }
}

StepByStepNav.prototype.bindToggleShowHideAllButton = function () {
  var that = this

  this.$module.showOrHideAllButton.addEventListener('click', function (event) {
    var textContent = this.textContent || this.innerText
    var shouldShowAll = textContent === that.$module.actions.showAllText

    that.setAllStepsShownState(shouldShowAll)
    that.$module.showOrHideAllButton.setAttribute(
      'aria-expanded',
      shouldShowAll
    )
    that.setShowHideAllText()

    return false
  })
}

StepByStepNav.prototype.setShowHideAllText = function () {
  var shownSteps = this.$module.querySelectorAll('.step-is-shown').length
  var showAllChevon = this.$module.showOrHideAllButton.querySelector(
    '.js-step-controls-button-icon'
  )
  var showAllButtonText = this.$module.showOrHideAllButton.querySelector(
    '.js-step-controls-button-text'
  )
  // Find out if the number of is-opens == total number of steps
  var shownStepsIsTotalSteps = shownSteps === this.$module.totalSteps

  if (shownStepsIsTotalSteps) {
    showAllButtonText.innerHTML = this.$module.actions.hideAllText
    showAllChevon.classList.remove('govie-step-nav__chevron--down')
  } else {
    showAllButtonText.innerHTML = this.$module.actions.showAllText
    showAllChevon.classList.add('govie-step-nav__chevron--down')
  }
}

StepByStepNav.prototype.StepView = function (stepElement, $module) {
  this.stepElement = stepElement
  this.stepContent = this.stepElement.querySelectorAll('.js-panel')[0]
  this.titleButton = this.stepElement.querySelectorAll(
    '.js-step-title-button'
  )[0]
  var textElement = this.stepElement.querySelectorAll('.js-step-title-text')[0]
  this.title = textElement.textContent || textElement.innerText
  this.title = this.title.replace(/^\s+|\s+$/g, '') // this is 'trim' but supporting IE8
  this.showText = $module.actions.showText
  this.hideText = $module.actions.hideText
  this.upChevronSvg = $module.upChevronSvg
  this.downChevronSvg = $module.downChevronSvg

  this.show = function () {
    this.setIsShown(true)
  }

  this.hide = function () {
    this.setIsShown(false)
  }

  this.toggle = function () {
    this.setIsShown(this.isHidden())
  }

  this.setIsShown = function (isShown) {
    var toggleLink = this.stepElement.querySelectorAll('.js-toggle-link')[0]
    var toggleLinkText = toggleLink.querySelector('.js-toggle-link-text')
    var stepChevron = toggleLink.querySelector('.js-toggle-link-icon')

    if (isShown) {
      this.stepElement.classList.add('step-is-shown')
      this.stepContent.classList.remove('js-hidden')
      toggleLinkText.innerHTML = this.hideText
      stepChevron.classList.remove('govie-step-nav__chevron--down')
    } else {
      this.stepElement.classList.remove('step-is-shown')
      this.stepContent.classList.add('js-hidden')
      toggleLinkText.innerHTML = this.showText
      stepChevron.classList.add('govie-step-nav__chevron--down')
    }
    this.titleButton.setAttribute('aria-expanded', isShown)
  }

  this.isShown = function () {
    return this.stepElement.classList.contains('step-is-shown')
  }

  this.isHidden = function () {
    return !this.isShown()
  }

  this.numberOfContentItems = function () {
    return this.stepContent.querySelectorAll('.js-link').length
  }
}

StepByStepNav.prototype.StepToggleClick = function (
  event,
  stepView,
  stepIsOptional,
  stepNavSize
) {
  this.target = event.target
  this.stepIsOptional = stepIsOptional
  this.stepNavSize = stepNavSize

  this.trackingLabel = function () {
    var clickedNearbyToggle = this.target
      .closest('.js-step')
      .querySelectorAll('.js-toggle-panel')[0]
    return (
      clickedNearbyToggle.getAttribute('data-position') +
      ' - ' +
      stepView.title +
      ' - ' +
      this.locateClickElement() +
      ': ' +
      this.stepNavSize +
      this.isOptional()
    )
  }

  // returns index of the clicked step in the overall number of steps
  this.stepIndex = function () {
    // eslint-disable-line no-unused-vars
    return this.$module.steps.index(stepView.element) + 1
  }

  this.trackingAction = function () {
    return stepView.isHidden() ? 'stepNavHidden' : 'stepNavShown'
  }

  this.locateClickElement = function () {
    if (this.clickedOnIcon()) {
      return this.iconType() + ' click'
    } else if (this.clickedOnHeading()) {
      return 'Heading click'
    } else {
      return 'Elsewhere click'
    }
  }

  this.clickedOnIcon = function () {
    return this.target.classList.contains('js-toggle-link')
  }

  this.clickedOnHeading = function () {
    return this.target.classList.contains('js-step-title-text')
  }

  this.iconType = function () {
    return stepView.isHidden() ? 'Minus' : 'Plus'
  }

  this.isOptional = function () {
    return this.stepIsOptional ? ' ; optional' : ''
  }
}

StepByStepNav.prototype.ComponentLinkClick = function (
  event,

  linkPosition,
  size
) {
  this.size = size
  this.target = event.target
}

export default StepByStepNav
