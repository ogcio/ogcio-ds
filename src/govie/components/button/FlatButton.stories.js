// import reactParse from 'html-react-parser'
// import ReactDOMServer from 'react-dom/server'
// const htmlButton = (args) => ReactDOMServer.renderToStaticMarkup(button(args))

// import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
// import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import FlatButton from './FlatButton'
import primary from './PrimaryButton.stories'

export default {
  ...primary,
  title: 'Form/Button/Flat button'
}

const Template = (args) => {
  return (
    <FlatButton icon={args.icon} disabled={args.disabled} size={args.size}>
      {args.label}
    </FlatButton>
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Flat button'
}

export const Medium = Template.bind({})
Medium.args = {
  label: 'Medium flat button',
  size: 'medium'
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small flat button',
  size: 'small'
}

export const WithLeftIcon = Template.bind({})
WithLeftIcon.args = {
  label: 'Flat button with left icon',
  icon: 'left'
}

export const WithRightIcon = Template.bind({})
WithRightIcon.args = {
  label: 'Flat button with right icon',
  icon: 'right'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled flat button',
  disabled: true
}
