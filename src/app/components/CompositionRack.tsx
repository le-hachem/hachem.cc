import { motion } from "motion/react";
import { Award, Headphones } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { DropCap } from "./DropCap";
import { useLanguage } from "../i18n/LanguageContext";
import { tInstrument } from "../i18n/translations";
import { featuredCompositionIds } from "../i18n/compositions";

export type { Composition, CompositionCategory } from "../i18n/compositions";
import type { Composition } from "../i18n/compositions";

interface CompositionRackProps {
  compositions: Composition[];
  onCompositionClick: (composition: Composition) => void;
  onViewAllClick: () => void;
}

/**
 * Featured works set as a printed catalogue index: numbered, hairline-ruled
 * rows — title and scoring on the left, year and duration set in tabular
 * figures on the right — rather than a rack of cards.
 */
export function CompositionRack({ compositions, onCompositionClick, onViewAllClick }: CompositionRackProps) {
  const { lang, t } = useLanguage();
  const isHidden = import.meta.env.VITE_HIDE_COMPOSITIONS === "true";

  const featuredCompositions = compositions.filter((c) =>
    featuredCompositionIds.includes(c.id)
  );

  return (
    <section className="relative bg-[#1a1816] px-4 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          index="02"
          dept={t.rack.dept}
          title={t.rack.headline}
          deck={t.rack.deck}
          byline={t.rack.byline}
        />

        {isHidden ? (
          <p className="np-body italic text-center text-[#7b7267] py-10">
            {t.rack.maintenanceLine1} {t.rack.maintenanceLine2}
          </p>
        ) : (
          <>
            {/* Lead review */}
            <div className="np-body np-justify mx-auto mb-12 max-w-3xl text-[14px] leading-[1.62] text-[#cbc2b0]">
              <p><DropCap text={t.rack.review} /></p>
            </div>

            <ul className="border-t-2 border-[var(--np-rule-strong)]">
              {featuredCompositions.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="np-row"
                >
                  <button
                    onClick={() => onCompositionClick(c)}
                    className="group grid w-full grid-cols-[2.25rem_1fr] sm:grid-cols-[2.5rem_1fr_7rem_5rem] items-baseline gap-x-4 gap-y-1 py-5 text-left"
                  >
                    <span className="np-kicker np-tabular pt-1 text-[#8a8071]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="np-head text-2xl sm:text-3xl font-bold leading-tight text-[#e6e0d5] decoration-1 underline-offset-[6px] group-hover:underline">
                        {c.title}
                        {c.accolades && c.accolades.length > 0 && (
                          <Award
                            aria-label={t.rack.awarded}
                            className="ml-2 inline-block h-4 w-4 -translate-y-px text-[#9a927f]"
                          />
                        )}
                        {c.audioUrl && (
                          <Headphones
                            aria-label={t.rack.listen}
                            className="ml-1.5 inline-block h-4 w-4 -translate-y-px text-[#9a927f]"
                          />
                        )}
                      </h3>
                      <p className="np-body mt-0.5 italic text-[#9a927f]">{c.subtitle}</p>
                      <p className="np-kicker mt-2 text-[10px] text-[#7b7267]">
                        {c.instrumentation.map((x) => tInstrument(x, lang)).join("  ·  ")}
                      </p>
                      {/* meta, stacked on small screens */}
                      <p className="np-tabular mt-2 font-serif text-sm text-[#8a8071] sm:hidden">
                        {c.year} · {c.duration}
                      </p>
                    </div>

                    <span className="np-tabular hidden pt-1 text-right font-serif text-[#a1998a] sm:block">
                      {c.year}
                    </span>
                    <span className="np-tabular hidden pt-1 text-right font-serif text-[#a1998a] sm:block">
                      {c.duration}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex justify-center">
              <button
                onClick={onViewAllClick}
                className="np-kicker group inline-flex items-center gap-2 border border-[#5e564f] px-5 py-2.5 text-[#cbc2b0] transition-colors hover:border-[#e6e0d5] hover:text-[#e6e0d5]"
              >
                {t.rack.allCompositions}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="np-head mt-12 text-center text-xl tracking-[0.6em] text-[#5e564f]" aria-hidden>
              * * *
            </div>
          </>
        )}
      </div>
    </section>
  );
}
