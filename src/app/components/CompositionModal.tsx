import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, Music, Calendar, Clock, User, Lightbulb } from "lucide-react";
import { useEffect } from "react";
import type { Composition } from "./CompositionRack";

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
        className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto overflow-x-hidden p-4 pt-10 sm:p-6 sm:pt-12"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-neutral-900/45"
          aria-hidden
          role="presentation"
          onClick={onClose}
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative z-10 mb-8 mt-4 w-full max-w-5xl"
          initial={{ scale: 0.985, y: 12, opacity: 1 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.985, y: 8, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 380 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative isolate border-8 border-black bg-white shadow-[10px_10px_0_0_rgb(24_24_24)]">

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-2 top-2 z-[60] flex h-11 w-11 items-center justify-center border-[3px] border-white bg-black text-white transition-colors hover:bg-neutral-800"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative z-10 px-8 pb-8 pt-14 md:px-16 md:pb-16 md:pt-20">
            {/* Header */}
            <div className={`border-8 border-double border-black p-6 mb-8 relative ${paperTint}`}>
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-white border-4 border-black"></div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white border-4 border-black"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white border-4 border-black"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white border-4 border-black"></div>

              <div className="flex items-center gap-4 mb-4">
                <Music className="w-12 h-12" />
                <div className="flex-1">
                  <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight uppercase">
                    {composition.title}
                  </h2>
                  <p className="text-xl md:text-2xl font-serif italic opacity-80 mt-2">
                    {composition.subtitle}
                  </p>
                </div>
              </div>

              {/* Meta information */}
              <div className="flex flex-wrap justify-center gap-6 text-lg border-t-4 border-black pt-4 mt-4">
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

            {/* Description */}
            <div className="mb-8">
              <div className="border-l-8 border-black bg-neutral-100 py-2 pl-6">
                <h3 className="text-2xl font-serif font-bold mb-4 uppercase tracking-wide">
                  About This Work
                </h3>
              </div>
              <div className="mt-4 text-lg font-serif leading-relaxed text-justify">
                <div className="float-left text-8xl font-serif font-black leading-none mr-4 mt-2 border-4 border-black px-3 py-1">
                  {composition.title[0]}
                </div>
                <p>{composition.description}</p>
              </div>
            </div>

            {/* Instrumentation */}
            <div className="mb-8">
              <div className={`border-l-8 border-black pl-6 py-2 ${paperTint}`}>
                <h3 className="text-2xl font-serif font-bold mb-4 uppercase tracking-wide flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Instrumentation
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {composition.instrumentation.map((inst, i) => (
                  <span
                    key={i}
                    className="text-lg font-serif border-3 border-black bg-neutral-200 px-4 py-2 transition-colors hover:bg-neutral-300"
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>

            {/* Inspiration */}
            <div className="mb-8">
              <div className={`border-l-8 border-black pl-6 py-2 ${paperTint}`}>
                <h3 className="text-2xl font-serif font-bold mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Inspiration
                </h3>
              </div>
              <div className="mt-4 border-4 border-dashed border-black bg-neutral-200 p-6">
                <p className="text-lg font-serif italic">
                  "{composition.inspired}"
                </p>
              </div>
            </div>

            {/* Decorative footer */}
            <div className="border-t-4 border-black pt-8 mt-8">
              <div className="flex items-center justify-center gap-6">
                <div className="h-1 w-24 bg-black"></div>
                <div className="text-4xl font-serif">❖</div>
                <div className="h-1 w-24 bg-black"></div>
              </div>
              <p className="text-center mt-4 text-sm font-serif italic opacity-60">
                Click outside to close
              </p>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-8 border-t-8 border-black pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-r-8 border-t-8 border-black pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-8 border-b-8 border-black pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-8 border-b-8 border-black pointer-events-none"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}