import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { projects } from "@/lib/projects"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 md:px-8">
        <h1 className="font-aileron text-[9vw] md:text-[6vw] leading-[0.9] uppercase tracking-tighter">
          Notable <span className="text-primary">Research</span>
        </h1>
        <p className="font-baskerville text-muted-foreground mt-8 max-w-xl">
          Everything you need to automate operations, boost productivity, and bring AI into healthcare. Open a project
          to read more.
        </p>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-card p-5 transition-colors hover:border-aimd-purple/60 hover:shadow-[0_20px_60px_-20px_rgba(151,21,169,0.6)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-aimd-purple flex items-center justify-center">
                    <ArrowUpRight className="text-aimd-white" size={20} />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center px-2 pt-6 pb-2 text-center">
                <span className="font-baskerville text-xs text-primary uppercase">
                  {project.category} — {project.year}
                </span>
                <h3 className="font-aileron text-2xl text-foreground tracking-tight mt-2">{project.title}</h3>
                <p className="font-baskerville text-sm text-muted-foreground mt-3">{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
