export enum UserRole {
  Undefined = '',
  Root = 'root',
  Admin = 'admin',
  Player = 'player'
}

export enum UserField {
  Id = 'id',
  CreatedDate = 'createdDate',

  Name = 'name',
  IdcardNumber = 'idcardNumber',
  RealNameCertified = 'realNameCertified',
  PhoneNumber = 'phoneNumber',
  WxUnionId = 'wxUnionId',
  WxName = 'wxName',
  Role = 'role',
  RoleId = 'roleId',
  CityName = 'cityName',
  CityAdcode = 'cityAdcode',
  Balance = 'balance',
}

export interface UserJson {
  [UserField.Id]: string
  [UserField.CreatedDate]: string

  [UserField.Name]: string
  [UserField.IdcardNumber]: string
  [UserField.RealNameCertified]: boolean
  [UserField.PhoneNumber]: string
  [UserField.WxUnionId]: string
  [UserField.WxName]: string
  [UserField.Role]: UserRole
  [UserField.RoleId]: string
  [UserField.CityName]: string
  [UserField.CityAdcode]: string
  [UserField.Balance]: number
}

export interface UserInfo extends UserJson {
}

interface _UserFilter {
  [UserField.Role]: UserRole
  [UserField.CityAdcode]: string
  [UserField.Name]: string
  [UserField.PhoneNumber]: string
  [UserField.IdcardNumber]: string
}

export type UserFilter = Partial<_UserFilter>

export interface RoleJson {
  userId: string
  name: string
  avatarImage: string
  roleId: string
  role: UserRole
}
