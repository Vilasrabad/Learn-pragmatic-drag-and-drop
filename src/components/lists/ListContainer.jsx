import React, { useEffect, useState, useCallback } from 'react';
import Column from './Column';
import Card from './Card';
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const ListContainer = () => {
    const [data, setData] = useState([
        { name: "To-Do", lists: ["Learn Redux", "Hello", "Test the code"] },
        { name: "In Progress", lists: ["Learning Pdnd"] },
        { name: "Done", lists: ["Watch Movie"] }
    ]);

    const changeColumn = useCallback((card, currentColumn, destinationColumn) => {
        setData((prevData) => {
            const newData = prevData.map((col) => {
                if (col.name === currentColumn) {
                    return { ...col, lists: col.lists.filter((val) => val !== card) };
                }
                if (col.name === destinationColumn) {
                    return { ...col, lists: [...col.lists, card] };
                }
                return col;
            });

            return newData;
        });
    }, []);


    useEffect(() => {
        const cleanup = monitorForElements({
            onDrop: ({ source, location }) => {
                const destination = location.current.dropTargets[0];
                if (!destination) return;

                const destinationColumn = destination.data.column;
                const targetedCard = source.data.item;
                const currentColumn = source.data.column;

                if (currentColumn === destinationColumn) return;

                changeColumn(targetedCard, currentColumn, destinationColumn);
            }
        });

        return cleanup;
    }, [changeColumn]);

    return (
        <div className='container'>
            {data.map((col, index) => (
                <div key={index}>
                    <h3>{col.name}</h3>
                    <Column column={col.name}>
                        {col.lists.map((dt, ind) => (
                            <Card key={ind} item={dt} column={col.name} />
                        ))}
                    </Column>
                </div>
            ))}
        </div>
    );
};

export default ListContainer;
