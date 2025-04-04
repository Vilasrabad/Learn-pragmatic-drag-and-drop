import React, { useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const Squares = ({location, pieces, children}) => {
    const ref = useRef();
    const [isDraggedOver, setDraggedOver] = useState(false);
    const [isValidMove, setIsValidMove] = useState(false);

    const getColor = () => {
        return ((location[0] + location[1]) % 2 === 1) ? 'lightgrey': 'white';
    } 

    const canMove = (cLoc, pLoc, type) => {
        if(cLoc[0] === pLoc[0] && cLoc[1] === pLoc[1]) return false;
        const is = pieces.find((val) =>{
            return val.location.join('') === cLoc.join('');
        });
        if(is) return false;
        
        if(type === 'pawn'){
            if(cLoc[0]-1 === pLoc[0] && cLoc[1] === pLoc[1]) return true;
            else return false;
        }


        if(cLoc[0]-1 === pLoc[0] && cLoc[1]-1 === pLoc[1]) return true;
        if(cLoc[0]+1 === pLoc[0] && cLoc[1]+1 === pLoc[1]) return true;
        if(cLoc[0]+1 === pLoc[0] && cLoc[1] === pLoc[1]) return true;
        if(cLoc[0]-1 === pLoc[0] && cLoc[1] === pLoc[1]) return true;
        if(cLoc[0] === pLoc[0] && cLoc[1]+1 === pLoc[1]) return true;
        if(cLoc[0] === pLoc[0] && cLoc[1]-1 === pLoc[1]) return true;
        if(cLoc[0]+1 === pLoc[0] && cLoc[1]-1 === pLoc[1]) return true;
        if(cLoc[0]-1 === pLoc[0] && cLoc[1]+1 === pLoc[1]) return true;
    }

    const isEqualCoords = (cLoc, pLoc) => {
        if(cLoc[0] === pLoc[0] && cLoc[1] === pLoc[1]) return true;
        return false;
    }

    useEffect(() => {
        if(!ref.current) return;

        return dropTargetForElements({
            element: ref.current,
            getData: () => ({location}),
            canDrop: ({source}) => {
                return !isEqualCoords(source.data.location, location);
            },
            onDragEnter: ({source}) => {

                if(canMove(location, source.data.location, source.data.name)){
                    setIsValidMove(true);
                }
                else setIsValidMove(false);

                setDraggedOver(true)
            },
            onDragLeave: () => setDraggedOver(false),
            onDrop: () => setDraggedOver(false),
        })

    }, [pieces]);

    const getValidColor = () => {
        return isValidMove ? 'lightgreen' : 'pink'
    }

  return (
    <div 
        ref={ref} 
        key={`${location[0]}${location[1]}`} 
        className='block' 
        style={{
            backgroundColor: isDraggedOver? 
                getValidColor() 
                : 
                getColor()
        }}>
        {children}
    </div>
  )
}

export default Squares