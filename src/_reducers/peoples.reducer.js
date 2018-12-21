import { userConstants, editConstants, peoplesConstants } from '../_constants'

const initialState = {
  search: '',
  items: [
    { name: 'Здесь пока никого нет...', value: '' }
  ]
}

export function peoples(state = initialState, action) {
  const { payload } = action

  let peoples
  switch (action.type) {
      case peoplesConstants.GETALL_SUCCESS:
          if(!payload.peoples || !payload.peoples.length) return initialState
          peoples = payload.peoples.map((item, index) => {
            item.index = index
            item.tagSearch = item.tags.map(tag => tag.value).join(', ')
            return item
          })
          return {
            items: peoples
          }

      case editConstants.SAVE_EDIT_SUCCESS:
          // const { people } = payload
          const tmpPeople_i = state.items
            .map((item, i) => ({value: item.value, i}))
            .filter(item => item.value==payload.people.value)[0].i
          peoples = state.items.slice()
          peoples[tmpPeople_i] = payload.people
          return {
            items: peoples
          }

      case editConstants.SAVE_NEW_SUCCESS:
          return {
            items: state.items
              .filter(item => item.value)
              .concat({...payload.people, index: state.items.length})
          }

      case userConstants.GETALL_FAILURE:
          return initialState

      case userConstants.LOGOUT:
          return initialState

      case editConstants.REMOVE_SUCCESS:
          return {
            ...state,
            items: state.items
              .filter(item => item.value!=payload.value)
              .map((item, index) => ({...item, index}))
          }

      default:
        return state
  }
}