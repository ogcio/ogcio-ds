import React from 'react'

export const Swatch = ({ colour }) => (
  <span
    style={{
      background: colour,
      border: '1px solid #dedede',
      display: 'inline-block',
      height: '30px',
      width: '60px'
    }}
  ></span>
)
