// eslint-disable-next-line no-unused-vars
import React from 'react'

export const Link = ({textToDisplay, href}) => (
	<a className='govie-link' href={`${import.meta.env.BASE_URL}${href}`}>{textToDisplay}</a>
);
