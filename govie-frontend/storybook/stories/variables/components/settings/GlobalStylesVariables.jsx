/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const GlobalStylesVariables = () => (
  <>
    <h3 className="govie-heading-m">Global styles</h3>
    <CodeExample
      variable="$govie-global-styles"
      description={
        <>
          <p>Include ‘global’ styles</p>
          <p>
            Whether to style paragraphs (&lt;p&gt;) and links (&lt;a&gt;)
            without explicitly having to apply the <code>govie-body</code> and{' '}
            <code>govie-link</code> classes.
          </p>
        </>
      }
      code="$govie-global-styles: false;"
    />
    <br />
  </>
)
