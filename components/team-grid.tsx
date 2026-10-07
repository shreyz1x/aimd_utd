"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, X } from "lucide-react"

type Executive = {
  name: string
  role: string
  team?: { name: string; members: string[] }
}

const executives: Executive[] = [
  { name: "Zaina Ali", role: "President" },
  { name: "Rakshitha Kishore", role: "Vice President" },
  {
    name: "Srinidhi Vanjinepalli",
    role: "Head of Operations",
    team: { name: "Operations", members: ["Ishir Chandra", "Arya Gautam", "Vedanshi Thakur"] },
  },
  {
    name: "Aarya Oswal",
    role: "Head of Marketing",
    team: { name: "Marketing", members: ["Neha Ramkumar", "Amulya Tirumala", "Rohini Viswanatham"] },
  },
  {
    name: "Akshith Akula",
    role: "Head of Industry",
    team: {
      name: "Industry",
      members: ["Ishayu Gupta", "Navya Seghal", "Prajwal Dahal", "Rasika Chaudhari"],
    },
  },
  {
    name: "Jaden Jovan",
    role: "Head of Technology",
    team: {
      name: "Tech",
      members: [
        "Harsh Patel",
        "Shreyas Jena",
        "Chris Abraham",
        "Sarim Shaikh",
        "Rayan Sikkandar",
        "Krisha Nashte",
        "Sourish Pasula",
      ],
    },
  },
  { name: "Arnav Mehta", role: "Head of Engineering" },
  {
    name: "Diya Mehta",
    role: "Treasurer",
    team: { name: "Finance", members: ["Reuel Joseph", "Runi Patel"] },
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

function Avatar({ name, size }: { name: string; size: "lg" | "sm" }) {
  return (
    <div className="aspect-square overflow-hidden border-2 border-border bg-aimd-black flex items-center justify-center">
      <span className={`font-aileron text-primary ${size === "lg" ? "text-4xl" : "text-2xl"}`}>{initials(name)}</span>
    </div>
  )
}

export function TeamGrid() {
  const [selected, setSelected] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const active = executives.find((executive) => executive.name === selected)

  useEffect(() => {
    if (active) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [active])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executives.map((executive) => {
          const isOpen = executive.name === selected
          const content = (
            <>
              <Avatar name={executive.name} size="lg" />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-aileron text-xl uppercase">{executive.name}</h3>
                  <p className="font-baskerville text-xs text-primary uppercase">{executive.role}</p>
                </div>
                {executive.team && (
                  <ChevronDown
                    size={20}
                    className={`mt-1 shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </div>
              {executive.team && (
                <p className="font-aileron text-xs uppercase text-muted-foreground mt-2">
                  {isOpen ? "Hide team" : `View ${executive.team.name} team`}
                </p>
              )}
            </>
          )

          if (!executive.team) {
            return (
              <div key={executive.name} className="group bg-card">
                {content}
              </div>
            )
          }

          return (
            <button
              key={executive.name}
              type="button"
              aria-expanded={isOpen}
              onClick={() => setSelected(isOpen ? null : executive.name)}
              className={`group bg-card text-left transition-colors ${isOpen ? "ring-2 ring-aimd-purple" : "hover:ring-2 hover:ring-aimd-purple/50"}`}
            >
              {content}
            </button>
          )
        })}
      </div>

      <div ref={panelRef} className="scroll-mt-28">
        <AnimatePresence mode="wait">
          {active?.team && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-10 border-2 border-aimd-purple/40 bg-card p-6 md:p-10"
            >
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="font-baskerville text-xs text-primary uppercase">Led by {active.name}</p>
                  <h3 className="font-aileron text-3xl md:text-5xl uppercase tracking-tight mt-2">
                    {active.team.name} Team
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close team"
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-full border border-white/10 hover:bg-aimd-white hover:text-aimd-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {active.team.members.map((member) => (
                  <div key={member}>
                    <Avatar name={member} size="sm" />
                    <p className="font-aileron text-sm uppercase mt-3">{member}</p>
                    <p className="font-baskerville text-xs text-muted-foreground">{active.team?.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
