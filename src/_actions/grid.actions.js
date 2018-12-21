import { gridConstants } from '../_constants'

export const gridActions = {
	addSelected,
    addEmpty,
    calcNew,
    // update,
    remove,
    updateAll
}

function addSelected(value) {
    return {
        type: gridConstants.ADD_ITEM,
        payload: { value },
        generateId: true,
        getNearestCoords: true
    }
}

function addEmpty(message) {
    return {
        type: gridConstants.ADD_ITEM,
        payload: { empty: true, message },
        generateId: true,
        getNearestCoords: true
    }
}

function calcNew(id, date) {
    return {
        type: gridConstants.UPDATE_ITEM,
        payload: { id, date },
        checkDate: true
    }
}

/*function update(id, content) {
    return {
        type: gridConstants.UPDATE_ITEM,
        payload: {id, content}
    }
}*/

function remove(id) {
    return {
        type: gridConstants.REMOVE_ITEM,
        payload: { id }
    }
}

function updateAll(layout) {
    return {
        type: gridConstants.UPDATE_ALL,
        payload: { layout }
    }
}
