"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BadgeCheck, Users } from "lucide-react"

import { EventCardShell, EventInfoRow, eventSecondaryButtonClass } from "@/components/ui/event-countdown-card"
import { cn } from "@/lib/utils"

type Person = { name: string; photo?: string; role?: string }

type Team = {
  name: string
  groupPhoto: string
  lead: Person & { role: string }
  members: Person[]
}

const zaina = { name: "Zaina Ali", role: "President", photo: "/team/zaina-ali.jpg" }
const srinidhi = { name: "Srinidhi Vanjinepalli", role: "Head of Operations", photo: "/team/srinidhi-vanjinepalli.jpg" }
const aarya = { name: "Aarya Oswal", role: "Head of Marketing" }
const akshith = { name: "Akshith Akula", role: "Head of Industry", photo: "/team/akshith-akula.jpg" }
const jaden = { name: "Jaden Jovan", role: "Head of Technology" }
const diya = { name: "Diya Mehta", role: "Treasurer", photo: "/team/diya-mehta.jpg" }

// Photos live in /public/team. People without a photo yet show their initials until one is added.
const teams: Team[] = [
  {
    name: "Executive",
    groupPhoto: "/team/group-executive.jpg",
    lead: zaina,
    members: [
      { name: "Rakshitha Kishore", role: "Vice President", photo: "/team/rakshitha-kishore.jpg" },
      srinidhi,
      aarya,
      akshith,
      jaden,
      { name: "Arnav Mehta", role: "Head of Engineering", photo: "/team/arnav-mehta.jpg" },
      diya,
    ],
  },
  {
    name: "Operations",
    groupPhoto: "/team/group-operations.jpg",
    lead: srinidhi,
    members: [
      { name: "Ishir Chandra", photo: "/team/ishir-chandra.jpg" },
      { name: "Arya Gautam", photo: "/team/arya-gautam.jpg" },
      { name: "Vedanshi Thakur", photo: "/team/vedanshi-thakur.jpg" },
    ],
  },
  {
    name: "Marketing",
    groupPhoto: "/team/group-marketing.jpg",
    lead: aarya,
    members: [
      { name: "Neha Ramkumar", photo: "/team/neha-ramkumar.jpg" },
      { name: "Amulya Tirumala", photo: "/team/amulya-tirumala.jpg" },
      { name: "Rohini Viswanatham", photo: "/team/rohini-viswanatham.jpg" },
    ],
  },
  {
    name: "Industry",
    groupPhoto: "/team/group-industry.jpg",
    lead: akshith,
    members: [
      { name: "Ishayu Gupta", photo: "/team/ishayu-gupta.jpg" },
      { name: "Navya Seghal", photo: "/team/navya-seghal.jpg" },
      { name: "Prajwal Dahal", photo: "/team/prajwal-dahal.jpg" },
      { name: "Rasika Chaudhari", photo: "/team/rasika-chaudhari.jpg" },
      { name: "Krisha Nashte", photo: "/team/krisha-nashte.jpg" },
    ],
  },
  {
    name: "Tech",
    groupPhoto: "/team/group-tech.jpg",
    lead: jaden,
    members: [
      { name: "Harsh Patel", photo: "/team/harsh-patel.jpg" },
      { name: "Shreyas Jena", photo: "/team/shreyas-jena.jpg" },
      { name: "Chris Abraham", photo: "/team/chris-abraham.jpg" },
      { name: "Sarim Shaikh", photo: "/team/sarim-shaikh.jpg" },
      { name: "Rayan Sikkandar" },
      { name: "Sourish Pasula" },
    ],
  },
  {
    name: "Finance",
    groupPhoto: "/team/group-finance.jpg",
    lead: diya,
    members: [
      { name: "Reuel Joseph", photo: "/team/reuel-joseph.jpg" },
      { name: "Runi Patel", photo: "/team/runi-patel.jpg" },
    ],
  },
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

function PersonPhoto({ person, className }: { person: Person; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-aimd-black", className)}>
      {person.photo ? (
        <img
          src={person.photo}
          alt={person.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover/person:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_center,rgba(151,21,169,0.28),transparent_70%)]">
          <span className="font-aileron text-3xl font-black text-primary">{initials(person.name)}</span>
          <span className="px-2 text-center font-aileron text-[8px] uppercase tracking-[0.2em] text-white/35">Photo coming soon</span>
        </div>
      )}
    </div>
  )
}

