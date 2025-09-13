import { gridConstants, peoplesConstants } from '../_constants'

export const gridActions = {
	addByClick,
    addByKeyPress,
    addEmpty,
    calcNew,
    remove,
    updateAll
}

function addByClick(value) {
    return {
        type: gridConstants.ADD_ITEM,
        payload: {
            randomId: Math.random().toString(),
            value
        }
    }
}

function addByKeyPress(date) {
    return {
        type: peoplesConstants.ADD_ITEM_TO_GRID,
        payload: {
            randomId: Math.random().toString(),
            date
        },
        ceckDate: true
    }
}

function addEmpty(message) {
    return {
        type: gridConstants.ADD_ITEM,
        payload: {
            empty: true,
            randomId: Math.random().toString(),
            message
        }
    }
}

function calcNew(id, date) {
    return {
        type: gridConstants.UPDATE_ITEM,
        payload: { id, date },
        checkDate: true
    }
}

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
