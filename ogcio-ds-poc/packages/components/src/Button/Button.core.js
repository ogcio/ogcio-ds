import { debounceClick, handleKeyDown } from './Button.common';

export class Button {
  constructor({ element }) {
    if (element.dataset['data-prevent-double-click']) {
      this.debounceTimer = null;

      element.addEventListener(
        'click',
        debounceClick.bind(this, this.debounceTimer)
      );
    }

    element.addEventListener('keydown', handleKeyDown);
  }
}
