import { peoplesConstants } from '../_constants'

export const peoplesActions = {
	addToGrid,
    remove
}

function addToGrid(date) {
    return {
        type: peoplesConstants.ADD_ITEM_TO_GRID,
        payload: { date },
        generateId: true,
        checkDate: true
    }
}

function remove(value) {
    return {
        type: peoplesConstants.REMOVE_ITEM,
        payload: { value }
    }
}