export enum ErrorCode {
  SmsMobileNumberIllegal = 'SMS_MOBILE_NUMBER_ILLEGAL',
  SmsBusinessLimitControl = 'SMS_BUSINESS_LIMIT_CONTROL',
  SmsBadVerificationCode = 'SMS_BAD_VERIFICATION_CODE',

  UserNotFoundById = 'USER_NOT_FOUND_BY_ID',
  UserNotFoundByRoleId = 'USER_NOT_FOUND_BY_ROLE_ID',
  UserNotFoundByPhoneNumber = 'USER_NOT_FOUND_BY_PHONE_NUMBER',
  UserPhoneNumberUsedByAnotherUser = 'USER_PHONE_NUMBER_USED_BY_ANOTHER_USER',
  UserPhoneNumberNotBound = 'USER_PHONE_NUMBER_NOT_BOUND',
  UserMustBindPhoneNumber = 'USER_MUST_BIND_PHONE_NUMBER',
  UserPwdMustComplyRule = 'USER_PWD_MUST_COMPLY_RULE',
  UserNotFoundByWxUnionId = 'USER_NOT_FOUND_BY_WX_UNION_ID',
  UserWxUnionIdUsedByAnotherUser = 'USER_WX_ID_USED_BY_ANOTHER_USER',
  UserInvalidWxCode = 'USER_INVALID_WX_CODE',
  UserRiskyWxUser = 'USER_RISKY_WX_USER',
  UserIncorrectPassword = 'USER_INCORRECT_PASSWORD',
  UserPasswordNotSet = 'USER_PASSWORD_NOT_SET',
  UserUnauthenticated = 'USER_UNAUTHENTICATED',
  UserUnauthorized = 'USER_UNAUTHORIZED',
  UserInvalidFaceIdcard = 'USER_INVALID_FACE_IDCARD',
  UserRealNameAlreadyCertified = 'USER_REALNAME_ALREADY_CERTIFIED',
  UserRealNameNotCertified = 'USER_REALNAME_NOT_CERTIFIED',
  UserInvalidRole = 'USER_INVALID_ROLE',
  UserInvalidCookie = 'USER_INVALID_COOKIE',

  InvalidApiKey = 'INVALID_API_KEY',
  SystemBusy = 'SYS_BUSY'
}

export const KnownErrorType = 'KnownError'

export class KnownError extends Error {
  readonly type: string = KnownErrorType
  readonly code: string = ''

  constructor (code: string, message?: string) {
    super(code)
    this.code = code
    this.message = message ?? ''
  }

  toJSON (): any {
    return {
      type: this.type,
      code: this.code,
      message: this.message
    }
  }
}
