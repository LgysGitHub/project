import { AnyAction } from 'redux'

import { LoginActionType, LoginState } from './type'

export function loginReducer(state: LoginState, action: AnyAction): LoginState {
  if (state === undefined) {
    state = {
      loginAttempted: false,
      loginUser: null,
      timSdkReady: false
    }
  }

  switch (action.type) {
    case LoginActionType.LoginAttempted: {
      return {
        ...state,
        loginAttempted: true
      }
    }

    case LoginActionType.LoginUser: {
      return {
        ...state,
        loginAttempted: true,
        ...action.payload
      }
    }

    case LoginActionType.LogoutUser: {
      return {
        ...state,
        loginUser: null
      }
    }

    default:
      return state
  }
}
