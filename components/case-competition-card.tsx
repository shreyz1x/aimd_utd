"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EventCountdownCard } from "@/components/ui/event-countdown-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// 11:59 PM Central (CDT) at UT Dallas.
const REGISTRATION_DEADLINE = new Date("2026-10-19T23:59:00-05:00")

const timeline = [
  { date: "Oct 18", title: "Case Released", description: "Teams receive the official competition case." },
  { date: "Oct 19", title: "Registration Deadline", description: "Last day to register your team." },
  {
    date: "Oct 23 • 11:59 PM",
    title: "Submission Deadline",
    description: "Video presentation and written report due.",
  },
  {
    date: "Oct 25",
    title: "Final Presentations",
    description: "Tentatively 11:00 AM – 2:00 PM. Finalist teams present their solutions.",
  },
]

export function CaseCompetitionCard({
  layout = "stacked",
  className,
}: {
  layout?: "stacked" | "wide"
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <EventCountdownCard
        layout={layout}
        className={className}
        eyebrow="AIMD Case Competition"
        tagline="Solve. Strategize. Present."
        title="AIMD Premier Case Competition"
        dateRange="Oct 18 – Oct 25, 2026"
        dateLabel="Registration Deadline: 10/19/2026"
        teamSize="Team Size: 2–5 Students"
        countdownLabel="Next Deadline"
        countdownTitle="Registration closes in"
        closedLabel="Registration is closed"
        targetDate={REGISTRATION_DEADLINE}
        imageUrl="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
        imageAlt="Students presenting at a competition"
        primaryAction={{ label: "Register Now", href: "https://forms.gle/LeY9w16rEpHorqe77" }}
        secondaryAction={{ label: "View Details", onClick: () => setOpen(true) }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-aimd-purple/40 bg-aimd-surface text-aimd-white sm:max-w-5xl p-6 md:p-10">
          <DialogHeader>
            <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              AIMD Case Competition
            </p>
            <DialogTitle className="font-aileron text-3xl md:text-4xl font-black uppercase tracking-tight">
              Competition <span className="text-primary">Timeline</span>
            </DialogTitle>
            <DialogDescription className="font-baskerville text-white/60">
              Oct 18 – Oct 25, 2026 · Teams of 2–5 students
            </DialogDescription>
          </DialogHeader>

          <div className="relative mt-6">
            <div
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-aimd-purple via-primary to-aimd-purple/20 md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
            />
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
              {timeline.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.45, ease: "easeOut" }}
                  className="relative pl-8 md:pl-0 md:pt-8"
                >
                  <span className="absolute left-0 top-0.5 size-[15px] rounded-full border-2 border-primary bg-aimd-purple shadow-[0_0_16px_rgba(151,21,169,0.8)] md:top-0" />
                  <p className="font-aileron text-xs font-bold uppercase tracking-wider text-primary">{step.date}</p>
                  <h4 className="mt-2 font-aileron text-lg font-bold uppercase leading-tight">{step.title}</h4>
                  <p className="mt-2 font-baskerville text-sm text-white/60">{step.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
