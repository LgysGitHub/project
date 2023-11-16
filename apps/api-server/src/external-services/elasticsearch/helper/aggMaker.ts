export function makeTermsAgg (field: string, size: number): any {
  return {
    terms: {
      size,
      field
    }
  }
}
