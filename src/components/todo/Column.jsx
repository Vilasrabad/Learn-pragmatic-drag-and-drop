import React, { useEffect, useRef, useState } from 'react'
import Card from './Card';
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useTodo } from '../../hooks/useTodo';
import { useDrag, useDrop } from '../../hooks/useDragAndDrop';

const style = {
    width: '22rem',
    height: '100%',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

const innerStyle = {
    height: '92%',
    overflow: 'auto',
    padding: '8px 0px'
}

const headerStyle = {
    color: 'black',
    padding: '16px 4px',
    margin: 0
};

function Column({ data, column, columnId }) {
    const ref = useRef(null);

    const { isDragOver } = useDrop(ref, columnId);
    // const { isDragging, closestEdge } = useDrag(ref);

    return (
        <div ref={ref} style={{ ...style, backgroundColor: isDragOver ? '#aef2ff' : 'white' }}>
            <h3 style={headerStyle}>{column}</h3>
            <div style={innerStyle}>
                {
                    data?.map((card) => {
                        return <Card key={card.id} data={card} />
                    })
                }
            </div>
        </div>
    )
}

export default Column