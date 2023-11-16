export enum GenderType {
  Male = 'M',
  Female = 'F',
  Unspecified = 'U'
}

export enum EduDegree {
  Associate = 'associate',
  Bachelor = 'bachelor',
  Master = 'master',
  Phd = 'phd'
}

export interface GeoLocation {
  lon: number
  lat: number
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface Sort<FieldEnum> {
  field: FieldEnum
  order: SortOrder
}
