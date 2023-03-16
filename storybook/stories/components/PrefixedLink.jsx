import React from 'react'

export const PrefixedLink = ({ href, children, ...props }) => {
  const isGithubPages = window.location.host === 'ogcio.github.io'
  const prefixedHref = isGithubPages ? `ogcio-ds${href}` : href

  return (
    <a href={prefixedHref} className="govie-link" {...props}>
      {children}
    </a>
  )
}
