"use client"

export function Footer({ showCta = false }: { showCta?: boolean }) {
  return (
    <footer
      className={`bg-background pb-10 ${showCta ? "bg-[radial-gradient(ellipse_at_bottom,rgba(151,21,169,0.25),transparent_65%)] pt-12" : "pt-10"}`}
    >
      <div className="container mx-auto px-4">
        {showCta && (
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="font-aileron text-[10vw] leading-none font-black uppercase mb-8 text-primary drop-shadow-[0_0_30px_rgba(151,21,169,0.6)]">{"Let's Talk"}</h2>
            <a
              href="mailto:contact@aimdutd.com"
              className="px-8 md:px-12 py-4 bg-aimd-white text-aimd-black rounded-full font-aileron text-lg md:text-xl hover:scale-105 transition-transform"
            >
              contact@aimdutd.com
            </a>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-end border-t-2 border-white/15 pt-8 gap-4">
          <div className="font-aileron font-bold uppercase text-sm text-muted-foreground">
            © 2026 Artificial Intelligence in Medicine
          </div>
          <div className="flex gap-8">
            {[
              { label: "Instagram", href: "https://www.instagram.com/aimd_utd?stkn=MWVqNGc5b2l4eXgzdA==" },
              { label: "LinkedIn", href: "https://www.linkedin.com/company/aimdutd/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-aileron font-bold uppercase text-sm hover:underline decoration-2 text-foreground hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
