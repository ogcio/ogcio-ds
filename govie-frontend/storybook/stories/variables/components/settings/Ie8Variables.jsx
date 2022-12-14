/* eslint-disable no-unused-vars */
import React from 'react'
import { CodeExample } from '../CodeExample'

export const Ie8Variables = () => (
  <>
    <h3 className="govie-heading-m">Internet explorer 8</h3>
    <CodeExample
      variable="$govie-is-ie8"
      description="Whether the stylesheet being built is targeting Internet Explorer 8."
      code="$govie-is-ie8: false;"
    />
    <CodeExample
      variable="$govie-ie8-breakpoint"
      description="The name of the breakpoint to use as the target when rasterizing media queries."
      code="govie-ie8-breakpoint: desktop;"
    />
    <br />
  </>
)
