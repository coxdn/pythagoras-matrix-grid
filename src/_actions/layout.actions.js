import { userConstants } from '../_constants'

export const layoutActions = {
	add,
	updateAll
}

function add(content) {
    return {
        type: userConstants.ADD_ITEM,
        payload: content,
        generateId: true
    }
}

function updateAll(layout) {
    return {
        type: userConstants.UPDATE_LAYOUT,
        payload: layout
    }	
}