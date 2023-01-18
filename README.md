# iCalendar Filter

Pulls an iCalendar feed and filters out events based on their `SUMMARY`.

## To Run

Requirements
- Node
- `npm`

Install dependencies
```bash
npm install
```

Run
```bash
npm start
```

## Usage

Specify the original calendar feed in the `source` query parameter.
Specify a comma separated string list what titles to filter out in the `titleFilter` query parameter, years – `yearFilter`.

For example, this server is hosted on `https://icalendar-filter.vercel.app/api/main`, source feed is `https://www.mysite.com/mytimetable/AB3D567H/schedule.ics`, undesired events contain strings `COMP70000` and `New Year`, then pull from the url:

```
https://icalendar-filter.vercel.app/api/main?source=https://www.mysite.com/mytimetable/AB3D567H/schedule.ics&titleFilter=COMP70000,New%20Year
```
