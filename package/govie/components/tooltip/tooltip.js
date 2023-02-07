(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('GOVIEFrontend.Tooltip', factory) :
	(global.GOVIEFrontend = global.GOVIEFrontend || {}, global.GOVIEFrontend.Tooltip = factory());
}(this, (function () { 'use strict';

var tooltip;
/**
 * Tooltip component
 *
 * @class
 * @param {HTMLElement} $module - The element this component controls
 */
function Tooltip($module) {
  this.$module = $module;
}

/**
 * Initialise component
 */
Tooltip.prototype.init = function () {
  tooltip = document.querySelector('.govie-tooltip-container');

  if (!tooltip) {
    var container = document.createElement('div');
    container.className = 'govie-tooltip-container';

    document.body.appendChild(container);
    tooltip = container;
  }

  this.setup();
};

Tooltip.prototype.setup = function () {
  var $module = this.$module;

  $module.addEventListener('mouseenter', this.show);
  $module.addEventListener('mouseleave', this.hide);

  tooltip.addEventListener('mouseleave', this.hide);
  window.addEventListener('resize', this.show);
};

Tooltip.prototype.show = function () {
  Tooltip.target = this;

  if (typeof this.querySelector !== 'undefined') {
    var tip = this.querySelector('.govie-tooltip');

    if (!tip || tip === '') {
      return false
    }

    tooltip.innerHTML = tip.innerText;
    if (window.innerWidth < tooltip.offsetWidth * 1.5) {
      tooltip.style.maxWidth = window.innerWidth / 2 + 'px';
    } else {
      tooltip.style.maxWidth = 320 + 'px';
    }

    var target = Tooltip.target.getBoundingClientRect();
    var scroll = document.documentElement.scrollTop;
    var posLeft =
      target.left + Tooltip.target.offsetWidth / 2 - tooltip.offsetWidth / 2;

    var posTop = target.y + scroll - tooltip.offsetHeight - 10;

    tooltip.className = 'govie-tooltip-container';

    if (this.querySelector('.govie-tooltip--left')) {
      posLeft = target.left - tooltip.offsetWidth - 10;
      posTop =
        target.y +
        scroll -
        tooltip.offsetHeight +
        tooltip.offsetHeight / 2 +
        Tooltip.target.offsetHeight / 2;
      tooltip.className += ' govie-tooltip-container--left';
    } else if (this.querySelector('.govie-tooltip--right')) {
      posLeft = Tooltip.target.offsetWidth + target.left + 10;
      posTop =
      target.y +
      scroll -
        tooltip.offsetHeight +
        tooltip.offsetHeight / 2 +
        Tooltip.target.offsetHeight / 2;
      tooltip.className += ' govie-tooltip-container--right';
    } else if (this.querySelector('.govie-tooltip--bottom')) {
      posTop = target.y + scroll + Tooltip.target.offsetHeight + 2;
      tooltip.className += ' govie-tooltip-container--top';
    }

    tooltip.style.left = posLeft + 'px';
    tooltip.style.top = posTop + 'px';

    tooltip.className += ' govie-tooltip-container--show';
  }
};

Tooltip.prototype.hide = function () {
  tooltip.className = tooltip.className.replace(
    'govie-tooltip-container--show',
    ''
  );
};

return Tooltip;

})));
