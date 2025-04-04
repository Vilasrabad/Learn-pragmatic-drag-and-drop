import React from 'react'
import { useTodo } from '../../hooks/useTodo'
import Column from './Column';

const style = {
    height: '48rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem'
}

function Board() {

    const { data } = useTodo();

    return (
        <div style={style}>
            {
                data?.map((column) => {
                    return <Column key={column.id} data={column.cards} column={column.name} columnId={column.id} />
                })
            }
        </div>
    )
}

export default Board