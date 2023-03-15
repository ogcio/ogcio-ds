/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const HelpersVariables = () => (
  <>
    <h3 className="govie-heading-m">General helpers</h3>
    <CodeExample
      variable="$govie-device-pixel-ratio"
      description={
        <>
          <p>Media query for retina images (device-pixel-ratio).</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$ratio</b> (<code>Number</code>): Device pixel ratio
          </p>
        </>
      }
      code={`
@include govie-device-pixel-ratio($raio: 2) {
  //..
}`}
      example={`
background-image: govie-image-url("my-image.png");

// Providing a @2x image for screens that support it
@include govie-device-pixel-ratio {
  background-image: govie-image-url("my-image-2x.png");
}
// Using a custom ration
@include govie-device-pixel-ratio(3) {
  background-image: govie-image-url("my-image-3x.png");
}
`}
    />

    <h3 className="govie-heading-m">Accessibiity</h3>
    <CodeExample
      variable="$govie-focused-text"
      description={
        <>
          <p>Focused text.</p>
          <p>
            Provides an outline to clearly indicate when the target element is
            focused. Used for interactive text-based elements.
          </p>
        </>
      }
      code="@include govie-focused-text;"
    />
    <CodeExample
      variable="$govie-visually-hidden"
      description={
        <>
          <p>
            Hide an element visually, but have it available for screen readers.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$important</b> (<code>Boolean</code>q): Whether to mark as{' '}
            <code>!important</code>
          </p>
        </>
      }
      code="@include govie-visually-hidden($important: true);"
    />
    <CodeExample
      variable="$govie-visually-hidden-focusable"
      description={
        <>
          <p>
            Hide an element visually, but have it available for screen readers
            whilst allowing the element to be focused when navigated to via the
            keyboard (e.g. for the skip link).
          </p>
          <p>
            This is slightly less opinionated about borders and padding to make
            it easier to style the focussed element.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$important</b> (<code>Boolean</code>): Whether to mark as{' '}
            <code>!important</code>
          </p>
        </>
      }
      code="@include govie-visually-hidden-focusable($important: true);"
    />

    <h3 className="govie-heading-m">Colour</h3>
    <CodeExample
      variable="$govie-colour"
      description={
        <>
          <p>Get colour.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$colour</b> (<code>String</code>): Name of colour from the colour
            palette
          </p>
        </>
      }
      example={`
.foo {
  background-colour: govie-colour("mid-grey");
}`}
    />
    <CodeExample
      variable="$govie-shade"
      description={
        <>
          <p>Make a colour darker by mixing it with black.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$colour</b> (<code>Colour</code>): colour to shade
            <br />
            <b>$percentage</b> (<code>Number</code>): percentage of black to mix
            with $colour
          </p>
        </>
      }
    />
    <CodeExample
      variable="$govie-tint"
      description={
        <>
          <p>Make a colour darker by mixing it with white.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$colour</b> (<code>Colour</code>): colour to tint
            <br />
            <b>$percentage</b> (<code>Number</code>): percentage of white to mix
            with $colour
          </p>
        </>
      }
    />
    <h3 className="govie-heading-m">Layout</h3>
    <CodeExample
      variable="$govie-clearfix"
      description="Clear floated content within a container using a pseudo element."
      code="@include govie-clearfix;"
    />
    <CodeExample
      variable="$govie-grid-with"
      description={
        <>
          <p>Grid width percentage.</p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$key</b> (<code>String</code>): Name of grid width (e.g.
            two-thirds)
            <br />
          </p>
        </>
      }
    />
    <CodeExample
      variable="$govie-grid-column"
      description={
        <>
          <p>Generate grid column styles.</p>
          <p>Creates a grid column with standard gutter between the columns.</p>
          <p>
            Grid widths are defined in the <code>$govie-grid-widths</code> map.
          </p>
          <p>
            By default the column width changes from 100% to specified width at
            the ‘tablet’ breakpoint, but other breakpoints can be specified
            using the <code>$at</code> parameter.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$width</b> (<code>String</code>): name of a grid width from{' '}
            <code>$govie-grid-widths</code>
            <br />
            <b>$float</b> (<code>String</code>): left | right
            <br />
            <b>$at</b> (<code>String</code>): mobile | tablet | desktop | any
            custom breakpoint
            <br />
          </p>
        </>
      }
      code={
        '@include govie-grid-column($width: "full", $float: "left", $at: "tablet");'
      }
      example={`
// default
.govie-grid-column-two-thirds {
  @include govie-grid-column(two-thirds)
}

// Customising the breakpoint where width percentage is applied
.govie-grid-column-one-half-at-desktop {
  @include govie-grid-column(one-half, $at: desktop);
}

// Customising the float direction
.govie-grid-column-one-half-right {
  @include govie-grid-column(two-thirds, $float: right);
}
      `}
    />

    <CodeExample
      variable="$govie-media-query"
      description={
        <>
          <p>Media Query.</p>
          <p>Creates a grid column with standard gutter between the columns.</p>
          <p>
            This is a currently a wrapper for sass-mq - abstracted so that we
            can replace it in the future if we so choose.
          </p>
          <p>
            <b>Parameters</b>
            <br />
            <br />
            <b>$from</b> (<code>String or Boolean</code>): One of{' '}
            <code>$govie-breakpoints</code>
            <br />
            <b>$until</b> (<code>String or Boolean</code>): One of{' '}
            <code>$govie-breakpoints</code>
            <br />
            <b>$and</b> (<code>String or Boolean</code>): Additional media query
            parameters
            <br />
            <b>$media-type</b> (<code>String</code>): Media type: screen, print…
            <br />
          </p>
        </>
      }
      code={`
@include govie-media-query($from: false, $until: false, $and: false, $media-type: "all") {
  //..
}
`}
      example={`
.element {
  @include govie-media-query($from: mobile) {
    color: red;
  }
  @include govie-media-query($until: tablet) {
    color: blue;
  }
  @include govie-media-query(mobile, tablet) {
    color: green;
  }
  @include govie-media-query($from: tablet, $and: '(orientation: landscape)') {
    color: teal;
  }
  @include govie-media-query(950px) {
    color: hotpink;
  }
  @include govie-media-query(tablet, $media-type: screen) {
    color: hotpink;
  }
}
      `}
    />
    <br />
  </>
)
