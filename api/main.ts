import type { VercelRequest, VercelResponse } from '@vercel/node'
import { icalFilter } from '../ical-filter'

export default async (request: VercelRequest, response: VercelResponse) => {

  const { source: sourceURL, filter } = request.query

  if (sourceURL === undefined || typeof sourceURL !== 'string') {
    response.status(400).end('source is undefined or not a string')
    return
  }

  if (filter === undefined || typeof filter !== 'string') {
    response.status(400).end('filter is undefined or not a string')
    return
  }

  const filters = filter.split(',')

  try {
    const result = await icalFilter(sourceURL, filters)
    response.status(200).end(result)
    return
  } catch (e) {
    response.status(500).end((e as any).toString())
    return
  }
}
