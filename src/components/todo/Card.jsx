import React, { useRef } from 'react'
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { useDrag } from '../../hooks/useDragAndDrop';

const outerStyle = {
    border: '2px solid rgba(95, 95, 95, 0.26)',
    borderRadius: '8px',
    padding: '24px 14px',
    color: 'black',
    display: 'flex',
    background: 'linear-gradient(to bottom right, #ffffff,#d2fff8)'
}

const Card = ({ data }) => {
    const ref = useRef(null);
    const { isDragging, closestEdge } = useDrag(ref, data);

    return (
        <div style={{ padding: '4px 0px', position: 'relative', margin: '0 18px' }}>
            <div ref={ref} style={{ ...outerStyle, opacity: isDragging ? '0.4' : '1' }}>
                <span style={{ userSelect: 'none' }}>{data.title}</span>
                {closestEdge && <DropIndicator edge={closestEdge} />}
            </div>
        </div>
    )
}

export default Card