/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const MediaQueriesVariables = () => (
  <>
    <h3 className="govie-heading-m">Media queries</h3>
    <CodeExample
      variable="$govie-breakpoints"
      description="Breakpoint definitions."
      code={`
$govie-breakpoints: (
  mobile:  320px,
  tablet:  641px,
  desktop: 769px
);`}
    />
    <CodeExample
      variable="$govie-show-breakpoints"
      description={
        <>
          <p>Show active breakpoint in top-right corner.</p>
          <p>Only use this during local development.</p>
        </>
      }
      code="$govie-show-breakpoints: false;"
    />
  </>
)
