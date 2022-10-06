import { createServer } from 'http'
import { parse } from 'url'
import { icalFilter } from './ical-filter'

const server = createServer(async (req, res) => {
  const queryParams = parse(req.url ?? '', true).query

  const sourceURL: string | string[] | undefined = queryParams.source
  const filter: string | string[] | undefined = queryParams.filter

  if (sourceURL === undefined || typeof sourceURL !== 'string') {
    res.writeHead(400)
    res.end('source is undefined or not a string')
    return
  }

  if (filter === undefined || typeof filter !== 'string') {
    res.writeHead(400)
    res.end('filter is undefined or not a string')
    return
  }

  const filters = filter.split(',')

  try {
    const result = await icalFilter(sourceURL, filters)
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
