/** @jsx jsx */
import { memo, useRef } from 'react';

import { css, jsx } from '@emotion/react';
// import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";

import { cardGap, columnGap } from './util/constants';
import { Card } from './Card';
import { useDragDrop } from '../../hooks/useDragDrop';

const columnStyles = css({
    display: 'flex',
    width: 250,
    flexDirection: 'column',
    background: '#F7F8F9',
    borderRadius: 'calc(var(--grid) * 2)',
    position: 'relative',
});

const scrollContainerStyles = css({
    height: '100%',
    overflowY: 'auto',
});

const cardListStyles = css({
    display: 'flex',
    boxSizing: 'border-box',
    minHeight: '100%',
    padding: 'var(--grid)',
    gap: cardGap,
    flexDirection: 'column',
});

const columnHeaderStyles = css({
    display: 'flex',
    padding: 'calc(var(--grid) * 2) calc(var(--grid) * 2) calc(var(--grid) * 1)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#626F86',
    userSelect: 'none',
});

const isDraggingOverColumnStyles = css({
    backgroundColor: '#CCE0FF',
});


const ColumnDisplay = ({isDragging, columnRef, column, headerRef, cardListRef}) => {
    const columnId = column.columnId;
    
    return (
        <div
            css={[columnStyles, isDragging && isDraggingOverColumnStyles]}
            ref={columnRef}
            style={{ position: 'relative', height: '100%', opacity: isDragging ? '0.4' : '1', backgroundColor: '#AFDDFF' }}
        >
            <div
                css={columnHeaderStyles}
                ref={headerRef}
                data-testid={`column-${columnId}--header`}
            >
                <h2 style={{ color: '#000000' }}>
                    {column.title}
                </h2>
            </div>
            <div css={scrollContainerStyles} style={{ height: '83%', overflowY: 'auto', overflowX: 'hidden', padding: '10px 10px' }}>
                <div css={cardListStyles} ref={cardListRef} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '15rem' }}>
                    {column.items.map(item => (
                        <Card item={item} key={item.itemId} columnId={columnId}/>
                    ))}
                </div>
            </div>
            {/* {closestEdge && (
                <DropIndicator edge={closestEdge} />
            )} */}
        </div>
    );
}

const ColumnShadow = () =>{
    return <div style={{backgroundColor: '#27548A', height: '100%', width: '17rem'}}/>
}


export const Column = memo(function Column({ column }) {
    const columnId = column.columnId;
    const columnRef = useRef(null);
    const headerRef = useRef(null);
    const cardListRef = useRef(null);

    // const isDragging = false;
    // const closestEdge = '';
    const { isDragging, closestEdge } = useDragDrop(columnRef, columnId, 'column', ['left', 'right']);

    return (
        <>
            {
                closestEdge === "left" &&
                    <ColumnShadow />
            }
            <ColumnDisplay isDragging={isDragging} column={column} columnRef={columnRef} headerRef={headerRef} cardListRef={cardListRef}/>
            {
                closestEdge === "right" &&
                    <ColumnShadow />
            }
        </>
    );
});





// Hello team,
// I'm currently facing an electricity issue, and my laptop is about to shut down. I will be unavailable until the power is restored.
// Once electricity is back, I will  resume my work.

// Thanks & Regards
// Vilas Rabad