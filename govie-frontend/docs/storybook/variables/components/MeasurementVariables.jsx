/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeBlock } from './CodeBlock'

export const MeasurementVariables = () => (
  <>
    <h3 className="govie-heading-m">Measurements</h3>
    <CodeBlock
      variable="$govie-page-width"
      description="Width of main container."
      code="$govie-page-width: 960px;"
    />
    <CodeBlock
      variable="$govie-grid-widths"
      description="Map of grid column widths"
      code={
        `
$govie-grid-widths: (
  one-quarter: 25%,
  one-third: 33.3333%,
  one-half: 50%,
  two-thirds: 66.6666%,
  three-quarters: 75%,
  full: 100%
);`
      }
    />
    <CodeBlock
      variable="$govie-gutter"
      description="Width of gutter between grid columns."
      code="$govie-gutter: 30px;"
    />
    <CodeBlock
      variable="$govie-gutter-half"
      description="Width of half the gutter between grid columns."
      code="$govie-gutter-half: $govie-gutter / 2;"
    />
    <CodeBlock
      variable="$govie-border-width"
      description="Standard border width."
      code="$govie-border-width: 5px;"
    />
    <CodeBlock
      variable="$govie-border-width-wide"
      description="Wide border width."
      code="$govie-border-width-wide: 10px;"
    />
    <CodeBlock
      variable="$govie-border-width-narrow"
      description="Narrow border width."
      code="$govie-border-width-narrow: 4px;"
    />
    <CodeBlock
      variable="$govie-border-width-form-element"
      description="Form control border width."
      code="$govie-border-width-form-element: 2px;"
    />
    <CodeBlock
      variable="$govie-border-width-form-group-error"
      description="Form group border width when in error state."
      code="$govie-border-width-form-group-error: $govie-border-width;"
    />
    <CodeBlock
      variable="$govie-focus-width"
      description="Border width of focus outline."
      code="$govie-focus-width: 3px;"
    />
    <CodeBlock
      variable="$govie-hover-width"
      description="Hover width for form controls with a hover state."
      code="$govie-hover-width: 10px;"
    />
  </>
)
