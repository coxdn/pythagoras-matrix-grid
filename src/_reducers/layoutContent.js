import { userConstants } from '../_constants';
// import { ADD_ITEM, UPDATE_LAYOUT } from '../constants'
// import { getNearestFreeXY } from '../helpers'

const initialLayoutContent = {}

export const layoutContent = (layoutContent = initialLayoutContent, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case userConstants.ADD_ITEM:
        	return {
        		...layoutContent,
        		[randomId]: payload
        	}
    }

    return layoutContent
}