import { UserJson } from '../../common-types/user'

export enum LoginActionType {
  LoginAttempted = 'LOGIN$LOGIN_ATTEMPLTED',
  LogoutUser = 'LOGIN$LOGOUT',
  LoginUser = 'LOGIN$LOGIN_USER'
}

export interface LoginState {
  loginAttempted: boolean
  loginUser: UserJson | null
  timSdkReady: boolean
}
