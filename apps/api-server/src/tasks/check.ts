import process from 'process'

import * as es from '../external-services/elasticsearch/helper'

export async function ensureEsClusterExist (): Promise<void> {
  console.log('Elasticsearch cluster existence check: ')
  const health: any = await es.getClusterHealth()
  console.log(health)
}

export async function checkEnvOrExit (): Promise<void> {
  console.log('Checking mandatory environment variables')

  const mandatoryEnvs: string[] = [
    'PROD_NAME',
    'REDIS_URL',
    'REDIS_PASSWORD'
  ]

  mandatoryEnvs.forEach((k: string) => {
    if (!(process.env[k] ?? '')) {
      console.error(`missing env ${k}`)
      process.exit(1)
    }
  })
}
