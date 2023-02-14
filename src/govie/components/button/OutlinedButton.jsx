import react from 'react'
import { string, oneOf, bool, arrayOf } from 'prop-types'

import PrimaryButton from './PrimaryButton'

const OutlinedButton = (props) => {
  const { classNames, children } = props

  return (
    <PrimaryButton
      {...props}
      classNames={['govie-button--outlined', ...classNames]}
    >
      {children}
    </PrimaryButton>
  )
}

OutlinedButton.propTypes = {
  size: oneOf(['standard', 'small', 'medium']),
  icon: oneOf(['standard', 'left', 'right']),
  children: string,
  disabled: bool,
  preventDoubleClick: bool,
  classNames: arrayOf(string)
}

OutlinedButton.defaultProps = {
  classNames: [],
  disabled: false
}

export default OutlinedButton
