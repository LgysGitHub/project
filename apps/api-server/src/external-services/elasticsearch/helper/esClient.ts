import fs from 'fs'
import dotenv from 'dotenv'
import { Client } from '@elastic/elasticsearch'
import {
  SearchRequest, UpdateByQueryRequest, UpdateRequest, IndexRequest, DeleteRequest, DeleteByQueryRequest
} from '@elastic/elasticsearch/lib/api/types'

dotenv.config()

const client = new Client({
  node: process.env.ELASTICSEARCH_ADDRESS ?? 'https://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME ?? 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD ?? ''
  },
  tls: {
    ca: fs.readFileSync(process.env.ELASTICSEARCH_CA_CERT ?? './elastic_ca.crt'),
    rejectUnauthorized: false
  }
})

export async function getClusterHealth (): Promise<any> {
  return client.cluster.health({})
}

export async function existIndex (indexName: string): Promise<boolean> {
  try {
    await client.cat.indices({ index: indexName })
  } catch (_: any) {
    return false
  }
  return true
}

export async function createIndex (indexName: string, settingsObj: any, mappingsObj: any): Promise<void> {
  await client.indices.create({
    index: indexName,
    body: {
      settings: settingsObj,
      mappings: mappingsObj
    }
  })
}

export async function index (param: IndexRequest): Promise<string> {
  const resp: any = await client.index(param)
  return resp._id
}

export async function updateDoc (param: UpdateRequest): Promise<void> {
  await client.update(param)
}

export async function updateByQuery (param: UpdateByQueryRequest): Promise<void> {
  await client.updateByQuery(param)
}

export async function deleteDoc (param: DeleteRequest): Promise<void> {
  await client.delete(param)
}

export async function deleteByQuery (param: DeleteByQueryRequest): Promise<void> {
  await client.deleteByQuery(param)
}

export class Searcher {
  private response: any | undefined

  async search (param: SearchRequest): Promise<any> {
    this.response = await client.search(param)
    return this.response
  }

  getTotalCount (): number {
    if (this.response === undefined) { throw new Error('no execution') }
    return this.response.hits.total.value
  }

  getDocArray<Doc>(): Doc[] {
    if (this.response === undefined) { throw new Error('no execution') }
    return this.response.hits.hits.map((hit: any) => Object.assign(hit._source, { id: hit._id }))
  }

  getFirstDoc<Doc>(): Doc | undefined {
    if (this.response === undefined) { throw new Error('no execution') }
    return this.getDocArray<Doc>()[0]
  }

  getIdArray(): string[] {
    if (this.response === undefined) { throw new Error('no execution') }
    return this.response.hits.hits.map((hit: any) => hit._id)
  }

  getBucketKeys<KeyType>(aggName: string): KeyType[] {
    if (this.response === undefined) { throw new Error('no execution') }
    return this.response.aggregations[aggName].buckets.map((b: any) => b.key)
  }
}
