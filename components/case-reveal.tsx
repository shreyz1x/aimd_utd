"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, Clock, Download, ExternalLink, Eye, FileText, Lock, Mail, Trophy, X } from "lucide-react"

import {
  CountdownUnits,
  EventCardShell,
  EventInfoRow,
  eventPrimaryButtonClass,
  eventSecondaryButtonClass,
  useCountdown,
} from "@/components/ui/event-countdown-card"
import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CASE_CONTACT_EMAIL,
  CASE_DETAILS,
  CASE_PDF_DOWNLOAD_PATH,
  CASE_PDF_FILENAME,
  CASE_PDF_PATH,
  CASE_RELEASE_DATE,
  CASE_RELEASE_LABEL,
  CASE_TITLE,
} from "@/lib/case-competition"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

// Only trust the media query after mount; reading it during the first render would mismatch the server HTML.
function useMountedReducedMotion() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && Boolean(prefersReduced)
}

export function CaseRevealCard({
  initialReleased,
  layout = "stacked",
  className,
}: {
  // Computed on the server so the first render already shows the unlocked state after release.
  initialReleased: boolean
  layout?: "stacked" | "wide"
  className?: string
}) {
  const timeLeft = useCountdown(CASE_RELEASE_DATE)
  const reduceMotion = useMountedReducedMotion()
  const [previewOpen, setPreviewOpen] = useState(false)

  const released = initialReleased || (timeLeft?.done ?? false)
  // Already-released pages render the live state instantly; only an in-session unlock plays the reveal.
  const [playReveal] = useState(!initialReleased)
  const wide = layout === "wide"

  return (
    <>
      <EventCardShell
        layout={layout}
        imageUrl="/gallery/04_case_event_table.jpg"
        imageAlt="AIMD members reviewing materials at a case competition event"
        eyebrow="Case Reveal"
        className={cn(released && "border-aimd-purple/60", className)}
        overlay={
          released && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 rounded-3xl shadow-[inset_0_0_80px_-10px_rgba(151,21,169,0.55)]"
              initial={false}
              animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.45, 1, 0.45] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )
        }
        badge={
          released && (
            <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-aimd-purple px-3 py-1 font-aileron text-[10px] font-bold uppercase tracking-wider text-aimd-white">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-aimd-white opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-aimd-white" />
              </span>
              Live
            </span>
          )
        }
      >
        <p className="sr-only" aria-live="polite">
          {released ? "The case is now live." : ""}
        </p>

        {released ? (
            <motion.div
              initial={
                !playReveal ? false : reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, filter: "blur(8px)" }
              }
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: EASE }}
              className="flex flex-1 flex-col gap-5"
            >
              <div>
                <p className="font-baskerville text-sm italic text-primary">The official case is here.</p>
                <h3
                  className={cn(
                    "mt-2 font-aileron font-black uppercase leading-[0.95] tracking-tight drop-shadow-[0_0_24px_rgba(151,21,169,0.8)]",
                    wide ? "text-3xl md:text-5xl" : "text-2xl",
                  )}
                >
                  The Case <span className="text-primary">Is Live</span>
                </h3>
                <p className={cn("mt-3 font-baskerville leading-snug text-aimd-white/90", wide ? "text-base md:text-lg" : "text-sm")}>
                  {CASE_TITLE}
                </p>
              </div>

              <div className="flex flex-col gap-2 font-baskerville text-sm text-white/70">
                <EventInfoRow icon={Calendar}>Released {CASE_RELEASE_LABEL}</EventInfoRow>
                <EventInfoRow icon={Clock}>Preliminary Submission: {CASE_DETAILS.preliminaryDeadline}</EventInfoRow>
                <EventInfoRow icon={Trophy}>Semifinalists Oct 24 · Finals Oct 25 (in person)</EventInfoRow>
                <CaseContactRow />
              </div>

              <div className="rounded-2xl border border-white/10 bg-aimd-black/60 p-4">
                <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Case Details</p>
                <p className="mt-1 font-baskerville text-sm text-white/60">Preliminary deliverables</p>
                <ul className="mt-3 space-y-2 font-baskerville text-sm text-white/75">
                  {CASE_DETAILS.preliminaryDeliverables.map((item) => (
                    <li key={item} className="flex gap-2">
                      <FileText className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={cn("mt-auto flex gap-3", wide ? "flex-col sm:flex-row" : "flex-col")}>
                <a
                  href={CASE_PDF_DOWNLOAD_PATH}
                  download={CASE_PDF_FILENAME}
                  className={cn(eventPrimaryButtonClass, "shadow-[0_0_30px_-6px_rgba(151,21,169,0.9)]")}
                >
                  <Download className="size-4" aria-hidden />
                  Download Case PDF
                </a>
                <button type="button" onClick={() => setPreviewOpen(true)} className={eventSecondaryButtonClass}>
                  <Eye className="size-4" aria-hidden />
                  Preview Case
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-1 flex-col gap-5">
              <div>
                <p className="font-baskerville text-sm italic text-primary">The official case drops soon.</p>
                <h3
                  className={cn(
                    "mt-2 font-aileron font-black uppercase leading-[0.95] tracking-tight",
                    wide ? "text-3xl md:text-5xl" : "text-2xl",
                  )}
                >
                  Case Reveal
                </h3>
              </div>

              <div className="flex flex-col gap-2 font-baskerville text-sm text-white/70">
                <EventInfoRow icon={Calendar}>Release: {CASE_RELEASE_LABEL}</EventInfoRow>
                <EventInfoRow icon={Clock}>Preliminary Submission: {CASE_DETAILS.preliminaryDeadline}</EventInfoRow>
                <EventInfoRow icon={FileText}>Official case document unlocks here at release</EventInfoRow>
                <CaseContactRow />
              </div>

              <div className="rounded-2xl border border-white/10 bg-aimd-black/60 p-4">
                <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Case Release</p>
                <p className="mt-1 font-baskerville text-sm text-white/60">The case drops in</p>
                <CountdownUnits timeLeft={timeLeft} size={wide ? "lg" : "md"} />
              </div>

              <div className={cn("mt-auto flex gap-3", wide ? "flex-col sm:flex-row" : "flex-col")}>
                <button type="button" disabled className={cn(eventPrimaryButtonClass, "disabled:opacity-60")}>
                  <Lock className="size-4" aria-hidden />
                  Locked Until Release
                </button>
              </div>
            </div>
          )}
      </EventCardShell>

      {released && <CasePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} />}
    </>
  )
}

