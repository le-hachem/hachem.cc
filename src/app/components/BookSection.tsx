import { useRef, useState } from "react";
import { motion, useMotionTemplate, useReducedMotion, useTransform } from "motion/react";
import { useScrubProgress } from "./scroll";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Library } from "lucide-react";
import { LiliBoulangerLibrary } from "./LiliBoulangerLibrary";
import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
import { Reveal } from "./Reveal";
import { SectionEnd, PlateCorners } from "./Ornaments";
import { Tilt } from "./Tilt";
import { useLanguage } from "../i18n/LanguageContext";
import { hideDispatches } from "../i18n/dispatches";

/** Bain News Service, 1918; Library of Congress (public domain) via Wikimedia Commons */
const LILI_BOULANGER_PORTRAIT =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lili_Boulanger.jpg/960px-Lili_Boulanger.jpg";

export function BookSection() {
  const { t } = useLanguage();
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // The portrait "develops" as the section scrolls through — an old print
  // pulling into focus, from soft, flat and faded to sharp and resolved — while
  // it stays pinned beside the restoration story. Reduced motion gets the
  // finished, resolved plate with no scrub.
  const sectionRef = useRef<HTMLElement>(null);
  const develop = useScrubProgress(sectionRef, ["start 0.9", "start 0.2"]);
  const devContrast = useTransform(develop, [0, 1], [0.5, 1.08]);
  const devBright = useTransform(develop, [0, 1], [1.3, 1]);
  const devSat = useTransform(develop, [0, 1], [0.35, 1]);
  const devScale = useTransform(develop, [0, 1], [1.16, 1]);
  const devFilter = useMotionTemplate`contrast(${devContrast}) brightness(${devBright}) saturate(${devSat})`;

  return (
    <section ref={sectionRef} className={`relative px-4 py-14 sm:py-28 ${hideDispatches ? "bg-[var(--c-1a1816)]" : "bg-[var(--c-151414)]"}`}>
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index={hideDispatches ? "04" : "05"}
          dept={t.book.dept}
          title={t.book.headline}
          deck={t.book.deck}
          byline={t.book.byline}
        />

        <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-14 items-start">
          {/* The article, set in justified columns */}
          <article>
            <Reveal amount={0.08} className="np-body np-columns np-justify text-[14px] leading-[1.62] text-[var(--c-cbc2b0)] [&>p]:mb-3.5">
              <p className="np-opener"><DropCap text={t.book.p1} /></p>
              <p>
                {t.book.p2}
              </p>
              <blockquote className="np-pullquote np-colspan-all">
                {t.book.p2.split(/(?<=[.!?])\s/)[0]}
              </blockquote>
              <p>
                {t.book.p3}
              </p>
              <p className="np-endmark">
                {t.book.p4}
              </p>
            </Reveal>

            <Reveal y={10}>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="np-btn np-kicker group mt-7 inline-flex cursor-pointer items-center gap-2 border border-[var(--c-5e564f)] px-5 py-2.5 text-[var(--c-cbc2b0)]"
              >
                <Library className="h-3.5 w-3.5 shrink-0" />
                {t.book.viewCatalogue}
              </button>
            </Reveal>
          </article>

          {/* Inset figure — pinned beside the story, developing into focus */}
          <Reveal as="figure" y={20} amount={0.2} className="md:pt-1 md:sticky md:top-24 md:self-start">
            <div>
            <div className="relative">
              <PlateCorners />
              <Tilt max={5}>
                <div className="np-screen aspect-[3/4] overflow-hidden border border-[var(--c-201e1c)] bg-[var(--c-161413)] shadow-[0_22px_44px_-26px_rgba(0,0,0,0.75)]">
                  <motion.div
                    className="h-full w-full"
                    style={
                      reduceMotion
                        ? undefined
                        : { scale: devScale, filter: devFilter, transformOrigin: "center 30%" }
                    }
                  >
                    <ImageWithFallback
                      src={LILI_BOULANGER_PORTRAIT}
                      alt="Lili Boulanger, portrait photograph (Bain News Service, 1918, Library of Congress)"
                      className="np-halftone h-full w-full object-cover object-top"
                    />
                  </motion.div>
                </div>
              </Tilt>
            </div>
            <figcaption className="mt-3 border-t border-[var(--c-201e1c)] pt-3 text-center">
              <p className="np-kicker mb-1.5 text-[9px] text-[var(--c-8a8071)]">Fig.&nbsp;2</p>
              <h3 className="np-head text-base font-bold uppercase tracking-wide text-[var(--c-e6e0d5)]">
                Lili Boulanger
              </h3>
              <p className="mt-0.5 font-serif text-xs italic text-[var(--c-7b7267)]">1893–1918</p>
              <p className="np-kicker mt-2 text-[10px] text-[var(--c-5e564f)]">
                {t.book.portraitCaption}
              </p>
            </figcaption>
            </div>
          </Reveal>
        </div>

        <SectionEnd className="mt-14" />
      </div>

      <LiliBoulangerLibrary isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />
    </section>
  );
}
