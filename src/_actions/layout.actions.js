import { layoutConstants } from '../_constants'
import { layoutAlertActions } from './';
import { psy } from '../_helpers'

export const layoutActions = {
	addSelected,
    addEmpty,
    createNew,
    // update,
    remove,
    updateAll
}

function addSelected(content) {
    return {
        type: layoutConstants.ADD_ITEM,
        payload: content,
        generateId: true
    }
}

function addEmpty(message) {
    return {
        type: layoutConstants.ADD_ITEM,
        payload: {createEmpty: true},
        generateId: true,
        message
    }
}

function createNew(id, date) {
    return {
        type: layoutConstants.UPDATE_ITEM,
        payload: {id, date},
        checkNew: true,
    }
}

/*function update(id, content) {
    return {
        type: layoutConstants.UPDATE_ITEM,
        payload: {id, content}
    }
}*/

function remove(id) {
    return {
        type: layoutConstants.REMOVE_ITEM,
        payload: {id}
    }
}

function updateAll(layout) {
    return {
        type: layoutConstants.UPDATE_ALL,
        payload: {layout}
    }
}

function errorOnCreate(message) {
    return dispatch => {
        dispatch(layoutAlertActions.error(message))
    }
}