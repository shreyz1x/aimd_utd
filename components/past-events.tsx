"use client"

import { Award, Calendar, Camera, Medal, Trophy, Users } from "lucide-react"

import { EventCardShell, EventInfoRow } from "@/components/ui/event-countdown-card"
import { CASE_TITLE } from "@/lib/case-competition"
import { cn } from "@/lib/utils"

type Winner = {
  place: string
  icon: typeof Trophy
  teamNumber: string
  team: string
  members: string[]
  project: string
  // Path under /public. Leave empty to show the photo placeholder.
  photo?: string
}

const caseCompetitionWinners: Winner[] = [
  {
    place: "1st Place",
    icon: Trophy,
    teamNumber: "Team 5",
    team: "MOMentum",
    members: ["Preethi Seereddy", "Padma Allamsetty"],
    project:
      "AI-powered mobile clinics bringing prenatal, postpartum, and preventive care to women in rural West Texas. AI identifies the communities with the greatest need and helps schedule clinic stops, while clinicians provide care and make medical decisions.",
    photo: "/past-events/case-comp-2026-1st.jpg",
  },
  {
    place: "2nd Place",
    icon: Medal,
    teamNumber: "Team 22",
    team: "InterpretAI",
    members: ["Xander Lawson", "Mohamed Asad", "Durga Mandadapu", "Aryan Ghosh"],
    project:
      "An AI-powered interpreter helping Deaf American Sign Language users communicate with healthcare providers in rural communities — translating signing into spoken English and clinicians' speech into sign language through an avatar, with human interpreters for high-stakes or uncertain moments.",
    photo: "/past-events/case-comp-2026-2nd.jpg",
  },
  {
    place: "3rd Place",
    icon: Award,
    teamNumber: "Team 1",
    team: "Comet Care",
    members: [
      "Anurag Satpathy",
      "Shreya Senthil Kumar",
      "Jiya Shah",
      "Tanush Teki",
      "Advaith Ramesh",
      "Gautham Yadavalli",
    ],
    project:
      "A program improving preventive and chronic care for older Native Americans on reservations in Montana and Wyoming, combining mailed health-testing kits, neighborhood health kiosks, remote monitoring, and AI-supported screenings.",
    photo: "/past-events/case-comp-2026-3rd.jpg",
  },
]

export function PastEvents() {
  return (
    <section className="bg-background pt-32 relative">
      <div className="container mx-auto px-4 mb-12 md:mb-16">
        <h2 className="font-aileron text-[8vw] md:text-[6vw] leading-none text-aimd-white uppercase font-black">
          Past <span className="text-primary">Events</span>
        </h2>
      </div>

      <div className="px-4 md:px-8">
        <EventCardShell layout="wide" eyebrow="AIMD Case Competition 2026">
          <div className="max-w-4xl">
            <p className="font-baskerville text-sm italic text-primary">Solve. Strategize. Present.</p>
            <h3 className="mt-2 font-aileron text-3xl md:text-5xl font-black uppercase leading-[0.95] tracking-tight">
              Congrats to our <span className="text-primary">winners!</span>
            </h3>
            <p className="mt-3 font-baskerville text-sm md:text-base leading-snug text-white/70">
              Thank you to every team that competed in the AIMD Premier Case Competition, tackling {CASE_TITLE}.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-baskerville text-sm text-white/70">
            <EventInfoRow icon={Calendar}>Oct 18 – Oct 25, 2026 · Finals Oct 25</EventInfoRow>
          </div>

          <ol className="mt-2 grid gap-6 lg:grid-cols-3">
            {caseCompetitionWinners.map((winner, index) => (
              <li
                key={winner.place}
                className={cn(
                  "flex flex-col overflow-hidden rounded-2xl border bg-aimd-black/60",
                  index === 0 ? "border-aimd-purple/60 shadow-[0_0_40px_-12px_rgba(151,21,169,0.8)]" : "border-white/10",
                )}
              >
                <div className="relative aspect-[4/3] bg-aimd-surface">
                  {winner.photo ? (
                    <img
                      src={winner.photo}
                      alt={`${winner.team} (${winner.teamNumber}), ${winner.place} at the AIMD Case Competition 2026`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-2 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 text-white/35">
                      <Camera className="size-6" aria-hidden />
                      <span className="font-aileron text-[10px] uppercase tracking-[0.2em]">Team photo coming soon</span>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-aimd-purple px-3 py-1 font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-aimd-white shadow-lg">
                    <winner.icon className="size-3.5" aria-hidden />
                    {winner.place}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div>
                    <p className="font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      {winner.teamNumber}
                    </p>
                    <p className="mt-1 font-aileron text-2xl md:text-3xl font-black uppercase leading-tight text-aimd-white">
                      {winner.team}
                    </p>
                  </div>
                  <p className="flex gap-2 font-aileron text-sm text-white/75">
                    <Users className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{winner.members.join(", ")}</span>
                  </p>
                  <p className="font-baskerville text-sm leading-relaxed text-white/65">{winner.project}</p>
                </div>
              </li>
            ))}
          </ol>
        </EventCardShell>
      </div>
    </section>
  )
}
