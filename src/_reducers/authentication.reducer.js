import { userConstants, peoplesConstants } from '../_constants'

const initialState = {
  loggedIn: false,
  loaded: false
}

export function authentication(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loaded: true,
        user: payload.user
      }

    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loaded: true,
        user: payload.user
      }

    case userConstants.LOGIN_FAILURE:
      return {
        ...initialState,
        loaded: true
      }

    case peoplesConstants.GETALL_SUCCESS:
      return {
        loggedIn: true,
        loaded: true,
        user: payload.user
      }

    case userConstants.LOGOUT:
      return {
        ...initialState,
        loaded: true
      }
      
    default:
      return state
  }
}