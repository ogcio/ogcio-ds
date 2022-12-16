/* eslint-disable no-unused-vars */
import { CopyBlock, atomOneLight } from 'react-code-blocks'
import React from 'react'

export const CodeExample = ({ code, variable, description, example }) => (
  <>
    <h4 className="govie-heading-s">{variable}</h4>
    <div className="govie-body">{description}</div>
    {code && (
      <CopyBlock
        customStyle={{ fontSize: '18px', padding: '16px' }}
        text={code}
        language="js"
        showLineNumbers={false}
        theme={atomOneLight}
        wrapLines
      />
    )}
    {example && (
      <>
        <br />
        <b className="govie-body">Example:</b>
        <CopyBlock
          customStyle={{ fontSize: '18px' }}
          text={example}
          language="js"
          showLineNumbers={false}
          theme={atomOneLight}
          wrapLines
        />
      </>
    )}
    <br />
    <br />
  </>
)
