import { Logger, createLogger, format, transports } from 'winston'
import moment from 'moment-timezone'

const appendTimestamp = format(info => {
  info.timestamp = moment().tz('Asia/Shanghai').format()
  return info
})

export const logger: Logger = createLogger({
  format: format.combine(
    appendTimestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console({ level: process.env.API_SERVER_LOG_LEVEL ?? 'debug' })
  ]
})
