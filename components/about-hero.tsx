"use client"

import { MotionConfig, motion } from "framer-motion"

export function AboutHero() {
  return (
    // "user" skips the scale/slide for people who prefer reduced motion while keeping the fade.
    <MotionConfig reducedMotion="user">
      <section className="relative h-[70svh] min-h-[460px] w-full overflow-hidden md:h-[85svh]">
        <motion.img
          src="/team/group-executive.jpg"
          alt="The AIMD at UT Dallas executive team"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        {/* Darkens the top for the navbar and dissolves the photo into the page background below. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/10 via-35% to-background"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(151,21,169,0.25),transparent_60%)] mix-blend-screen"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 px-4 pb-6 md:px-8 md:pb-10"
        >
          <span className="inline-block rounded-full border border-aimd-purple/50 bg-aimd-black/70 px-3 py-1 font-aileron text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
            AIMD Executive Team
          </span>
          <h1 className="mt-4 font-aileron text-[12vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter">
            About <span className="text-primary">Us</span>
          </h1>
        </motion.div>
      </section>
    </MotionConfig>
  )
}
