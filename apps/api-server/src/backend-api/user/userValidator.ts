import { JSONSchemaType } from 'ajv'
// import { UserField, UserFilter, UserRole } from '../../common-types'
import * as ApiTypes from './userApiTypes'
import * as Validator from '../../middlewares/request-validator'

export const schemaReqCreateAdmin: JSONSchemaType<ApiTypes.ReqCreateAdmin> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    phoneNumber: Validator.schemaTel,
    password: Validator.schemaStr
  },
  required: ['phoneNumber', 'password']
}
