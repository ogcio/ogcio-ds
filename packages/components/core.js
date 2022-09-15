import { Button } from './Button/Button.core';

function onDocumentReady() {
  [...document.querySelectorAll('.ogcio-button')].forEach((element) => {
    new Button({ element });
  });
}

if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  // call on next available tick
  setTimeout(onDocumentReady, 0);
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}
