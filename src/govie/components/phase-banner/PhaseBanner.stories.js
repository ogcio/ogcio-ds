import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Typography/Phase banner',
  parameters: {
    docs: {
      description: {
        component:
          'Use the phase banner component to show users your service is still being worked on.',
      },
    },
  },
  argTypes: {
    tag: {
      control: 'text',
      type: { required: true },
    },
    text: {
      control: 'text',
      type: { required: true },
    },
  },
  args: {
    tag: 'alpha',
    text: 'This is a new service – your <a class="govie-link" href="#">feedback</a> will help us to improve it.',
  },
}

const Template = (args) => {
  const banner = document.createElement('div')
  banner.className = 'govie-phase-banner'

  const bannerContent = document.createElement('p')
  bannerContent.className = 'govie-phase-banner__content'

  const tag = document.createElement('strong')
  tag.className = 'govie-tag govie-phase-banner__content__tag'
  tag.innerText = args.tag

  const text = document.createElement('span')
  text.className = 'govie-phase-banner__text'
  text.innerHTML = args.text

  bannerContent.appendChild(tag)
  bannerContent.appendChild(text)

  banner.appendChild(bannerContent)

  return beautifyHtmlNode(banner)
}

export const Default = Template.bind({})
Default.args = {
  tag: 'alpha',
}

export const Beta = Template.bind({})
Beta.args = {
  tag: 'beta',
}
