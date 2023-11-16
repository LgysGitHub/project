import { UserJson, UserRole } from '../common-types/user'

export class UserModel implements UserJson {
  id: string = ''
  createdDate: string = new Date().toISOString()
  name: string = ''
  idcardNumber: string = ''
  realNameCertified: boolean = false
  phoneNumber: string = ''
  wxUnionId: string = ''
  wxName: string = ''
  passwordHash: string = ''
  role: UserRole = UserRole.Undefined
  roleId: string = ''
  cityName: string = ''
  cityAdcode: string = ''
  balance: number = 0

  constructor (param: Partial<UserJson>) {
    this.id = param.id ?? this.id
    this.createdDate = param.createdDate ?? this.createdDate
    this.name = param.name ?? this.name
    this.idcardNumber = param.idcardNumber ?? this.idcardNumber
    this.realNameCertified = param.realNameCertified ?? this.realNameCertified
    this.phoneNumber = param.phoneNumber ?? this.phoneNumber
    this.wxUnionId = param.wxUnionId ?? this.wxUnionId
    this.wxName = param.wxName ?? this.wxName
    this.role = param.role ?? this.role
    this.roleId = param.roleId ?? this.roleId
    this.cityName = param.cityName ?? this.cityName
    this.cityAdcode = param.cityAdcode ?? this.cityAdcode
    this.balance = param.balance ?? this.balance
  }

  toJSON (): UserJson {
    return {
      id: this.id,
      createdDate: this.createdDate,

      name: this.name,
      idcardNumber: this.idcardNumber,
      realNameCertified: this.realNameCertified,
      phoneNumber: this.phoneNumber,
      wxUnionId: this.wxUnionId,
      wxName: this.wxName,
      role: this.role,
      roleId: this.roleId,
      cityName: this.cityName,
      cityAdcode: this.cityAdcode,
      balance: this.balance
    }
  }
}
