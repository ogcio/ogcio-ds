/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const IconButtonVariables = () => (
  <>
    <h3 className="govie-heading-m">Icon Button</h3>
    <CodeExample
      variable="$govie-icon-button-text-colour"
      description="Icon button component text colour."
      code="$govie-icon-button-text-colour: govie-black('black');"
    />
    <CodeExample
      variable="$govie-icon-button-background-colour"
      description="Icon button component background colour."
      code="$govie-icon-button-background-colour: transparent;"
    />
    <CodeExample
      variable="$govie-icon-button-hover-background-colour"
      description="Icon component hover background colour."
      code="$govie-icon-button-hover-background-colour: govie-colour('light-grey');"
    />
  </>
)
