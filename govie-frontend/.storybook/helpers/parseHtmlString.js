const parseHtmlString = (htmlString) => {
  var template = document.createElement('template')
  htmlString = htmlString.trim()
  template.innerHTML = htmlString

  return template.content.firstChild
}

export default parseHtmlString
