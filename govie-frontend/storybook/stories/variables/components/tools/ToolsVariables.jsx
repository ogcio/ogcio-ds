/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const ToolsVariables = () => (
  <>
    <h3 className="govie-heading-m">General tools</h3>
    <CodeExample
      variable="$govie-exports"
      description={
        <>
          <p>Export module.</p>
          <p>
            Ensure that the modules of CSS that we define throughout Frontend
            are only included in the generated CSS once, no matter how many
            times they are imported across the individual components.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$name</b> (<code>String</code>): Name of module - must be unique
            within the codebase
          </p>
        </>
      }
      code={`
@include govie-exports($name) {
  //..
}`}
    />
    <h3 className="govie-heading-m">Internet Explorer 8</h3>
    <CodeExample
      variable="$govie-if-ie8"
      description={
        <>
          <p>Export module.</p>
          <p>
            Ensure that the modules of CSS that we define throughout Frontend
            are only included in the generated CSS once, no matter how many
            times they are imported across the individual components.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$name</b> (<code>String</code>): Name of module - must be unique
            within the codebase
          </p>
        </>
      }
      code={`
@include govie-if-ie8 {
  //..
}`}
      example={`
.foo {
  min-width: 100px;
  // Specify width for IE8 only
  @include govie-if-ie8 {
    width: 100px;
  }
}
`}
    />
    <CodeExample
      variable="$govie-not-ie8"
      description="Conditionally exclude rules for IE8"
      code={`
@include govie-not-ie8 {
  //..
}`}
      example={`
.foo {
  font-weight: bold;

  // Enhance foo only for modern browsers (not IE8)
  @include govie-not-ie8 {
    font-family: "Comic Sans MS", "Curlz MT" cursive, sans-serif;
    color: #FF69B4;
  }
}
`}
    />

    <h3 className="govie-heading-m">Unit conversion</h3>
    <CodeExample
      variable="$govie-em"
      description={
        <>
          <p>Convert pixels to em.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$value</b>: Length in pixels - <code>Number</code>
            <br />
            <b>$context-font-size</b> (<code>Number</code>): Font size of
            element
          </p>
        </>
      }
    />

    <CodeExample
      variable="$govie-px-to-rem"
      description={
        <>
          <p>Convert pixels to rem.</p>
          <p>
            The $govie-root-font-size (defined in
            settings/_typography-responsive.scss) must be configured to match
            the font-size of your root (html) element
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$value</b> (<code>Number</code>): Length in pixels
          </p>
        </>
      }
    />
    <br />
  </>
)
