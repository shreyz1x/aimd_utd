import { readFile } from "node:fs/promises"
import path from "node:path"

import { CASE_PDF_FILENAME, CASE_RELEASE_DATE, isCaseReleased } from "@/lib/case-competition"

// Must run per request: the release check uses the server clock, never the visitor's.
export const dynamic = "force-dynamic"

const CASE_PDF_FILE = path.join(process.cwd(), "content", "case", CASE_PDF_FILENAME)

export async function GET(request: Request) {
  if (!isCaseReleased()) {
    return new Response("The case has not been released yet.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    })
  }

  let file: Buffer
  try {
    file = await readFile(CASE_PDF_FILE)
  } catch {
    return new Response("Case document not found.", { status: 404, headers: { "Cache-Control": "no-store" } })
  }

  const download = new URL(request.url).searchParams.has("download")

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(file.byteLength),
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${CASE_PDF_FILENAME}"`,
      // Cacheable only after release, so a CDN can never hold a copy from before the reveal.
      "Cache-Control": "public, max-age=300, must-revalidate",
      "Last-Modified": CASE_RELEASE_DATE.toUTCString(),
    },
  })
}
