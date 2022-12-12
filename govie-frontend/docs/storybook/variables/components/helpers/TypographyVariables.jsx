/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const TypographyVariables = () => (
  <>
    <h3 className="govie-heading-m">Typography</h3>
    <CodeExample
      variable="$govie-typography-common"
      description={
        <>
          <p>‘Common typography’ helper.</p>
          <p>
            Sets the font family and associated properties, such as font
            smoothing. Also overrides the font for print.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$font-family</b> (<code>List</code>): Font-family to use
          </p>
        </>
      }
      code="@include govie-typography-common($font-family: $govie-font-family);"
    />
    <CodeExample
      variable="$govie-text-colour"
      description={
        <>
          <p>Text colour helper.</p>
          <p>Sets the text colour, including a suitable override for print.</p>
        </>
      }
      code="@include govie-text-colour;"
    />
    <CodeExample
      variable="$govie-typography-weight-regular"
      description={
        <>
          <p>Regular font weight helper.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$important</b> (<code>Boolean</code>): Whether to mark
            declarations as <code>!important</code>. Generally Used to create
            override classes.
          </p>
        </>
      }
      code="@include govie-typography-weight-regular($important: false);"
    />
    <CodeExample
      variable="$govie-typography-weight-bold"
      description={
        <>
          <p>Bold font weight helper.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$important</b> (<code>Boolean</code>): Whether to mark
            declarations as <code>!important</code>. Generally Used to create
            override classes.
          </p>
        </>
      }
      code="@include govie-typography-weight-bold($important: false);"
    />
    <CodeExample
      variable="$govie-typography-responsive"
      description={
        <>
          <p>Responsive typography helper.</p>
          <p>
            Takes a point from the responsive ‘font map’ as an argument (the
            size as it would appear on tablet and above), and uses it to create
            font-size and line-height declarations for different breakpoints,
            and print.
          </p>
          <p>Example font map:</p>
          <p>
            19: ( null: ( font-size: 16px, line-height: 20px ), tablet: (
            font-size: 19px, line-height: 25px ), print: ( font-size: 14pt,
            line-height: 1.15 ) );
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$size</b> (<code>Number</code>): Point from the spacing scale
            (the size as it would appear on tablet and above).
            <b>$override-line-height</b> (<code>Number</code>): Non responsive
            custom line height. Omit to use the line height from the font map.
            <b>$important</b> (<code>Boolean</code>): Whether to mark
            declarations as !important.
          </p>
        </>
      }
      code="@include govie-typography-responsive($size, $override-line-height: false, $important: false);"
    />
    <CodeExample
      variable="$govie-font"
      description={
        <>
          <p>Font helper.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$size</b> (<code>Number</code>): Point from the spacing scale
            (the size as it would appear on tablet and above). Use false to
            avoid setting a size.
            <b>$weight</b> (<code>String</code>): Weight: <code>bold</code> or{' '}
            <code>regular</code>.<b>$tabular</b> (<code>Boolean</code>): Whether
            to use tabular numbers or not.
            <b>$line-height</b> (<code>Number</code>): Line-height, if
            overriding the default.
          </p>
        </>
      }
      code={
        '@include govuk-font($size, $weight: "regular", $tabular: false, $line-height: false);'
      }
    />
    <br />
  </>
)
