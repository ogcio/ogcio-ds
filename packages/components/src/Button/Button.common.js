const KEY_SPACE = 32;
const DEBOUNCE_TIMEOUT_IN_SECONDS = 1;

/**
 * JavaScript 'shim' to trigger the click event of element(s) when the space key is pressed.
 *
 * Created since some Assistive Technologies (for example some Screenreaders)
 * will tell a user to press space on a 'button', so this functionality needs to be shimmed
 * See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
 *
 * @param {KeyboardEvent} event event
 */
export function handleKeyDown(event) {
  const { target } = event;

  // if the element has a role='button' and the pressed key is a space, we'll simulate a click
  if (
    target.getAttribute('role') === 'button' &&
    (event.code === 'space' || event.keyCode === KEY_SPACE)
  ) {
    event.preventDefault();
    // trigger the target's click event
    target.click();
  }
}

/**
 * If the click quickly succeeds a previous click then nothing will happen.
 * This stops people accidentally causing multiple form submissions by
 * double clicking buttons.
 *
 * @param {Number} timer
 * @param {MouseEvent} event
 */
export function debounceClick(timer, event) {
  // If the timer is still running then we want to prevent the click from submitting the form
  if (timer) {
    event.preventDefault();
    return true;
  }

  timer = setTimeout(() => {
    timer = null;
  }, DEBOUNCE_TIMEOUT_IN_SECONDS * 1000);
}
