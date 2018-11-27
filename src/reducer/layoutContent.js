import { ADD_ITEM, UPDATE_LAYOUT } from '../constants'
import { getNearestFreeXY } from '../helpers'

const initialLayoutContent = {}

export default (layoutContent = initialLayoutContent, action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case ADD_ITEM:
        	return {
        		...layoutContent,
        		[randomId]: payload
        	}
    }

    return layoutContent
}