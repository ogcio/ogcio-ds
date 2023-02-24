(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('govie-frontend/govie/vendor/polyfills/Element/prototype/classList')) :
  typeof define === 'function' && define.amd ? define('GOVIEFrontend.Navigation', ['govie-frontend/govie/vendor/polyfills/Element/prototype/classList'], factory) :
  (global.GOVIEFrontend = global.GOVIEFrontend || {}, global.GOVIEFrontend.Navigation = factory());
}(this, (function () { 'use strict';

  /**
   * Common helpers which do not require polyfill.
   *
   * IMPORTANT: If a helper require a polyfill, please isolate it in its own module
   * so that the polyfill can be properly tree-shaken and does not burden
   * the components that do not need that helper
   *
   * @module common/index
   */

  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   *
   * @template {Node} ElementType
   * @param {NodeListOf<ElementType>} nodes - NodeList from querySelectorAll()
   * @param {nodeListIterator<ElementType>} callback - Callback function to run for each node
   * @returns {void}
   */
  function nodeListForEach(nodes, callback) {
    if (window.NodeList.prototype.forEach) {
      return nodes.forEach(callback)
    }
    for (var i = 0; i < nodes.length; i++) {
      callback.call(window, nodes[i], i, nodes);
    }
  }

  /**
   * @template {Node} ElementType
   * @callback nodeListIterator
   * @param {ElementType} value - The current node being iterated on
   * @param {number} index - The current index in the iteration
   * @param {NodeListOf<ElementType>} nodes - NodeList from querySelectorAll()
   * @returns {void}
   */

  // Implementation of common function is gathered in the `common` folder

  var navActiveClass = 'govie-navigation--active';
  var navMenuButtonActiveClass = 'govie-header__menu-button--open';
  var subNavActiveClass = 'govie-navigation__subnav--active';
  // This one has the query dot at the beginning because it's only ever used in querySelector calls
  var subNavJSClass = '.js-govie-navigation__subnav';

  function Navigation ($module) {
    this.$module = $module || document;

    this.$nav = this.$module.querySelector('.js-govie-navigation');
    this.$navToggler = this.$module.querySelector('.js-govie-navigation__toggler');
    this.$navButtons = this.$module.querySelectorAll('.js-govie-navigation__button');
    this.$navLinks = this.$module.querySelectorAll('.js-govie-navigation__link');

    // Save the opened/closed state for the nav in memory so that we can accurately maintain state when the screen is changed from small to big and back to small
    this.mobileNavOpen = false;

    // A global const for storing a matchMedia instance which we'll use to detect when a screen size change happens
    // We set this later during the init function and rely on it being null if the feature isn't available to initially apply hidden attributes
    this.mql = null;
  }

  // Checks if the saved window size has changed between now and when it was last recorded (on load and on viewport width changes)
  // Reapplies hidden attributes based on if the viewport has changed from big to small or vice verca
  // Saves the new window size

  Navigation.prototype.setHiddenStates = function () {
    if (this.mql === null || !this.mql.matches) {
      if (!this.mobileNavOpen) {
        this.$nav.setAttribute('hidden', '');
      }

      nodeListForEach(this.$navLinks, function ($navLink, index) {
        $navLink.setAttribute('hidden', '');
      });

      nodeListForEach(this.$navButtons, function ($navButton, index) {
        $navButton.removeAttribute('hidden');
      });

      this.$navToggler.removeAttribute('hidden');
    } else if (this.mql === null || this.mql.matches) {
      this.$nav.removeAttribute('hidden');

      nodeListForEach(this.$navLinks, function ($navLink, index) {
        $navLink.removeAttribute('hidden');
      });

      nodeListForEach(this.$navButtons, function ($navButton, index) {
        $navButton.setAttribute('hidden', '');
      });

      this.$navToggler.setAttribute('hidden', '');
    }
  };

  Navigation.prototype.setInitialAriaStates = function () {
    this.$navToggler.setAttribute('aria-expanded', 'false');

    nodeListForEach(this.$navButtons, function ($button, index) {
      var $nextSubNav = $button.parentNode.querySelector(subNavJSClass);

      if ($nextSubNav) {
        var subNavTogglerId = 'js-mobile-nav-subnav-toggler-' + index;
        var nextSubNavId = 'js-mobile-nav__subnav-' + index;

        $nextSubNav.setAttribute('id', nextSubNavId);
        $button.setAttribute('id', subNavTogglerId);
        $button.setAttribute('aria-expanded', $nextSubNav.hasAttribute('hidden') ? 'false' : 'true');
        $button.setAttribute('aria-controls', nextSubNavId);
      }
    });
  };

  Navigation.prototype.bindUIEvents = function () {
    var $nav = this.$nav;
    var $navToggler = this.$navToggler;
    var $navButtons = this.$navButtons;

    $navToggler.addEventListener('click', function (event) {
      if (this.mobileNavOpen) {
        $nav.classList.remove(navActiveClass);
        $navToggler.classList.remove(navMenuButtonActiveClass);
        $nav.setAttribute('hidden', '');

        $navToggler.setAttribute('aria-expanded', 'false');

        this.mobileNavOpen = false;
      } else {
        $nav.classList.add(navActiveClass);
        $navToggler.classList.add(navMenuButtonActiveClass);
        $nav.removeAttribute('hidden');

        $navToggler.setAttribute('aria-expanded', 'true');

        this.mobileNavOpen = true;
      }
    }.bind(this));

    nodeListForEach($navButtons, function ($button, index) {
      $button.addEventListener('click', function (event) {
        var $nextSubNav = $button.parentNode.querySelector(subNavJSClass);

        if ($nextSubNav) {
          if ($nextSubNav.hasAttribute('hidden')) {
            $nextSubNav.classList.add(subNavActiveClass);

            $nextSubNav.removeAttribute('hidden');
            $button.setAttribute('aria-expanded', 'true');
          } else {
            $nextSubNav.classList.remove(subNavActiveClass);

            $nextSubNav.setAttribute('hidden', '');
            $button.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  };

  Navigation.prototype.init = function () {
    // Since the Mobile navigation is not included in IE8
    // We detect features we need to use only available in IE9+ https://caniuse.com/#feat=addeventlistener
    // http://responsivenews.co.uk/post/18948466399/cutting-the-mustard
    var featuresNeeded = (
      'querySelector' in document &&
      'addEventListener' in window
    );

    if (!featuresNeeded) {
      return
    }

    if (typeof window.matchMedia === 'function') {
      this.mql = window.matchMedia('(min-width: 40.0625em)');

      // IE and Safari < 14 do not support MediaQueryList.addEventListener
      if ('addEventListener' in this.mql) {
        this.mql.addEventListener('change', this.setHiddenStates.bind(this));
      } else {
        this.mql.addListener(this.setHiddenStates.bind(this));
      }
    }

    this.setHiddenStates();
    this.setInitialAriaStates();
    this.bindUIEvents();
  };

  return Navigation;

})));
