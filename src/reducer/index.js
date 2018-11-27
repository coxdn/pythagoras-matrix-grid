import {combineReducers} from 'redux'

import layoutConfig from './layoutConfig'
import layoutContent from './layoutContent'

export default combineReducers({
	layoutConfig, layoutContent
})

// const initialState = { hideElement: false }

// export default (state = initialState, action) => {
// 	const { type } = action

// 	switch (type) {
// 		case "HIDE_ELEMENT":
// 			return { hideElement: true }
// 		case "SHOW_ELEMENT":
// 			return { hideElement: false }
// 	}
// 	return state
// }