import { createServer } from 'http'
import { parse } from 'url'
import { icalFilter } from './ical-filter'

const server = createServer(async (req, res) => {
  const queryParams = parse(req.url ?? '', true).query

  const sourceURL: string | string[] | undefined = queryParams.source
  const titleFilter: string | string[] | undefined = queryParams.titleFilter
  const yearFilter: string | string[] | undefined = queryParams.yearFilter

  if (sourceURL === undefined || typeof sourceURL !== 'string') {
    res.writeHead(400)
    res.end('source is undefined or not a string')
    return
  }

  if (titleFilter === undefined || typeof titleFilter !== 'string') {
    res.writeHead(400)
    res.end('titleFilter is undefined or not a string')
    return
  }

  if (yearFilter !== undefined && typeof yearFilter !== 'string') {
    res.writeHead(400)
    res.end('yearFilter is not a string')
    return
  }

  const titleFilters = titleFilter.split(',')
  const yearFilters = yearFilter?.split(',') ?? []

  try {
    const result = await icalFilter(sourceURL, titleFilters, yearFilters)
    res.writeHead(200)
    res.end(result)
    return
  } catch (e) {
    res.writeHead(500)
    res.end((e as any).toString())
    return
  }
})

const host = 'localhost'
const port = 5000

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`)
})
