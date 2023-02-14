import react from 'react'
import { string, oneOf, bool, arrayOf } from 'prop-types'

import PrimaryButton from './PrimaryButton'

const SecondaryButton = (props) => {
  const { classNames, children } = props

  return (
    <PrimaryButton
      {...props}
      classNames={['govie-button--secondary', ...classNames]}
    >
      {children}
    </PrimaryButton>
  )
}

SecondaryButton.propTypes = {
  size: oneOf(['standard', 'small', 'medium']),
  icon: oneOf(['standard', 'left', 'right']),
  children: string,
  disabled: bool,
  preventDoubleClick: bool,
  classNames: arrayOf(string)
}

SecondaryButton.defaultProps = {
  classNames: [],
  disabled: false
}

export default SecondaryButton
