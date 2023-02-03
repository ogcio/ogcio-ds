var tooltip
/**
 * Tooltip component
 *
 * @class
 * @param {HTMLElement} $module - The element this component controls
 */
function Tooltip($module) {
  this.$module = $module
}

/**
 * Initialise component
 */
Tooltip.prototype.init = function () {
  tooltip = document.querySelector('.govie-tooltip-container')

  if (!tooltip) {
    var container = document.createElement('div')
    container.className = 'govie-tooltip-container'

    document.body.appendChild(container)
    tooltip = container
  }

  this.setup()
}

Tooltip.prototype.setup = function () {
  var $module = this.$module

  $module.addEventListener('mouseenter', this.show)
  $module.addEventListener('mouseleave', this.hide)

  tooltip.addEventListener('mouseleave', this.hide)
  window.addEventListener('resize', this.show)
}

Tooltip.prototype.show = function () {
  Tooltip.target = this

  if (typeof this.querySelector !== 'undefined') {
    var tip = this.querySelector('.govie-tooltip')

    if (!tip || tip === '') {
      return false
    }

    tooltip.innerHTML = tip.innerText
    if (window.innerWidth < tooltip.offsetWidth * 1.5) {
      tooltip.style.maxWidth = window.innerWidth / 2 + 'px'
    } else {
      tooltip.style.maxWidth = 320 + 'px'
    }

    var posLeft =
      Tooltip.target.offsetLeft +
      Tooltip.target.offsetWidth / 2 -
      tooltip.offsetWidth / 2
    var posTop = Tooltip.target.offsetTop - tooltip.offsetHeight - 20

    tooltip.className = 'govie-tooltip-container'

    if (this.querySelector('.govie-tooltip--left')) {
      posLeft = -(tooltip.offsetWidth)
      posTop = -6
      tooltip.className += ' govie-tooltip-container--left'
    } else if (this.querySelector('.govie-tooltip--right')) {
      posLeft = tooltip.offsetWidth - 15
      posTop = -2
      tooltip.className += ' govie-tooltip-container--right'
    } else if (this.querySelector('.govie-tooltip--bottom')) {
      posTop = Tooltip.target.offsetTop + Tooltip.target.offsetHeight
      tooltip.className += ' govie-tooltip-container--top'
    }

    tooltip.style.left = posLeft + 'px'
    tooltip.style.top = posTop + 'px'

    tooltip.className += ' govie-tooltip-container--show'
  }
}

Tooltip.prototype.hide = function () {
  tooltip.className = tooltip.className.replace(
    'govie-tooltip-container--show',
    ''
  )
}

export default Tooltip
