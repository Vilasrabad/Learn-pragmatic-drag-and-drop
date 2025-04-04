/** @jsx jsx */;
import { useRef } from 'react';
import Board from './Board';
import { Column } from './Column';
import { useData } from '../../context/Peoples';

export default function BoardExample() {
    const { data } = useData();
    const ref = useRef(null);

    return (
        <Board ref={ref}>
            {data.orderedColumnIds.map(columnId => {
                return <Column column={data.columnMap[columnId]} key={columnId} />;
            })}
        </Board>
    );
}
