// Wall-clock release time in America/Chicago (UT Dallas). Change only this value to move the reveal.
export const CASE_RELEASE_CHICAGO_TIME = "2026-10-18T12:00:00"

export const CASE_TIME_ZONE = "America/Chicago"

export const CASE_TITLE =
  "Bridging the Gap: Artificial Intelligence and Access to Primary & Preventive Care in Underserved America"

// Lives outside /public so the file can only be reached through the release-gated API route.
export const CASE_PDF_FILENAME = "UTD_AIMD_Case_Document_2026_v2.pdf"

export const CASE_CONTACT_EMAIL = "zaina.ali@utdallas.edu"
export const CASE_PDF_PATH = "/api/case-document"
export const CASE_PDF_DOWNLOAD_PATH = "/api/case-document?download=1"

function parseWallTime(wallTime: string) {
  const [date, time = "00:00:00"] = wallTime.split("T")
  const [year, month, day] = date.split("-").map(Number)
  const [hour, minute, second = 0] = time.split(":").map(Number)
  return { year, month, day, hour, minute, second }
}

function timeZoneOffsetMs(timestamp: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(timestamp))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"))
  return asUtc - Math.floor(timestamp / 1000) * 1000
}

// Converts a wall-clock time in `timeZone` to an absolute instant, handling CST/CDT automatically.
function zonedWallTimeToDate(wallTime: string, timeZone: string) {
  const { year, month, day, hour, minute, second } = parseWallTime(wallTime)
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute, second)
  let timestamp = naiveUtc - timeZoneOffsetMs(naiveUtc, timeZone)
  const corrected = naiveUtc - timeZoneOffsetMs(timestamp, timeZone)
  if (corrected !== timestamp) timestamp = corrected
  return new Date(timestamp)
}

export const CASE_RELEASE_DATE = zonedWallTimeToDate(CASE_RELEASE_CHICAGO_TIME, CASE_TIME_ZONE)

export function isCaseReleased(now: number = Date.now()) {
  return now >= CASE_RELEASE_DATE.getTime()
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Built from the config string instead of Intl so server and client render identical text.
export const CASE_RELEASE_LABEL = (() => {
  const { year, month, day, hour, minute } = parseWallTime(CASE_RELEASE_CHICAGO_TIME)
  const period = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${MONTHS[month - 1]} ${day}, ${year} · ${hour12}:${String(minute).padStart(2, "0")} ${period} CT`
})()

export const CASE_DETAILS = {
  preliminaryDeadline: "Oct 23, 2026 · 11:59 PM",
  semifinalistsAnnounced: "Morning of Oct 24, 2026",
  finalsRound: "Oct 25, 2026 · in person",
  preliminaryDeliverables: [
    "5-minute video presentation, uploaded to YouTube as unlisted — every team member presents",
    "One-page executive summary (Times New Roman, 12 pt, double-spaced) with all names and team number",
    "Basic implementation timeline and budget overview (itemization not required yet)",
    "One member submits the video link and summary through the official submission form",
  ],
  finalsDeliverables: ["6-minute presentation with itemized budget, detailed timeline, sources, and scalability plan", "4-minute judges' Q&A"],
}
