"use client"

import { Briefcase, Database, FlaskConical, GraduationCap, Handshake, Target } from "lucide-react"

import { EventCardShell, EventInfoRow } from "@/components/ui/event-countdown-card"

const impactCards = [
  {
    eyebrow: "Applied AI",
    title: "Real-World Experience",
    body: "Discover how AIMD empowers students to gain real-world experience at the intersection of artificial intelligence and healthcare through hands-on projects, research, and industry collaboration, preparing for careers in medicine, research, and industry.",
    rows: [
      { icon: FlaskConical, label: "Hands-on projects & research" },
      { icon: Handshake, label: "Industry collaboration" },
      { icon: GraduationCap, label: "Careers in medicine, research & industry" },
    ],
  },
  {
    eyebrow: "Industry Partners",
    title: "Industry-Sponsored & Real-World Projects",
    body: "AIMD partners with companies, research groups, and healthcare-focused organizations to offer industry-sponsored projects where students work on real problems using AI and machine learning. These projects expose members to real data, constraints, and workflows found in professional environments.",
    rows: [
      { icon: Database, label: "Real data" },
      { icon: Target, label: "Real constraints" },
      { icon: Briefcase, label: "Professional workflows" },
    ],
  },
]

export function AboutIntro() {
  return (
    <>
      <section className="px-4 md:px-8 pt-12 md:pt-16 pb-24">
        <EventCardShell layout="wide" eyebrow="Our Mission">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <h2 className="font-aileron text-3xl md:text-5xl font-black uppercase leading-[0.95] tracking-tight">
              Transforming Healthcare <span className="text-primary">with AI</span>
            </h2>
            <p className="font-baskerville text-base md:text-lg leading-relaxed text-white/70">
              At AIMD at UT Dallas, we bring together students interested in artificial intelligence and healthcare to
              work on hands-on projects, including industry-sponsored initiatives with real companies, tackling
              real-world medical challenges through research, innovation, and collaboration.
            </p>
          </div>
        </EventCardShell>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <h2 className="font-aileron text-4xl md:text-6xl font-black uppercase tracking-tight">
          Proven <span className="text-primary">Impact</span>
        </h2>
        <p className="font-baskerville text-lg md:text-xl italic text-primary mt-4 mb-12">Through Applied AI</p>

        <div className="grid gap-6 md:grid-cols-2">
          {impactCards.map((card) => (
            <EventCardShell key={card.title} eyebrow={card.eyebrow} className="md:p-8">
              <h3 className="font-aileron text-2xl md:text-3xl font-black uppercase leading-[0.95] tracking-tight">
                {card.title}
              </h3>
              <p className="font-baskerville text-sm md:text-base leading-relaxed text-white/70">{card.body}</p>
              <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-5 font-baskerville text-sm text-white/70">
                {card.rows.map((row) => (
                  <EventInfoRow key={row.label} icon={row.icon}>
                    {row.label}
                  </EventInfoRow>
                ))}
              </div>
            </EventCardShell>
          ))}
        </div>
      </section>
    </>
  )
}
