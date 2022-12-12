/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const SpacingVariables = () => (
  <>
    <h3 className="govie-heading-m">Spacing</h3>
    <CodeExample
      variable="$govie-spacing"
      description={
        <>
          <p>Single point spacing.</p>
          <p>
            Returns measurement corresponding to the spacing point requested.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$spacing-point</b> (<code>Number</code>): Point on the spacing
            scale (set in <code>settings/_spacing.scss</code>)
          </p>
        </>
      }
      example={`
.element {
  padding: govie-spacing(5);
}

// Using negative spacing
.element {
  margin-top: govie-spacing(-1);
}

// Marking spacing declarations as important
.element {
  margin-top: govie-spacing(1) !important;
}
`}
    />

    <CodeExample
      variable="govie-responsive-margin"
      description={
        <>
          <p>Responsive margin.</p>
          <p>
            Adds responsive margin by fetching a ‘spacing map’ from the
            responsive spacing scale, which defines different spacing values at
            different breakpoints. Wrapper for the{' '}
            <code>_govie-responsive-spacing mixin</code>.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$responsive-spacing-point</b> (<code>Number</code>): Point on the
            responsive spacing scale, corresponds to a map of breakpoints and
            spacing values.
            <br />
            <b>$direction</b> (<code>String</code>): Direction to add spacing to
            (top, right, bottom, left, all).
            <br />
            <b>$important</b> (<code>Boolean</code>): Whether to mark as
            !important.
            <br />
            <b>$adjustment</b> (<code>Number</code>): Offset to adjust spacing
            by.
            <br />
          </p>
        </>
      }
      code={
        '@include govie-responsive-margin($responsive-spacing-point, $direction: "all", $important: false, $adjustment: false);'
      }
      example={`
.element {
  @include govie-responsive-margin(6, "left", $adjustment: 1px);
}`}
    />

    <CodeExample
      variable="govie-responsive-padding"
      description={
        <>
          <p>Responsive padding.</p>
          <p>
            Adds responsive padding by fetching a ‘spacing map’ from the
            responsive spacing scale, which defines different spacing values at
            different breakpoints. Wrapper for the{' '}
            <code>_govie-responsive-spacing mixin</code>.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$responsive-spacing-point</b> (<code>Number</code>): Point on the
            responsive spacing scale, corresponds to a map of breakpoints and
            spacing values.
            <br />
            <b>$direction</b> (<code>String</code>): Direction to add spacing to
            (top, right, bottom, left, all).
            <br />
            <b>$important</b> (<code>Boolean</code>): Whether to mark as
            !important.
            <br />
            <b>$adjustment</b> (<code>Number</code>): Offset to adjust spacing
            by.
            <br />
          </p>
        </>
      }
      code={
        '@include govie-responsive-padding($responsive-spacing-point, $direction: "all", $important: false, $adjustment: false);'
      }
      example={`
.element {
  @include govie-responsive-padding(6, "left", $adjustment: 1px);
}`}
    />
    <br />
  </>
)
