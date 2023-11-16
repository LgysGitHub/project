import dotenv from 'dotenv'
import process from 'process'
import path from 'path'

import * as tasks from './tasks'
import * as User from './backend-api/user'
import { knownErrorHandler, unknownErrorHandler } from './middlewares/errorHandler'
import { router as reqValidator } from './middlewares/request-validator'
import { configSession, verifySession } from './middlewares/sessionManager'
import { httpLogHandler } from './middlewares/httpLogger'

import express = require('express')

dotenv.config()

async function startServer (): Promise<void> {
  await tasks.checkEnvOrExit()
  // await tasks.ensureEsClusterExist()
  // await tasks.initIndicesIfNotExist()
  // await tasks.initRootUser()

  const app: express.Express = express()
  const port: number = parseInt(process.env.API_SERVER_PORT ?? '5000')

  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

  // workaround of https://github.com/expressjs/express/issues/4618
  app.use(express.json() as any)
  app.use(httpLogHandler)

  // get只用于static serve
  // app.get('*', express.static(path.resolve(process.env.WEBPAGE_DIR ?? '../user-portal/build')))
  // serve index.html, if get path not found
  // app.get('*', (req: express.Request, res: express.Response): void => {
  //   res.sendFile(path.resolve(path.join(process.env.WEBPAGE_DIR ?? '../user-portal/build', 'index.html')))
  // })

  // app.use(configSession())
  // app.use(verifySession)

  app.use('/api', reqValidator)

  const routers: any[] = [
    User.router
  ]
  routers.forEach((r) => app.use('/api', r))

  app.use(knownErrorHandler)
  app.use(unknownErrorHandler)

  app.listen(port, () => {
    console.log('App is listening on port ', port)
  })
}

startServer().then(null, (err: Error) => {
  console.error(JSON.stringify(err, null, '  '))
  console.log('starting server failed !!!')
  process.exit(1)
})
