import { AnyAction } from 'redux'

import { LoginActionType } from './type'
import { UserJson } from '../../common-types'

export interface LoginPayload {
  loginUser?: UserJson
}
export function loginOnUI (payload: LoginPayload): AnyAction {
  return {
    type: LoginActionType.LoginUser,
    payload
  }
}

export function logoutOnUI (): AnyAction {
  return {
    type: LoginActionType.LogoutUser
  }
}

export function loginAttempt (): AnyAction {
  return {
    type: LoginActionType.LoginAttempted
  }
}
