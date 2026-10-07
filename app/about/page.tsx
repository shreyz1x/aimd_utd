import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamGrid } from "@/components/team-grid"
import { CircularCarousel } from "@/components/ui/circular-carousel"

const domains = [
  {
    id: "machine-learning",
    tag: "ML",
    title: "Machine Learning",
    description: "Model training, evaluation, optimization, and real-world datasets.",
  },
  {
    id: "computer-vision",
    tag: "Imaging",
    title: "Computer Vision & Medical Imaging",
    description: "Image-based diagnostics, detection models, and visual reasoning.",
  },
  {
    id: "llms-agents",
    tag: "LLMs",
    title: "Large Language Models & AI Agents",
    description: "LLMs, prompt engineering, RAG systems, and autonomous agents.",
  },
  {
    id: "healthcare-ai",
    tag: "Healthcare",
    title: "Healthcare & Diagnostic AI",
    description: "AI for patient intake, triage, decision support, and workflows.",
  },
  {
    id: "full-stack",
    tag: "Systems",
    title: "Full-Stack AI Systems",
    description: "AI + backend + frontend + deployment.",
  },
  {
    id: "research-ethics",
    tag: "Ethics",
    title: "Research, Ethics & Model Evaluation",
    description: "Bias, interpretability, safety, and responsible AI.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 px-4 md:px-8">
        <h1 className="font-aileron text-[12vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter">
          About <span className="text-primary">Us</span>
        </h1>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="font-baskerville text-2xl md:text-4xl leading-tight">Transforming Healthcare with AI</p>
          </div>
          <div className="space-y-6">
            <p className="font-baskerville text-muted-foreground">
              At AIMD at UT Dallas, we bring together students interested in artificial intelligence and healthcare to
              work on hands-on projects, including industry-sponsored initiatives with real companies, tackling
              real-world medical challenges through research, innovation, and collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <h2 className="font-aileron text-4xl md:text-6xl uppercase tracking-tight mb-4">Proven Impact</h2>
        <p className="font-baskerville text-primary text-xl md:text-2xl mb-12">Through Applied AI</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="border-2 border-border bg-card p-6 md:p-8">
            <p className="font-baskerville text-muted-foreground">
              Discover how AIMD empowers students to gain real-world experience at the intersection of artificial
              intelligence and healthcare through hands-on projects, research, and industry collaboration, preparing
              for careers in medicine, research, and industry.
            </p>
          </div>
          <div className="border-2 border-border bg-card p-6 md:p-8">
            <h3 className="font-aileron text-xl uppercase text-primary mb-4">
              Industry-Sponsored & Real-World Projects
            </h3>
            <p className="font-baskerville text-muted-foreground">
              AIMD partners with companies, research groups, and healthcare-focused organizations to offer
              industry-sponsored projects where students work on real problems using AI and machine learning. These
              projects expose members to real data, constraints, and workflows found in professional environments.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <h2 className="font-aileron text-4xl md:text-6xl uppercase tracking-tight mb-12">The Team</h2>
        <TeamGrid />
      </section>

      <section className="px-4 md:px-8 pb-24">
        <div className="overflow-hidden rounded-3xl border border-aimd-purple/30 bg-[radial-gradient(ellipse_at_center,rgba(151,21,169,0.18),transparent_70%)] px-4 py-12 md:py-16">
          <div className="text-center">
            <h2 className="font-aileron text-4xl md:text-6xl uppercase tracking-tight">
              What <span className="text-primary">AIMD</span> Works On
            </h2>
            <p className="font-baskerville text-muted-foreground mt-4 max-w-xl mx-auto">
              The AI domains our members actively build, research, and deploy in.
            </p>
          </div>
          <CircularCarousel items={domains} radiusX={470} radiusY={45} className="mt-16" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
