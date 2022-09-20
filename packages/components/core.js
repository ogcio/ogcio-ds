import { Button } from './src/Button/Button.core';

function isInitialized(element) {
  return element.dataset.ogcioState;
}

function markInitialized(element) {
  element.dataset.ogcioState = 'initialized';
}

function initComponent(selector, Component) {
  [...document.querySelectorAll(selector)].forEach((element) => {
    if (!isInitialized(element)) {
      new Component({ element });

      markInitialized(element);
    }
  });
}

function initButtons() {
  return initComponent('.ogcio-button', Button);
}

function onDocumentReady() {
  initButtons();
}

if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  // call on next tick
  setTimeout(onDocumentReady, 0);
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

if (typeof window !== 'undefined') {
  window.OGCIO = window.OGCIO || {
    Button,
    initButtons,
  };
}
