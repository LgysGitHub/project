import {
  SearchRequest
} from '@elastic/elasticsearch/lib/api/types'

export function genAggsReq (index: string, aggs: any, query?: any): SearchRequest {
  return {
    index,
    size: 0,
    query,
    aggs
  }
}
