import { JSONSchemaType } from 'ajv'
import { EduDegree, GenderType, GeoLocation } from '../../common-types'

export const schemaStr: JSONSchemaType<string> = {
  type: 'string',
  minLength: 1
}

export const schemaStrs: JSONSchemaType<string[]> = {
  type: 'array',
  uniqueItems: true,
  items: {
    type: 'string',
    minLength: 1
  }
}

export const schemaTel: JSONSchemaType<string> = {
  type: 'string',
  pattern: '^\\d{7,11}$'
}

export const schemaTels: JSONSchemaType<string[]> = {
  type: 'array',
  uniqueItems: true,
  items: {
    type: 'string',
    pattern: '^\\d{7,11}$'
  }
}

export const schemaIdcardNum: JSONSchemaType<string> = {
  type: 'string',
  pattern: '^\\d{17}[\\dxX]{1}$'
}

export const schemaIsoDateStr: JSONSchemaType<string> = {
  type: 'string',
  pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$'
}

export const schemaGender: JSONSchemaType<string> = {
  type: 'string',
  enum: Object.values(GenderType)
}

export const schemaEduDegree: JSONSchemaType<string> = {
  type: 'string',
  enum: Object.values(EduDegree)
}

export const schemaNaturalInt: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 0
}

export const schemaPosInt: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 1
}

export const schemaAge: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 0,
  maximum: 200
}

export const schemaHour: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 0,
  maximum: 23
}

export const schemaMinute: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 0,
  maximum: 59
}

export const schemaWeekday: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 1,
  maximum: 7
}

export const schemaYear: JSONSchemaType<number> = {
  type: 'integer',
  minimum: 1900,
  maximum: 2200
}

export const schemaGeoLocation: JSONSchemaType<GeoLocation> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    lon: { type: 'number' },
    lat: { type: 'number' }
  },
  required: ['lon', 'lat']
}

export const schemaReqByIdObj: JSONSchemaType<{id: string}> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: schemaStr
  },
  required: ['id']
}

export const schemaReqByIdsObj: JSONSchemaType<{ids: string[]}> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ids: schemaStrs
  },
  required: ['ids']
}
