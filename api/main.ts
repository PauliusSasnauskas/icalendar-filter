import type { VercelRequest, VercelResponse } from '@vercel/node'
import { icalFilter } from '../ical-filter'

export default async (request: VercelRequest, response: VercelResponse) => {

  const { source: sourceURL, titleFilter, yearFilter } = request.query

  if (sourceURL === undefined || typeof sourceURL !== 'string') {
    response.status(400).end('source is undefined or not a string')
    return
  }

  if (titleFilter === undefined || typeof titleFilter !== 'string') {
    response.status(400).end('filter is undefined or not a string')
    return
  }

  if (yearFilter !== undefined && typeof yearFilter !== 'string') {
    response.status(400).end('yearFilter is not a string')
    return
  }

  const titleFilters = titleFilter.split(',')
  const yearFilters = yearFilter?.split(',') ?? []

  try {
    const result = await icalFilter(sourceURL, titleFilters, yearFilters)
    response.status(200).end(result)
    return
  } catch (e) {
    response.status(500).end((e as any).toString())
    return
  }
}
