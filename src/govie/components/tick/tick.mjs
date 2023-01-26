/**
 * Tick component
 *
 * @class
 * @param {HTMLElement} $module - The element this component controls
 */
function Tick($module) {
  this.$module = $module
}

/**
 * Initialise component
 */
Tick.prototype.init = function () {
  if (!this.$module) {
    return
  }
  var $input = this.$module.querySelector('.govie-tick')
  var $filled = this.$module.querySelector('.govie-tick--filled')
  addIcon($input, $filled)
}

function addIcon($input, $filled) {
  $input.after($filled ? addFilledIcon() : addOutlinedIcon())
}

function addFilledIcon() {
  var filledTick = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  filledTick.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  filledTick.setAttribute('focusable', 'false')
  filledTick.setAttribute('width', '18')
  filledTick.setAttribute('height', '18')
  filledTick.setAttribute('viewBox', '0 0 18 18')

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9C18 4.05 13.95 0 9 0ZM7.2 13.5L2.7 9L3.969 7.731L7.2 10.953L14.031 4.122L15.3 5.4L7.2 13.5Z'
  )

  filledTick.appendChild(path)
  return filledTick
}

function addOutlinedIcon() {
  var filledTick = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  filledTick.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  filledTick.setAttribute('focusable', 'false')
  filledTick.setAttribute('width', '18')
  filledTick.setAttribute('height', '14')
  filledTick.setAttribute('viewBox', '0 0 18 14')

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M18 1.99997L6 14L0.5 8.49997L1.91 7.08997L6 11.17L16.59 0.589966L18 1.99997Z'
  )

  filledTick.appendChild(path)
  return filledTick
}

export default Tick
