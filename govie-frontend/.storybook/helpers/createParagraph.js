const createParagraph = (text) => {
  const paragraph = document.createElement('p')
  paragraph.className = 'govie-body'
  paragraph.innerText = text

  return paragraph
}

export default createParagraph
