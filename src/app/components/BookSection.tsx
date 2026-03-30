import { motion } from "motion/react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Library, Mail } from "lucide-react";
import { LiliBoulangerLibrary } from "./LiliBoulangerLibrary";
import { LampPost, CatSitting, Bird, BirdFlying, Flower, Butterfly, Quill, TrebleClefVine, FlowerCluster, BirdOnBranch, Candelabra, MusicalNotes } from "./Deco";

/** Bain News Service, 1918; Library of Congress (public domain) via Wikimedia Commons */
const LILI_BOULANGER_PORTRAIT =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lili_Boulanger.jpg/960px-Lili_Boulanger.jpg";

export function BookSection() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <section className="relative overflow-x-visible overflow-y-visible bg-neutral-100 px-4 pb-14 pt-6">
      {/* Vintage newspaper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)' }}>
      </div>

      <motion.div
        initial={{ opacity: 1, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Newspaper-style header */}
        <div className="relative mb-6 border-4 sm:border-8 border-double border-black bg-white p-1 sm:p-2">
          <LampPost className="absolute -top-16 right-6 w-8 h-16 text-neutral-500 pointer-events-none hidden sm:block" />
          <CatSitting className="absolute -top-10 right-[3.5rem] w-8 h-7 text-neutral-500 pointer-events-none hidden sm:block" />
          <BirdFlying className="absolute -top-10 right-24 w-6 h-3 text-neutral-400 pointer-events-none hidden sm:block" />
          <BirdFlying className="absolute -top-12 right-32 w-4 h-2 text-neutral-300 pointer-events-none -scale-x-100 hidden md:block" />
          <FlowerCluster className="absolute -top-4 left-4 w-10 h-5 text-neutral-300 pointer-events-none hidden sm:block" />
          <Candelabra className="absolute -top-14 left-1/3 w-7 h-14 text-neutral-200 pointer-events-none hidden md:block" />
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black text-center tracking-tight border-b-2 sm:border-b-4 border-t-2 sm:border-t-4 border-black py-2 sm:py-4">
            The Lili Boulanger<br />
            <span className="text-lg sm:text-2xl md:text-4xl">Restoration Project</span>
          </h2>
        </div>

        {/* Letter in front; portrait sits behind on md+ (absolute right) */}
        <div className="relative isolate mb-10 overflow-visible pb-8 pt-4 md:min-h-[36rem]">
          {/* Book/Letter — main text card (above the portrait) */}
          <motion.div
            whileHover={{ scale: 1.008, y: -3 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-20 w-full cursor-default border-2 sm:border-4 border-black bg-white shadow-[4px_4px_0_0_rgb(24_24_24)] sm:shadow-[8px_8px_0_0_rgb(24_24_24)] transition-[transform,box-shadow] duration-200 hover:shadow-[12px_12px_0_0_rgb(24_24_24)] hover:ring-4 hover:ring-neutral-400/25 md:max-w-xl lg:max-w-2xl"
          >
            {/* Decorative silhouettes */}
            <Butterfly className="absolute -top-7 left-24 w-7 h-5 text-neutral-400 pointer-events-none" />
            <BirdOnBranch className="absolute -top-8 right-8 w-12 h-8 text-neutral-500 pointer-events-none hidden md:block" />
            <Quill className="absolute -top-12 left-8 w-5 h-12 text-neutral-300 pointer-events-none rotate-[20deg]" />
            <div className="relative z-10 p-4 sm:p-8 md:p-12">
              {/* Ornamental initial cap */}
              <div className="float-left text-5xl sm:text-7xl md:text-9xl font-serif font-black leading-none mr-2 sm:mr-4 mt-2 border-2 sm:border-4 border-black px-2 sm:px-4 py-1 sm:py-2">
                L
              </div>

              <div className="text-base md:text-lg font-serif leading-relaxed text-justify space-y-4">
                <p>
                  ili Boulanger (1893–1918) was the first woman to win the Prix de Rome, yet many
                  of her works remain without proper modern editions and some have never been formally
                  published at all. Her manuscripts, scattered across archives, deserve to be heard
                  as she intended.
                </p>

                <p>
                  The Restoration Project aims to change that. Through a careful study of her original
                  manuscripts and sketches, each piece is given a new, clean engraving, faithful to
                  her notation, correcting errors accumulated over a century of copies, and making her
                  music accessible to performers everywhere.
                </p>

                <p>
                  This is an ongoing effort. The library is growing as more works are completed and
                  published freely on IMSLP. Every edition is a small act of restoration, bringing
                  her voice back into the world, one score at a time.
                </p>

                <div className="clear-both my-5 flex justify-center md:justify-start">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLibraryOpen(true);
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-white px-4 py-2 font-bold no-underline transition-colors duration-150 hover:bg-neutral-200 active:bg-neutral-300"
                    >
                      <Library className="h-4 w-4 shrink-0" />
                      View her complete catalogue
                    </button>
                  </div>
                </div>

              {/* Signature flourish */}
              <div className="mt-8 text-right">
                <div className="inline-block border-t-2 border-black pt-2">
                  <p className="text-2xl font-serif italic">— H. H.</p>
                </div>
              </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l-4 border-t-4 sm:border-l-8 sm:border-t-8 border-black pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r-4 border-t-4 sm:border-r-8 sm:border-t-8 border-black pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-l-4 border-b-4 sm:border-l-8 sm:border-b-8 border-black pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-r-4 border-b-4 sm:border-r-8 sm:border-b-8 border-black pointer-events-none"></div>
          </motion.div>

          {/* Portrait — below letter on small screens; behind / to the right on md+ */}
          <motion.div
            whileHover={{ scale: 1.012, y: -2, rotate: 0.2 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-0 mx-auto mt-10 w-full max-w-[16rem] sm:max-w-sm cursor-default border-4 sm:border-[6px] border-black bg-white shadow-[4px_4px_0_0_rgb(24_24_24)] sm:shadow-[8px_8px_0_0_rgb(24_24_24)] transition-[transform,box-shadow] duration-200 hover:shadow-[12px_12px_0_0_rgb(24_24_24)] hover:ring-4 hover:ring-neutral-400/25 md:absolute md:right-6 md:top-28 md:mx-0 md:mt-0 md:w-[min(100%,300px)] lg:right-10 lg:top-32"
          >
            {/* Cat perched on portrait frame */}
            <CatSitting className="absolute -top-10 left-10 w-8 h-8 text-neutral-500 pointer-events-none hidden sm:block" />
            <MusicalNotes className="absolute -top-6 right-8 w-7 h-5 text-neutral-300 pointer-events-none hidden sm:block" />
            <div className="relative z-10 border-4 sm:border-8 border-double border-black p-2 sm:p-4">
              <div className="aspect-[3/4] overflow-hidden border-2 sm:border-4 border-black bg-white">
                <ImageWithFallback
                  src={LILI_BOULANGER_PORTRAIT}
                  alt="Lili Boulanger, portrait photograph (Bain News Service, 1918, Library of Congress)"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="mt-4 text-center border-t-4 border-black pt-4">
                <h3 className="text-2xl font-serif font-black uppercase">Lili Boulanger</h3>
                <p className="text-sm font-serif italic mt-1">1893 — 1918</p>
                <p className="text-xs font-serif mt-2 opacity-70">First woman to win the Prix de Rome</p>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 sm:w-10 sm:h-10 bg-white border-2 sm:border-4 border-black"></div>
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-10 sm:h-10 bg-white border-2 sm:border-4 border-black"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 sm:w-10 sm:h-10 bg-white border-2 sm:border-4 border-black"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 sm:w-10 sm:h-10 bg-white border-2 sm:border-4 border-black"></div>
          </motion.div>
        </div>

        {/* Decorative separator */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-1 w-24 bg-black"></div>
          <div className="text-4xl font-serif">❖</div>
          <div className="h-1 w-24 bg-black"></div>
        </div>
      </motion.div>

      {/* Contact / Commission Letter */}
      <motion.div
        initial={{ opacity: 1, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mt-8 sm:mt-16 relative"
      >
        {/* Envelope behind the letter */}
        <div className="absolute -inset-6 md:-inset-8 pointer-events-none">
          {/* Envelope body */}
          <div className="absolute inset-0 bg-neutral-50 border-2 border-black shadow-[4px_4px_0_0_rgb(24,24,24)]">
            {/* Envelope flap (triangle at top) */}
            <div
              className="absolute top-0 left-0 right-0 h-0 z-[1]"
              style={{
                borderLeft: "calc(50% + 1px) solid transparent",
                borderRight: "calc(50% + 1px) solid transparent",
                borderTop: "90px solid #000",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-0 z-[2]"
              style={{
                borderLeft: "calc(50% - 1px) solid transparent",
                borderRight: "calc(50% - 1px) solid transparent",
                borderTop: "87px solid #f5f5f5",
              }}
            />
            {/* Diagonal fold lines from top corners to center-bottom (V shape) */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: `
                  linear-gradient(to bottom right, transparent calc(50% - 1px), rgba(0,0,0,0.08) 50%, transparent calc(50% + 1px)),
                  linear-gradient(to bottom left, transparent calc(50% - 1px), rgba(0,0,0,0.08) 50%, transparent calc(50% + 1px))
                `,
              }}
            />
            {/* Inner border stripe pattern (classic airmail look) */}
            <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "repeating-linear-gradient(135deg, #000 0px, #000 6px, transparent 6px, transparent 12px, #666 12px, #666 18px, transparent 18px, transparent 24px)",
                }}
              />
            </div>
            <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden z-0">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "repeating-linear-gradient(135deg, #000 0px, #000 6px, transparent 6px, transparent 12px, #666 12px, #666 18px, transparent 18px, transparent 24px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Extra decorations around letter */}
        <TrebleClefVine className="absolute -left-4 md:-left-12 top-1/3 w-5 h-12 text-neutral-200 pointer-events-none hidden md:block" />
        <Flower className="absolute -bottom-8 right-12 w-5 h-7 text-neutral-200 pointer-events-none" />

        {/* Paper plane decorations with trails */}
        <svg className="absolute -top-16 -right-4 sm:-right-10 md:-right-20 w-16 sm:w-20 md:w-28 h-16 sm:h-20 md:h-28 text-neutral-400 pointer-events-none" viewBox="0 0 100 100" fill="none">
          {/* Trail */}
          <path d="M10 90 Q 30 70, 35 55 Q 40 40, 50 35 Q 60 30, 65 25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" fill="none" />
          <path d="M15 85 Q 35 65, 40 50 Q 45 35, 55 30 Q 62 27, 65 25" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
          {/* Plane */}
          <g transform="translate(65, 25) rotate(-35)">
            <polygon points="0,0 -16,5 -12,0 -16,-5" fill="currentColor" opacity="0.5" />
            <line x1="-12" y1="0" x2="0" y2="0" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          </g>
        </svg>

        <svg className="absolute -bottom-12 -left-2 sm:-left-8 md:-left-16 w-14 sm:w-18 md:w-24 h-14 sm:h-18 md:h-24 text-neutral-300 pointer-events-none" viewBox="0 0 100 100" fill="none">
          {/* Trail */}
          <path d="M90 15 Q 70 25, 60 35 Q 50 45, 42 55 Q 35 65, 30 70" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" fill="none" />
          <path d="M85 20 Q 68 30, 58 38 Q 48 48, 40 58 Q 34 65, 30 70" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
          {/* Plane */}
          <g transform="translate(30, 70) rotate(135)">
            <polygon points="0,0 -14,4.5 -10,0 -14,-4.5" fill="currentColor" opacity="0.45" />
            <line x1="-10" y1="0" x2="0" y2="0" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
          </g>
        </svg>

        <svg className="absolute top-1/4 -right-2 sm:-right-4 md:-right-24 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 text-neutral-200 pointer-events-none" viewBox="0 0 80 80" fill="none">
          {/* Trail */}
          <path d="M5 60 Q 20 45, 30 38 Q 40 30, 55 22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" fill="none" />
          {/* Plane */}
          <g transform="translate(55, 22) rotate(-30)">
            <polygon points="0,0 -11,3.5 -8,0 -11,-3.5" fill="currentColor" opacity="0.6" />
            <line x1="-8" y1="0" x2="0" y2="0" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          </g>
        </svg>

        <motion.div
          whileHover={{ scale: 1.005, y: -2 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative z-10 bg-white border-2 border-black shadow-[6px_6px_0_0_rgb(24_24_24)] transition-shadow duration-200 hover:shadow-[8px_8px_0_0_rgb(24_24_24)]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.06) 31px, rgba(0,0,0,0.06) 32px)",
            backgroundPosition: "0 20px",
          }}
        >
          {/* Red margin line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-red-300/60 hidden sm:block"
            style={{ left: "60px" }}
          />

          <div className="p-4 pl-6 sm:p-8 sm:pl-12 md:p-10 md:pl-20 font-serif text-sm sm:text-base md:text-lg leading-[28px] sm:leading-[32px]">
            <p className="text-sm font-display tracking-[0.3em] text-neutral-400 mb-6 text-center">
              — A note from the composer —
            </p>

            <p>Dear reader,</p>

            <p className="mt-[32px]">
              I am open to collaborating  with performers, ensembles and institutions seeking new work, it be new original compositions or the revival of overlooked repertoire.
            </p>

            <p className="mt-[32px]">
              Alongside this, I offer engraving, orchestration and arrangement services, as well as piano and composition teaching.
            </p>

            <p className="mt-[32px]">
              Each project begins simple with a conversation,
              Reach out:
            </p>

            <div className="mt-[32px] mb-2">
              <a
                href="mailto:contact@hachem.cc"
                className="inline-flex items-center gap-2 border-2 border-black bg-black text-white px-5 py-2.5 font-bold tracking-wide transition-colors hover:bg-neutral-800 active:bg-neutral-700"
              >
                <Mail className="h-4 w-4" />
                contact@hachem.cc
              </a>
            </div>

            <p className="mt-[64px]">Warmly,</p>
            <p className="mt-[32px] text-2xl italic">- Hachem H.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Library Modal */}
      <LiliBoulangerLibrary isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />
    </section>
  );
}
