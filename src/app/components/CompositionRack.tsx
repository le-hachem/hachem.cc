import { motion } from "motion/react";
import { Music, Clock, Calendar, Headphones, Award } from "lucide-react";
import { useState } from "react";
import { PerchedDeco } from "./PerchedDeco";
import { CatSitting, MusicalNotes, BirdOnBranch } from "./Deco";
import { useLanguage } from "../i18n/LanguageContext";
import { tInstrument } from "../i18n/translations";
import { featuredCompositionIds } from "../i18n/compositions";

export type { Composition, CompositionCategory } from "../i18n/compositions";
import type { Composition } from "../i18n/compositions";

const cardPerches = [
  { Deco: CatSitting,   className: "absolute -top-[34px] right-5 w-9 h-9",  idle: "sway"  as const },
  { Deco: BirdOnBranch, className: "absolute -top-[30px] right-4 w-12 h-8", idle: "bob"   as const },
  { Deco: MusicalNotes, className: "absolute -top-6 left-6 w-9 h-6",        idle: "bob"   as const },
];

interface CompositionRackProps {
  compositions: Composition[];
  onCompositionClick: (composition: Composition) => void;
  onViewAllClick: () => void;
}

export function CompositionRack({ compositions, onCompositionClick, onViewAllClick }: CompositionRackProps) {
  const { lang, t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isHidden = import.meta.env.VITE_HIDE_COMPOSITIONS === "true";

  const featuredCompositions = compositions.filter(c =>
    featuredCompositionIds.includes(c.id)
  );

  return (
    <section className="relative bg-white px-4 pb-12 pt-12 sm:pb-16 sm:pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
            {t.rack.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black" />
          <p className="mt-4 text-xs tracking-[0.4em] uppercase text-neutral-500"
             style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            {t.rack.subtitle}
          </p>
        </motion.div>

        {isHidden ? (
          <div className="text-center py-16 px-4">
            <Music className="w-6 h-6 mx-auto mb-4 text-neutral-300" />
            <p className="font-serif text-base text-neutral-400 italic">
              {t.rack.maintenanceLine1}<br />{t.rack.maintenanceLine2}
            </p>
          </div>
        ) : (
          <>
            <div className="relative">
              {/* View all button */}
              <div className="flex justify-end mb-4 sm:mb-0">
                <button
                  onClick={onViewAllClick}
                  className="group sm:absolute sm:-top-10 sm:right-0 flex items-center gap-2 border border-black bg-white px-5 py-2 font-sans text-xs tracking-widest uppercase transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                >
                  <Music className="w-3 h-3" />
                  {t.rack.allCompositions}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>

              <div className="overflow-visible py-4 sm:py-6">
                <div className="scrollbar-thin overflow-x-auto">
                  <div className="flex min-w-max gap-8 px-2 pt-12 pb-4">
                    {featuredCompositions.map((composition, index) => (
                      <motion.div
                        key={composition.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        onHoverStart={() => setHoveredId(composition.id)}
                        onHoverEnd={() => setHoveredId(null)}
                        onClick={() => onCompositionClick(composition)}
                        className="group relative w-64 sm:w-72 md:w-80 cursor-pointer border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md hover:border-neutral-400"
                      >
                        {/* Silhouette perched on the card's top edge */}
                        {(() => {
                          const perch = cardPerches[index % cardPerches.length];
                          return (
                            <PerchedDeco className={perch.className} idle={perch.idle} delay={0.5}>
                              <perch.Deco className="w-full h-full" />
                            </PerchedDeco>
                          );
                        })()}
                        <div className="relative z-10 p-6">
                          {composition.coverUrl && (
                            <div className="mb-5 relative aspect-square overflow-hidden bg-neutral-100 border border-neutral-100">
                              <img
                                src={composition.coverUrl}
                                alt={`${composition.title} cover art`}
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                              {composition.accolades && composition.accolades.length > 0 && (
                                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 text-white">
                                  <Award className="w-3 h-3" />
                                  <span className="text-[10px] uppercase tracking-wider"
                                        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                    {t.rack.awarded}
                                  </span>
                                </div>
                              )}
                              {composition.audioUrl && (
                                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 text-white">
                                  <Headphones className="w-3 h-3" />
                                  <span className="text-[10px] uppercase tracking-wider"
                                        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                    {t.rack.listen}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className={composition.coverUrl ? "mt-0" : "mt-2"}>
                            <h3 className="text-xl font-serif font-bold leading-tight">
                              {composition.title}
                            </h3>
                            <p className="text-sm font-serif italic text-neutral-500 mt-1">
                              {composition.subtitle}
                            </p>

                            <div className="border-t border-neutral-100 my-4" />

                            <div className="space-y-1.5 text-sm text-neutral-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                                <span className="font-serif">{composition.year}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                <span className="font-serif">{composition.duration}</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-neutral-100">
                              <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2"
                                 style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                {t.rack.instrumentation}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {composition.instrumentation.map((inst, i) => (
                                  <span
                                    key={i}
                                    className="text-[11px] font-serif border border-neutral-200 px-1.5 py-0.5 text-neutral-600 bg-neutral-50"
                                  >
                                    {tInstrument(inst, lang)}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredId === composition.id ? 1 : 0 }}
                              className="absolute bottom-4 right-4 text-xs font-serif italic text-neutral-400"
                            >
                              {t.rack.open}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          .scrollbar-thin::-webkit-scrollbar { height: 6px; }
          .scrollbar-thin::-webkit-scrollbar-track { background: #f5f5f5; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background: #d4d4d4; }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #a3a3a3; }
        `}
      </style>
    </section>
  );
}
