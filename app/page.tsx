import { Navbar } from "@/components/navbar"
import { HomeGallery } from "@/components/home-gallery"
import { MarqueeSection } from "@/components/marquee-section"
import { Services } from "@/components/services"
import { CaseCompetitionCard } from "@/components/case-competition-card"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-aimd-purple selection:text-aimd-white">
      <Navbar />
      <HomeGallery />
      <MarqueeSection />
      <section className="px-4 md:px-8 pt-24">
        <CaseCompetitionCard layout="wide" />
      </section>
      <Services />
      <Footer showCta />
    </div>
  )
}
