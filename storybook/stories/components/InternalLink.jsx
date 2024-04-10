// eslint-disable-next-line no-unused-vars
import React from 'react'

export const InternalLink = ({ href, children, ...props }) => {
  const isGithubPages = window.location.host === 'ogcio.github.io'
  const prefixedHref = isGithubPages ? `ogcio-ds${href}` : href

  return (
    <a href={prefixedHref} className="govie-link" {...props}>
      {children}
    </a>
  )
}
