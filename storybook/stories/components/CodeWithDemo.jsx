/* eslint-disable no-unused-vars */
import { CopyBlock, atomOneLight } from 'react-code-blocks'
import React from 'react'

export const CodeWithDemo = ({ code, darkMode }) => (
  <div
    style={{
      border: '1px solid',
      marginBottom: '20px',
      borderRadius: '4px',
    }}
  >
    <div
      dangerouslySetInnerHTML={{ __html: code }}
      style={{
        padding: '16px',
        borderBottom: '1px solid',
        backgroundColor: darkMode ? '#1d70b8' : 'transparent',
      }}
    />
    <CopyBlock
      customStyle={{ fontSize: '18px', padding: '16px' }}
      text={code}
      language="js"
      showLineNumbers={false}
      theme={atomOneLight}
      wrapLines
    />
  </div>
)
