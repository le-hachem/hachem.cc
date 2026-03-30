import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, Music, Calendar, Clock } from "lucide-react";
import { useEffect } from "react";
import type { Composition } from "./CompositionRack";

interface CompositionsLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  compositions: Composition[];
  onCompositionClick: (composition: Composition) => void;
}

const paperTint = "bg-neutral-100";

export function CompositionsLibrary({ isOpen, onClose, compositions, onCompositionClick }: CompositionsLibraryProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="compositions-library-overlay"
          className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto overflow-x-hidden px-2 py-4 sm:p-6 sm:pt-12"
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

            <div className="relative z-10 px-4 pb-6 pt-10 sm:px-8 sm:pb-8 sm:pt-14 md:px-12 md:pb-12 md:pt-16">
              {/* Header */}
              <div className={`border-4 sm:border-8 border-double border-black p-3 sm:p-6 mb-4 sm:mb-8 ${paperTint}`}>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Music className="w-7 h-7 sm:w-10 sm:h-10 shrink-0" />
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black uppercase">
                      Complete Works
                    </h2>
                    <p className="text-sm sm:text-lg font-serif italic mt-1">All Compositions</p>
                  </div>
                </div>
              </div>

              {/* Library grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-2">
                {compositions.map((composition, index) => (
                  <motion.div
                    key={composition.id}
                    initial={{ opacity: 1, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#e5e5e5" }}
                    onClick={() => {
                      onCompositionClick(composition);
                      onClose();
                    }}
                    className="border-4 border-black p-5 bg-white relative group cursor-pointer"
                  >
                    {/* Number indicator */}
                    <div className="absolute -left-3 -top-3 w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-serif font-bold border-2 border-white">
                      {index + 1}
                    </div>

                    <div className="mt-2">
                      <div className="flex items-start gap-2 mb-3">
                        <Music className="w-5 h-5 flex-shrink-0 mt-1" />
                        <h3 className="text-xl font-serif font-bold leading-tight flex-1">
                          {composition.title}
                        </h3>
                      </div>
                      
                      <p className="text-sm font-serif italic opacity-80 mb-3">
                        {composition.subtitle}
                      </p>

                      <div className="flex flex-wrap gap-3 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-serif font-bold">{composition.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-serif font-bold">{composition.duration}</span>
                        </div>
                      </div>

                      <div className="border-t-2 border-dashed border-black pt-3">
                        <div className="flex flex-wrap gap-1">
                          {composition.instrumentation.map((inst, i) => (
                            <span
                              key={i}
                              className="text-xs font-serif border border-black bg-neutral-200 px-2 py-1"
                            >
                              {inst}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute bottom-3 right-3 text-xs font-serif italic opacity-0 group-hover:opacity-60 transition-opacity"
                      >
                        Click to view →
                      </motion.div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t-4 border-black text-center">
                <p className="text-sm font-serif italic opacity-60">
                  {compositions.length} compositions in total • Click any work to view details
                </p>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-16 sm:h-16 border-l-4 border-t-4 sm:border-l-8 sm:border-t-8 border-black pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-16 sm:h-16 border-r-4 border-t-4 sm:border-r-8 sm:border-t-8 border-black pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-16 sm:h-16 border-l-4 border-b-4 sm:border-l-8 sm:border-b-8 border-black pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-16 sm:h-16 border-r-4 border-b-4 sm:border-r-8 sm:border-b-8 border-black pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
