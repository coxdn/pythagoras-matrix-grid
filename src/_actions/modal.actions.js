import { editService } from '../_services'
import { editConstants } from '../_constants'
import { pythagoras } from '../_helpers'

export const modalActions = {
    hide,
    editing,
    creating,
    save,
    remove
}

function hide() {
    return {
        type: editConstants.MODAL_HIDE
    }
}

function editing(id, data) {
    return {
        type: editConstants.MODAL_EDIT_ITEM,
        payload: {id, data},
    }
}

function creating(id, data) {
    return {
        type: editConstants.MODAL_CREATE_ITEM,
        payload: {id, data: {...data, value: 0, name: ''}},
    }
}


function save({value, id, _name, date, tags: oldTags}) {
    console.log('--- oldTags', oldTags)
    const tags = oldTags.map(item => item.className ? {label: item.label} : {label: item.label, value: item.value})

    return dispatch => {


        dispatch(request({_name, date, tags}))

        editService.save({id: value, name: _name, date, tags})
            .then(
                json => {
                    if(json.error) {
                        dispatch(failure(json.error))
                        //////
                    } else {
                        dispatch(success(json.people[0]))
                        dispatch(hide())
                    }
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertUserActions.errorAuth(error))
                }
            )
    }

    function request(people) { return { type: editConstants.SAVE_REQUEST, payload: {_name, date, tags} } }
    function success(people) { return { type: editConstants.SAVE_SUCCESS, payload: {value, id, people} } }
    function failure(error) { return { type: editConstants.SAVE_FAILURE, error } }
}

function remove(content) {
    return {
        type: editConstants.MODAL_REMOVE_ITEM,
        payload: content,
    }
}