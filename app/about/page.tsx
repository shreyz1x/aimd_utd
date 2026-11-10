import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-grid"
import { AboutHero } from "@/components/about-hero"
import { AboutIntro } from "@/components/about-intro"
import { CircularCarousel } from "@/components/ui/circular-carousel"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AIMD at UT Dallas, a student organization focused on artificial intelligence, machine learning, and healthcare projects.",
  alternates: { canonical: "/about" },
}

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

      <AboutHero />

      <AboutIntro />

      <TeamSection />

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