function AvatarStack({ people, max = 5 }: { people: Person[]; max?: number }) {
  const hidden = people.length - max

  return (
    <div className="flex -space-x-2">
      {people.slice(0, max).map((person) => (
        <span
          key={person.name}
          title={person.name}
          className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-aimd-black ring-2 ring-aimd-surface"
        >
          {person.photo ? (
            <img src={person.photo} alt="" loading="lazy" className="h-full w-full object-cover object-[center_25%]" />
          ) : (
            <span className="font-aileron text-[10px] font-bold text-primary">{initials(person.name)}</span>
          )}
        </span>
      ))}
      {hidden > 0 && (
        <span className="relative flex size-9 items-center justify-center rounded-full bg-aimd-purple/30 font-aileron text-[11px] font-bold text-aimd-white ring-2 ring-aimd-surface">
          +{hidden}
        </span>
      )}
    </div>
  )
}

function useColumnCount() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)")
    const md = window.matchMedia("(min-width: 768px)")
    const update = () => setCount(lg.matches ? 3 : md.matches ? 2 : 1)
    update()
    lg.addEventListener("change", update)
    md.addEventListener("change", update)
    return () => {
      lg.removeEventListener("change", update)
      md.removeEventListener("change", update)
    }
  }, [])

  return count
}

function TeamCard({ team, isOpen, onToggle }: { team: Team; isOpen: boolean; onToggle: () => void }) {
  const people = [team.lead, ...team.members]

  return (
    <EventCardShell
      imageUrl={team.groupPhoto}
      imageAlt={`AIMD ${team.name} team`}
      imageClassName="h-auto aspect-[3/2]"
      eyebrow={`${team.name} Team`}
      className={cn(isOpen && "border-aimd-purple ring-2 ring-aimd-purple/60")}
    >
      <div>
        <p className="font-baskerville text-sm italic text-primary">Led by {team.lead.name}</p>
        <h3 className="mt-2 font-aileron text-2xl md:text-3xl font-black uppercase leading-[0.95] tracking-tight">
          {team.name}
        </h3>
      </div>
      <div className="flex flex-col gap-2 font-baskerville text-sm text-white/70">
        <EventInfoRow icon={Users}>{people.length} members</EventInfoRow>
        <EventInfoRow icon={BadgeCheck}>{team.lead.role}</EventInfoRow>
      </div>
      <div className="@container mt-auto">
        <div className="flex flex-col items-start gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
          <AvatarStack people={people} />
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={onToggle}
            className={cn(eventSecondaryButtonClass, "flex-none px-6")}
          >
            {isOpen ? "Hide team" : "Meet the team"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="members"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="@container overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-6 @sm:grid-cols-3">
              {people.map((person) => (
                <div
                  key={person.name}
                  className="group/person flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-aimd-black/60 transition-colors hover:border-aimd-purple/50"
                >
                  <PersonPhoto person={person} className="aspect-[4/5]" />
                  <div className="p-3">
                    <p className="font-aileron text-[8px] font-bold uppercase leading-snug tracking-[0.15em] text-primary">
                      {person.role ?? team.name}
                    </p>
                    <p className="mt-1 font-aileron text-xs font-bold uppercase leading-tight text-aimd-white">
                      {person.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </EventCardShell>
  )
}

export function TeamSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const columnCount = useColumnCount()
  const columns = Array.from({ length: columnCount }, (_, column) =>
    teams.filter((_, index) => index % columnCount === column),
  )

  return (
    <section className="px-4 md:px-8 pb-24">
      <h2 className="font-aileron text-4xl md:text-6xl font-black uppercase tracking-tight">
        The <span className="text-primary">Team</span>
      </h2>
      <p className="font-baskerville text-muted-foreground mt-4 mb-12 max-w-xl">
        The groups that keep AIMD running, from events and outreach to partnerships, engineering, and finance.
      </p>

      <div className="flex items-start gap-6">
        {columns.map((column, index) => (
          <div key={index} className="flex min-w-0 flex-1 flex-col gap-6">
            {column.map((team) => (
              <TeamCard
                key={team.name}
                team={team}
                isOpen={team.name === selected}
                onToggle={() => setSelected(team.name === selected ? null : team.name)}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
