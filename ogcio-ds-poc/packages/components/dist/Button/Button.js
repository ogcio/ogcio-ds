import React, { useRef } from 'react';
import { func, oneOf, string } from 'prop-types';
import classNames from 'classnames';
import { transformClassNames } from '@ogcio-ds/utils';
import * as commonHandlers from './Button.common';
import s from './Button.module.scss';
let style = s;
style = transformClassNames(s);
export const Button = ({
  children,
  variant = 'secondary',
  onClick,
  onKeyDown,
  preventDoubleClick
}) => {
  const debounceTimer = useRef();

  const handleKeyDown = event => {
    commonHandlers.handleKeyDown(event);

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }
  };

  const handleClick = event => {
    let debounced = false;

    if (preventDoubleClick) {
      debounced = commonHandlers.debounceClick(debounceTimer.current, event);
    }

    if (!debounced && typeof onClick === 'function') {
      onClick(event);
    }
  };

  return /*#__PURE__*/React.createElement("button", {
    onKeyDown: handleKeyDown,
    onClick: handleClick,
    className: classNames(style.ogcioButton, {
      [style.ogcioButtonPrimary]: variant === 'primary'
    })
  }, children);
};
Button.propTypes = {
  children: string,
  variant: oneOf(['primary', 'secondary']),
  onClick: func
};