/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const ShapesVariables = () => (
  <>
    <h3 className="govie-heading-m">Shapes</h3>
    <CodeExample
      variable="$govie-shape-arrow"
      description={
        <>
          <p>Arrow mixin</p>
          <p>
            Generate Arrows (triangles) by using a mix of transparent (1) and
            coloured borders. The coloured borders inherit the text colour of
            the element (2).
          </p>
          <p>
            Ensure the arrow is rendered correctly if browser colours are
            overridden by providing a clip path (3). Without this the
            transparent borders are overridden to become visible which results
            in a square.
          </p>
          <p>We need both because older browsers do not support clip-path.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$direction</b> (<code>String</code>): Direction for arrow: up,
            right, down, left.
            <br />
            <b>$base</b> (<code>Number</code>): Length of the triangle ‘base’
            side.
            <br />
            <b>$height</b> (<code>Number</code>): Height of triangle. Omit for
            equilateral.
            <br />
            <b>$display</b> (<code>String</code>): CSS display property of the
            arrow.
            <br />
          </p>
        </>
      }
      code={
        '@include govie-shape-arrow($direction, $base, $height: null, $display: "block");'
      }
    />
    <br />
  </>
)
