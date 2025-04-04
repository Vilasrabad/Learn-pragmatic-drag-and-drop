import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import React, { useEffect, useRef, useState } from 'react'

const Card = ({item, column}) => {
    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if(!element) return;

        return draggable({
            element,
            getInitialData: () => ({item, column }),
            onDragStart: () => setIsDragging(true),
            onDrop: () => setIsDragging(false)
        })
    }, [item]);

  return (
    <li ref={ref} className='card' style={{opacity: isDragging? 0.4: 1}}>
        {item}
    </li>
  )
}

export default Card