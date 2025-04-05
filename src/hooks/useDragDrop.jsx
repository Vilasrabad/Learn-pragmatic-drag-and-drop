import { attachClosestEdge, extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { useEffect, useState } from "react"
import { useData } from "../context/Peoples";
import {
    monitorForElements,
    draggable,
    dropTargetForElements
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element"
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import invariant from "tiny-invariant";
import { dropTargetForExternal, monitorForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';


/*
    parameter type = {
        ref: useRef(Reference of element),
        itemId: current unique item id,
        type: 'single' | 'different',
        allowedEdges: ['top', 'bottom', 'left', 'right']
    }
*/

const externalDragPayload = 'application/x.card';

const isDraggingExternalCard = ({source})=> {
    if(source.types.includes(externalDragPayload)) return true;
    return false;
}


export const useDragDrop = ({ref, itemId, parentId, type, allowedEdges}) => {
    const [closestEdge, setClosestEdge] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const { data, setData } = useData();
    const [preview, setPreview] = useState({
        container: '',
        dragging: ''
    })

    const detectEdge = (args) => {
        let edge = '';
        if (args.self.data?.type === args.source.data?.type) {
            edge = extractClosestEdge(args.self.data);
        }
        else if (args.self.data?.type === args.source.data?.type) {
            edge = extractClosestEdge(args.self.data);
        }
        setClosestEdge(edge);
    }

    useEffect(() => {
        invariant(ref.current);
        return combine(
            draggable({
                element: ref.current,
                getInitialData: () => {
                    return { type: type, itemId: itemId };
                },
                getInitialDataForExternal: () => {
                    localStorage.removeItem(externalDragPayload);
                    if(type === 'card'){
                        if(parentId){
                            const obj = {
                                itemId,
                                parentId
                            }
                            localStorage.setItem(externalDragPayload, JSON.stringify(obj));
                        }
                        return{
                            [externalDragPayload]: itemId,
                            ['text/plain']: itemId,
                        }
                    }
                },
                onDragStart: () => setIsDragging(true),
                onDrop: () => {
                    setIsDragging(false);
                    
                    // else {
                    //     localStorage.setItem(externalDragPayload, itemId);
                    // }
                }
            }),
            autoScrollForElements({
                element: ref.current,
                getConfiguration: () => ({
                    maxScrollSpeed: 'fast'
                })
            }),
            dropTargetForExternal({
                element: ref.current,
                canDrop: isDraggingExternalCard,
                getDropEffect: () => 'move',
                getIsSticky: () => true,
                getData: ({input, element}) => {
                    const dt = { type: type, itemId: itemId };
                    return attachClosestEdge(dt, {
                        input,
                        element,
                        allowedEdges: allowedEdges
                    })
                },
                onDragEnter: args => {
                    if(args.self.data.type === 'card'){
                        setClosestEdge(extractClosestEdge(args.self.data))
                    }
                },
                onDrag: args => {
                    if(args.self.data.type === 'card'){
                        setClosestEdge(extractClosestEdge(args.self.data))
                    }
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: (args) => {
                    setClosestEdge(null);
                },
            }),
            dropTargetForElements({
                element: ref.current,
                canDrop: (args) => args.source.data.type === 'card' || args.source.data.type === 'column',
                getIsSticky: () => true,
                getData: ({ input, element }) => {
                    const dt = { type: type, itemId: itemId };

                    return attachClosestEdge(dt, {
                        input,
                        element,
                        allowedEdges: allowedEdges,
                    });
                },
                onDragEnter: args => {
                    detectEdge(args);
                },
                onDrag: args => {
                    detectEdge(args);
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: (args) => {
                    setClosestEdge(null);
                },
            }),
        )
    }, [itemId]);


    useEffect(() => {
        return combine(
            monitorForExternal({
                canMonitor: isDraggingExternalCard,
                onDrop({location}){
                    const source = JSON.parse(localStorage.getItem(externalDragPayload));
                    const target = location.current.dropTargets[0].data;
                    const targetColumnId = location.current.dropTargets[1].data.itemId;
                    
                    const sourceColumn = data.columnMap[source.parentId];
                    const targetColumn = data.columnMap[targetColumnId];
                    const sourceList = sourceColumn.items;
                    const targetList = targetColumn.items;

                    const sourceCard = sourceList.find((item) => item.itemId === source.itemId);
                    const updateSourceList = sourceList.filter((item) => item.itemId !== source.itemId);
                    // console.log(sourceColumn);
                    // targetList.push(sourceCard);
                    const closestEdgeOfTarget = extractClosestEdge(target);
                    const updateTargetList = [...targetList, sourceCard];
                    const targetIndex = updateTargetList.findIndex((val) => val.itemId === target.itemId);
                    const reorderTargetList = reorderWithEdge({
                        list: updateTargetList,
                        startIndex: updateTargetList.length - 1,
                        closestEdgeOfTarget: closestEdgeOfTarget,
                        indexOfTarget: targetIndex,
                        axis: 'vertical'
                    })

                    const updateMap = {
                        ...data.columnMap,
                        [targetColumn.columnId]: {
                            ...targetColumn,
                            items: reorderTargetList
                        },
                        [sourceColumn.columnId]: {
                            ...sourceColumn,
                            items: updateSourceList
                        }
                    }

                    setData({ ...data, columnMap: updateMap });
                }
            }),
            monitorForElements({
                onDrop(args) {
                    const { location, source } = args;
                    
                    if (location.current.dropTargets.length === 0) {
                        return;
                    }
                    
                    if (source.data.type === "column") {
                        const startIndex = data.orderedColumnIds.findIndex(
                            columnId => columnId === source.data.itemId,
                        );

                        const target = location.current.dropTargets[0];
                        const indexOfTarget = data.orderedColumnIds.findIndex(
                            id => id === target.data.itemId,
                        );

                        const closestEdgeOfTarget = extractClosestEdge(
                            target.data,
                        );

                        const updated = reorderWithEdge({
                            list: data.orderedColumnIds,
                            startIndex,
                            indexOfTarget,
                            closestEdgeOfTarget,
                            axis: 'horizontal',
                        });

                        setData({ ...data, orderedColumnIds: updated });
                    }

                    // for column
                    else if (source.data.type === "card") {
                        // console.log(location, source);
                        const target = location.current.dropTargets[1];
                        const targetColumnId = target.data?.itemId;
                        const sourceItemId = source.data?.itemId;
                        const targetCard = location.current.dropTargets[0].data;

                        const isExistsInSameCol = data.columnMap[targetColumnId]?.items?.find((val) => val.itemId === sourceItemId);

                        //* In the same column
                        const closestEdgeOfTarget = extractClosestEdge(targetCard);
                        if (isExistsInSameCol) {
                            const list = data.columnMap[targetColumnId]?.items;

                            // console.log(list);
                            const targetIndex = list.findIndex((val) => val.itemId === targetCard.itemId);
                            const startIndex = list.findIndex((val) => val.itemId === sourceItemId);
                            const updatedItems = reorderWithEdge({
                                list: list,
                                startIndex: startIndex,
                                closestEdgeOfTarget: closestEdgeOfTarget,
                                indexOfTarget: targetIndex,
                                axis: 'vertical'
                            })

                            const targetColumn = data.columnMap[targetColumnId];

                            const updateMap = {
                                ...data.columnMap,
                                [targetColumn.columnId]: {
                                    ...targetColumn,
                                    items: updatedItems
                                }
                            }

                            setData({ ...data, columnMap: updateMap });
                            return;
                        }
                        else { //* in other column
                            const sourceColumnId = location.initial.dropTargets[1]?.data?.itemId;
                            // console.log(sourceColumnId, targetColumnId);
                            const sourceColumn = data.columnMap[sourceColumnId];
                            const targetColumn = data.columnMap[targetColumnId];
                            const sourceList = sourceColumn.items;
                            const targetList = targetColumn.items;


                            const sourceCard = sourceList.find((item) => item.itemId === sourceItemId);
                            const updateSourceList = sourceList.filter((item) => item.itemId !== sourceItemId);
                            // console.log(sourceColumn);
                            // targetList.push(sourceCard);
                            const updateTargetList = [...targetList, sourceCard];
                            const targetIndex = updateTargetList.findIndex((val) => val.itemId === targetCard.itemId);
                            const reorderTargetList = reorderWithEdge({
                                list: updateTargetList,
                                startIndex: updateTargetList.length - 1,
                                closestEdgeOfTarget: closestEdgeOfTarget,
                                indexOfTarget: targetIndex,
                                axis: 'vertical'
                            })

                            const updateMap = {
                                ...data.columnMap,
                                [targetColumn.columnId]: {
                                    ...targetColumn,
                                    items: reorderTargetList
                                },
                                [sourceColumn.columnId]: {
                                    ...sourceColumn,
                                    items: updateSourceList
                                }
                            }

                            setData({ ...data, columnMap: updateMap });
                        }
                    }
                }
            }),
        )
    }, [data]);

    return { isDragging, closestEdge, preview };
}

