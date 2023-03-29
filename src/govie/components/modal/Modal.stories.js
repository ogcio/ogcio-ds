import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { xIcon } from '../../storybook/svgImages'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as outlinedButton } from '../../components/button/OutlinedButton.stories'
import { Default as primaryButton } from '../../components/button/PrimaryButton.stories'
import { Default as iconButton } from '../../components/icon-button/IconButton.stories'

export default {
  title: 'Application/Modal',
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: '500px',
      description: {
        component:
          'A panel that can be used to house a important information around actions that require user thought and interaction.',
      },
    },
  },
  argTypes: {},
  args: {},
}

const createModalOverlay = () => {
  const overlay = document.createElement('div')
  overlay.className = 'govie-modal--overlay'

  return overlay
}

const createCloseButton = () => {
  const closeButtonContainer = document.createElement('div')
  closeButtonContainer.className = 'govie-modal--close-button-container'

  const closeButton = parseHtmlString(
    iconButton({ icon: xIcon, tooltipLabel: 'Close' })
  )
  closeButtonContainer.appendChild(closeButton)

  return closeButtonContainer
}

const createContentButtonsRow = () => {
  const buttonsRow = document.createElement('div')
  buttonsRow.className = 'govie-modal--buttons'

  const cancelButton = parseHtmlString(
    outlinedButton({ label: 'Cancel Action', size: 'medium', id: 'cancel button' })
  )
  buttonsRow.appendChild(cancelButton)

  const confirmButton = parseHtmlString(
    primaryButton({ label: 'Primary Action', size: 'medium', id: 'confirm button' })
  )
  buttonsRow.appendChild(confirmButton)

  return buttonsRow
}

const createModalContent = () => {
  const content = document.createElement('div')
  content.className = 'govie-modal--content'
  content.appendChild(createCloseButton())

  const title = parseHtmlString(
    heading({ text: 'This is a semantic title', size: 's' })
  )
  content.appendChild(title)

  const firstParagraph = parseHtmlString(
    paragraph({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    })
  )
  content.appendChild(firstParagraph)

  const secondParagraph = parseHtmlString(
    paragraph({
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })
  )
  content.appendChild(secondParagraph)

  content.appendChild(createContentButtonsRow())

  return content
}

const Template = (args) => {
  const container = document.createElement('div')
  container.className = 'govie-modal'
  container.appendChild(createModalOverlay())
  container.appendChild(createModalContent())

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}
