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
  tooltip = document.querySelector('.govie-tooltip--container')

  if (!tooltip) {
    var container = document.createElement('div')
    container.className = 'govie-tooltip--container'

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

    tooltip.className = 'govie-tooltip--container'

    if (posLeft < 0) {
      posLeft = Tooltip.target.offsetLeft + Tooltip.target.offsetWidth / 2 - 20
      tooltip.className += ' left'
    }

    if (posLeft + tooltip.offsetWidth > window.innerWidth) {
      posLeft =
        Tooltip.target.offsetLeft -
        tooltip.offsetWidth +
        Tooltip.target.offsetWidth / 2 +
        20
      tooltip.className += ' right'
    }

    if (posTop < 0) {
      posTop = Tooltip.target.offsetTop + Tooltip.target.offsetHeight
      tooltip.className += ' top'
    }

    tooltip.style.left = posLeft + 'px'
    tooltip.style.top = posTop + 'px'

    tooltip.className += ' show'
  }
}

Tooltip.prototype.hide = function () {
  tooltip.className = tooltip.className.replace('show', '')
}

export default Tooltip
