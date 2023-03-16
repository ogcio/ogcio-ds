// eslint-disable-next-line no-unused-vars
import React from 'react'

export const CodeSnippet = ({ code }) => (
  <div style={{ backgroundColor: '#f9f9f8', marginBottom: '15px' }}>
    <pre
      style={{
        background: '#f9f9f8',
        padding: '15px',
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #bfc1c3',
      }}
      className="govie-!-font-size-19"
      tabIndex="0"
    >
      {`${code}`}
    </pre>
  </div>
)
