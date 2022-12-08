/* eslint-disable no-unused-vars */
import { CopyBlock, atomOneLight } from 'react-code-blocks'
import React from 'react'

export const CodeBlock = ({ code, variable, description }) => (
  <>
    <h4 className="govie-heading-s">
      {variable}
    </h4>
    <div className="govie-body">{description}</div>
    <CopyBlock
      customStyle={{ fontSize: '18px', padding: '16px' }}
      text={code}
      language="js"
      showLineNumbers={false}
      theme={atomOneLight}
      wrapLines
    />
    <br />
    <br />
  </>
)
