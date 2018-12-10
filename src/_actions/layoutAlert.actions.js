import { alertConstants } from '../_constants';

export const layoutAlertActions = {
    error
}

function error(id, message) {
    return { type: alertConstants.CREATE_ITEM_ERROR, id, message };
}