import { alertConstants } from '../_constants'

export const alertModalActions = {
    success,
    error
}

function success() {
    return { type: alertConstants.MODAL_SUCCESS }
}

function error(message) {
    return { type: alertConstants.MODAL_ERROR, message }
}