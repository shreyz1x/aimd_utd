import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
} from "@/components/ui/animated-gallery"
import { Button } from "@/components/ui/button"
import { ShuffledGallery } from "@/components/shuffled-gallery"

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery")
const BASE_ROWS = 4

// Every image dropped into public/gallery is shown; the order is shuffled in the browser on each visit.
function getGalleryImages() {
  return fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort()
    .map((file) => `/gallery/${file}`)
}

export function HomeGallery() {
  const images = getGalleryImages()
  const extraRows = Math.max(0, Math.ceil(images.length / 3) - BASE_ROWS)

  return (
    <div className="relative bg-background">
      <ContainerStagger className="relative z-40 -mb-12 place-self-center px-6 pt-32 text-center">
        <ContainerAnimated>
          <h1 className="font-serif text-4xl font-extralight text-foreground md:text-5xl">
            &ldquo;Bridging the <span className="font-serif font-extralight text-primary">Gap</span>
          </h1>
        </ContainerAnimated>
        <ContainerAnimated>
          <h1 className="font-serif text-4xl font-extralight text-foreground md:text-5xl">
            Between AI and Medicine&rdquo;
          </h1>
        </ContainerAnimated>

        <ContainerAnimated className="my-4">
          <p className="mx-auto max-w-xl leading-normal tracking-tight text-muted-foreground">
            Learn, build, and grow with a community of students passionate about artificial intelligence, machine
            learning, and emerging technology.
          </p>
        </ContainerAnimated>

        <ContainerAnimated>
          <Button asChild className="gap-1 bg-aimd-purple text-aimd-white hover:bg-aimd-purple/90">
            <Link href="/applications">
              Join AIMD <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="link" className="text-primary">
            <Link href="/about">About Us</Link>
          </Button>
        </ContainerAnimated>
      </ContainerStagger>
      <div
        className="pointer-events-none absolute z-10 h-[70vh] w-full"
        style={{
          background: "linear-gradient(to right, #293039, #9715a9, #c08af5)",
          filter: "blur(84px)",
          mixBlendMode: "screen",
        }}
      />

      <ContainerScroll className="relative" style={{ height: `${350 + extraRows * 50}vh` }}>
        <ContainerSticky className="h-svh">
          <ShuffledGallery images={images} />
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
