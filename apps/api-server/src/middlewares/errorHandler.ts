import { ErrorCode, KnownError } from '../common-types'
import { logger } from '../logger'

import express = require('express')

export function knownErrorHandler (err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (err instanceof KnownError) {
    switch (err.code) {
      case ErrorCode.UserUnauthenticated:
      case ErrorCode.InvalidApiKey:
        res.status(401).json(err)
        break
      case ErrorCode.UserUnauthorized:
        res.status(403).json(err)
        break
      default:
        res.status(400).json(err)
        break
    }
  } else {
    next(err)
  }
}

export function unknownErrorHandler (err: Error, req: express.Request, res: express.Response, _: express.NextFunction): void {
  logger.error('express unknownErrorHandler: err=' + JSON.stringify(err, Object.getOwnPropertyNames(err)))
  res.status(501).json({
    name: err.name,
    message: err.message,
    stack: err.stack ?? ''
  })
}
