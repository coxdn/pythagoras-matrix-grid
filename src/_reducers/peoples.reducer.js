import { userConstants, editConstants } from '../_constants'

const initState = {items: [{name: 'Загрузка...', value: '_'}]}

export function peoples(state = initState, action) {
  let peoples
  switch (action.type) {
      case userConstants.GETALL_REQUEST:
          return {
            ...state,
            loading: true
          }

      case userConstants.GETALL_SUCCESS:
          if(!action.data.peoples) return { items: [{name: 'Здесь пока пусто', value: '_'}] }
          peoples = action.data.peoples.map(item => {
            item['tagSearch'] = item.tags.map(tag => tag.value).join(', ')
            return item
          })
          return {
            items: peoples
          }

      case editConstants.SAVE_SUCCESS:
          const { people } = action.payload
          console.log('--- peoples.reducer people=', people)
          // debugger
          const tmpPeople = state.items
            .map((item, i) => ({value: item.value, i}))
            .filter(item => item.value==people.value)
          if(tmpPeople.length) {
            peoples = state.items.slice()
            peoples[tmpPeople[0].i] = people
            return {
              items: peoples
            }
          }
          return {
            items: state.items.concat(people)
          }

      case userConstants.GETALL_FAILURE:
          return {
            ...state,
            error: action.error
      }
    /*case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to people being deleted
      return {
        ...state,
        items: state.items.map(people =>
          people.id === action.id
            ? { ...people, deleting: true }
            : people
        )
      }
    case userConstants.DELETE_SUCCESS:
      // remove deleted people from state
      return {
        items: state.items.filter(people => people.id !== action.id)
      }
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(people => {
          if (people.id === action.id) {
            // make copy of people without 'deleting:true' property
            const { deleting, ...peopleCopy } = people;
            // return copy of people with 'deleteError:[error]' property
            return { ...peopleCopy, deleteError: action.error }
          }

          return people
        })
      }*/
    default:
      return state
  }
}