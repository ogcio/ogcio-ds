import { makeDecorator } from '@storybook/addons'
import { Source } from '@storybook/components'
import { styled } from '@storybook/theming'

import ReactDOMServer from 'react-dom/server'
import { useState } from 'react'

import beautifyHtmlString from './helpers/beautifyHtmlString'

const StyledSource = styled(Source)(({ theme }) => ({
  margin: '0 -20px',
  borderRadius: 0,
  border: 'none'
}))

const ButtonContainer = styled.div(({ theme }) => ({
  margin: '0 -20px',
  justifyContent: 'flex-end',
  display: 'flex'
}))

// https://github.com/storybookjs/storybook/blob/v6.5.10/lib/components/src/ActionBar/ActionBar.tsx#L15
export const ActionButton = styled.button(
  ({ theme }) => ({
    margin: '20px 0 0',
    padding: '4px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',

    color: theme.color.defaultText,
    background: theme.background.content,

    fontSize: 12,
    lineHeight: '16px',
    fontFamily: theme.typography.fonts.base,
    fontWeight: theme.typography.weight.bold,

    border: `1px solid ${theme.appBorderColor}`,

    borderRadius: '4px',

    '&:focus': {
      boxShadow: `${theme.color.secondary} 0 -3px 0 0 inset`,
      outline: '0 none'
    }
  }),
  ({ isOpen }) =>
    isOpen && {
      borderRadius: '4px 4px 0 0',
      borderBottomWidth: 0
    }
)

const renderHtmlSection = (isOpen, setIsOpen, storyContext) => {
  return (
    <>
      <ButtonContainer>
        <ActionButton onClick={() => setIsOpen(!isOpen)} isHtmlOpen={isOpen}>
          {!isOpen ? 'Show' : 'Hide'} HTML code
        </ActionButton>
      </ButtonContainer>
      {isOpen && (
        <StyledSource
          code={beautifyHtmlString(
            ReactDOMServer.renderToStaticMarkup(storyContext),
            false
          )}
          dark
        />
      )}
    </>
  )
}

// TODO: figure out React source printing to be able to use custom label on docs tab
// TODO: figure out support for multiple JS frameworks
// const renderReactSection = (isOpen, setIsOpen) => {
//   return (
//     <>
//       <ButtonContainer>
//         <ActionButton onClick={() => setIsOpen(!isOpen)} isHtmlOpen={isOpen}>
//           {!isOpen ? 'Show' : 'Hide'} React code
//         </ActionButton>
//       </ButtonContainer>
//       {isOpen && <StyledSource code={'React Code...'} dark />}
//     </>
//   )
// }

const withAdditionalSourceTypes = makeDecorator({
  wrapper: (storyFn, context, { parameters }) => {
    const [isHtmlOpen, setIsHtmlOpen] = useState(false)
    const [isReactOpen, setIsReactOpen] = useState(false)
    const storyContext = storyFn(context)

    return (
      <>
        {storyContext}
        {context.viewMode === 'docs' && (
          <>
            {renderHtmlSection(isHtmlOpen, setIsHtmlOpen, storyContext)}
            {/* Include react rendering with custom label once source printing is sorted */}
            {/* renderReactSection(isReactOpen, setIsReactOpen) */}
          </>
        )}
      </>
    )
  }
})

export default withAdditionalSourceTypes
