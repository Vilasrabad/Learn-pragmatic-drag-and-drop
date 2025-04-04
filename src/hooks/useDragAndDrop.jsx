import { useState, useEffect } from "react";
import {
    draggable,
    dropTargetForElements
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
    attachClosestEdge,
    extractClosestEdge
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { useTodo } from "./useTodo";

export const useDrag = (ref, data) => {
    const [isDragging, setIsDragging] = useState(false);
    const [closestEdge, setClosestEdge] = useState(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        return combine(
            draggable({
                element,
                getInitialData: () => {
                    return data;
                },
                onDragStart: () => {
                    setIsDragging(true);
                },
                onDrop: () => {
                    setIsDragging(false);
                }
            }),

            dropTargetForElements({
                element,
                getData: ({ input, element }) => {
                    const dt = {
                        data: data
                    };

                    return attachClosestEdge(dt, {
                        input,
                        element,
                        allowedEdges: ['top', 'bottom']
                    });
                },
                onDragEnter: ({ self }) => {
                    setClosestEdge(extractClosestEdge(self.data));
                },
                onDrag: ({ self }) => {
                    setClosestEdge(extractClosestEdge(self.data));
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: () => {
                    setClosestEdge(null);
                }
            })
        )
    }, []);

    return { isDragging, closestEdge };
}


export const useDrop = (ref, containerId) => {
    const [isDragOver, setDragOver] = useState(false);
    const { moveData } = useTodo();

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        return dropTargetForElements({
            element,
            getData: () => {
                return { id: containerId };
            },
            onDragEnter: () => {
                setDragOver(true);
            },
            onDragLeave: () => {
                setDragOver(false);
            },
            onDrop: ({ source, location, self }) => {
                setDragOver(false);
                const card = source.data;
                const target = location.current.dropTargets[0]?.data?.data;

                if (!card) return;

                let targetColId;
                let targetPosition;
                if (!target) {
                    targetColId = self.data.id;
                    targetPosition = 1;
                }
                else {
                    targetColId = target.columnId;
                    targetPosition = target.position + 1;
                }

                moveData(card.id, card.columnId, targetColId, targetPosition);
            },
        })
    }, []);

    return { isDragOver };
}


export const useDragAndDrop = (ref, containerRef, data, containerId, handleDrop) => {
    const [isDragging, setIsDragging] = useState(false);
    const [closestEdge, setClosestEdge] = useState(null);

    const { moveData } = useTodo();

    useEffect(() => {
        const element = ref.current;
        const container = containerRef.current;

        if (!element || !container) return;

        return combine(
            draggable({
                element,
                getInitialData: () => {
                    return data;
                },
                onDragStart: () => {
                    setIsDragging(true);
                },
                onDrop: () => {
                    setIsDragging(false);
                }
            }),

            dropTargetForElements({
                element,
                getData: ({ input, element }) => {
                    const dt = {
                        data: data
                    };

                    return attachClosestEdge(dt, {
                        input,
                        element,
                        allowedEdges: ['top', 'bottom']
                    });
                },
                onDragEnter: ({ self }) => {
                    setClosestEdge(extractClosestEdge(self.data));
                },
                onDrag: ({ self }) => {
                    setClosestEdge(extractClosestEdge(self.data));
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: () => {
                    setClosestEdge(null);
                }
            }),

            dropTargetForElements({
                element: container,
                getData: () => {
                    return { id: containerId };
                },
                onDrop: ({ source, location, self }) => {
                    const card = source.data;
                    const target = location.current.dropTargets[0]?.data?.data;

                    if (!card) return;

                    let targetColId;
                    let targetPosition;
                    if (!target) {
                        targetColId = self.data.id;
                        targetPosition = 1;
                    }
                    else {
                        targetColId = target.columnId;
                        targetPosition = target.position + 1;
                    }

                    moveData(card.id, card.columnId, targetColId, targetPosition);
                },
            })
        )
    }, [ref, containerRef]);

    return { isDragging, closestEdge };
}

