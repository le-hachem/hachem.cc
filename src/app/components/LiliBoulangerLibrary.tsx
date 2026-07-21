import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import {
  getLiliWorks,
  liliCategoryOrder,
  type LiliCategory,
} from "../i18n/lili";

/** The rail's filter: the real categories plus the "everything" option. */
type Category = "All" | LiliCategory;

interface LiliBoulangerLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}


export function LiliBoulangerLibrary({ isOpen, onClose }: LiliBoulangerLibraryProps) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const works = useMemo(() => getLiliWorks(lang), [lang]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setActiveCategory("All");
  }, [isOpen]);

  const editionCount = works.filter(w => w.edition).length;
  const populated = liliCategoryOrder.filter(cat => works.some(w => w.category === cat));
  const visibleCategories = activeCategory === "All" ? populated : [activeCategory];
  const filtered = activeCategory === "All" ? works : works.filter(w => w.category === activeCategory);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lili-library-overlay"
          className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-[var(--c-161413)] flex flex-col shadow-2xl sm:border sm:border-[var(--c-2f2c28)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 400 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-none border-b border-[var(--c-2f2c28)] px-5 sm:px-8 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight">
                    {t.lili.name}
                  </h2>
                  <p className="text-xs tracking-[0.3em] uppercase text-[var(--c-5e564f)] mt-1"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    {t.lili.headerLine(works.length, editionCount)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center text-[var(--c-5e564f)] hover:text-[var(--c-eee8dd)] transition-colors shrink-0"
                  aria-label={t.modal.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body: sidebar + content */}
            <div className="flex flex-1 min-h-0">

              {/* Sidebar — desktop only */}
              <aside className="hidden sm:flex flex-col w-48 shrink-0 border-r border-[var(--c-2f2c28)] py-4">
                <p className="px-4 text-[10px] tracking-[0.4em] uppercase text-[var(--c-5e564f)] mb-3"
                   style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                  {t.lili.byInstrumentation}
                </p>
                <nav className="flex flex-col gap-0.5 px-2">
                  {(["All", ...populated] as Category[]).map(cat => {
                    const count = cat === "All" ? works.length : works.filter(w => w.category === cat).length;
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2.5 transition-colors duration-150 border-l-2 ${
                          active
                            ? "border-[var(--c-eee8dd)] bg-[var(--c-161413)] text-[var(--c-eee8dd)]"
                            : "border-transparent text-[var(--c-7b7267)] hover:text-[var(--c-eee8dd)] hover:bg-[var(--c-161413)]"
                        }`}
                      >
                        <span className="block text-sm font-serif font-bold leading-tight">
                          {t.lili.categoryLabels[cat]}
                        </span>
                        <span className="block text-[10px] text-[var(--c-5e564f)] mt-0.5"
                              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                          {t.lili.workCount(count)}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Main content */}
              <div className="flex-1 min-w-0 flex flex-col min-h-0">
                {/* Mobile tabs */}
                <div className="sm:hidden flex gap-1.5 px-5 py-3 border-b border-[var(--c-201e1c)] overflow-x-auto">
                  {(["All", ...populated] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`shrink-0 px-3 py-1 text-xs font-serif border transition-colors ${
                        activeCategory === cat
                          ? "border-[var(--c-eee8dd)] bg-[var(--c-eee8dd)] text-[var(--c-161413)]"
                          : "border-[var(--c-2f2c28)] text-[var(--c-a1998a)] hover:border-[var(--c-5e564f)]"
                      }`}
                    >
                      {cat === "All" ? t.lili.all : t.lili.categoryLabels[cat]}
                    </button>
                  ))}
                </div>

                {/* Works */}
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
                        const catWorks = filtered.filter(w => w.category === cat);
                        return (
                          <div key={cat}>
                            {/* Category header */}
                            <div className="sticky top-0 bg-[var(--c-161413)] border-b border-[var(--c-2f2c28)] px-5 sm:px-6 py-2.5 z-10">
                              <p className="text-[10px] tracking-[0.35em] uppercase text-[var(--c-7b7267)] font-semibold"
                                 style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                {t.lili.categoryLabels[cat]}
                                <span className="ml-2 font-normal text-[var(--c-5e564f)]">
                                  · {t.lili.categoryDescriptions[cat]}
                                </span>
                              </p>
                            </div>

                            {/* Work rows */}
                            {catWorks.map((work, i) => (
                              <motion.div
                                key={work.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: i * 0.025 }}
                                className="border-b border-[var(--c-201e1c)] px-5 sm:px-6 py-4 hover:bg-[var(--c-161413)] transition-colors"
                              >
                                <div className="flex items-start gap-4">
                                  {/* Year */}
                                  <span className="shrink-0 text-[10px] tracking-wider text-[var(--c-5e564f)] pt-0.5 w-12"
                                        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                    {work.year}
                                  </span>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                      <h3 className="font-serif font-bold text-base text-[var(--c-eee8dd)]">
                                        {work.title}
                                      </h3>
                                      {work.edition && (
                                        <span className="text-[9px] tracking-widest uppercase bg-[var(--c-eee8dd)] text-[var(--c-161413)] px-1.5 py-0.5"
                                              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                          {t.lili.edition}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-sm font-serif italic text-[var(--c-7b7267)] mt-0.5">
                                      {work.instrumentation}
                                      {work.text && (
                                        <span className="not-italic text-[var(--c-5e564f)]"> · {work.text}</span>
                                      )}
                                    </p>
                                    {work.edition && (
                                      <div className="flex gap-4 mt-2">
                                        {work.edition.pdf && (
                                          <a href={work.edition.pdf} target="_blank" rel="noopener noreferrer"
                                             className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-[var(--c-7b7267)] hover:text-[var(--c-eee8dd)] transition-colors"
                                             style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                            PDF <ExternalLink className="h-2.5 w-2.5" />
                                          </a>
                                        )}
                                        {work.edition.imslp && (
                                          <a href={work.edition.imslp} target="_blank" rel="noopener noreferrer"
                                             className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-[var(--c-7b7267)] hover:text-[var(--c-eee8dd)] transition-colors"
                                             style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                            IMSLP <ExternalLink className="h-2.5 w-2.5" />
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
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
            <div className="flex-none border-t border-[var(--c-2f2c28)] px-5 sm:px-8 py-3 text-center">
              <p className="text-xs font-serif italic text-[var(--c-5e564f)]">
                {t.lili.footer}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
