/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const LinkVariables = () => (
  <>
    <h3 className="govie-heading-m">Links</h3>
    <CodeExample
      variable="$govie-link-common"
      description={
        <>
          <p>Common link styles.</p>
          <p>
            Provides the typography and focus state, regardless of link style.
          </p>
        </>
      }
      code="@include govie-link-common;"
    />
    <CodeExample
      variable="$govie-link-decoration"
      description={
        <>
          <p>Link decoration.</p>
          <p>
            Provides the text decoration for links, including thickness and
            underline offset. Use this mixin only if you cannot use the
            <code>govie-link-common mixin</code>.
          </p>
        </>
      }
      code="@include govie-link-decoration;"
    />
    <CodeExample
      variable="$govie-link-hover-decoration"
      description={
        <>
          <p>Link hover decoration.</p>
          <p>
            Provides the text decoration for links in their hover state, for you
            to use within a <code>:hover</code> pseudo-selector. Use this mixin
            only if you cannot use the
            <code>govie-link-common mixin</code>.
          </p>
        </>
      }
      code="@include govie-link-hover-decoration;"
    />
    <CodeExample
      variable="$govie-link-style-default"
      description={
        <>
          <p>Default link styles.</p>
          <p>
            Makes links use the default unvisited, visited, hover and active
            colours.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-default;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-default;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-error"
      description={
        <>
          <p>Error link styles.</p>
          <p>
            Makes links use the error colour. The link will darken if it’s
            active or a user hovers their cursor over it.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-error;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-error;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-success"
      description={
        <>
          <p>Success link styles.</p>
          <p>
            Makes links use the success colour. The link will darken if it’s
            active or a user hovers their cursor over it.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-success;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-sucess;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-muted"
      description={
        <>
          <p>Muted link styles.</p>
          <p>
            Makes links use the secondary text colour. The link will darken if
            it’s active or a user hovers their cursor over it.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-muted;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-muted;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-text"
      description={
        <>
          <p>Text link styles.</p>
          <p>
            Makes links use the primary text colour, in all states. Use this
            mixin for navigation components, such as breadcrumbs or the back
            link.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-text;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-text;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-inverse"
      description={
        <>
          <p>Inverse link styles.</p>
          <p>
            Makes links white, in all states. Use this mixin if you’re
            displaying links against a dark background.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-inverse;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-inverse;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-no-visited-state"
      description={
        <>
          <p>Default link styles, without a visited state.</p>
          <p>
            Makes links use the default unvisited, hover and active colours,
            with no distinct visited state.
          </p>
          <p>
            Use this mixin when it’s not helpful to distinguish between visited
            and non-visited links. For example, when you link to pages with
            frequently-changing content, such as the dashboard for an admin
            interface.
          </p>
          <p>
            If you use this mixin in a component, you must also include the{' '}
            <code>govie-link-common</code> mixin to get the correct focus and
            hover states.
          </p>
        </>
      }
      code="@include govie-link-style-no-visited-state;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-no-visited-state;
}
      `}
    />
    <CodeExample
      variable="$govie-link-style-no-underline"
      description={
        <>
          <p>Remove underline from links.</p>
          <p>
            Remove underlines from links unless the link is active or a user
            hovers their cursor over it. This has no effect in Internet Explorer
            8 (IE8), because IE8 does not support <code>:not</code>.
          </p>
        </>
      }
      code="@include govie-link-style-no-underline;"
      example={`
.govie-component__link {
    @include govie-link-common;
    @include govie-link-style-no-underline;
}
      `}
    />
    <CodeExample
      variable="$govie-link-print-friendly"
      description={
        <>
          <p>Include link destination when printing the page.</p>
          <p>
            If the user prints the page, add the destination URL after the link
            text, if the URL starts with <code>/</code>, <code>http://</code> or{' '}
            <code>https://</code>..
          </p>
        </>
      }
      code="@include govie-link-print-friendly;"
    />
    <br />
  </>
)
