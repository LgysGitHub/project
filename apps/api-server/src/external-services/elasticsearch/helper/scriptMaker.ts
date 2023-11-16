import { InlineScript } from '@elastic/elasticsearch/lib/api/types'

export function makeAssignmentScript (doc: any): InlineScript {
  let source: string = ''
  Object.keys(doc).forEach(k => {
    source += `ctx._source.${k}=params.${k};`
  })

  return {
    source,
    lang: 'painless',
    params: doc
  }
}

export function makeAddToArrayScript (field: string, value: any): InlineScript {
  // not working sometimes
  return {
    source: `if (!ctx._source.${field}.contains(params.value)) {` +
              `ctx._source.${field}.add(params.value)` +
            '}',
    lang: 'painless',
    params: {
      value: value
    }
  }
}

export function makeRemoveFromArrayScript (field: string, value: any): InlineScript {
  // not working sometimes
  return {
    source: `if (ctx._source.${field}.contains(params.value)) {` +
              `ctx._source.${field}.remove(ctx._source.${field}.indexOf(params.value))` +
            '}',
    lang: 'painless',
    params: {
      value: value
    }
  }
}
