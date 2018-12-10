import { alertConstants } from '../_constants';

export const userAlertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.AUTH_SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.AUTH_ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}