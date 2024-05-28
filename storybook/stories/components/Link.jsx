import React from 'react'

export const Link = ({ children, href }) => (
	<a className='govie-link' href={`${import.meta.env.BASE_URL}${href}`}>{children}</a>
);
