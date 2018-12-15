import { alertConstants } from '../_constants'

export const alertUserActions = {
    success,
    errorAuth,
    errorRegister,
    clear
}

function success(message) {
    return { type: alertConstants.AUTH_SUCCESS, message }
}

function errorAuth(message) {
    return { type: alertConstants.AUTH_ERROR, message }
}

function errorRegister(message) {
	return { type: alertConstants.REGISTER_ERROR, message }
}

function clear() {
    return { type: alertConstants.CLEAR_ALL }
}