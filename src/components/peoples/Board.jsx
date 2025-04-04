/** @jsx jsx */

import { forwardRef, memo, ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { columnGap, gridSize } from './util/constants';


const boardStyles = css({
  display: 'flex',
  justifyContent: 'center',
  width: "50rem",
  gap: columnGap,
  flexDirection: 'row',
  '--grid': `${gridSize}px`,
  height: 480,
});

const Board = forwardRef(({ children }, ref) => {
  return (
    <div css={boardStyles} ref={ref} style={{ display: 'flex', gap: '8px', height: '580px', ovrflow: 'hidden' }}>
      {children}
    </div>
  );
},
);

export default memo(Board);
