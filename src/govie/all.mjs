import { nodeListForEach } from './common.mjs';
import Accordion from './components/accordion/accordion.mjs';
import Button from './components/button/button.mjs';
import CharacterCount from './components/character-count/character-count.mjs';
import Checkboxes from './components/checkboxes/checkboxes.mjs';
import Details from './components/details/details.mjs';
import ErrorSummary from './components/error-summary/error-summary.mjs';
import Header from './components/header/header.mjs';
import Navigation from './components/navigation/navigation.mjs';
import NotificationBanner from './components/notification-banner/notification-banner.mjs';
import ProgressStepper from './components/progress-stepper/progress-stepper.mjs';
import Radios from './components/radios/radios.mjs';
import SkipLink from './components/skip-link/skip-link.mjs';
import StepByStepNav from './components/step-by-step-navigation/step-by-step-navigation.mjs';
import Superheader from './components/superheader/superheader.mjs';
import Tabs from './components/tabs/tabs.mjs';
import Tick from './components/tick/tick.mjs';
import Tooltip from './components/tooltip/tooltip.mjs';

/**
 * Initialise all components
 *
 * Use the `data-module` attributes to find, instantiate and init all of the
 * components provided as part of Gov IE Frontend.
 *
 * @param {object} [config] - Config
 * @param {HTMLElement} [config.scope=document] - Scope to query for components
 * @param {object} [config.accordion] - Accordion config
 * @param {object} [config.button] - Button config
 * @param {object} [config.characterCount] - Character Count config
 * @param {object} [config.errorSummary] - Error Summary config
 * @param {object} [config.notificationBanner] - Notification Banner config
 */
function initAll(config) {
  config = typeof config !== 'undefined' ? config : {};

  // Allow the user to initialise Gov IE Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var $scope = typeof config.scope !== 'undefined' ? config.scope : document;

  var $accordions = $scope.querySelectorAll('[data-module="govie-accordion"]');
  nodeListForEach($accordions, function ($accordion) {
    new Accordion($accordion, config.accordion).init();
  });

  var $buttons = $scope.querySelectorAll('[data-module="govie-button"]');
  nodeListForEach($buttons, function ($button) {
    new Button($button, config.button).init();
  });

  var $iconButtons = $scope.querySelectorAll(
    '[data-module="govie-icon-button"]',
  );
  nodeListForEach($iconButtons, function ($button) {
    new Button($button, config.button).init();
  });

  var $characterCounts = $scope.querySelectorAll(
    '[data-module="govie-character-count"]',
  );
  nodeListForEach($characterCounts, function ($characterCount) {
    new CharacterCount($characterCount, config.characterCount).init();
  });

  var $checkboxes = $scope.querySelectorAll('[data-module="govie-checkboxes"]');
  nodeListForEach($checkboxes, function ($checkbox) {
    new Checkboxes($checkbox).init();
  });

  var $details = $scope.querySelectorAll('[data-module="govie-details"]');
  nodeListForEach($details, function ($detail) {
    new Details($detail).init();
  });

  // Find first error summary module to enhance.
  var $errorSummary = $scope.querySelector(
    '[data-module="govie-error-summary"]',
  );
  if ($errorSummary) {
    new ErrorSummary($errorSummary, config.errorSummary).init();
  }

  // Find first header module to enhance.
  var $header = $scope.querySelector('[data-module="govie-header"]');
  if ($header) {
    new Header($header).init();
  }

  // Find first header module to enhance.
  var $superheader = $scope.querySelector('[data-module="govie-superheader"]');
  if ($superheader) {
    new Superheader($superheader).init();
  }

  var $notificationBanners = $scope.querySelectorAll(
    '[data-module="govie-notification-banner"]',
  );
  nodeListForEach($notificationBanners, function ($notificationBanner) {
    new NotificationBanner(
      $notificationBanner,
      config.notificationBanner,
    ).init();
  });

  var $radios = $scope.querySelectorAll('[data-module="govie-radios"]');
  nodeListForEach($radios, function ($radio) {
    new Radios($radio).init();
  });

  // Find first skip link module to enhance.
  var $skipLink = $scope.querySelector('[data-module="govie-skip-link"]');
  new SkipLink($skipLink).init();

  var $tabs = $scope.querySelectorAll('[data-module="govie-tabs"]');
  nodeListForEach($tabs, function ($tabs) {
    new Tabs($tabs).init();
  });

  var $stepByStepNav = $scope.querySelector('#govie-step-by-step-navigation');
  new StepByStepNav($stepByStepNav).init();

  var $progressSteppers = $scope.querySelectorAll(
    '[data-module="govie-progress-stepper"]',
  );
  nodeListForEach($progressSteppers, function ($progressStepper) {
    new ProgressStepper($progressStepper).init();
  });

  var $ticks = $scope.querySelectorAll('[data-module="govie-tick"]');
  nodeListForEach($ticks, function ($tick) {
    new Tick($tick).init();
  });

  var $tooltips = $scope.querySelectorAll('[data-module="govie-tooltip"]');
  nodeListForEach($tooltips, function ($tooltip) {
    new Tooltip($tooltip).init();
  });

  new Navigation().init();
}

export {
  initAll,
  Accordion,
  Button,
  CharacterCount,
  Checkboxes,
  Details,
  ErrorSummary,
  Header,
  Navigation,
  NotificationBanner,
  ProgressStepper,
  Radios,
  SkipLink,
  StepByStepNav,
  Superheader,
  Tabs,
  Tick,
  Tooltip,
};

/**
 * Config for all components
 *
 * @typedef {object} Config
 * @property {Element} [scope=document] - Scope to query for components
 * @property {import('./components/accordion/accordion.mjs').AccordionConfig} [accordion] - Accordion config
 * @property {import('./components/button/button.mjs').ButtonConfig} [button] - Button config
 * @property {import('./components/character-count/character-count.mjs').CharacterCountConfig} [characterCount] - Character Count config
 * @property {import('./components/error-summary/error-summary.mjs').ErrorSummaryConfig} [errorSummary] - Error Summary config
 * @property {import('./components/notification-banner/notification-banner.mjs').NotificationBannerConfig} [notificationBanner] - Notification Banner config
 */
