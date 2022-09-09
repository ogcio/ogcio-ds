import React from 'react';
import { func, oneOf, string } from 'prop-types';
import style from './Button.module.scss';
import classNames from 'classnames';

export const Button = ({ children, variant = 'secondary', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(style.ogcioButton, {
        [style.ogcioButtonPrimary]: variant === 'primary',
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: string,
  variant: oneOf(['primary', 'secondary']),
  onClick: func,
};
