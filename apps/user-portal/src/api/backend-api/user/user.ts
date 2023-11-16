import * as ApiTypes from './userApiTypes'
import { Endpoints } from '../endpoints'
import { postFetch } from '../helper'

export async function getTest(test: string): Promise<ApiTypes.RespTest> {
  const reqPayload: ApiTypes.ReqTest = {
    test
  }

  return postFetch<ApiTypes.ReqTest, ApiTypes.RespTest>(
    Endpoints.TEST,
    reqPayload
  )
}
