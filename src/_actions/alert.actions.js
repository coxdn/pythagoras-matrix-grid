import { alertConstants } from '../_constants'

const alertActions = {
	modal,
	grid,
	user,
	peoples
}

const actions = getActions()

actions.clearAll = clearAll

export {actions as alertActions}


function modal() {
	return {
	    error
	}

	function error(message) {
	    return { type: alertConstants.MODAL_ERROR, payload: { message } }
	}
}


function grid() {
	return {
		error
	}

	function error(message) {
    	return { type: alertConstants.GRID_CREATE_ITEM_ERROR, payload: { message } }
	}
}


function user() {
	return {
	    success,
	    errorAuth,
	    errorRegister
	}

	function success(message) {
	    return { type: alertConstants.AUTH_SUCCESS, payload: { message } }
	}

	function errorAuth(message) {
	    return { type: alertConstants.AUTH_ERROR, payload: { message } }
	}

	function errorRegister(message) {
		return { type: alertConstants.REGISTER_ERROR, payload: { message } }
	}
}

function peoples() {
	return {
		error,
		clear
	}

	function error(message) {
    	return { type: alertConstants.PEOPLES_CREATE_ITEM_GRID_ERROR, payload: { message } }
	}

	function clear() {
		return { type: alertConstants.PEOPLES_CLEAR_ERROR }
	}
}


function clearAll() {
    return { type: alertConstants.CLEAR_ALL_ERROR }
}


function getActions() {
	return Object.keys(alertActions).reduce((acc, item) => {
		acc[item] = alertActions[item]()
		return acc
	}, {})
}