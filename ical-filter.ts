import icalParse from 'node-ical'
import icalCalendar from 'ical-generator'

function isValid (checkString: string, bads: string[]): boolean {
  for (const bad of bads) {
    if (checkString.includes(bad)) {
      return false
    }
  }
  return true
}

export async function icalFilter (sourceURL: string, titleFilters: string[], yearFilters: string[] = []) {
  const cal = await icalParse.fromURL(sourceURL)

  const title = (cal['vcalendar'] as any)?.['WR-CALNAME'] ?? 'iCalendar'

  const newCal = icalCalendar({ name: `${title} Filtered`, prodId: { company: 'Paulius Sasnauskas', product: 'iCalendar Filter' } })

  for (const key in cal) {
    const item = cal[key]

    if (item.type !== 'VEVENT') continue

    if (!isValid(item.summary, titleFilters)) {
      continue
    }

    if (!isValid(item.start.getFullYear().toString(), yearFilters)){
      continue
    }

    newCal.createEvent({
      id: item.uid,
      sequence: Number.parseInt(item.sequence),
      start: item.start,
      end: item.end,
      recurrenceId: item.recurrenceid,
      // timezone: ,
      stamp: item.dtstamp,
      // allDay: ,
      // floating: ,
      // repeating: ,
      summary: item.summary,
      location: item.location,
      description: item.description,
      organizer: item.organizer as any,
      // attendees: ,
      // alarms: ,
      // categories: ,
      // status: ,
      // busystatus: ,
      // priority: ,
      url: item.url,
      // attachments: ,
      transparency: item.transparency as any,
      created: item.created,
      lastModified: item.lastmodified,
      class: item.class as any,
      // x: ,
    })
  }

  return newCal.toString()
}