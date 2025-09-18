import { editService } from '../_services'
import { editConstants } from '../_constants'
import { alertActions } from './'
import { pythagoras } from '../_helpers'

export const modalActions = {
    hide,
    showEditing,
    showCreating,
    save,
    remove
}

function hide() {
    return {
        type: editConstants.MODAL_HIDE
    }
}

function showEditing(value) {
    return {
        type: editConstants.MODAL_EDIT_ITEM,
        payload: { value },
    }
}

function showCreating(id) {
    return {
        type: editConstants.MODAL_CREATE_ITEM,
        payload: { id },
    }
}


function save({id, value, _name, date, tags: oldTags}) {
    const tags = oldTags.map(item => {
        const num = parseInt(item.value, 10)
        return item.__isNew__ || Number.isNaN(num)
            ? { label: item.label }
            : { label: item.label, value: num }
    })
    return dispatch => {
        const checkDate = pythagoras.checkDate(date)
        if (checkDate.error) {
            dispatch(alertActions.modal.error(checkDate.error))
            return
        }

        dispatch(request())

        editService.save({id: value, name: _name, date: checkDate.fullDate, tags})
            .then(
                json => {
                    if (json.error) {
                        dispatch(failure(json.error))
                        dispatch(alertActions.modal.error(json.error))
                    } else {
                        if (value)
                            dispatch(successEdit(json.people[0]))
                        else
                            dispatch(successNew(json.people[0]))
                        dispatch(hide())
                    }
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.modal.error(error))
                }
            )
    }

    function request() { return { type: editConstants.SAVE_REQUEST } }
    function successEdit(people) { return { type: editConstants.SAVE_EDIT_SUCCESS, payload: { people } } }
    function successNew(people) { return { type: editConstants.SAVE_NEW_SUCCESS, payload: { id, people } } }
    function failure(error) { return { type: editConstants.SAVE_FAILURE, payload: { error } } }
}

function remove(value, ids) {
    return dispatch => {
        dispatch(request())

        editService.remove({id: value})
            .then(
                json => {
                    if (json.error) {
                        dispatch(failure(json.error))
                    } else {
                        dispatch(success(value))
                        dispatch(hide())
                    }
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.modal.error(error))
                }
            )
    }

    function request() { return { type: editConstants.REMOVE_REQUEST } }
    function success(value) { return { type: editConstants.REMOVE_SUCCESS, payload: { value, ids } } }
    function failure(error) { return { type: editConstants.REMOVE_FAILURE, payload: { error } } }
}
