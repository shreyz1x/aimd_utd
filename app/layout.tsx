import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Libre_Baskerville } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const aileron = localFont({
  src: [
    { path: "./fonts/Aileron-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Aileron-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Aileron-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Aileron-Heavy.woff2", weight: "800", style: "normal" },
    { path: "./fonts/Aileron-Heavy.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-aileron-family",
  display: "swap",
})

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-family",
  display: "swap",
})

const siteUrl = "https://www.aimdutd.org"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AIMD at UT Dallas | Artificial Intelligence & Machine Learning",
    template: "%s | AIMD at UT Dallas",
  },
  description:
    "AIMD at UT Dallas is a student organization focused on artificial intelligence, machine learning, technical projects, workshops, competitions, events, and industry connections.",
  applicationName: "AIMD at UT Dallas",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "AIMD at UT Dallas",
    title: "AIMD at UT Dallas | Artificial Intelligence & Machine Learning",
    description:
      "AIMD at UT Dallas is a student organization focused on artificial intelligence, machine learning, technical projects, workshops, competitions, events, and industry connections.",
    images: [
      {
        url: "/aimd-logo.png",
        width: 1024,
        height: 394,
        alt: "AIMD at UT Dallas logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMD at UT Dallas | Artificial Intelligence & Machine Learning",
    description:
      "AIMD at UT Dallas is a student organization focused on artificial intelligence, machine learning, technical projects, workshops, competitions, events, and industry connections.",
    images: ["/aimd-logo.png"],
  },
  icons: {
    // Google Search needs a square favicon that is a multiple of 48px.
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/aimd-icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/aimd-icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/aimd-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/aimd-icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/aimd-apple-icon.png",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIMD at UT Dallas",
  alternateName: ["AIMD UTD", "AIMD UT Dallas", "UTD AIMD"],
  url: siteUrl,
  logo: `${siteUrl}/aimd-logo.png`,
  description:
    "A student organization at The University of Texas at Dallas focused on artificial intelligence and machine learning.",
  sameAs: [
    "https://www.instagram.com/aimd_utd",
    "https://www.linkedin.com/company/aimdutd/",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${aileron.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
