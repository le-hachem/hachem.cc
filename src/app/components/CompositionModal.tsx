import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, Music, Calendar, Clock, Award } from "lucide-react";
import { useEffect } from "react";
import type { Composition } from "./CompositionRack";
import { AudioPlayer } from "./AudioPlayer";
import { useLanguage } from "../i18n/LanguageContext";
import { tInstrument } from "../i18n/translations";

interface CompositionModalProps {
  composition: Composition | null;
  onClose: () => void;
}

export function CompositionModal({ composition, onClose }: CompositionModalProps) {
  const { lang, t } = useLanguage();
  useEffect(() => {
    if (!composition) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [composition]);

  if (!composition) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={`composition-detail-${composition.id}`}
        className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Scrim */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden
          onClick={onClose}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-[#161413] flex flex-col shadow-2xl sm:border sm:border-[#2f2c28]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 32, stiffness: 400 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-none border-b border-[#2f2c28] px-5 sm:px-8 py-5">
            <div className="flex items-start gap-4 justify-between">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {composition.coverUrl ? (
                  <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 border border-[#201e1c] overflow-hidden bg-[#161413]">
                    <img
                      src={composition.coverUrl}
                      alt={`${composition.title} cover art`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 border border-[#201e1c] bg-[#161413] flex items-center justify-center">
                    <Music className="w-6 h-6 text-[#443f39]" />
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-display font-black tracking-tight leading-tight">
                    {composition.title}
                  </h2>
                  <p className="text-sm font-serif italic text-[#7b7267] mt-0.5">
                    {composition.subtitle}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#5e564f]"
                       style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {composition.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {composition.duration}
                    </span>
                    <span className="tracking-widest uppercase text-[10px]">
                      {t.categories.labels[composition.category]}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 flex h-8 w-8 items-center justify-center text-[#5e564f] hover:text-[#eee8dd] transition-colors"
                aria-label={t.modal.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 sm:px-8 py-6 space-y-8">

              {/* Audio player */}
              {composition.audioUrl && (
                <AudioPlayer
                  audioUrl={composition.audioUrl}
                  peaksUrl={composition.peaksUrl}
                  fallbackDuration={composition.durationSeconds}
                  title={composition.title}
                  subtitle={composition.subtitle}
                />
              )}

              {/* Accolades */}
              {composition.accolades && composition.accolades.length > 0 && (
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#5e564f] mb-3"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {t.modal.recognition}
                  </p>
                  <div className="space-y-2">
                    {composition.accolades.map((line, i) => (
                      <div key={i} className="flex items-start gap-3 border border-[#2f2c28] px-4 py-3 bg-[#161413]">
                        <Award className="w-4 h-4 mt-0.5 shrink-0 text-[#5e564f]" />
                        <span className="text-sm font-serif">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#5e564f] mb-3"
                   style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {t.modal.about}
                </p>
                <div className="border-l-2 border-[#2f2c28] pl-4">
                  <p className="text-sm sm:text-base font-serif leading-relaxed text-[#dfd6c7]">
                    {composition.description}
                  </p>
                </div>
              </div>

              {/* Inspired by */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#5e564f] mb-3"
                   style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {t.modal.influences}
                </p>
                <p className="text-sm font-serif italic text-[#a1998a] border border-[#2f2c28] px-4 py-3 bg-[#161413]">
                  "{composition.inspired}"
                </p>
              </div>

              {/* Instrumentation */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#5e564f] mb-3"
                   style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {t.modal.instrumentation}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {composition.instrumentation.map((inst, i) => (
                    <span
                      key={i}
                      className="text-xs font-serif border border-[#2f2c28] bg-[#161413] px-2 py-1 text-[#c2b9ab]"
                    >
                      {tInstrument(inst, lang)}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex-none border-t border-[#2f2c28] px-5 sm:px-8 py-3 text-center">
            <p className="text-xs font-serif italic text-[#5e564f]">
              {t.modal.clickOutside}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
