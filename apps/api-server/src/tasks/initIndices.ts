import bcrypt from 'bcrypt'

import * as UserDao from '../external-services/elasticsearch/userDao'
import { UserModel } from '../models/UserModel'
import { UserRole } from '../common-types'

export async function initIndicesIfNotExist (): Promise<void> {
  const userIndexExist: boolean = await UserDao.existIndex()
  if (!userIndexExist) {
    console.log('User index not exist. Creating users index...')
    await UserDao.createIndex()
  } else {
    console.log('User index already exist')
  }
}

export async function initRootUser (): Promise<void> {
  const rootExist: boolean = await UserDao.existRootUser()
  if (rootExist) {
    console.log('Root User already existed')
    return
  }

  if (!process.env.API_SERVER_ROOT_USER_LOGIN_NUMBER || !process.env.API_SERVER_ROOT_USER_LOGIN_PW) {
    console.log('Root User not configured well')
    return
  }

  const rootUserNumber: string = process.env.API_SERVER_ROOT_USER_LOGIN_NUMBER
  const rootUserPw: string = process.env.API_SERVER_ROOT_USER_LOGIN_PW

  const rootUser = new UserModel({
    name: 'root',
    role: UserRole.Root,
    phoneNumber: rootUserNumber
  })
  rootUser.passwordHash = await bcrypt.hash(rootUserPw, 10)
  await UserDao.indexNewUser(rootUser)
}
