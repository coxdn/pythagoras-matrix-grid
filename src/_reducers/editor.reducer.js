import { editConstants } from '../_constants'

const initialState = {
  id: 0,
  value: 0,
  show: false,
}

export function editor(state = initialState, action) {
  const { payload, type } = action
  const _state = { ...state }

  switch (type) {
    case editConstants.MODAL_HIDE:
      return initialState

    case editConstants.MODAL_CREATE_ITEM:
      return {
        ...state,
        id: payload.id,
        show: true
      }

    case editConstants.MODAL_EDIT_ITEM:
      return {
        ...state,
        value: payload.value,
        show: true
      }

    case editConstants.SAVE_REQUEST:
      return {
        ...state,
        inSaving: true
      }

    case editConstants.REMOVE_REQUEST:
      return {
        ...state,
        inRemoving: true
      }

    case editConstants.SAVE_NEW_SUCCESS:
      return {
        ...state,
        value: payload.people.value
      }

    case editConstants.SAVE_EDIT_SUCCESS:
      return state

    case editConstants.SAVE_FAILURE:
      delete _state.inSaving
      return _state

    case editConstants.REMOVE_SUCCESS:
      return initialState

    default:
      return state
  }
}