import { alertConstants, layoutConstants } from '../_constants'

export function _alert(state = {}, action) {
  const { id, message } = action

  switch (action.type) {
    case alertConstants.AUTH_SUCCESS:
      return {
        type: 'alert-success',
        authMessage: message
      }

    case alertConstants.AUTH_ERROR:
    case alertConstants.REGISTER_ERROR:
      return {
        type: 'alert-danger',
        authMessage: message
      }

    case alertConstants.CLEAR_ALL:
      return {}

    case alertConstants.CREATE_ITEM_ERROR:
      return {
        hasError: true,
        createItemMessage: message
      }

    case layoutConstants.ADD_ITEM:
      if(!message)
        return state
      return {
        createItemMessage: message
      }

    case layoutConstants.REMOVE_ITEM:
      if(action.payload.id)
        return state
      return {}

    default:
      return state
  }
}