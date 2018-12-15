import { alertConstants } from '../_constants';

export const layoutAlertActions = {
    error
}

function error(message) {
    return { type: alertConstants.CREATE_ITEM_ERROR, message };
}