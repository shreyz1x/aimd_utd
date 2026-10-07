"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export interface EventCountdownCardProps {
  title: string
  eyebrow?: string
  tagline?: string
  dateRange?: string
  dateLabel: string
  teamSize?: string
  countdownLabel?: string
  countdownTitle?: string
  targetDate: Date
  imageUrl: string
  imageAlt?: string
  primaryAction: { label: string; href: string }
  secondaryAction?: { label: string; onClick: () => void }
  closedLabel?: string
  layout?: "stacked" | "wide"
  className?: string
  children?: ReactNode
}

export function EventCountdownCard({
  title,
  eyebrow,
  tagline,
  dateRange,
  dateLabel,
  teamSize,
  countdownLabel = "Next Deadline",
  countdownTitle = "Closes in",
  targetDate,
  imageUrl,
  imageAlt = "",
  primaryAction,
  secondaryAction,
  closedLabel = "Closed",
  layout = "stacked",
  className,
  children,
}: EventCountdownCardProps) {
  // Start empty so server and client render the same markup; the clock fills in after mount.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate))
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const isClosed =
    timeLeft !== null && timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0
  const closingSoon = timeLeft !== null && !isClosed && timeLeft.days < 3
  const wide = layout === "wide"

  const units: { label: string; value?: number }[] = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Mins", value: timeLeft?.minutes },
    { label: "Secs", value: timeLeft?.seconds },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-aimd-purple/30 bg-aimd-surface text-aimd-white shadow-[0_30px_80px_-30px_rgba(151,21,169,0.6)] transition-colors hover:border-aimd-purple/60",
        wide ? "flex flex-col md:flex-row" : "flex flex-col",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", wide ? "h-56 md:h-auto md:w-[42%]" : "h-48")}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0",
            wide
              ? "bg-gradient-to-t md:bg-gradient-to-r from-aimd-surface via-aimd-surface/40 to-aimd-purple/20"
              : "bg-gradient-to-t from-aimd-surface via-aimd-surface/40 to-aimd-purple/20",
          )}
        />
        {eyebrow && (
          <span className="absolute left-5 top-5 rounded-full border border-aimd-purple/50 bg-aimd-black/70 px-3 py-1 font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
            {eyebrow}
          </span>
        )}
        {closingSoon && (
          <span className="absolute right-5 top-5 animate-pulse rounded-full bg-aimd-purple px-3 py-1 font-aileron text-[10px] font-bold uppercase tracking-wider text-aimd-white">
            Closing Soon!
          </span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col gap-5", wide ? "p-6 md:p-10" : "p-6")}>
        <div>
          {tagline && (
            <p className="font-baskerville text-sm italic text-primary">{tagline}</p>
          )}
          <h3
            className={cn(
              "mt-2 font-aileron font-black uppercase leading-[0.95] tracking-tight",
              wide ? "text-3xl md:text-5xl" : "text-2xl",
            )}
          >
            {title}
          </h3>
        </div>

        <div className="flex flex-col gap-2 font-baskerville text-sm text-white/70">
          {dateRange && (
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              {dateRange}
            </span>
          )}
          <span className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            {dateLabel}
          </span>
          {teamSize && (
            <span className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              {teamSize}
            </span>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-aimd-black/60 p-4">
          <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            {countdownLabel}
          </p>
          <p className="mt-1 font-baskerville text-sm text-white/60">
            {isClosed ? closedLabel : countdownTitle}
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {units.map((unit) => (
              <div key={unit.label} className="rounded-xl bg-aimd-surface px-2 py-3 text-center">
                <div
                  className={cn(
                    "font-aileron font-bold tabular-nums text-aimd-white",
                    wide ? "text-2xl md:text-4xl" : "text-2xl",
                  )}
                >
                  {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
                </div>
                <div className="mt-1 font-aileron text-[10px] uppercase tracking-wider text-white/40">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cn("mt-auto flex gap-3", wide ? "flex-col sm:flex-row" : "flex-col")}>
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "flex-1 rounded-full bg-aimd-purple font-aileron uppercase tracking-wider text-aimd-white hover:bg-aimd-purple/85",
            )}
          >
            {primaryAction.label}
          </a>
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex-1 rounded-full border-aimd-purple/50 bg-transparent font-aileron uppercase tracking-wider text-aimd-white hover:bg-aimd-purple/20 hover:text-aimd-white",
              )}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>

        {children}
      </div>
    </motion.div>
  )
}

export default EventCountdownCard
