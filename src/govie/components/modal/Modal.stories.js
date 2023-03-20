import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'

import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'
import { Default as outlinedButton } from '../../components/button/OutlinedButton.stories'
import { Default as primaryButton } from '../../components/button/PrimaryButton.stories'
import { Default as iconButton } from '../../components/icon-button/IconButton.stories'

export default {
  title: 'Application/Modal',
  parameters: {
    docs: {
      description: {
        component:
          'A panel that can be used to house a important information around actions that require user thought and interaction.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      type: { name: 'text', required: true },
    },
  },
  args: {
    text: 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
  },
}

const Template = (args) => {
  const container = document.createElement('div')
  container.className = 'govie-modal'

  const title = parseHtmlString(
    heading({ text: 'This is a semantic title', size: 's' })
  )
  container.appendChild(title)

  const firstParagraph = parseHtmlString(
    paragraph({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    })
  )
  container.appendChild(firstParagraph)

  const secondParagraph = parseHtmlString(
    paragraph({
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    })
  )
  container.appendChild(secondParagraph)

  const buttonsRow = document.createElement('div')
  buttonsRow.className = 'govie-modal--buttons'

  const canelButton = parseHtmlString(
    outlinedButton({ label: 'Cancel Action', size: 'medium' })
  )
  buttonsRow.appendChild(canelButton)

  const confirmButton = parseHtmlString(
    primaryButton({ label: 'Primary Action', size: 'medium' })
  )
  buttonsRow.appendChild(confirmButton)

  container.appendChild(buttonsRow)

  const closeButtonContainer = document.createElement('div')
  closeButtonContainer.className = 'govie-modal--close-button-container'

  const xIconSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#505A5F"/>
</svg>`
  const closeButton = parseHtmlString(iconButton({ icon: xIconSvg }))
  closeButtonContainer.appendChild(closeButton)

  container.appendChild(closeButtonContainer)

  return beautifyHtmlNode(container)
}

export const Default = Template.bind({})
Default.args = {}
