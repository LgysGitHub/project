import {
  SearchRequest
} from '@elastic/elasticsearch/lib/api/types'

export function genTermQuery (
  index: string, field: string, value: string, param: SearchRequest = {}
): SearchRequest {
  return {
    index,
    ...param,
    query: {
      term: { [field]: value }
    }
  }
}

export function genTermsQuery (
  index: string, field: string, values: string[], param: SearchRequest = {}
): SearchRequest {
  return {
    index,
    ...param,
    query: {
      terms: { [field]: values }
    }
  }
}

export interface BoolQueryParam {
  musts?: any[]
  filters?: any[]
  mustNots?: any[]
  shoulds?: any[]
}

export function genBoolQuery (
  index: string,
  { musts = [], filters = [], mustNots = [], shoulds = [] }: BoolQueryParam,
  param: SearchRequest = {}
): SearchRequest {
  return {
    index,
    ...param,
    query: {
      bool: {
        must: musts,
        filter: filters,
        must_not: mustNots,
        should: shoulds
      }
    }
  }
}
