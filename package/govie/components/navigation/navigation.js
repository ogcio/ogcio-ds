(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('GOVIEFrontend.Navigation', factory) :
	(global.GOVIEFrontend = global.GOVIEFrontend || {}, global.GOVIEFrontend.Navigation = factory());
}(this, (function () { 'use strict';

	(function(undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
	var detect = (
	  // In IE8, defineProperty could only act on DOM elements, so full support
	  // for the feature requires the ability to set a property on an arbitrary object
	  'defineProperty' in Object && (function() {
	  	try {
	  		var a = {};
	  		Object.defineProperty(a, 'test', {value:42});
	  		return true;
	  	} catch(e) {
	  		return false
	  	}
	  }())
	);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always
	(function (nativeDefineProperty) {

		var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
		var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
		var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

		Object.defineProperty = function defineProperty(object, property, descriptor) {

			// Where native support exists, assume it
			if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
				return nativeDefineProperty(object, property, descriptor);
			}

			if (object === null || !(object instanceof Object || typeof object === 'object')) {
				throw new TypeError('Object.defineProperty called on non-object');
			}

			if (!(descriptor instanceof Object)) {
				throw new TypeError('Property description must be an object');
			}

			var propertyString = String(property);
			var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
			var getterType = 'get' in descriptor && typeof descriptor.get;
			var setterType = 'set' in descriptor && typeof descriptor.set;

			// handle descriptor.get
			if (getterType) {
				if (getterType !== 'function') {
					throw new TypeError('Getter must be a function');
				}
				if (!supportsAccessors) {
					throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
				}
				if (hasValueOrWritable) {
					throw new TypeError(ERR_VALUE_ACCESSORS);
				}
				Object.__defineGetter__.call(object, propertyString, descriptor.get);
			} else {
				object[propertyString] = descriptor.value;
			}

			// handle descriptor.set
			if (setterType) {
				if (setterType !== 'function') {
					throw new TypeError('Setter must be a function');
				}
				if (!supportsAccessors) {
					throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
				}
				if (hasValueOrWritable) {
					throw new TypeError(ERR_VALUE_ACCESSORS);
				}
				Object.__defineSetter__.call(object, propertyString, descriptor.set);
			}

			// OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
			if ('value' in descriptor) {
				object[propertyString] = descriptor.value;
			}

			return object;
		};
	}(Object.defineProperty));
	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	(function(undefined) {

	    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
	    var detect = (
	      'DOMTokenList' in this && (function (x) {
	        return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
	      })(document.createElement('x'))
	    );

	    if (detect) return

	    // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js
	    (function (global) {
	      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

	      if (
	          !nativeImpl ||
	          (
	            !!document.createElementNS &&
	            !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') &&
	            !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)
	          )
	        ) {
	        global.DOMTokenList = (function() { // eslint-disable-line no-unused-vars
	          var dpSupport = true;
	          var defineGetter = function (object, name, fn, configurable) {
	            if (Object.defineProperty)
	              Object.defineProperty(object, name, {
	                configurable: false === dpSupport ? true : !!configurable,
	                get: fn
	              });

	            else object.__defineGetter__(name, fn);
	          };

	          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
	          try {
	            defineGetter({}, "support");
	          }
	          catch (e) {
	            dpSupport = false;
	          }


	          var _DOMTokenList = function (el, prop) {
	            var that = this;
	            var tokens = [];
	            var tokenMap = {};
	            var length = 0;
	            var maxLength = 0;
	            var addIndexGetter = function (i) {
	              defineGetter(that, i, function () {
	                preop();
	                return tokens[i];
	              }, false);

	            };
	            var reindex = function () {

	              /** Define getter functions for array-like access to the tokenList's contents. */
	              if (length >= maxLength)
	                for (; maxLength < length; ++maxLength) {
	                  addIndexGetter(maxLength);
	                }
	            };

	            /** Helper function called at the start of each class method. Internal use only. */
	            var preop = function () {
	              var error;
	              var i;
	              var args = arguments;
	              var rSpace = /\s+/;

	              /** Validate the token/s passed to an instance method, if any. */
	              if (args.length)
	                for (i = 0; i < args.length; ++i)
	                  if (rSpace.test(args[i])) {
	                    error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
	                    error.code = 5;
	                    error.name = "InvalidCharacterError";
	                    throw error;
	                  }


	              /** Split the new value apart by whitespace*/
	              if (typeof el[prop] === "object") {
	                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
	              } else {
	                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
	              }

	              /** Avoid treating blank strings as single-item token lists */
	              if ("" === tokens[0]) tokens = [];

	              /** Repopulate the internal token lists */
	              tokenMap = {};
	              for (i = 0; i < tokens.length; ++i)
	                tokenMap[tokens[i]] = true;
	              length = tokens.length;
	              reindex();
	            };

	            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */
	            preop();

	            /** Return the number of tokens in the underlying string. Read-only. */
	            defineGetter(that, "length", function () {
	              preop();
	              return length;
	            });

	            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */
	            that.toLocaleString =
	              that.toString = function () {
	                preop();
	                return tokens.join(" ");
	              };

	            that.item = function (idx) {
	              preop();
	              return tokens[idx];
	            };

	            that.contains = function (token) {
	              preop();
	              return !!tokenMap[token];
	            };

	            that.add = function () {
	              preop.apply(that, args = arguments);

	              for (var args, token, i = 0, l = args.length; i < l; ++i) {
	                token = args[i];
	                if (!tokenMap[token]) {
	                  tokens.push(token);
	                  tokenMap[token] = true;
	                }
	              }

	              /** Update the targeted attribute of the attached element if the token list's changed. */
	              if (length !== tokens.length) {
	                length = tokens.length >>> 0;
	                if (typeof el[prop] === "object") {
	                  el[prop].baseVal = tokens.join(" ");
	                } else {
	                  el[prop] = tokens.join(" ");
	                }
	                reindex();
	              }
	            };

	            that.remove = function () {
	              preop.apply(that, args = arguments);

	              /** Build a hash of token names to compare against when recollecting our token list. */
	              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
	                ignore[args[i]] = true;
	                delete tokenMap[args[i]];
	              }

	              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */
	              for (i = 0; i < tokens.length; ++i)
	                if (!ignore[tokens[i]]) t.push(tokens[i]);

	              tokens = t;
	              length = t.length >>> 0;

	              /** Update the targeted attribute of the attached element. */
	              if (typeof el[prop] === "object") {
	                el[prop].baseVal = tokens.join(" ");
	              } else {
	                el[prop] = tokens.join(" ");
	              }
	              reindex();
	            };

	            that.toggle = function (token, force) {
	              preop.apply(that, [token]);

	              /** Token state's being forced. */
	              if (undefined !== force) {
	                if (force) {
	                  that.add(token);
	                  return true;
	                } else {
	                  that.remove(token);
	                  return false;
	                }
	              }

	              /** Token already exists in tokenList. Remove it, and return FALSE. */
	              if (tokenMap[token]) {
	                that.remove(token);
	                return false;
	              }

	              /** Otherwise, add the token and return TRUE. */
	              that.add(token);
	              return true;
	            };

	            return that;
	          };

	          return _DOMTokenList;
	        }());
	      }

	      // Add second argument to native DOMTokenList.toggle() if necessary
	      (function () {
	        var e = document.createElement('span');
	        if (!('classList' in e)) return;
	        e.classList.toggle('x', false);
	        if (!e.classList.contains('x')) return;
	        e.classList.constructor.prototype.toggle = function toggle(token /*, force*/) {
	          var force = arguments[1];
	          if (force === undefined) {
	            var add = !this.contains(token);
	            this[add ? 'add' : 'remove'](token);
	            return add;
	          }
	          force = !!force;
	          this[force ? 'add' : 'remove'](token);
	          return force;
	        };
	      }());

	      // Add multiple arguments to native DOMTokenList.add() if necessary
	      (function () {
	        var e = document.createElement('span');
	        if (!('classList' in e)) return;
	        e.classList.add('a', 'b');
	        if (e.classList.contains('b')) return;
	        var native = e.classList.constructor.prototype.add;
	        e.classList.constructor.prototype.add = function () {
	          var args = arguments;
	          var l = arguments.length;
	          for (var i = 0; i < l; i++) {
	            native.call(this, args[i]);
	          }
	        };
	      }());

	      // Add multiple arguments to native DOMTokenList.remove() if necessary
	      (function () {
	        var e = document.createElement('span');
	        if (!('classList' in e)) return;
	        e.classList.add('a');
	        e.classList.add('b');
	        e.classList.remove('a', 'b');
	        if (!e.classList.contains('b')) return;
	        var native = e.classList.constructor.prototype.remove;
	        e.classList.constructor.prototype.remove = function () {
	          var args = arguments;
	          var l = arguments.length;
	          for (var i = 0; i < l; i++) {
	            native.call(this, args[i]);
	          }
	        };
	      }());

	    }(this));

	}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	(function(undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
	var detect = ("Document" in this);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always
	if ((typeof WorkerGlobalScope === "undefined") && (typeof importScripts !== "function")) {

		if (this.HTMLDocument) { // IE8

			// HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
			this.Document = this.HTMLDocument;

		} else {

			// Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
			this.Document = this.HTMLDocument = document.constructor = (new Function('return function Document() {}')());
			this.Document.prototype = document;
		}
	}


	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	(function(undefined) {

	// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
	var detect = ('Element' in this && 'HTMLElement' in this);

	if (detect) return

	// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always
	(function () {

		// IE8
		if (window.Element && !window.HTMLElement) {
			window.HTMLElement = window.Element;
			return;
		}

		// create Element constructor
		window.Element = window.HTMLElement = new Function('return function Element() {}')();

		// generate sandboxed iframe
		var vbody = document.appendChild(document.createElement('body'));
		var frame = vbody.appendChild(document.createElement('iframe'));

		// use sandboxed iframe to replicate Element functionality
		var frameDocument = frame.contentWindow.document;
		var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
		var cache = {};

		// polyfill Element.prototype on an element
		var shiv = function (element, deep) {
			var
			childNodes = element.childNodes || [],
			index = -1,
			key, value, childNode;

			if (element.nodeType === 1 && element.constructor !== Element) {
				element.constructor = Element;

				for (key in cache) {
					value = cache[key];
					element[key] = value;
				}
			}

			while (childNode = deep && childNodes[++index]) {
				shiv(childNode, deep);
			}

			return element;
		};

		var elements = document.getElementsByTagName('*');
		var nativeCreateElement = document.createElement;
		var interval;
		var loopLimit = 100;

		prototype.attachEvent('onpropertychange', function (event) {
			var
			propertyName = event.propertyName,
			nonValue = !cache.hasOwnProperty(propertyName),
			newValue = prototype[propertyName],
			oldValue = cache[propertyName],
			index = -1,
			element;

			while (element = elements[++index]) {
				if (element.nodeType === 1) {
					if (nonValue || element[propertyName] === oldValue) {
						element[propertyName] = newValue;
					}
				}
			}

			cache[propertyName] = newValue;
		});

		prototype.constructor = Element;

		if (!prototype.hasAttribute) {
			// <Element>.hasAttribute
			prototype.hasAttribute = function hasAttribute(name) {
				return this.getAttribute(name) !== null;
			};
		}

		// Apply Element prototype to the pre-existing DOM as soon as the body element appears.
		function bodyCheck() {
			if (!(loopLimit--)) clearTimeout(interval);
			if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
				shiv(document, true);
				if (interval && document.body.prototype) clearTimeout(interval);
				return (!!document.body.prototype);
			}
			return false;
		}
		if (!bodyCheck()) {
			document.onreadystatechange = bodyCheck;
			interval = setInterval(bodyCheck, 25);
		}

		// Apply to any new elements created after load
		document.createElement = function createElement(nodeName) {
			var element = nativeCreateElement(String(nodeName).toLowerCase());
			return shiv(element);
		};

		// remove sandboxed iframe
		document.removeChild(vbody);
	}());

	})
	.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

	(function(undefined) {

	    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
	    var detect = (
	      'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && (function () {
	        var e = document.createElement('span');
	        e.classList.add('a', 'b');
	        return e.classList.contains('b');
	      }())
	    );

	    if (detect) return

	    // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always
	    (function (global) {
	      var dpSupport = true;
	      var defineGetter = function (object, name, fn, configurable) {
	        if (Object.defineProperty)
	          Object.defineProperty(object, name, {
	            configurable: false === dpSupport ? true : !!configurable,
	            get: fn
	          });

	        else object.__defineGetter__(name, fn);
	      };
	      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */
	      try {
	        defineGetter({}, "support");
	      }
	      catch (e) {
	        dpSupport = false;
	      }
	      /** Polyfills a property with a DOMTokenList */
	      var addProp = function (o, name, attr) {

	        defineGetter(o.prototype, name, function () {
	          var tokenList;

	          var THIS = this,

	          /** Prevent this from firing twice for some reason. What the hell, IE. */
	          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
	          if(THIS[gibberishProperty]) return tokenList;
	          THIS[gibberishProperty] = true;

	          /**
	           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
	           *
	           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
	           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
	           * element instead, this would conflict with element types which use indexed properties (such as forms and
	           * select lists).
	           */
	          if (false === dpSupport) {

	            var visage;
	            var mirror = addProp.mirror || document.createElement("div");
	            var reflections = mirror.childNodes;
	            var l = reflections.length;

	            for (var i = 0; i < l; ++i)
	              if (reflections[i]._R === THIS) {
	                visage = reflections[i];
	                break;
	              }

	            /** Couldn't find an element's reflection inside the mirror. Materialise one. */
	            visage || (visage = mirror.appendChild(document.createElement("div")));

	            tokenList = DOMTokenList.call(visage, THIS, attr);
	          } else tokenList = new DOMTokenList(THIS, attr);

	          defineGetter(THIS, name, function () {
	            return tokenList;
	          });
	          delete THIS[gibberishProperty];

	          return tokenList;
	        }, true);
	      };

	      addProp(global.Element, "classList", "className");
	      addProp(global.HTMLElement, "classList", "className");
	      addProp(global.HTMLLinkElement, "relList", "rel");
	      addProp(global.HTMLAnchorElement, "relList", "rel");
	      addProp(global.HTMLAreaElement, "relList", "rel");
	    }(this));

	}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

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

	// Based on https://github.com/alphagov/govuk_publishing_components/blob/v29.11.0/app/assets/javascripts/govuk_publishing_components/components/step-by-step-nav.js

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
	    this.mql = window.matchMedia('(min-width: 49.0625em)');

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
