import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useState, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Library } from "lucide-react";
import { LiliBoulangerLibrary } from "./LiliBoulangerLibrary";
import { PerchedDeco } from "./PerchedDeco";
import { BirdOnBranch, Butterfly } from "./Deco";

/** Bain News Service, 1918; Library of Congress (public domain) via Wikimedia Commons */
const LILI_BOULANGER_PORTRAIT =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lili_Boulanger.jpg/960px-Lili_Boulanger.jpg";

export function BookSection() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Parallax: the portrait drifts slower than the letter as the section scrolls
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section ref={sectionRef} className="relative bg-neutral-50 px-4 pb-12 pt-12 sm:pb-16 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Section header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
            The Lili Boulanger<br />
            <span className="text-xl sm:text-3xl font-normal italic">Restoration Project</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black" />
        </div>

        {/* Letter + Portrait */}
        <div className="relative isolate mb-16 md:min-h-[36rem]">
          {/* Letter card */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-20 w-full cursor-default border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow md:max-w-xl lg:max-w-2xl"
          >
            {/* A bird perched on the letter's top edge */}
            <PerchedDeco
              className="absolute -top-[30px] right-8 w-12 h-8"
              idle="bob"
              delay={0.6}
            >
              <BirdOnBranch className="w-full h-full" />
            </PerchedDeco>
            <div className="relative z-10 p-6 sm:p-10 md:p-12 font-serif"
                 style={{
                   backgroundImage:
                     "repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.04) 31px, rgba(0,0,0,0.04) 32px)",
                   backgroundPosition: "0 20px",
                 }}>
              {/* Red margin line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-red-200/70 hidden sm:block"
                style={{ left: "56px" }}
              />

              {/* Ornamental initial cap */}
              <div className="float-left text-5xl sm:text-7xl font-serif font-black leading-none mr-3 sm:mr-5 mt-1 border border-neutral-200 px-3 py-1">
                L
              </div>

              <div className="text-base md:text-lg leading-relaxed text-justify space-y-5 text-neutral-800">
                <p>
                  ili Boulanger (1893–1918) was the first woman to win the Prix de Rome, yet many
                  of her works remain without proper modern editions and some have never been formally
                  published at all. Her manuscripts, scattered across archives, deserve to be heard
                  as she intended.
                </p>

                <p>
                  The Restoration Project aims to change that. Each piece is re-engraved from her
                  manuscripts and sketches, faithful to her notation and free of the errors that
                  crept in over a century of copies, so that performers anywhere can simply pick
                  up the score and play.
                </p>

                <p>
                  This is ongoing work. The library grows as editions are finished, and every one
                  of them is published freely on IMSLP.
                </p>

                <div className="clear-both pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLibraryOpen(true);
                    }}
                    className="inline-flex cursor-pointer items-center gap-2 border border-black bg-white px-4 py-2 font-sans text-xs tracking-widest uppercase transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                  >
                    <Library className="h-3.5 w-3.5 shrink-0" />
                    View her complete catalogue
                  </button>
                </div>
              </div>

              {/* Signature */}
              <div className="mt-10 text-right clear-both">
                <div className="inline-block border-t border-neutral-300 pt-3">
                  <p className="text-xl font-serif italic text-neutral-600">H. H.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={reduceMotion ? undefined : { y: portraitY }}
            className="relative z-0 mx-auto mt-10 w-full max-w-[14rem] sm:max-w-xs cursor-default border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow md:absolute md:right-6 md:top-24 md:mx-0 md:mt-0 md:w-[min(100%,260px)] lg:right-10 lg:top-28"
          >
            {/* A butterfly resting on the portrait frame */}
            <PerchedDeco
              className="absolute -top-3 -left-3 w-7 h-5"
              idle="flutter"
              delay={0.8}
            >
              <Butterfly className="w-full h-full" />
            </PerchedDeco>
            <div className="p-3">
              <div className="aspect-[3/4] overflow-hidden border border-neutral-100 bg-neutral-50">
                <ImageWithFallback
                  src={LILI_BOULANGER_PORTRAIT}
                  alt="Lili Boulanger, portrait photograph (Bain News Service, 1918, Library of Congress)"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="mt-3 text-center border-t border-neutral-100 pt-3">
                <h3 className="text-base font-serif font-bold uppercase tracking-wide">Lili Boulanger</h3>
                <p className="text-xs font-serif italic text-neutral-500 mt-0.5">1893–1918</p>
                <p className="text-xs font-sans mt-1.5 text-neutral-400 tracking-wide">
                  First woman to win the Prix de Rome
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-neutral-300" />
          <span className="text-neutral-300 text-lg font-serif">✦</span>
          <div className="h-px w-16 bg-neutral-300" />
        </div>
      </motion.div>

      {/* Library Modal */}
      <LiliBoulangerLibrary isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />
    </section>
  );
}
