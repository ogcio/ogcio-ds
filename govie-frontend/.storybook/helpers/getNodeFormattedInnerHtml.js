// getNodeFormattedInnerHtml.js
import { html as beautify } from 'js-beautify'

const getNodeFormattedInnerHtml = (node) => {
  const beautifyOptions = {
    indent_size: 2,
    end_with_newline: false,
    preserve_newlines: false,
    inline: ['inline'],
  }

  const innerHtmlWrapper = document.createElement('tag-to-be-removed')
  innerHtmlWrapper.innerHTML = node.innerHTML

  const formattedHtml = beautify(innerHtmlWrapper.outerHTML, beautifyOptions)

  return formattedHtml
    .replace('<tag-to-be-removed>', '')
    .replace('</tag-to-be-removed>', '')
}

export default getNodeFormattedInnerHtml
