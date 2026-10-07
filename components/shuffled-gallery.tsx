"use client"

import { useEffect, useState } from "react"

import { GalleryCol, GalleryContainer } from "@/components/ui/animated-gallery"
import { cn } from "@/lib/utils"

const BASE_ROWS = 4

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function ShuffledGallery({ images }: { images: string[] }) {
  // Shuffled after mount so the server-rendered markup matches the first client render.
  const [order, setOrder] = useState<string[] | null>(null)

  useEffect(() => {
    setOrder(shuffle(images))
  }, [images])

  const columns: string[][] = [[], [], []]
  ;(order ?? images).forEach((src, i) => columns[i % 3].push(src))

  const rows = Math.max(BASE_ROWS, ...columns.map((col) => col.length))
  // Rows beyond the original 4 need extra upward travel to come into view.
  const extraShift = ((rows - BASE_ROWS) / rows) * 100
  const sideRange = ["-10%", `${2 - extraShift}%`]
  const middleRange = ["15%", `${5 - extraShift}%`]
  const columnRanges = [sideRange, middleRange, sideRange]

  return (
    <GalleryContainer
      className={cn("transition-opacity duration-700", order ? "opacity-100" : "opacity-0")}
    >
      {columns.map((colImages, colIndex) => (
        <GalleryCol
          key={colIndex}
          yRange={columnRanges[colIndex]}
          className={colIndex === 1 ? "mt-[-50%]" : "-mt-2"}
        >
          {colImages.map((imageUrl) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={imageUrl}
              className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow"
              src={imageUrl}
              alt="AIMD event photo"
            />
          ))}
        </GalleryCol>
      ))}
    </GalleryContainer>
  )
}
