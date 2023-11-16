import session from 'express-session'
import connectRedis from 'connect-redis'
import moment from 'moment'
import * as Redis from '../external-services/redis'
import { Endpoints } from '../backend-api/endpoints'
import { logger } from '../logger'
import { ErrorCode, KnownError } from '../common-types'

import express = require('express')

const RedisStore = connectRedis(session)
const NoAuthRoutes: string[] = [
  Endpoints.CREATE_ADMIN
]

export function configSession (): express.RequestHandler {
  const expireDays: number = parseInt(process.env.LOGIN_SESSION_EXPIRE_DAYS ?? '30')

  return session({
    store: new RedisStore({ client: Redis.getInstance() }),
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 3600 * 24 * expireDays // session max age in miliseconds
    }
  })
}

export async function verifySession (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  logger.info(`verifySession: date=[${moment().format('YYYY-MM-DD hh:mm:ss')}] req.path=[${req.path}] userId=[${req.session?.userId ?? ''}] req.body=[${JSON.stringify(req.body)}]`)
  if (NoAuthRoutes.map((r) => '/api' + r).includes(req.path) || req.session?.userId !== undefined) {
    return next()
  }
  next(new KnownError(ErrorCode.UserUnauthenticated))
}
