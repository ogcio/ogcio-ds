import packageJson from '../../../package.json';
import React from 'react';

export const Link = ({ children, href }) => (
  <a className="govie-link" href={`${import.meta.env.BASE_URL}${href}`}>
    {children}
  </a>
);

export const ReleaseLink = ({ children }) => {
  const version = packageJson.version;
  return (
    <a
      className="govie-link"
      href={`https://github.com/ogcio/ogcio-ds/releases/tag/v${version}`}
    >
      {children}
    </a>
  );
};
