import { gridConstants, editConstants, userConstants, peoplesConstants } from '../_constants';

export const gridContent = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case gridConstants.ADD_ITEM:
            const { value, empty } = payload
            return {
                ...state,
                [payload.randomId]: value ? { value } : { empty }
            }

        case gridConstants.REMOVE_ITEM:
            const {...tmpContent} = {...state}
            delete tmpContent[payload.id]
            return {
                ...tmpContent
            }

        case gridConstants.UPDATE_ITEM:
            if(payload.error) return state
            var { date } = payload
            const id = Object.keys(state).filter(item => state[item].empty)[0]
            return {
                ...state,
                [id]: {date}
            }

        case peoplesConstants.ADD_ITEM_TO_GRID:
            if(payload.error) return state
            var { date } = payload
            return {
                ...state,
                [payload.randomId]: {date}
            }

        case editConstants.SAVE_NEW_SUCCESS:
            const _state = { ...state }
            delete _state[payload.id].date
            _state[payload.id].value = payload.people.value
            return _state

        case userConstants.LOGOUT: 
            return {}

        case editConstants.REMOVE_SUCCESS:
            return Object.keys(state)
                .filter(item => payload.ids.indexOf(item) === -1)
                // .filter(item => state[item].value!=payload.value)
                .reduce((acc, item) => {
                    acc[item] = {...state[item]}
                    return acc
                }, {})
    }

    return state
}