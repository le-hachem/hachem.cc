import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, Music, Calendar, Clock, User, Lightbulb, Award } from "lucide-react";
import { useEffect } from "react";
import type { Composition } from "./CompositionRack";
import { AudioPlayer } from "./AudioPlayer";

interface CompositionModalProps {
  composition: Composition | null;
  onClose: () => void;
}

const paperTint = "bg-neutral-100";

export function CompositionModal({ composition, onClose }: CompositionModalProps) {
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
        className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto overflow-x-hidden px-2 py-4 sm:p-6 sm:pt-12"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div
          // `fixed` (not `absolute`): keep the dim backdrop pinned to the
          // viewport so it stays behind the whole modal when the user
          // scrolls through long content inside.
          className="fixed inset-0 bg-neutral-900/45"
          aria-hidden
          role="presentation"
          onClick={onClose}
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative z-10 mb-4 mt-2 sm:mb-8 sm:mt-4 w-full max-w-5xl"
          initial={{ scale: 0.985, y: 12, opacity: 1 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.985, y: 8, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 380 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative isolate border-4 sm:border-8 border-black bg-white shadow-[4px_4px_0_0_rgb(24_24_24)] sm:shadow-[10px_10px_0_0_rgb(24_24_24)]">

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-2 top-2 z-[60] flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center border-[3px] border-white bg-black text-white transition-colors hover:bg-neutral-800"
            aria-label="Close"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="relative z-10 px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-14 md:px-16 md:pb-16 md:pt-20">
            {/* Header */}
            <div className={`border-4 sm:border-8 border-double border-black p-3 sm:p-6 mb-4 sm:mb-8 relative ${paperTint}`}>
              {/* Decorative corners */}
              <div className="absolute -top-1.5 -left-1.5 w-7 h-7 sm:w-12 sm:h-12 bg-white border-2 sm:border-4 border-black"></div>
              <div className="absolute -top-1.5 -right-1.5 w-7 h-7 sm:w-12 sm:h-12 bg-white border-2 sm:border-4 border-black"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-7 h-7 sm:w-12 sm:h-12 bg-white border-2 sm:border-4 border-black"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 sm:w-12 sm:h-12 bg-white border-2 sm:border-4 border-black"></div>

              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4">
                {composition.coverUrl && (
                  <div className="relative mx-auto sm:mx-0 w-40 sm:w-48 md:w-56 flex-shrink-0 aspect-square border-2 sm:border-4 border-black shadow-[4px_4px_0_0_rgb(24_24_24)] overflow-hidden bg-white">
                    <img
                      src={composition.coverUrl}
                      alt={`${composition.title} cover art`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-4">
                  {!composition.coverUrl && (
                    <Music className="w-8 h-8 sm:w-12 sm:h-12 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black leading-tight uppercase break-words">
                      {composition.title}
                    </h2>
                    <p className="text-base sm:text-xl md:text-2xl font-serif italic opacity-80 mt-1 sm:mt-2">
                      {composition.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Meta information */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-lg border-t-2 sm:border-t-4 border-black pt-3 sm:pt-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-serif font-bold">{composition.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-serif font-bold">{composition.duration}</span>
                </div>
              </div>
            </div>

            {/* Audio player (only if there's an audio file) */}
            {composition.audioUrl && (
              <div className="mb-4 sm:mb-8">
                <AudioPlayer
                  audioUrl={composition.audioUrl}
                  peaksUrl={composition.peaksUrl}
                  fallbackDuration={composition.durationSeconds}
                  title={composition.title}
                  subtitle={composition.subtitle}
                />
              </div>
            )}

            {/* Accolades */}
            {composition.accolades && composition.accolades.length > 0 && (
              <div className="mb-4 sm:mb-8">
                <div className={`border-l-4 sm:border-l-8 border-black pl-3 sm:pl-6 py-2 ${paperTint}`}>
                  <h3 className="text-lg sm:text-2xl font-serif font-bold mb-2 sm:mb-4 uppercase tracking-wide flex items-center gap-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    Accolades
                  </h3>
                </div>
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {composition.accolades.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 border-2 border-black bg-white px-3 py-2 sm:px-4 sm:py-3 shadow-[3px_3px_0_0_rgb(24_24_24)]"
                    >
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-lg font-serif">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="mb-4 sm:mb-8">
              <div className="border-l-4 sm:border-l-8 border-black bg-neutral-100 py-2 pl-3 sm:pl-6">
                <h3 className="text-lg sm:text-2xl font-serif font-bold mb-2 sm:mb-4 uppercase tracking-wide">
                  About This Work
                </h3>
              </div>
              <div className="mt-3 sm:mt-4 text-sm sm:text-lg font-serif leading-relaxed text-justify">
                <div className="float-left text-4xl sm:text-6xl md:text-8xl font-serif font-black leading-none mr-2 sm:mr-4 mt-1 sm:mt-2 border-2 sm:border-4 border-black px-2 sm:px-3 py-0.5 sm:py-1">
                  {composition.title[0]}
                </div>
                <p>{composition.description}</p>
              </div>
            </div>

            {/* Instrumentation */}
            <div className="mb-4 sm:mb-8">
              <div className={`border-l-4 sm:border-l-8 border-black pl-3 sm:pl-6 py-2 ${paperTint}`}>
                <h3 className="text-lg sm:text-2xl font-serif font-bold mb-2 sm:mb-4 uppercase tracking-wide flex items-center gap-2">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  Instrumentation
                </h3>
              </div>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                {composition.instrumentation.map((inst, i) => (
                  <span
                    key={i}
                    className="text-sm sm:text-lg font-serif border-2 sm:border-3 border-black bg-neutral-200 px-2 py-1 sm:px-4 sm:py-2 transition-colors hover:bg-neutral-300"
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            {/* Inspiration */}
            <div className="mb-4 sm:mb-8">
              <div className={`border-l-4 sm:border-l-8 border-black pl-3 sm:pl-6 py-2 ${paperTint}`}>
                <h3 className="text-lg sm:text-2xl font-serif font-bold mb-2 sm:mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                  Inspiration
                </h3>
              </div>
              <div className="mt-3 sm:mt-4 border-2 sm:border-4 border-dashed border-black bg-neutral-200 p-3 sm:p-6">
                <p className="text-sm sm:text-lg font-serif italic">
                  "{composition.inspired}"
                </p>
              </div>
            </div>

            {/* Decorative footer */}
            <div className="border-t-2 sm:border-t-4 border-black pt-4 sm:pt-8 mt-4 sm:mt-8">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-black"></div>
                <div className="text-2xl sm:text-4xl font-serif">❖</div>
                <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-black"></div>
              </div>
              <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm font-serif italic opacity-60">
                Click outside to close
              </p>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-10 h-10 sm:w-20 sm:h-20 border-l-4 border-t-4 sm:border-l-8 sm:border-t-8 border-black pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-10 h-10 sm:w-20 sm:h-20 border-r-4 border-t-4 sm:border-r-8 sm:border-t-8 border-black pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-20 sm:h-20 border-l-4 border-b-4 sm:border-l-8 sm:border-b-8 border-black pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-20 sm:h-20 border-r-4 border-b-4 sm:border-r-8 sm:border-b-8 border-black pointer-events-none"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}