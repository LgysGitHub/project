import Router from 'express-promise-router'

import * as UserTypes from './userApiTypes'
import * as ReqSchemas from './userValidator'
import * as Authorizer from './userAuthorizer'
import * as UserSvc from '../../services/userSvc'

import { Endpoints } from '../endpoints'
import { validator } from '../../middlewares/request-validator'

import express = require('express')

declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
}

export const router: any = Router()

// const nodeEnv: string = process.env.NODE_ENV ?? 'dev'

validator.addSchema(ReqSchemas.schemaReqCreateAdmin, Endpoints.CREATE_ADMIN)
router.post(Endpoints.CREATE_ADMIN, async (req: express.Request, res: express.Response): Promise<void> => {
  const { phoneNumber, password }: UserTypes.ReqCreateAdmin = req.body
  await Authorizer.rootOnly(req.session.userId)
  const uid: string = await UserSvc.createAdmin(phoneNumber, password)
  res.json({ id: uid })
})

router.post(Endpoints.TEST, async (req: express.Request, res: express.Response): Promise<void> => {
  const { test }: UserTypes.ReqTest = req.body
  const text: string = await UserSvc.getTest(test)
  res.json({ text: text })
})
