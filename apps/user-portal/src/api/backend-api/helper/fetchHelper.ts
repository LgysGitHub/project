import { KnownError, KnownErrorType } from '../../../common-types/error'

export async function postFetch<ReqBody, RespBody> (endpoint: string, reqBody: ReqBody): Promise<RespBody> {
  const response: Response = await fetch(`/api${endpoint}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
  })

  if (!response.ok) {
    // backend always returns the error in json in case of error, so let the user handle it
    const errBody: any = await response.json()

    if (errBody.type === KnownErrorType) {
      throw new KnownError(errBody.code, errBody.message)
    } else {
      throw errBody
    }
  }

  const responseJson: RespBody = await response.json()
  return responseJson
}
