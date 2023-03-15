/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const ButtonGroupVariables = () => (
  <>
    <h3 className="govie-heading-m">Button group</h3>
    <CodeExample
      variable="$govie-button-group-button-background-colour"
      description="Button inside button group component background colour."
      code="$govie-button-group-button-background-colour: transparent;"
    />
    <CodeExample
      variable="$govie-button-group-button-hover-background-colour"
      description="Button inside button group component hover background colour."
      code="$govie-button-group-button-hover-background-colour: govie-shade(#CCE2D8, 60);"
    />
    <br />
  </>
)
