/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const LayoutVariables = () => (
  <>
    <h3 className="govie-heading-m">Layout</h3>
    <CodeExample
      variable="$govie-width-container"
      description={
        <>
          <p>Width container mixin.</p>
          <p>Used to create page width and custom width container classes.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$width</b> (<code>String</code>): Width in pixels.
          </p>
        </>
      }
      code="@include govie-width-container($width: '$govie-page-width');"
      example={`
// Creating a 1200px wide container class
.app-width-container--wide {
  @include govie-width-container(1200px);
}`}
    />
  </>
)
