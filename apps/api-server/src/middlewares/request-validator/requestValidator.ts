import Ajv from 'ajv'
import express = require('express')

export const validator = new Ajv()

export const router: any = express.Router()

router.use((req: express.Request, res: express.Response, next: any): void => {
  const validate: any|undefined = validator.getSchema(req.path)

  if (validate !== undefined && !(validate(req.body) as boolean)) {
    res.status(400).json(validate.errors[0])
    return
  }

  next()
})
