export const checkDropDisable = ({state, droppableId}) => {
    const temp = state.items[droppableId].filter(
    item => !getHideFlag({state, droppableId, id: item.id})
    ).filter(item => !item.opacity)
    // console.log('--- checkDropDisable', droppableId, temp.length)

    return state.items[droppableId].filter(
    item => !getHideFlag({state, droppableId, id: item.id})
    ).filter(item => !item.opacity).length >= state.boardHeight
}

// fake data generator
export const getItems = (droppables, draggables, shown = false, offset = 0) => {
    const createArray = count => Array.from({ length: count }, (v, k) => k)
    const createObject = (count, arrayCreator) => createArray(count).reduce((acc, item) => {
        acc['d'+item] = arrayCreator(item)
        return acc
    }, {})

    function arrayCreator(droppableIndex) {
        return createArray(this.draggables * 2/*(this.items ? 2 : 1)*/).map(k => {
            const i = k/2|0 //this.items ? k/2|0 : k
            const forId = k%2 ? '-hidden' : ''
            const id = `item-${droppableIndex}-${(i + this.offset)+forId}`
            const content = `item ${droppableIndex} ${(i + this.offset)+forId}`
            const opacity = i >= this.shown ? true : false
            const hidden = k%2 && this.hidden ? true : false
            return {id, content, opacity, hidden}
        })
    }

    const params = {draggables, shown, offset}

    return {
        items: createObject(droppables, arrayCreator.bind({...params, items: true})),
        hidden: createObject(droppables, arrayCreator.bind({...params, hidden: true}))
    }
}

export function getHideFlag({state, droppableId, id}) {
    // return false
    const search = state.hidden[droppableId].filter(hidden => hidden.id==id)
    if(!search.length) return false
    return search[0].hidden
}

const getItems1 = (draggables, shown, offset = 0) =>
    Array.from({ length: draggables }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`,
        opacity: k >= shown ? true : false
    }));

export const getItems2 = (draggables, shown, offset = 0) => ({
    items: {
        "d0": getItems1(draggables, shown, offset),
        "d1": getItems1(draggables, shown, offset+10),
        "d2": getItems1(draggables, shown, offset+20)
    }
})

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    endIndex = endIndex
    const result = Array.from(list);
    const [...removed] = result.splice(startIndex, 2)
    // console.log('--- removed', removed, startIndex, endIndex*2)
    result.splice((endIndex-(startIndex/2))*2, 0, ...removed)

    return result;
};

/**
 * Moves an item from one list to another list.
 */
export const move = (source, destination, droppableSource, droppableDestination) => {
    console.log('---- destination', destination, 'source', source)
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle, opacity = false, hidden = false) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    opacity: opacity ? 0.5 : 1,
    display: hidden ? 'none' : 'block',
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = (isDraggingOver, snapshot) => {
    // console.log('snapshot', snapshot)
    return {
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250
    }
}