import bcrypt from 'bcrypt'
// import crypto from 'crypto'

import * as UserDao from '../external-services/elasticsearch/userDao'

import { UserModel } from '../models/UserModel'

import {
  ErrorCode, KnownError, UserRole
} from '../common-types'
import { logger } from '../logger'

export async function getUserById(id: string): Promise<UserModel> {
  const u: UserModel | null = await UserDao.getUserById(id)
  if (u === null) {
    throw new KnownError(ErrorCode.UserNotFoundById, id)
  }
  return u
}

export async function createAdmin(phoneNumber: string, pw: string): Promise<string> {
  const user: UserModel | null = await UserDao.getUserByPhoneNumber(phoneNumber)
  if (user !== null) {
    logger.info(`createAdminByRoot: ${phoneNumber} is used by another user`)
    throw new KnownError(ErrorCode.UserPhoneNumberUsedByAnotherUser)
  }

  const adminUser = new UserModel({
    name: 'admin',
    role: UserRole.Admin,
    phoneNumber
  })
  adminUser.passwordHash = await bcrypt.hash(pw, 10)
  const uid = await UserDao.indexNewUser(adminUser)
  return uid
}

// 测试接口
export async function getTest(test: string): Promise<string> {
  const text = test + ' ' + '123456'
  return text
}
