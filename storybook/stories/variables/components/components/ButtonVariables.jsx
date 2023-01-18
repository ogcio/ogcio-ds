/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const ButtonVariables = () => (
  <>
    <h3 className="govie-heading-m">Button</h3>
    <CodeExample
      variable="$govie-primary-button-background-colour"
      description="Primary button component background colour."
      code="$govie-primary-button-background-colour: #004d44;"
    />
    <CodeExample
      variable="$govie-primary-button-hover-background-colour"
      description="Primary button component hover background colour."
      code="$govie-primary-button-hover-background-colour: #002e28;"
    />
    <CodeExample
      variable="$govie-button-text-colour"
      description="Button component text colour."
      code="$govie-button-text-colour: govie-colour('white');"
    />
    <br />
  </>
)
