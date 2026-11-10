"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Users, X } from "lucide-react"

import { EventCardShell, EventInfoRow, eventSecondaryButtonClass } from "@/components/ui/event-countdown-card"
import { cn } from "@/lib/utils"

type Person = { name: string; photo?: string }

type Executive = Person & {
  role: string
  team?: { name: string; groupPhoto?: string; members: Person[] }
}

// Photos live in /public/team. People without a photo yet show their initials until one is added.
const executives: Executive[] = [
  { name: "Zaina Ali", role: "President", photo: "/team/zaina-ali.jpg" },
  { name: "Rakshitha Kishore", role: "Vice President", photo: "/team/rakshitha-kishore.jpg" },
  {
    name: "Srinidhi Vanjinepalli",
    role: "Head of Operations",
    photo: "/team/srinidhi-vanjinepalli.jpg",
    team: {
      name: "Operations",
      groupPhoto: "/team/group-operations.jpg",
      members: [
        { name: "Ishir Chandra", photo: "/team/ishir-chandra.jpg" },
        { name: "Arya Gautam", photo: "/team/arya-gautam.jpg" },
        { name: "Vedanshi Thakur", photo: "/team/vedanshi-thakur.jpg" },
      ],
    },
  },
  {
    name: "Aarya Oswal",
    role: "Head of Marketing",
    team: {
      name: "Marketing",
      groupPhoto: "/team/group-marketing.jpg",
      members: [
        { name: "Neha Ramkumar", photo: "/team/neha-ramkumar.jpg" },
        { name: "Amulya Tirumala", photo: "/team/amulya-tirumala.jpg" },
        { name: "Rohini Viswanatham", photo: "/team/rohini-viswanatham.jpg" },
      ],
    },
  },
  {
    name: "Akshith Akula",
    role: "Head of Industry",
    photo: "/team/akshith-akula.jpg",
    team: {
      name: "Industry",
      groupPhoto: "/team/group-industry.jpg",
      members: [
        { name: "Ishayu Gupta", photo: "/team/ishayu-gupta.jpg" },
        { name: "Navya Seghal", photo: "/team/navya-seghal.jpg" },
        { name: "Prajwal Dahal", photo: "/team/prajwal-dahal.jpg" },
        { name: "Rasika Chaudhari", photo: "/team/rasika-chaudhari.jpg" },
      ],
    },
  },
  {
    name: "Jaden Jovan",
    role: "Head of Technology",
    team: {
      name: "Tech",
      groupPhoto: "/team/group-tech.jpg",
      members: [
        { name: "Harsh Patel", photo: "/team/harsh-patel.jpg" },
        { name: "Shreyas Jena", photo: "/team/shreyas-jena.jpg" },
        { name: "Chris Abraham", photo: "/team/chris-abraham.jpg" },
        { name: "Sarim Shaikh", photo: "/team/sarim-shaikh.jpg" },
        { name: "Rayan Sikkandar" },
        { name: "Krisha Nashte", photo: "/team/krisha-nashte.jpg" },
        { name: "Sourish Pasula" },
      ],
    },
  },
  { name: "Arnav Mehta", role: "Head of Engineering", photo: "/team/arnav-mehta.jpg" },
  {
    name: "Diya Mehta",
    role: "Treasurer",
    photo: "/team/diya-mehta.jpg",
    team: {
      name: "Finance",
      groupPhoto: "/team/group-finance.jpg",
      members: [
        { name: "Reuel Joseph", photo: "/team/reuel-joseph.jpg" },
        { name: "Runi Patel", photo: "/team/runi-patel.jpg" },
      ],
    },
  },
]

const teamLeads = executives.filter((executive) => executive.team)

// Five team cards: three across on top, two wider ones below on large screens.
const teamCardSpan = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "md:col-span-2 lg:col-span-3"]

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
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_center,rgba(151,21,169,0.28),transparent_70%)]">
          <span className="font-aileron text-4xl font-black text-primary md:text-5xl">{initials(person.name)}</span>
          <span className="font-aileron text-[10px] uppercase tracking-[0.2em] text-white/35">Photo coming soon</span>
        </div>
      )}
    </div>
  )
}

