import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact AIMD at UT Dallas for questions about joining, partnering, or collaborating on artificial intelligence and machine learning projects.",
  alternates: { canonical: "/contact" },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
