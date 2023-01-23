/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const ButtonVariables = () => (
  <>
    <h3 className="govie-heading-m">Primary button</h3>
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
      variable="$govie-primary-button-text-colour"
      description="Primary button component text colour."
      code="$govie-primary-button-text-colour: govie-colour('white');"
    />

    <br />
    <h3 className="govie-heading-m">Secondary button</h3>
    <CodeExample
      variable="$govie-secondary-button-background-colour"
      description="Secondary button component background colour."
      code="$govie-secondary-button-background-colour: transparent;"
    />
    <CodeExample
      variable="$govie-secondary-button-hover-background-colour"
      description="Secondary button component hover background colour."
      code="$govie-secondary-button-hover-background-colour: govie-colour('light-grey');"
    />
    <CodeExample
      variable="$govie-secondary-button-text-colour"
      description="Secondary button component text colour."
      code="$govie-secondary-button-text-colour: govie-colour('black');"
    />

    <br />
    <h3 className="govie-heading-m">Tertiary button</h3>
    <CodeExample
      variable="$govie-tertiary-button-background-colour"
      description="Tertiary button component background colour."
      code="$govie-tertiary-button-background-colour: transparent;"
    />
    <CodeExample
      variable="$govie-tertiary-button-hover-background-colour"
      description="Tertiary button component hover background colour."
      code="$govie-tertiary-button-hover-background-colour: govie-colour('light-grey');"
    />
    <CodeExample
      variable="$govie-tertiary-button-text-colour"
      description="Tertiary button component text colour."
      code="$govie-tertiary-button-text-colour: govie-colour('black');"
    />

    <br />
    <h3 className="govie-heading-m">Outlined and flat button</h3>
    <CodeExample
      variable="$govie-button-background-colour"
      description="Flat and outline button component background colour."
      code="$govie-button-background-colour: transparent;"
    />
    <CodeExample
      variable="$govie-button-hover-background-colour"
      description="Flat and outline button component hover background colour."
      code="$govie-button-hover-background-colour: govie-colour('light-grey');"
    />
    <CodeExample
      variable="$govie-button-text-colour"
      description="Flat and outline button component text colour."
      code="$govie-button-text-colour: govie-colour('black');"
    />
    <br />
  </>
)
