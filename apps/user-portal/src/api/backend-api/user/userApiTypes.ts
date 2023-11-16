export interface ReqCreateAdmin {
  phoneNumber: string
  password: string
}
export interface RespCreateAdmin {
  id: string
}

export interface ReqTest {
  test: string
}
export interface RespTest {
  text: string
}
