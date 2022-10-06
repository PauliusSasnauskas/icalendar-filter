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

export async function icalFilter (sourceURL: string, filters: string[]) {
  const cal = await icalParse.fromURL(sourceURL)

  const newCal = icalCalendar({ name: 'ICL Calendar Feed' })

  for (const key in cal) {
    const item = cal[key]

    if (item.type !== 'VEVENT') continue

    if (!isValid(item.summary, filters)) {
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