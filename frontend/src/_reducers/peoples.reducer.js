import { userConstants, editConstants, peoplesConstants } from '../_constants'
import { reSetPeoplesAttributes, setPeoplesAges, searchPeopleIndex } from '../_helpers'

const initialState = [
    { name: 'Здесь пока никого нет...', value: '' }
  ]

export function peoples(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
      case peoplesConstants.GETALL_REQUEST:
          return [ { name: 'Загрузка...', value: '' } ]

      case peoplesConstants.GETALL_SUCCESS:
          if(!payload.peoples || !payload.peoples.length) return initialState
          return reSetPeoplesAttributes(setPeoplesAges(payload.peoples))

      case editConstants.SAVE_EDIT_SUCCESS:
          const items = state.slice()
          const index = searchPeopleIndex(items, payload.people.value)
          items[index] = { ...payload.people }
          return reSetPeoplesAttributes(items)

      case editConstants.SAVE_NEW_SUCCESS:
          return reSetPeoplesAttributes(state.concat({
                ...payload.people
              }))

      case userConstants.GETALL_FAILURE:
          return initialState

      case userConstants.LOGOUT:
          return initialState

      case editConstants.REMOVE_SUCCESS:
          return state.length==1
              ? initialState
              : reSetPeoplesAttributes(state.filter(people => people.value != payload.value))

      default:
        return state
  }
}