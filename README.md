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
Specify a comma separated string list what to filter out in the `filter` query parameter.

For example, this server is hosted on `http://localhost:5000`, source feed is `https://www.mysite.com/mytimetable/AB3D567H/schedule.ics`, undesired events contain strings `COMP70000` and `New Year`, then pull from the url:

```
http://localhost:5000/?source=https://www.mysite.com/mytimetable/AB3D567H/schedule.ics&filter=COMP70000,New%20Year
```
