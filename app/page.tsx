import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HomeGallery } from "@/components/home-gallery"
import { MarqueeSection } from "@/components/marquee-section"
import { Services } from "@/components/services"
import { CaseCompetitionCard } from "@/components/case-competition-card"
import { CaseRevealCard } from "@/components/case-reveal"
import { Footer } from "@/components/footer"
import { isCaseReleased } from "@/lib/case-competition"

export const metadata: Metadata = {
  title: {
    absolute: "AIMD at UT Dallas | Artificial Intelligence & Machine Learning",
  },
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-aimd-purple selection:text-aimd-white">
      <Navbar />
      <HomeGallery />
      <MarqueeSection />
      <section className="px-4 md:px-8 pt-24">
        <CaseCompetitionCard layout="wide" />
        <CaseRevealCard layout="wide" initialReleased={isCaseReleased()} className="mt-10" />
      </section>
      <Services />
      <Footer showCta />
    </div>
  )
}
