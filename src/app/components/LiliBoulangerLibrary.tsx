import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type Category = "All" | "Piano" | "Chamber" | "Voice" | "Choral";

interface LibraryWork {
  title: string;
  year: string;
  instrumentation: string;
  text?: string;
  category: Category;
  edition?: { imslp: string; pdf: string };
}

interface LiliBoulangerLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

const works: LibraryWork[] = [
  { title: "Prélude",                         year: "1911", instrumentation: "Piano",                                               category: "Piano" },
  { title: "Sous bois",                        year: "1911", instrumentation: "Choir (SATB) and piano",                               category: "Choral",  text: "Philippe Gille" },
  { title: "Nocturne",                         year: "1911", instrumentation: "Violin and piano",                                     category: "Chamber" },
  { title: "Renouveau",                        year: "1911", instrumentation: "Vocal quartet (SATT) and piano/orchestra",              category: "Choral",  text: "Armand Silvestre" },
  { title: "Les sirènes",                      year: "1911", instrumentation: "Soprano, chorus and piano",                            category: "Choral",  text: "Charles Grandmougin" },
  { title: "Reflets",                          year: "1911", instrumentation: "Voice and piano",                                      category: "Voice",   text: "Maurice Maeterlinck" },
  {
    title: "Attente",                          year: "1912", instrumentation: "Voice and piano/orchestra",                            category: "Voice",   text: "Maurice Maeterlinck",
    edition: { imslp: "https://imslp.org/wiki/Attente_(Boulanger,_Lili)", pdf: "https://s9.imslp.org/files/imglnks/usimg/c/cc/IMSLP974938-PMLP707817-Attente_-_Full_Score_(2025_Hachem).pdf" },
  },
  { title: "Hymne au Soleil",                  year: "1912", instrumentation: "Contralto, chorus and piano",                          category: "Choral",  text: "Casimir Delavigne" },
  { title: "Le Retour",                        year: "1912", instrumentation: "Voice and piano",                                      category: "Voice",   text: "Georges Delaquys" },
  { title: "Pour les funérailles d'un soldat", year: "1912", instrumentation: "Baritone, chorus and piano",                           category: "Choral",  text: "Alfred de Musset" },
  { title: "Soir sur la plaine",               year: "1913", instrumentation: "Soprano, tenor and orchestra",                         category: "Choral",  text: "Albert Samain" },
  { title: "Faust et Hélène",                  year: "1913", instrumentation: "Mezzo-soprano, tenor, baritone, chorus and orchestra", category: "Choral",  text: "Eugène Adenis" },
  { title: "D'un jardin clair",                year: "1914", instrumentation: "Piano",                                               category: "Piano" },
  { title: "D'un vieux jardin",                year: "1914", instrumentation: "Piano",                                               category: "Piano" },
  { title: "Cortège",                          year: "1914", instrumentation: "Violin and piano",                                     category: "Chamber" },
  { title: "Clairières dans le ciel",          year: "1914", instrumentation: "Voice and piano",                                      category: "Voice",   text: "Francis Jammes" },
  {
    title: "Pièce",                            year: "c. 1910", instrumentation: "Piano",                                            category: "Piano",
    edition: { imslp: "https://imslp.org/wiki/Pi%C3%A8ce_(Boulanger,_Lili)", pdf: "https://ks15.imslp.org/files/imglnks/usimg/6/6f/IMSLP975917-PMLP1475962-Piece_-_Full_Score_(2025_Hachem).pdf" },
  },
  { title: "Psaume 24",                        year: "1916", instrumentation: "Chorus, organ and orchestra",                          category: "Choral",  text: "Psalm 24" },
  { title: "Psaume 129",                       year: "1916", instrumentation: "Baritone and orchestra",                               category: "Choral",  text: "Psalm 129" },
  { title: "Dans l'immense tristesse",         year: "1916", instrumentation: "Voice and piano",                                      category: "Voice",   text: "Bertha Galeron de Calonne" },
  { title: "Psaume 130",                       year: "1917", instrumentation: "Two solo voices, chorus, organ and orchestra",         category: "Choral",  text: "Psalm 130" },
  { title: "Vieille prière bouddhique",        year: "1917", instrumentation: "Tenor, chorus and orchestra",                         category: "Choral",  text: "Extract from the Metta Sutta" },
  { title: "D'un matin de printemps",          year: "1918", instrumentation: "Violin and piano",                                    category: "Chamber" },
  { title: "Pie Jesu",                         year: "1918", instrumentation: "Voice, string quartet, harp and organ",               category: "Chamber", text: "Tridentine Missal" },
  { title: "D'un soir triste",                 year: "1918", instrumentation: "Orchestra",                                           category: "Chamber" },
];

const categoryOrder: Category[] = ["Piano", "Chamber", "Voice", "Choral"];

const categoryDescriptions: Record<Category, string> = {
  All:     "Complete catalogue",
  Piano:   "Solo piano works",
  Chamber: "Chamber & instrumental",
  Voice:   "Songs for voice",
  Choral:  "Choral & orchestral",
};

export function LiliBoulangerLibrary({ isOpen, onClose }: LiliBoulangerLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setActiveCategory("All");
  }, [isOpen]);

  const editionCount = works.filter(w => w.edition).length;
  const populated = categoryOrder.filter(cat => works.some(w => w.category === cat));
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
                    Lili Boulanger
                  </h2>
                  <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mt-1"
                     style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                    1893 – 1918 · {works.length} works · {editionCount} restored editions
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
                  {(["All", ...populated] as Category[]).map(cat => {
                    const count = cat === "All" ? works.length : works.filter(w => w.category === cat).length;
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-3 py-2.5 transition-colors duration-150 border-l-2 ${
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
                {/* Mobile tabs */}
                <div className="sm:hidden flex gap-1.5 px-5 py-3 border-b border-neutral-100 overflow-x-auto">
                  {(["All", ...populated] as Category[]).map(cat => (
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
                              <motion.div
                                key={work.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: i * 0.025 }}
                                className="border-b border-neutral-100 px-5 sm:px-6 py-4 hover:bg-neutral-50 transition-colors"
                              >
                                <div className="flex items-start gap-4">
                                  {/* Year */}
                                  <span className="shrink-0 text-[10px] tracking-wider text-neutral-400 pt-0.5 w-12"
                                        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                    {work.year}
                                  </span>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                      <h3 className="font-serif font-bold text-base text-neutral-900">
                                        {work.title}
                                      </h3>
                                      {work.edition && (
                                        <span className="text-[9px] tracking-widest uppercase bg-black text-white px-1.5 py-0.5"
                                              style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                          Edition
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-sm font-serif italic text-neutral-500 mt-0.5">
                                      {work.instrumentation}
                                      {work.text && (
                                        <span className="not-italic text-neutral-400"> · {work.text}</span>
                                      )}
                                    </p>
                                    {work.edition && (
                                      <div className="flex gap-4 mt-2">
                                        <a href={work.edition.pdf} target="_blank" rel="noopener noreferrer"
                                           className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
                                           style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                          PDF <ExternalLink className="h-2.5 w-2.5" />
                                        </a>
                                        <a href={work.edition.imslp} target="_blank" rel="noopener noreferrer"
                                           className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-neutral-500 hover:text-black transition-colors"
                                           style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                          IMSLP <ExternalLink className="h-2.5 w-2.5" />
                                        </a>
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
            <div className="flex-none border-t border-neutral-200 px-5 sm:px-8 py-3 text-center">
              <p className="text-xs font-serif italic text-neutral-400">
                More editions in progress — the library continues to grow.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
