import { editConstants } from '../_constants'

const initState = {
  value: 0,
  // id,
  _name: '',
  date: '',
  show: false,
  savingIn: false,
}

export function editor(state = initState, action) {
  const { payload } = action

  switch (action.type) {
      case editConstants.MODAL_HIDE:
        return {
          ...state,
          show: false
        }

      case editConstants.MODAL_CREATE_ITEM:
      case editConstants.MODAL_EDIT_ITEM:
        const { id, data: { name: _name, date, tags, value } } = payload
        const _tags = tags.map(item => ({
          value: item.id,
          label: item.value
        }))
        // console.log('--- editConstants.MODAL_EDIT_ITEM', _name, date, _tags, value)
        return {
          value,
          id,
          _name,
          date,
          tags: _tags,
          show: true
        }

      case editConstants.SAVE_REQUEST:
        return {
          ...state,
          ...payload,
          savingIn: true
        }

      case editConstants.SAVE_SUCCESS:
      case editConstants.SAVE_FAILURE:
        return {
          ...state,
          savingIn: false
        }

      default:
        return state
  }
}