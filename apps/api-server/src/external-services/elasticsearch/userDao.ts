import * as es from './helper'

import { UserModel } from '../../models/UserModel'
import { UserJson, UserField, UserRole, UserFilter } from '../../common-types'

import settings from './commonIndexSettings.json'
import mapping from './userMapping.json'

const INDEX: string = 'users'

export interface UserDoc extends UserJson {
  passwordHash: string
}

export async function existIndex (): Promise<boolean> {
  return es.existIndex(INDEX)
}

export async function createIndex (): Promise<void> {
  return es.createIndex(INDEX, settings, mapping)
}

// deserialization
function docToModel (doc: UserDoc): UserModel {
  const user: UserModel = new UserModel(doc)
  user.passwordHash = doc.passwordHash
  return user
}

// serialization
function modelToDoc (m: UserModel): UserDoc {
  return {
    id: m.id,
    createdDate: m.createdDate,
    name: m.name,
    idcardNumber: m.idcardNumber,
    realNameCertified: m.realNameCertified,
    phoneNumber: m.phoneNumber,
    wxUnionId: m.wxUnionId,
    wxName: m.wxName,
    passwordHash: m.passwordHash,
    role: m.role,
    roleId: m.roleId,
    cityName: m.cityName,
    cityAdcode: m.cityAdcode,
    balance: m.balance
  }
}

export async function indexNewUser (m: UserModel): Promise<string> {
  const d: UserDoc = modelToDoc(m)
  return await es.index(es.genIndexReq(INDEX, d))
}

export async function updateUserById (id: string, updateObj: Partial<UserDoc>): Promise<void> {
  return es.updateDoc(es.genPartialDocUpdateReq(INDEX, id, updateObj))
}

export async function updateUserPasswordHashById (id: string, passwordHash: string): Promise<void> {
  return es.updateDoc(es.genPartialDocUpdateReq(INDEX, id, { passwordHash: passwordHash }))
}

export async function getUserById (id: string): Promise<UserModel | null> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genTermQuery(INDEX, '_id', id))
  const s: UserDoc | undefined = searcher.getFirstDoc<UserDoc>()
  return s === undefined ? null : docToModel(s)
}

export async function getUserByRoleId (roleId: string): Promise<UserModel | null> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genTermQuery(INDEX, UserField.RoleId, roleId))
  const s: UserDoc | undefined = searcher.getFirstDoc<UserDoc>()
  return s === undefined ? null : docToModel(s)
}

export async function getUsersByIds (ids: string[]): Promise<UserModel[]> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genTermsQuery(INDEX, '_id', ids, { size: ids.length }))
  const docs: UserDoc[] = searcher.getDocArray<UserDoc>()
  return docs.map((d): UserModel => docToModel(d))
}

export async function getUserByPhoneNumber (phoneNumber: string): Promise<UserModel | null> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genTermQuery(INDEX, UserField.PhoneNumber, phoneNumber))
  const s: UserDoc | undefined = searcher.getFirstDoc<UserDoc>()
  return s === undefined ? null : docToModel(s)
}

export async function getUserByWxUnionId (wxUnionId: string): Promise<UserModel | null> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genTermQuery(INDEX, UserField.WxUnionId, wxUnionId))
  const s: UserDoc | undefined = searcher.getFirstDoc<UserDoc>()
  return s === undefined ? null : docToModel(s)
}

export async function existRootUser (): Promise<boolean> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genTermQuery(INDEX, UserField.Role, UserRole.Root))
  return searcher.getTotalCount() > 0
}

export async function getUsers (filter: UserFilter, from: number = 0, size: number = 10): Promise<[UserModel[], number]> {
  const searcher: es.Searcher = new es.Searcher()
  await searcher.search(es.genBoolQuery(
    INDEX,
    filterObjToBoolQueryParam(filter),
    { from, size }
  ))
  const docs: UserDoc[] = searcher.getDocArray<UserModel>()
  const total: number = searcher.getTotalCount()
  return [
    docs.map((s: UserDoc): UserModel => docToModel(s)),
    total
  ]
}

function filterObjToBoolQueryParam (filter: UserFilter): es.BoolQueryParam {
  const filters: any[] = []
  const musts: any[] = []

  if (filter.name) {
    musts.push({ match: { [UserField.Name]: filter.name } })
  }

  if (filter.cityAdcode) {
    filters.push({ term: { [UserField.CityAdcode]: filter.cityAdcode } })
  }

  if (filter.phoneNumber) {
    filters.push({ term: { [UserField.PhoneNumber]: filter.phoneNumber } })
  }

  if (filter.idcardNumber) {
    filters.push({ term: { [UserField.IdcardNumber]: filter.idcardNumber } })
  }

  if (filter.role) {
    filters.push({ term: { [UserField.Role]: filter.role } })
  }

  return {
    filters,
    musts
  }
}
