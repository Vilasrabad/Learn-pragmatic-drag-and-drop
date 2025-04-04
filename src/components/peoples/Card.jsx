/** @jsx jsx */
import { memo, useRef } from 'react';

import { css, jsx } from '@emotion/react';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import Heading from '@atlaskit/heading';
import MoreIcon from '@atlaskit/icon/glyph/more';
// import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';
// import { cardGap } from './util/constants';
import { useDragDrop } from '../../hooks/useDragDrop';
// import { createPortal } from 'react-dom';


const noMarginStyles = css({ margin: 0 });
const noPointerEventsStyles = css({ pointerEvents: 'none' });
const containerStyles = xcss({
    width: '100%',
    borderRadius: 'border.radius.200',
    boxShadow: 'elevation.shadow.raised',
    position: 'relative',
});
const draggingStyles = xcss({
    opacity: 0.6,
});


const CardDisplay = ({ref, isDragging=false, closestEdge='', preview, item}) => {
    const { avatarUrl, itemId, name, role } = item;

    return (
        <Box
            ref={ref}
            testId={`item-${itemId}`}
            backgroundColor="elevation.surface"
            padding="space.100"
            xcss={[containerStyles, isDragging && draggingStyles]}
        >
            <Inline space="space.100" alignBlock="center" grow="fill">
                <Avatar size="large" src={avatarUrl}>
                    {props => (
                        <div
                            {...props}
                            ref={props.ref}
                            css={noPointerEventsStyles}
                        />
                    )}
                </Avatar>
                <Stack space="space.050" grow="fill">
                    <Heading level="h400" as="span">
                        {name}
                    </Heading>
                    <small css={noMarginStyles}>{role}</small>
                </Stack>
                <Button iconBefore={<MoreIcon label="..." />} appearance="subtle" />
            </Inline>
            {/* {closestEdge && <DropIndicator edge={closestEdge} gap={`${cardGap}px`} />} */}
        </Box>
    );
}


const CardShadow = () => {
    return <div style={{backgroundColor: '#27548A', width: '100%', height: '4rem', borderRadius: '10px'}} />
}



export const Card = memo(function Card({ item, columnId }) {
    const ref = useRef(null);

    const { isDragging, closestEdge, preview } = useDragDrop(
        ref, 
        item.itemId, 
        'card', 
        ['top', 'bottom']
    );

    return (
        <>
            {
                closestEdge === 'top' &&
                    <CardShadow />
            }
            <div className='outline-box'>
                <CardDisplay ref={ref} isDragging={isDragging} closestEdge={closestEdge} preview={preview} item={item}/>
            </div>
            {
                closestEdge === 'bottom' &&
                    <CardShadow />
            }
        </>
    );
});
