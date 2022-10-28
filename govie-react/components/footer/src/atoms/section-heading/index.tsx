import styled from 'styled-components';
import { MEDIA_QUERIES } from '@govie-react/constants';
import { H2 } from '@govie-react/heading';
import { spacing } from '@govie-react/lib';
import { BORDER_COLOUR } from 'govuk-colours';

const SectionHeading = styled(H2)(
  {
    borderBottom: `1px solid ${BORDER_COLOUR}`,
    paddingBottom: spacing.simple(2),
    marginTop: 0,
    [MEDIA_QUERIES.DESKTOP]: {
      paddingBottom: spacing.simple(4),
    },
  },
  spacing.withWhiteSpace({ marginBottom: 7 })
);

export default SectionHeading;
