import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { Composition, CompositionCategory } from "./CompositionRack";

interface CompositionsLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  compositions: Composition[];
  onCompositionClick: (composition: Composition) => void;
}

const categoryOrder: CompositionCategory[] = [
  "Large Ensemble",
  "Chamber Music",
  "Piano Solo",
  "Voice & Piano",
];

const categoryDescriptions: Record<CompositionCategory, string> = {
  "Large Ensemble": "Orchestra, chorus, and large forces",
  "Chamber Music":  "Small instrumental combinations",
  "Piano Solo":     "Works for piano alone",
  "Voice & Piano":  "Songs and mélodies",
};

export function CompositionsLibrary({
  isOpen,
  onClose,
  compositions,
  onCompositionClick,
}: CompositionsLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<CompositionCategory | "All">("All");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setActiveCategory("All");
  }, [isOpen]);

  const populated = categoryOrder.filter(cat =>
    compositions.some(c => c.category === cat)
  );

  const visibleCategories =
    activeCategory === "All" ? populated : [activeCategory as CompositionCategory];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="compositions-library-overlay"
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
            className="relative z-10 w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-white flex flex-col shadow-2xl sm:border sm:border-neutral-200"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 400 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-none border-b border-neutral-200 px-5 sm:px-8 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight">
                    Catalogue of Works
                  </h2>
                  <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mt-1"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    Hachem H. · {compositions.length} compositions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-black transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body: sidebar + content */}
            <div className="flex flex-1 min-h-0">

              {/* Sidebar — desktop only */}
              <aside className="hidden sm:flex flex-col w-48 shrink-0 border-r border-neutral-200 py-4">
                <p className="px-4 text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
                   style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  By Instrumentation
                </p>
                <nav className="flex flex-col gap-0.5 px-2">
                  {(["All", ...populated] as (CompositionCategory | "All")[]).map(cat => {
                    const count = cat === "All"
                      ? compositions.length
                      : compositions.filter(c => c.category === cat).length;
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2.5 rounded-none transition-colors duration-150 border-l-2 ${
                          active
                            ? "border-black bg-neutral-50 text-black"
                            : "border-transparent text-neutral-500 hover:text-black hover:bg-neutral-50"
                        }`}
                      >
                        <span className="block text-sm font-serif font-bold leading-tight">
                          {cat === "All" ? "All Works" : cat}
                        </span>
                        <span className="block text-[10px] text-neutral-400 mt-0.5"
                              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                          {count} {count === 1 ? "work" : "works"}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Main content */}
              <div className="flex-1 min-w-0 flex flex-col min-h-0">
                {/* Mobile category tabs */}
                <div className="sm:hidden flex gap-1.5 px-5 py-3 border-b border-neutral-100 overflow-x-auto">
                  {(["All", ...populated] as (CompositionCategory | "All")[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`shrink-0 px-3 py-1 text-xs font-serif border transition-colors ${
                        activeCategory === cat
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                      }`}
                    >
                      {cat === "All" ? "All" : cat}
                    </button>
                  ))}
                </div>

                {/* Works list */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {visibleCategories.map(cat => {
                        const catWorks = compositions.filter(c => c.category === cat);
                        return (
                          <div key={cat}>
                            {/* Category header */}
                            <div className="sticky top-0 bg-neutral-50 border-b border-neutral-200 px-5 sm:px-6 py-2.5 z-10">
                              <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-500 font-semibold"
                                 style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                {cat}
                                <span className="ml-2 font-normal text-neutral-400">
                                  — {categoryDescriptions[cat]}
                                </span>
                              </p>
                            </div>

                            {/* Work rows */}
                            {catWorks.map((work, i) => (
                              <motion.button
                                key={work.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: i * 0.04 }}
                                onClick={() => { onCompositionClick(work); onClose(); }}
                                className="group w-full text-left border-b border-neutral-100 px-5 sm:px-6 py-4 flex items-center gap-4 hover:bg-neutral-50 transition-colors"
                              >
                                {/* Year */}
                                <span className="shrink-0 text-[10px] tracking-wider text-neutral-400 w-8"
                                      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                  {work.year}
                                </span>

                                {/* Title */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="font-serif font-bold text-base leading-tight">
                                      {work.title}
                                    </span>
                                    {work.accolades && work.accolades.length > 0 && (
                                      <span className="text-[9px] tracking-widest uppercase bg-black text-white px-1.5 py-0.5"
                                            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                        Awarded
                                      </span>
                                    )}
                                  </div>
                                  <span className="block text-xs sm:text-sm font-serif italic text-neutral-500 mt-0.5">
                                    {work.subtitle}
                                  </span>
                                </div>

                                {/* Duration + arrow */}
                                <div className="shrink-0 flex items-center gap-3">
                                  <span className="hidden sm:flex items-center gap-1 text-xs text-neutral-400 font-serif"
                                        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                    <Clock className="w-3 h-3" />
                                    {work.duration}
                                  </span>
                                  <span className="text-neutral-300 group-hover:text-black transition-colors text-sm font-serif">
                                    →
                                  </span>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex-none border-t border-neutral-200 px-5 sm:px-8 py-3 text-center">
              <p className="text-xs font-serif italic text-neutral-400">
                Click any work to view the full score and details
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
