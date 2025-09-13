import { peoplesConstants } from '../_constants'

export const peoplesActions = {
    remove
}

function remove(value) {
    return {
        type: peoplesConstants.REMOVE_ITEM,
        payload: { value }
    }
}