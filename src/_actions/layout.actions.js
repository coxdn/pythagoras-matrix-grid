import { layoutConstants } from '../_constants'

export const layoutActions = {
	add,
    update,
    remove,
    updateAll,
}

function add(content) {
    return {
        type: layoutConstants.ADD_ITEM,
        payload: content,
        generateId: true
    }
}

function update(id, content) {
    return {
        type: layoutConstants.UPDATE_ITEM,
        payload: {id, content}
    }
}

function remove(id) {
    return {
        type: layoutConstants.REMOVE_ITEM,
        payload: {id}
    }
}

function updateAll(layout) {
    return {
        type: layoutConstants.UPDATE_LAYOUT,
        payload: {layout}
    }	
}