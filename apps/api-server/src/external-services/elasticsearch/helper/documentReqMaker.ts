import {
  IndexRequest,
  UpdateByQueryRequest, UpdateRequest,
  DeleteRequest, DeleteByQueryRequest,
  QueryDslQueryContainer
} from '@elastic/elasticsearch/lib/api/types'
import { makeAssignmentScript } from './scriptMaker'

export function genIndexReq (index: string, doc: any, id?: string): IndexRequest {
  const docCopy: any = { ...doc }
  delete docCopy.id
  return {
    index: index,
    id: id,
    document: docCopy,
    refresh: 'wait_for'
  }
}

export function genPartialDocUpdateReq (index: string, id: string, partialDoc: any): UpdateRequest {
  const docCopy: any = { ...partialDoc }
  delete docCopy.id
  return {
    index: index,
    id,
    doc: docCopy,
    retry_on_conflict: 5,
    refresh: 'wait_for'
  }
}

export function genUpdateByQueryReq (index: string, query: QueryDslQueryContainer, partialDoc: any, refresh: boolean = false): UpdateByQueryRequest {
  return {
    index,
    query,
    script: makeAssignmentScript(partialDoc),
    conflicts: 'proceed',
    refresh: refresh
  }
}

export function genDeleteReq (index: string, id: string): DeleteRequest {
  return {
    id,
    index: index,
    refresh: 'wait_for'
  }
}

export function genDeleteByQueryReq (index: string, query: QueryDslQueryContainer): DeleteByQueryRequest {
  return {
    index,
    query,
    conflicts: 'proceed'
  }
}
