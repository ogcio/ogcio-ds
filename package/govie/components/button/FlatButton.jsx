import react from 'react'
import { string, oneOf, bool, arrayOf } from 'prop-types'

import PrimaryButton from './PrimaryButton'

const FlatButton = (props) => {
  const { classNames, children } = props

  return (
    <PrimaryButton
      {...props}
      classNames={['govie-button--flat', ...classNames]}
    >
      {children}
    </PrimaryButton>
  )
}

FlatButton.propTypes = {
  size: oneOf(['standard', 'small', 'medium']),
  icon: oneOf(['standard', 'left', 'right']),
  children: string,
  disabled: bool,
  preventDoubleClick: bool,
  classNames: arrayOf(string)
}

FlatButton.defaultProps = {
  classNames: [],
  disabled: false
}

export default FlatButton
