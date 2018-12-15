import { layoutConstants, editConstants } from '../_constants';

export const layoutContent = (state = {}, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case layoutConstants.ADD_ITEM:
            // console.log('--- payload,,', payload)
        	return {
        		...state,
        		[randomId]: payload
        	}

		case layoutConstants.REMOVE_ITEM:
			const {...tmpContent} = {...state}
			delete tmpContent[payload.id]
			return {
				...tmpContent
			}

        case layoutConstants.UPDATE_ITEM:
            if(payload.error) return state
            var { id, date } = payload
            return {
                ...state,
                [id]: {date}
            }

        case editConstants.SAVE_SUCCESS:
            const { value, id: _id, people } = payload
            var { date, name, tags } = people
            const stateTmp = Object.keys(state).reduce((acc, item) => {
                if(state[item].value && state[item].value==value)
                    acc[item] = {value, name, date, tags}
                else
                    acc[item] = state[item]
                return acc
            }, {})
            return stateTmp
    }

    return state
}