/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const ButtonVariables = () => (
  <>
    <h3 className="govie-heading-m">Button</h3>
    <CodeExample
      variable="$govie-button-background-colour"
      description="Button component background colour."
      code="$govie-button-background-colour: govie-colour('green');"
    />
    <CodeExample
      variable="$govie-button-text-colour"
      description="Button component text colour."
      code="$govie-button-text-colour: govie-colour('white');"
    />
    <br />
  </>
)
