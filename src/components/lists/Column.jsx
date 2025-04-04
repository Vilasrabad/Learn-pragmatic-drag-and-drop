import React, { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const Column = ({data, column, children}) => {
    const ref = useRef(null);
    const [isDragOver, setDragOver] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if(!element) return;

        return dropTargetForElements({
            element,
            getData: () => ({column}),
            onDragEnter: () => {
                setDragOver(true)
            },
            onDragLeave: () => setDragOver(false),
            onDrop: () => setDragOver(false)
        })
    }, [data]);

  return (
    <ul ref={ref} className='column' style={{backgroundColor: isDragOver?"lightblue": ''}}>
        {children}
    </ul>
  )
}

export default Column