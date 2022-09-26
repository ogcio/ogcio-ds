import { makeDecorator } from '@storybook/addons';
import { Source } from '@storybook/components';
import { styled } from '@storybook/theming';

import ReactDOMServer from 'react-dom/server';
import { useState } from 'react';

const StyledSource = styled(Source)(({ theme }) => ({
  margin: '0 -20px',
  borderRadius: 0,
  border: 'none',
}));

const ButtonContainer = styled.div(({ theme }) => ({
  margin: '0 -20px',
  justifyContent: 'flex-end',
  display: 'flex',
}));

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
      outline: '0 none',
    },
  }),
  ({ isOpen }) =>
    isOpen && {
      borderRadius: '4px 4px 0 0',
      borderBottomWidth: 0
    }
);

const withHtmlSource = makeDecorator({
  wrapper: (storyFn, context, { parameters }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {storyFn(context)}
        {context.viewMode === 'docs' && (
          <>
            <ButtonContainer>
              <ActionButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
                {!isOpen ? 'Show' : 'Hide'} HTML code
              </ActionButton>
            </ButtonContainer>
            {isOpen && (
              <StyledSource
                code={ReactDOMServer.renderToStaticMarkup(storyFn(context))}
                dark
              />
            )}
          </>
        )}
      </>
    );
  },
});

export default withHtmlSource;
