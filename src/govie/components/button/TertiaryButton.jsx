import react from 'react'
import { string, oneOf, bool, arrayOf } from 'prop-types'

import PrimaryButton from './PrimaryButton'

const TertiaryButton = (props) => {
  const { classNames, children } = props

  return (
    <PrimaryButton
      {...props}
      classNames={['govie-button--tertiary', ...classNames]}
    >
      {children}
    </PrimaryButton>
  )
}

TertiaryButton.propTypes = {
  size: oneOf(['standard', 'small', 'medium']),
  icon: oneOf(['standard', 'left', 'right']),
  children: string,
  disabled: bool,
  preventDoubleClick: bool,
  classNames: arrayOf(string)
}

TertiaryButton.defaultProps = {
  classNames: [],
  disabled: false
}

export default TertiaryButton
