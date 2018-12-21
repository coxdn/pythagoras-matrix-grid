import { Map, Record } from 'immutable'
import { alertConstants, gridConstants, peoplesConstants, userConstants, editConstants } from '../_constants'

const AlertState = Record({
  user: new Map({}),
  grid: new Map({}),
  peoples: new Map({}),
  editor: new Map({})
})

const defaultState = new AlertState()

export function _alert(state = defaultState, action) {
  const { payload } = action

  switch (action.type) {
    case alertConstants.AUTH_SUCCESS:
        return state
          .delete("user")
          .setIn(["user", "class"], "alert-success")
          .setIn(["user", "message"], payload.message)

    case alertConstants.AUTH_ERROR:
    case alertConstants.REGISTER_ERROR:
        return state
          .delete("user")
          .setIn(["user", "class"], "alert-danger")
          .setIn(["user", "message"], payload.message)

    case alertConstants.CLEAR_ALL_ERROR:
        return defaultState

    case alertConstants.GRID_CREATE_ITEM_ERROR:
        return state
          .delete("grid")
          .setIn(["grid", "danger"])
          .setIn(["grid", "message"], payload.message)

    case gridConstants.ADD_ITEM:
        if(!payload.message)
          return state
        return state
          .delete("grid")
          .setIn(["grid", "inform"])
          .setIn(["grid", "message"], payload.message)

    case gridConstants.REMOVE_ITEM:
        return state.delete("grid")

    case userConstants.GETALL_FAILURE:
        return state
          .delete("peoples")
          .setIn(["peoples", "danger"])
          .setIn(["peoples", "message"], payload.message)

    case alertConstants.PEOPLES_CREATE_ITEM_GRID_ERROR:
        return state
          .delete("peoples")
          .setIn(["peoples", "danger"])
          .setIn(["peoples", "message"], payload.message)

    case alertConstants.PEOPLES_CLEAR_ERROR:
        return state
          .delete("peoples")

    case alertConstants.MODAL_ERROR:
        return state
          .delete("editor")
          .setIn(["editor", "class"], "alert-danger")
          .setIn(["editor", "message"], payload.message)

    case editConstants.MODAL_HIDE:
        return state
          .delete("editor")

    default:
        return state
  }
}