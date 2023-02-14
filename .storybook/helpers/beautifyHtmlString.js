import beautifyHtmlNode from './beautifyHtmlNode'
import parseHtmlString from './parseHtmlString'

const beautifyHtmlString = (htmlString, returnReact = true) => {
  return beautifyHtmlNode(parseHtmlString(htmlString, returnReact))
}

export default beautifyHtmlString
