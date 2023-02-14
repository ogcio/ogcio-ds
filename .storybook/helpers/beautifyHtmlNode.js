import { html as beautify } from 'js-beautify'
import reactParse from 'html-react-parser'

const beautifyHtmlNode = (node, returnReact = true) => {
  const beautifyOptions = {
    indent_size: 2,
    end_with_newline: false,
    preserve_newlines: false,
    inline: ['inline']
  }

  const formattedNode = beautify(node.outerHTML, beautifyOptions)

  if (returnReact) {
    return reactParse(formattedNode)
  }

  return formattedNode
}

export default beautifyHtmlNode