function AvatarStack({ people }: { people: Person[] }) {
  return (
    <div className="flex -space-x-2">
      {people.map((person) => (
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
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

export function TeamSection() {
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
      <section className="px-4 md:px-8 pb-24">
        <h2 className="font-aileron text-4xl md:text-6xl font-black uppercase tracking-tight">
          Our <span className="text-primary">Teams</span>
        </h2>
        <p className="font-baskerville text-muted-foreground mt-4 mb-12 max-w-xl">
          The groups that keep AIMD running, from events and outreach to partnerships, engineering, and finance.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {teamLeads.map((lead, index) => {
            const team = lead.team!
            return (
              <EventCardShell
                key={team.name}
                imageUrl={team.groupPhoto}
                imageAlt={`AIMD ${team.name} team`}
                imageClassName="h-auto aspect-[3/2]"
                eyebrow={`${team.name} Team`}
                className={teamCardSpan[index]}
              >
                <div>
                  <p className="font-baskerville text-sm italic text-primary">Led by {lead.name}</p>
                  <h3 className="mt-2 font-aileron text-2xl md:text-3xl font-black uppercase leading-[0.95] tracking-tight">
                    {team.name}
                  </h3>
                </div>
                <div className="flex flex-col gap-2 font-baskerville text-sm text-white/70">
                  <EventInfoRow icon={Users}>
                    {team.members.length + 1} members · {lead.role}
                  </EventInfoRow>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <AvatarStack people={[lead, ...team.members]} />
                  <button
                    type="button"
                    onClick={() => setSelected(lead.name)}
                    className={cn(eventSecondaryButtonClass, "flex-none px-6")}
                  >
                    Meet the team
                  </button>
                </div>
              </EventCardShell>
            )
          })}
        </div>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <h2 className="font-aileron text-4xl md:text-6xl font-black uppercase tracking-tight mb-12">
          The <span className="text-primary">Team</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {executives.map((executive) => {
            const isOpen = executive.name === selected
            const team = executive.team

            const body = (
              <>
                <PersonPhoto person={executive} className="aspect-[4/5]" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-aimd-surface via-aimd-surface/70 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 md:p-6">
                  <p className="font-aileron text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {executive.role}
                  </p>
                  <h3 className="font-aileron text-base md:text-2xl font-black uppercase leading-[0.95] tracking-tight text-aimd-white">
                    {executive.name}
                  </h3>
                  {team && (
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-aimd-purple/50 bg-aimd-black/60 px-3 py-1.5 font-aileron text-[9px] md:text-[11px] uppercase tracking-wider text-aimd-white backdrop-blur-sm transition-colors group-hover:bg-aimd-purple/30">
                      {isOpen ? "Hide team" : `View ${team.name} team`}
                      <ChevronDown
                        className={cn("size-3 md:size-3.5 transition-transform", isOpen && "rotate-180")}
                        aria-hidden
                      />
                    </span>
                  )}
                </div>
              </>
            )

            const cardClass = cn(
              "group relative overflow-hidden rounded-3xl border bg-aimd-surface text-left shadow-[0_30px_80px_-30px_rgba(151,21,169,0.6)] transition-colors",
              isOpen ? "border-aimd-purple ring-2 ring-aimd-purple/60" : "border-aimd-purple/30 hover:border-aimd-purple/60",
            )

            return (
              <motion.div key={executive.name} {...fadeUp} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                {team ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSelected(isOpen ? null : executive.name)}
                    className={cn(cardClass, "block w-full")}
                  >
                    {body}
                  </button>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </motion.div>
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
                className="mt-10 rounded-3xl border border-aimd-purple/40 bg-aimd-surface p-6 shadow-[0_30px_80px_-30px_rgba(151,21,169,0.6)] md:p-10"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-full border border-aimd-purple/50 bg-aimd-black/70 px-3 py-1 font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      {active.team.name} Team
                    </span>
                    <h3 className="mt-4 font-aileron text-3xl md:text-5xl font-black uppercase leading-[0.95] tracking-tight">
                      Meet the <span className="text-primary">{active.team.name}</span> team
                    </h3>
                    <p className="mt-2 font-baskerville text-sm italic text-primary">Led by {active.name}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close team"
                    onClick={() => setSelected(null)}
                    className="shrink-0 rounded-full border border-white/15 p-2 transition-colors hover:bg-aimd-white hover:text-aimd-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6">
                  {active.team.members.map((member) => (
                    <div
                      key={member.name}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-aimd-black/60 transition-colors hover:border-aimd-purple/50"
                    >
                      <PersonPhoto person={member} className="aspect-[4/5]" />
                      <div className="p-4">
                        <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          {active.team?.name}
                        </p>
                        <p className="mt-1 font-aileron text-sm md:text-base font-bold uppercase leading-tight text-aimd-white">
                          {member.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
