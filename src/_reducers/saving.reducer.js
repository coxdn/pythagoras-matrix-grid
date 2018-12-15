import { editConstants } from '../_constants'

const initState = {
	loading: false
}

export function saving(state = initState, action) {
  const { payload } = action

  switch (action.type) {
	case editConstants.SAVE_REQUEST:
		return {
			loading: true
		}

	case editConstants.SAVE_SUCCESS:
	case editConstants.SAVE_FAILURE:
		return {
			loading: false
		}

	default:
		return state
  }
}