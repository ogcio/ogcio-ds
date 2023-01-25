(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('GOVIEFrontend.ProgressStepper', factory) :
	(global.GOVIEFrontend = global.GOVIEFrontend || {}, global.GOVIEFrontend.ProgressStepper = factory());
}(this, (function () { 'use strict';

/**
 * Progress Stepper component
 *
 * @class
 * @param {HTMLElement} $module - The element this component controls
 */
function ProgressStepper($module) {
  this.$module = $module;
}

/**
 * Initialise component
 */
ProgressStepper.prototype.init = function () {
  if (!this.$module) {
    return
  }

  this.$module.steps = this.$module.querySelectorAll(
    '.govie-progress-stepper__step'
  );

  this.addStepIcons();
  this.addStepConnectors();
};

ProgressStepper.prototype.addStepIcons = function () {
  for (var i = 0; i < this.$module.steps.length; i++) {
    var step = this.$module.steps[i];
    var stepLabel = step.querySelector('.govie-progress-stepper__step-label');
    var stepLabelText = stepLabel.querySelector(
      '.govie-progress-stepper__label-text'
    );

    stepLabel.insertBefore(createCompletedIcon(), stepLabelText);
    stepLabel.insertBefore(createActiveIcon(), stepLabelText);
    stepLabel.insertBefore(createStepIcon(step.dataset.iconText), stepLabelText);
  }
};

ProgressStepper.prototype.addStepConnectors = function () {
  // Skip for 1st step
  for (var i = 1; i < this.$module.steps.length; i++) {
    var step = this.$module.steps[i];
    step.appendChild(createStepConnector());
  }
};

function createCompletedIcon() {
  var completedTickSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  completedTickSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  completedTickSvg.setAttribute('focusable', 'false');
  completedTickSvg.setAttribute('aria-hidden', 'true');
  completedTickSvg.setAttribute('width', '40');
  completedTickSvg.setAttribute('height', '40');
  completedTickSvg.setAttribute('viewBox', '0 0 40 40');

  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'M20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0ZM16 30L6 20L8.82 17.18L16 24.34L31.18 9.16L34 12L16 30Z'
  );

  completedTickSvg.appendChild(path);

  var completedIcon = document.createElement('span');
  completedIcon.className = 'govie-progress-stepper__completed-icon';
  completedIcon.appendChild(completedTickSvg);

  return completedIcon
}

function createActiveIcon() {
  var activeIconSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  activeIconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  activeIconSvg.setAttribute('focusable', 'false');
  activeIconSvg.setAttribute('aria-hidden', 'true');
  activeIconSvg.setAttribute('width', '56');
  activeIconSvg.setAttribute('height', '56');
  activeIconSvg.setAttribute('viewBox', '0 0 56 56');

  var activeIconCircle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  activeIconCircle.classList.add('govie-progress-stepper__active-icon-circle');
  activeIconCircle.setAttribute('cx', '28');
  activeIconCircle.setAttribute('cy', '28');
  activeIconCircle.setAttribute('r', '28');
  activeIconSvg.appendChild(activeIconCircle);

  var activeIcon = document.createElement('span');
  activeIcon.className = 'govie-progress-stepper__active-icon';
  activeIcon.appendChild(activeIconSvg);

  return activeIcon
}

function createStepIcon(iconText) {
  var stepIconSvg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  stepIconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  stepIconSvg.setAttribute('focusable', 'false');
  stepIconSvg.setAttribute('aria-hidden', 'true');
  stepIconSvg.setAttribute('width', '40');
  stepIconSvg.setAttribute('height', '40');
  stepIconSvg.setAttribute('viewBox', '0 0 40 40');

  var stepIconCircle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  stepIconCircle.classList.add('govie-progress-stepper__label-icon-circle');
  stepIconCircle.setAttribute('cx', '20');
  stepIconCircle.setAttribute('cy', '20');
  stepIconCircle.setAttribute('r', '20');
  stepIconSvg.appendChild(stepIconCircle);

  var stepIconText = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );
  stepIconText.classList.add('govie-progress-stepper__label-icon-text');
  stepIconText.setAttribute('x', '20');
  stepIconText.setAttribute('y', '20');
  stepIconText.setAttribute('text-anchor', 'middle');
  stepIconText.setAttribute('dominant-baseline', 'central');
  stepIconText.textContent = iconText;
  stepIconSvg.appendChild(stepIconText);

  var stepIcon = document.createElement('span');
  stepIcon.className = 'govie-progress-stepper__label-icon';
  stepIcon.appendChild(stepIconSvg);

  return stepIcon
}

function createStepConnector() {
  var stepConnector = document.createElement('div');
  stepConnector.className = 'govie-progress-stepper__step-connector';

  var stepConnectorLine = document.createElement('span');
  stepConnectorLine.className = 'govie-progress-stepper__step-connector-line';
  stepConnector.appendChild(stepConnectorLine);

  return stepConnector
}

return ProgressStepper;

})));