function CaseContactRow() {
  return (
    <EventInfoRow icon={Mail}>
      <span>
        Questions?{" "}
        <a
          href={`mailto:${CASE_CONTACT_EMAIL}`}
          className="break-all text-primary underline-offset-4 hover:underline focus-visible:underline"
        >
          {CASE_CONTACT_EMAIL}
        </a>
      </span>
    </EventInfoRow>
  )
}

function CasePreviewDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  // Some browsers (notably Android Chrome) cannot render PDFs inline, so they get open/download buttons instead.
  const [canEmbedPdf, setCanEmbedPdf] = useState(true)

  useEffect(() => {
    setCanEmbedPdf(navigator.pdfViewerEnabled !== false)
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[92svh] w-[calc(100%-1rem)] max-w-none flex-col gap-0 overflow-hidden border-aimd-purple/40 bg-aimd-surface p-0 text-aimd-white sm:max-w-5xl"
      >
        <DialogHeader className="flex-row items-start justify-between gap-4 border-b border-white/10 p-4 text-left md:p-5">
          <div className="min-w-0">
            <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              AIMD Case Competition 2026
            </p>
            <DialogTitle className="mt-1 font-aileron text-base font-bold uppercase leading-tight md:text-lg">
              Case Document Preview
            </DialogTitle>
            <DialogDescription className="mt-1 line-clamp-2 font-baskerville text-xs text-white/60 md:text-sm">
              {CASE_TITLE}
            </DialogDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={CASE_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-full border-aimd-purple/50 bg-transparent font-aileron text-xs uppercase tracking-wider text-aimd-white hover:bg-aimd-purple/20 hover:text-aimd-white",
              )}
            >
              <ExternalLink className="size-3.5" aria-hidden />
              <span className="hidden sm:inline">Open in new tab</span>
              <span className="sm:hidden">Open</span>
            </a>
            <DialogClose
              aria-label="Close case preview"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 text-aimd-white transition-colors hover:bg-aimd-white hover:text-aimd-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimd-purple"
            >
              <X className="size-4" aria-hidden />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="relative flex-1 bg-aimd-black">
          {canEmbedPdf ? (
            <iframe
              src={`${CASE_PDF_PATH}#view=FitH`}
              title={`Case document: ${CASE_TITLE}`}
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <FileText className="size-10 text-primary" aria-hidden />
              <p className="max-w-sm font-baskerville text-sm text-white/70">
                Your browser can&apos;t show PDFs inside the page. Open the case in a new tab or download it instead.
              </p>
              <div className="flex w-full max-w-sm flex-col gap-3">
                <a href={CASE_PDF_PATH} target="_blank" rel="noopener noreferrer" className={eventPrimaryButtonClass}>
                  <ExternalLink className="size-4" aria-hidden />
                  Open PDF
                </a>
                <a href={CASE_PDF_DOWNLOAD_PATH} download={CASE_PDF_FILENAME} className={eventSecondaryButtonClass}>
                  <Download className="size-4" aria-hidden />
                  Download PDF
                </a>
              </div>
            </div>
          )}
        </div>

        {canEmbedPdf && (
          <p className="border-t border-white/10 px-4 py-2 font-baskerville text-[11px] text-white/50 md:hidden">
            If the preview doesn&apos;t scroll on your phone, use &ldquo;Open&rdquo; to view the full PDF.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
