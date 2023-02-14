import '../../vendor/polyfills/Event.mjs' // addEventListener and event.target normalization
import '../../vendor/polyfills/Function/prototype/bind.mjs'

import React, { useRef } from 'react'
import { string, oneOf, bool, arrayOf } from 'prop-types'

import * as commonHandlers from './button.common'

const leftIconSvg = (
  <svg
    className="govie-button__icon-left"
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 8.5H8V14.5H6V8.5H0V6.5H6V0.5H8V6.5H14V8.5Z" fill="white" />
  </svg>
)

const rightIconSvg = (
  <svg
    className="govie-button__icon-right"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0.5L6.59 1.91L12.17 7.5H0V9.5H12.17L6.59 15.09L8 16.5L16 8.5L8 0.5Z"
      fill="white"
    />
  </svg>
)

const renderLabel = (icon, children) => {
  if (!icon || icon === 'standard') {
    return children
  }

  if (icon === 'right') {
    return (
      <>
        {children}
        {rightIconSvg}
      </>
    )
  }

  if (icon === 'left') {
    return (
      <>
        {leftIconSvg}
        {children}
      </>
    )
  }
}

const PrimaryButton = ({
  size,
  icon,
  children,
  disabled,
  preventDoubleClick,
  classNames
}) => {
  const debounceTimer = useRef()

  const handleKeyDown = (event) => {
    commonHandlers.handleKeyDown(event)

    if (typeof onKeyDown === 'function') {
      onKeyDown(event)
    }
  }

  const handleClick = (event) => {
    let debounced = false

    if (preventDoubleClick) {
      debounced = commonHandlers.debounce(event)
    }

    if (!debounced && typeof onClick === 'function') {
      onClick(event)
    }
  }

  const allClassNames = ['govie-button', ...classNames]

  const attributes = {
    'data-module': 'govie-button'
  }

  if (disabled) {
    allClassNames.push('govie-button--disabled')

    attributes['aria-disabled'] = true
    attributes.disabled = disabled
  }

  if (size === 'small') {
    allClassNames.push('govie-button--small')
  }

  if (size === 'medium') {
    allClassNames.push('govie-button--medium')
  }

  return (
    <button
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      data-module="govie-button"
      className={allClassNames.join(' ')}
      {...attributes}
    >
      {renderLabel(icon, children)}
    </button>
  )
}

PrimaryButton.propTypes = {
  size: oneOf(['standard', 'small', 'medium']),
  icon: oneOf(['standard', 'left', 'right']),
  children: string,
  disabled: bool,
  preventDoubleClick: bool,
  classNames: arrayOf(string)
}

PrimaryButton.defaultProps = {
  classNames: [],
  disabled: false
}

export default PrimaryButton
