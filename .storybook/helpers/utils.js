/* eslint-disable no-useless-escape */
export const slugify = (text) =>
  text
    .toString()
    .normalize('NFD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\_/g, '-') // Replace _ with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/\-$/g, '') // Remove trailing -

export const createSvgIcon = (width, height, content, className) => {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  icon.setAttribute('class', className)
  icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  icon.setAttribute('focusable', 'false')
  icon.setAttribute('width', width)
  icon.setAttribute('height', height)
  icon.setAttribute('viewBox', `0 0 ${width} ${height}`)

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', content)

  icon.appendChild(path)
  return icon
}
