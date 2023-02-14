var KEY_SPACE = 32
var DEBOUNCE_TIMEOUT_IN_SECONDS = 1

/**
 * Trigger a click event when the space key is pressed
 *
 * Some screen readers tell users they can activate things with the 'button'
 * role, so we need to match the functionality of native HTML buttons
 *
 * See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
 *
 * @param {KeyboardEvent} event
 */
export function handleKeyDown (event) {
  var target = event.target

  if (target.getAttribute('role') === 'button' && event.keyCode === KEY_SPACE) {
    event.preventDefault() // prevent the page from scrolling
    target.click()
  }
}

/**
 * Debounce double-clicks
 *
 * If the click quickly succeeds a previous click then nothing will happen. This
 * stops people accidentally causing multiple form submissions by double
 * clicking buttons.
 *
 * @param {MouseEvent} event
 * @returns {undefined | false} - Returns undefined, or false when debounced
 */
export function debounce (event) {
  // Check the button that was clicked has preventDoubleClick enabled
  if (!this.config.preventDoubleClick) {
    return
  }

  // If the timer is still running, prevent the click from submitting the form
  if (this.debounceFormSubmitTimer) {
    event.preventDefault()
    return false
  }

  this.debounceFormSubmitTimer = setTimeout(
    function () {
      this.debounceFormSubmitTimer = null
    }.bind(this),
    DEBOUNCE_TIMEOUT_IN_SECONDS * 1000
  )
}
