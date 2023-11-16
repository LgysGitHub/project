import morgan, { StreamOptions } from 'morgan'

import { logger } from '../logger'

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message: any) => logger.http(message)
}

export const httpLogHandler: any = morgan(
  '[:method] <:url> rf=[:referrer] raddr=[:remote-addr] ruser=[:remote-user] status=[:status] - (:response-time ms)',
  {
    stream: stream
  }
)
