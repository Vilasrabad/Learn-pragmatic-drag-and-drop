import React, { useEffect, useState } from 'react'
import Piece from './Piece';
import king from "/images/king.png";
import pawn from "/images/pawn.png";
import Squares from './Squares';
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function isSameBlock(a, b){
    return a[0] === b[0] && a[1] === b[1];
}


const King = ({location}) => {
    return <Piece img={king} location={location} name="king"/>
}
const Pawn = ({location}) => {
    return <Piece img={pawn} location={location} name="pawn"/>
}


function getBlocks(pieces){
    const blocks = [];
    for(let a=0; a < 8; a++){
        for(let b=0; b < 8; b++){
            const cord = [a, b];

            const piece = pieces.find((val) => isSameBlock(cord, val.location));

            const isDark = (a+b)%2 === 1;

            blocks.push(
                <Squares location={cord} pieces={pieces}>
                    {
                        piece &&
                        piece.name === 'king' ? 
                            <King location={cord}/>
                            :
                            piece && piece.name === "pawn" ?
                                <Pawn location={cord} />
                                : 
                                <></>
                    }
                </Squares>
            )
        }
    }

    return blocks;
}


const Crossword = () => {
    const [pieces, setPieces] = useState([
        {
          name: 'king',
          location: [3, 2],
        },
        {
          name: 'pawn',
          location: [1, 6],
        },
        {
          name: 'pawn',
          location: [3, 7],
        }
    ]);

    const canMove = (cLoc, pLoc, type, pieces) => {
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

    useEffect(() => {
        return monitorForElements({
            onDrop: ({source, location}) => {
                const destination = location.current.dropTargets[0];
                if(!destination) return;

                const destinationLocation = destination.data.location;
                const sourceLocation = source.data.location;
                const pieceType = source.data.name;

                const piece = pieces.find((val) => isSameBlock(val.location, sourceLocation));
                const restPieces = pieces.filter((val) => val !== piece);

                if(canMove(destinationLocation, sourceLocation, pieceType, pieces) && piece){
                    setPieces([{name: piece.name, location: destinationLocation}, ...restPieces]);
                }
            }
        })
    }, [pieces]);

  return (
    <div className='crossword'>
        {getBlocks(pieces)}
    </div>
  )
}

export default Crossword