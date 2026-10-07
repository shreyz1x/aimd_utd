"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  number: string
  title: string
  description: string
  tags: string[]
  closedNote?: string
}

export function ServiceCard({ number, title, description, tags, closedNote }: ServiceCardProps) {
  const closed = Boolean(closedNote)

  return (
    <div
      className={cn(
        "group border-t border-white/20 py-12 transition-colors duration-500",
        closed ? "cursor-default" : "hover:bg-aimd-purple/10 cursor-pointer",
      )}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className={cn("font-baskerville text-primary text-xl", closed && "opacity-50")}>({number})</div>
        <div className="flex-1">
          {closed && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-aimd-purple/20 border border-aimd-purple/50 font-aileron text-xs uppercase tracking-wider text-primary">
              {closedNote}
            </span>
          )}
          <h3
            className={cn(
              "font-aileron text-5xl md:text-7xl font-bold uppercase mb-4 transition-transform duration-300",
              closed
                ? "text-aimd-white/40 line-through decoration-aimd-purple decoration-4"
                : "text-aimd-white group-hover:translate-x-4",
            )}
          >
            {title}
          </h3>
          <p className={cn("font-baskerville max-w-2xl mb-6", closed ? "text-white/40" : "text-white/70")}>
            {description}
          </p>
          <div className={cn("flex gap-4 flex-wrap", closed && "opacity-50")}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-white/30 rounded-full text-white/60 font-aileron text-sm uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {!closed && (
          <div className="md:self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:rotate-45">
            <ArrowUpRight className="w-20 h-20 text-primary" />
          </div>
        )}
      </div>
    </div>
  )
}
