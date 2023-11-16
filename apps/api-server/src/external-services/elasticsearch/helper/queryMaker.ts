import {
  QueryDslQueryContainer
} from '@elastic/elasticsearch/lib/api/types'
import { BoolQueryParam } from './searchReqMaker'

export function makeBoolQuery ({ musts = [], filters = [], mustNots = [], shoulds = [] }: BoolQueryParam): QueryDslQueryContainer {
  return {
    bool: {
      must: musts,
      filter: filters,
      must_not: mustNots,
      should: shoulds
    }
  }
}

export function makeTermQuery (field: string, value: string): QueryDslQueryContainer {
  return {
    term: {
      [field]: value
    }
  }
}

export function makeTermsQuery (field: string, values: string[]): QueryDslQueryContainer {
  return {
    terms: {
      [field]: values
    }
  }
}
