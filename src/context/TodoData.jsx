import { createContext, useCallback, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {

    const [data, setData] = useState([
        {
            id: "todo",
            name: "To-Do",
            cards: [
                {
                    id: 'id-1',
                    title: "Learn Redux",
                    position: 1,
                    columnId: "todo"
                },
                {
                    id: 'id-2',
                    title: "Hello",
                    position: 2,
                    columnId: "todo"
                },
                {
                    id: 'id-4',
                    title: "Test the code",
                    position: 3,
                    columnId: "todo"
                },
                {
                    id: 'id-16',
                    title: "Test the code",
                    position: 11,
                    columnId: "todo"
                },
                {
                    id: 'id-12',
                    title: "Test the code",
                    position: 4,
                    columnId: "todo"
                },
                {
                    id: 'id-6',
                    title: "Test the code",
                    position: 5,
                    columnId: "todo"
                },
                {
                    id: 'id-7',
                    title: "Test the code",
                    position: 6,
                    columnId: "todo"
                },
                {
                    id: 'id-8',
                    title: "Test the code",
                    position: 7,
                    columnId: "todo"
                },
                {
                    id: 'id-10',
                    title: "Test the code",
                    position: 8,
                    columnId: "todo"
                },
                {
                    id: 'id-11',
                    title: "Test the code",
                    position: 9,
                    columnId: "todo"
                },
                {
                    id: 'id-13',
                    title: "Test the code",
                    position: 10,
                    columnId: "todo"
                },
            ]
        },
        {
            id: "in-progress",
            name: "In Progress",
            cards: [
                {
                    id: 'id-3',
                    title: "Learning Pdnd",
                    position: 2,
                    columnId: "in-progress"
                },
            ]
        },
        {
            id: "done",
            name: "Done",
            cards: [
                {
                    id: 'id-5',
                    title: "Watch Movie",
                    position: 2,
                    columnId: "done"
                },
            ]
        }
    ]);

    const moveData = useCallback((cardId, cardColumnId, targetColumnId, targetPosition) => {
        setData((prevData) => {
            let currentCard = null;

            const updatedData = prevData.map((column) => {
                if (column.id === cardColumnId) {
                    const filteredCards = column.cards.filter(({ id }) => id !== cardId);
                    currentCard = column.cards.find(({ id }) => id === cardId);
                    return { ...column, cards: filteredCards };
                }
                return column;
            });

            if (currentCard) {
                const newCard = { ...currentCard, position: targetPosition, columnId: targetColumnId };

                return updatedData.map((column) => {
                    if (column.id === targetColumnId) {
                        const newCards = [...column.cards, newCard];
                        return { ...column, cards: newCards };
                    }
                    return column;
                });
            }

            return prevData;
        });
    }, [setData]);

    return <TodoContext.Provider value={{ data, moveData }}>
        {children}
    </TodoContext.Provider>
}


export default TodoContext;