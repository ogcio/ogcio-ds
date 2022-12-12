/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const TypographyVariables = () => (
  <>
    <h3 className="govie-heading-m">Typography</h3>
    <CodeExample
      variable="$govie-font-family-lato"
      description="List of font families to use if using Lato (the default font ‘stack’ for gov.ie)"
      code="$govie-font-family-lato: 'Lato', arial, sans-serif;"
    />
    <CodeExample
      variable="$govie-font-family"
      description="Font families to use for all typography on screen media."
      code="$govie-font-family: $govie-font-family-lato;"
    />
    <CodeExample
      variable="$govie-font-family-print"
      description={
        <>
          <p>Font families to use for print media.</p>
          <p>
            We recommend that you use system fonts when printing. This will
            avoid issues with some printer drivers and operating systems.
          </p>
        </>
      }
      code="$govie-font-family-print: sans-serif;"
    />
    <CodeExample
      variable="$govie-include-default-font-face"
      description={
        <>
          <p>Include the default @font-face declarations.</p>
          <p>
            If you have set <code>$govie-font-family</code> to something other
            than
            <code>$govie-font-family-gds-transport</code> this option is
            disabled by default.
          </p>
        </>
      }
      code={`
$govie-include-default-font-face: (
  $govie-font-family == $govie-font-family-lato
);`}
    />
    <CodeExample
      variable="$govuk-font-weight-govie"
      description="Font weight for govie typography"
      code="$govuk-font-weight-govie: 400;"
    />
    <CodeExample
      variable="$govuk-font-weight-bold"
      description="Font weight for bold typography"
      code="$govuk-font-weight-bold: 700;"
    />
    <CodeExample
      variable="$govuk-root-font-size"
      description={
        <>
          <p>Root font size</p>
          <p>
            This is used to calculate rem sizes for the typography, and should
            match the effective font-size of your root (or html) element.
          </p>
          <p>
            Ideally you should not be setting the font-size on the html or root
            element in order to allow it to scale with user-preference, in which
            case this should be set to 16px.
          </p>
        </>
      }
      code="$govuk-root-font-size: 16px;"
    />
    <CodeExample
      variable="$govuk-typography-scale"
      description={
        <>
          <p>Responsive typography font map.</p>
          <p>
          This is used to generate responsive typography that adapts according to the breakpoints.
          </p>
          <p>
          Font size and font weight can be defined for each breakpoint. You can define different behaviour on tablet and desktop. The ‘null’ breakpoint is for mobile.
          </p>
          <p>
          Line-heights will automatically be converted from pixel measurements into relative values. For example, with a font-size of 16px and a line-height of 24px, the line-height will be converted to 1.5 before output.
          </p>
          <p>
          You can also specify a separate font size and line height for print media.
          </p>
        </>
      }
      code={`
$govie-typography-scale: (
  80: (
    null: (
      font-size: 53px,
      line-height: 55px
    ),
    tablet: (
      font-size: 80px,
      line-height: 80px
    ),
    print: (
      font-size: 53pt,
      line-height: 1.1
    )
  ),
  48: (
    null: (
      font-size: 32px,
      line-height: 35px
    ),
    tablet: (
      font-size: 48px,
      line-height: 50px
    ),
    print: (
      font-size: 32pt,
      line-height: 1.15
    )
  ),
  36: (
    null: (
      font-size: 24px,
      line-height: 25px
    ),
    tablet: (
      font-size: 36px,
      line-height: 40px
    ),
    print: (
      font-size: 24pt,
      line-height: 1.05
    )
  ),
  27: (
    null: (
      font-size: 18px,
      line-height: 20px
    ),
    tablet: (
      font-size: 27px,
      line-height: 30px
    ),
    print: (
      font-size: 18pt,
      line-height: 1.15
    )
  ),
  24: (
    null: (
      font-size: 18px,
      line-height: 20px
    ),
    tablet: (
      font-size: 24px,
      line-height: 30px
    ),
    print: (
      font-size: 18pt,
      line-height: 1.15
    )
  ),
  19: (
    null: (
      font-size: 16px,
      line-height: 20px
    ),
    tablet: (
      font-size: 19px,
      line-height: 25px
    ),
    print: (
      font-size: 14pt,
      line-height: 1.15
    )
  ),
  16: (
    null: (
      font-size: 14px,
      line-height: 16px
    ),
    tablet: (
      font-size: 16px,
      line-height: 20px
    ),
    print: (
      font-size: 14pt,
      line-height: 1.2
    )
  ),
  14: (
    null: (
      font-size: 12px,
      line-height: 15px
    ),
    tablet: (
      font-size: 14px,
      line-height: 20px
    ),
    print: (
      font-size: 12pt,
      line-height: 1.2
    )
  )
);`}
    />
    <br />
  </>
)
