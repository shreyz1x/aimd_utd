import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CaseCompetitionCard } from "@/components/case-competition-card"
import { cn } from "@/lib/utils"

const applications = [
  {
    number: "01",
    title: "Apply",
    description:
      "Companies and research organizations bring us real-world healthcare problems. Students can apply to join these projects and collaborate with industry partners to build AI solutions with real impact.",
    deliverables: ["Students", "Industry Partners", "Collaboration"],
  },
  {
    number: "02",
    title: "Officers",
    description:
      "Lead AIMD's vision, manage events and partnerships, and guide our members. Officers shape the direction of the club and help expand the reach of AI in medicine and diagnostics.",
    deliverables: ["Leadership", "Events", "Partnerships"],
    closedNote: "Fall 2026 officer team has been selected",
  },
  {
    number: "03",
    title: "Projects",
    description:
      "Work on open-ended AI prompts and challenges designed by AIMD. Build innovative applications that combine machine learning and medicine — from diagnostic tools to research automation.",
    deliverables: ["Machine Learning", "Medicine", "Research"],
  },
]

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 md:px-8">
        <h1 className="font-aileron text-[9vw] md:text-[6vw] leading-[0.9] uppercase tracking-tighter">
          Our <span className="text-primary">Applications</span>
        </h1>
        <p className="font-baskerville text-muted-foreground mt-8 max-w-xl">
          Three ways to get involved with AIMD at UT Dallas. Apply to join a project, step into an officer role, or
          build with the team.
        </p>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <Carousel opts={{ align: "start" }}>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-aileron text-xs uppercase tracking-[0.2em] text-white/50">Swipe to explore</p>
            <div className="flex gap-3">
              <CarouselPrevious className="static size-10 translate-y-0 border-white/15 bg-white/5 text-aimd-white hover:bg-aimd-purple hover:text-aimd-white" />
              <CarouselNext className="static size-10 translate-y-0 border-white/15 bg-white/5 text-aimd-white hover:bg-aimd-purple hover:text-aimd-white" />
            </div>
          </div>
          <CarouselContent className="-ml-6">
            <CarouselItem className="pl-6 md:basis-1/2 lg:basis-1/3">
              <CaseCompetitionCard className="h-full" />
            </CarouselItem>
            {applications.map((application) => (
              <CarouselItem key={application.number} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-white/10 bg-card p-6 md:p-8 transition-colors",
                    application.closedNote
                      ? "opacity-60"
                      : "hover:border-aimd-purple/60 hover:shadow-[0_20px_60px_-20px_rgba(151,21,169,0.6)]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-baskerville text-primary text-sm">{application.number}</span>
                    {application.closedNote ? (
                      <span className="rounded-full border border-aimd-purple/50 bg-aimd-purple/20 px-3 py-1 font-aileron text-[10px] uppercase tracking-wider text-primary">
                        Closed
                      </span>
                    ) : (
                      <ArrowRight
                        className="text-primary transform group-hover:translate-x-1 transition-transform"
                        size={22}
                      />
                    )}
                  </div>
                  <h2
                    className={cn(
                      "font-aileron text-3xl md:text-4xl uppercase tracking-tight mt-8",
                      application.closedNote && "line-through decoration-aimd-purple decoration-4 text-aimd-white/50",
                    )}
                  >
                    {application.title}
                  </h2>
                  {application.closedNote && (
                    <p className="font-aileron text-xs uppercase tracking-wider text-primary mt-3">
                      {application.closedNote}
                    </p>
                  )}
                  <p className="font-baskerville text-sm mt-4 text-muted-foreground flex-1">{application.description}</p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {application.deliverables.map((item) => (
                      <span
                        key={item}
                        className="font-aileron text-xs px-3 py-1 border border-white/15 text-white/70 rounded-full uppercase"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <div className="bg-aimd-purple p-8 md:p-16">
          <h2 className="font-aileron text-4xl md:text-6xl uppercase tracking-tight text-aimd-white">Ready to start?</h2>
          <p className="font-baskerville text-aimd-white/70 mt-4 max-w-xl">
            Tell us whether you want to apply, join the officer team, or partner on a project.
          </p>
          <a
            href="/contact"
            className="inline-block mt-8 px-8 py-4 bg-aimd-black text-aimd-white font-aileron uppercase hover:bg-aimd-white hover:text-aimd-black transition-colors border-2 border-aimd-black"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
