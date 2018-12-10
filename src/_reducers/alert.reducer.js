import { alertConstants } from '../_constants'

export function alert(state = {}, action) {
  const { id, message } = action

  switch (action.type) {
    case alertConstants.AUTH_SUCCESS:
      return {
        type: 'alert-success',
        authMessage: message
      }
    case alertConstants.AUTH_ERROR:
      return {
        type: 'alert-danger',
        authMessage: message
      }
    case alertConstants.CLEAR:
      return {}

    case alertConstants.CREATE_ITEM_ERROR:
      return {
        type: 'alert-danger',
        createItemMessage: message,
        id: id
      }
    case alertConstants.CREATE_ITEM_CLEAR:
      return {}

    default:
      return state
  }
}