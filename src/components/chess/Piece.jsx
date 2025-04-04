import React, { useEffect, useRef, useState } from 'react'
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const Piece = ({img, location, name}) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(()=> {
    if(!ref.current) return;

    console.log("Init....");

    return draggable({
      element: ref.current,
      getInitialData: () => ({location, name}),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    })
  }, [])


  return (
    <div 
        className="element"
    >
        <img 
        ref={ref}
        src={img}
        draggable={true}
        style={{ width: '100%', height: '100%', opacity: dragging ? 0.4 : 1  }}
        />
    </div>
  )
}

export default Piece