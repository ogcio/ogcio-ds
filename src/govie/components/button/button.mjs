import '../../vendor/polyfills/Event.mjs' // addEventListener and event.target normalization
import '../../vendor/polyfills/Function/prototype/bind.mjs'

import { mergeConfigs, normaliseDataset } from '../../common.mjs'
import { handleKeyDown, debounce } from './button.common'

/**
 * JavaScript enhancements for the Button component
 *
 * @class
 * @param {HTMLElement} $module - The element this component controls
 * @param {object} config - Button config
 * @param {boolean} [config.preventDoubleClick=false] - Whether the button should prevent double clicks
 */
function Button($module, config) {
  if (!$module) {
    return this
  }

  this.$module = $module
  this.debounceFormSubmitTimer = null

  var defaultConfig = {
    preventDoubleClick: false,
  }
  this.config = mergeConfigs(
    defaultConfig,
    config || {},
    normaliseDataset($module.dataset)
  )
}

/**
 * Initialise component
 */
Button.prototype.init = function () {
  if (!this.$module) {
    return
  }

  this.$module.addEventListener('keydown', this.handleKeyDown)
  this.$module.addEventListener('click', this.debounce.bind(this))
}

Button.prototype.handleKeyDown = handleKeyDown
Button.prototype.debounce = debounce

export default Button
