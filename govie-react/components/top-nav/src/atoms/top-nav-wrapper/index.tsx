import styled from 'styled-components';
import { FONT_SIZE, LINE_HEIGHT, MEDIA_QUERIES, LATO_LIGHT } from '@govie-react/constants';

const TopNavWrapper = styled('div')<{ bgColor: string }>(({ bgColor, color }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: bgColor,
  color,
  fontFamily: LATO_LIGHT,
  fontWeight: 400,
  fontSize: FONT_SIZE.SIZE_14,
  lineHeight: LINE_HEIGHT.SIZE_14,
  [MEDIA_QUERIES.LARGESCREEN]: {
    fontSize: FONT_SIZE.SIZE_16,
    lineHeight: LINE_HEIGHT.SIZE_16,
  },
}));

export default TopNavWrapper;
