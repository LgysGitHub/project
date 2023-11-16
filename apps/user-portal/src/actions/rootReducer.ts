import { combineReducers, Reducer } from 'redux'

import { loginReducer, LoginState } from './loginAction'

export interface RootState {
  loginState: LoginState
}

export const rootReducer: Reducer = combineReducers({
  loginState: loginReducer
})
