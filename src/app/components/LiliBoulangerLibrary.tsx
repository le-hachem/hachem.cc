import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { X, Music2, Calendar, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface LibraryWork {
  title: string;
  year: string;
  instrumentation: string;
  duration?: string;
  /** If set, this edition has been completed */
  edition?: {
    imslp: string;
    pdf: string;
  };
}

interface LiliBoulangerLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

const liliBoulangerWorks: LibraryWork[] = [
  {
    title: "Pièce",
    year: "1910",
    instrumentation: "Piano",
    duration: "2'",
    edition: {
      imslp: "https://imslp.org/wiki/Pi%C3%A8ce_(Boulanger,_Lili)",
      pdf: "https://ks15.imslp.org/files/imglnks/usimg/6/6f/IMSLP975917-PMLP1475962-Piece_-_Full_Score_(2025_Hachem).pdf",
    },
  },
  {
    title: "Attente",
    year: "1910",
    instrumentation: "Voice and Piano",
    duration: "3'",
    edition: {
      imslp: "https://imslp.org/wiki/Attente_(Boulanger,_Lili)",
      pdf: "https://s9.imslp.org/files/imglnks/usimg/c/cc/IMSLP974938-PMLP707817-Attente_-_Full_Score_(2025_Hachem).pdf",
    },
  },
  {
    title: "Nocturne",
    year: "1911",
    instrumentation: "Violin and Piano",
    duration: "3'",
  },
  {
    title: "Faust et Hélène",
    year: "1913",
    instrumentation: "Soloists, Choir, Orchestra",
    duration: "45'",
  },
  {
    title: "Clairières dans le ciel",
    year: "1913-1914",
    instrumentation: "Voice and Piano",
    duration: "30'",
  },
  {
    title: "Trois morceaux pour piano",
    year: "1914",
    instrumentation: "Piano",
    duration: "8'",
  },
  {
    title: "Cortège",
    year: "1914",
    instrumentation: "Violin/Flute and Piano",
    duration: "4'",
  },
  {
    title: "Psalms 24, 129, and 130",
    year: "1916-1918",
    instrumentation: "Choir, Orchestra, Organ",
    duration: "Various",
  },
  {
    title: "Vieille prière bouddhique",
    year: "1917",
    instrumentation: "Choir, Orchestra",
    duration: "12'",
  },
  {
    title: "D'un matin de printemps",
    year: "1917-1918",
    instrumentation: "Violin/Flute and Piano",
    duration: "5'",
  },
  {
    title: "D'un soir triste",
    year: "1917-1918",
    instrumentation: "Violin/Cello and Piano",
    duration: "6'",
  },
  {
    title: "La Princesse Maleine",
    year: "1911-1918",
    instrumentation: "Opera (incomplete)",
    duration: "—",
  },
];

const paperTint = "bg-neutral-100";

export function LiliBoulangerLibrary({ isOpen, onClose }: LiliBoulangerLibraryProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lili-library-overlay"
          className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto overflow-x-hidden px-2 py-4 sm:p-6 sm:pt-12"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-neutral-900/45"
            aria-hidden
            role="presentation"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 mb-4 mt-2 sm:mb-8 sm:mt-4 w-full max-w-4xl"
            initial={{ scale: 0.985, y: 12, opacity: 1 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.985, y: 8, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 380 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative isolate border-4 sm:border-8 border-black bg-white shadow-[4px_4px_0_0_rgb(24_24_24)] sm:shadow-[10px_10px_0_0_rgb(24_24_24)]">

            {/* Close button */}
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
                  <Music2 className="w-7 h-7 sm:w-10 sm:h-10 shrink-0" />
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black uppercase">
                      Lili Boulanger
                    </h2>
                    <p className="text-sm sm:text-lg font-serif italic mt-1">Works Catalogue &amp; Restored Editions</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-serif border-t-2 border-black pt-4">
                  1893 – 1918 · First woman to win the Prix de Rome
                </p>
              </div>

              {/* Library grid */}
              <div className="space-y-3 max-h-[60vh] overflow-y-auto p-2">
                {liliBoulangerWorks.map((work, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 8, backgroundColor: "#e5e5e5" }}
                    className={`border-4 border-black p-4 relative group ${work.edition ? "bg-neutral-50" : "bg-white"}`}
                  >
                    {/* Number indicator */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-serif font-bold border-2 border-white">
                      {index + 1}
                    </div>

                    <div className="pl-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold inline">
                            {work.title}
                          </h3>
                          {work.edition && (
                            <span className="ml-2 inline-block border-2 border-black bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider align-middle">
                              New Edition
                            </span>
                          )}
                        </div>
                        {work.duration && (
                          <span className="text-sm font-serif border-2 border-black bg-neutral-200 px-2 py-1">
                            {work.duration}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-serif font-bold">{work.year}</span>
                        </div>
                        <div className="flex-1">
                          <span className="font-serif italic opacity-70">{work.instrumentation}</span>
                        </div>
                      </div>

                      {/* Edition links */}
                      {work.edition && (
                        <div className="mt-3 flex gap-2 border-t-2 border-dashed border-black pt-3">
                          <a
                            href={work.edition.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-neutral-200 active:bg-neutral-300"
                          >
                            PDF
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <a
                            href={work.edition.imslp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border-2 border-black bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors hover:bg-neutral-800"
                          >
                            IMSLP
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t-4 border-black text-center">
                <p className="text-sm font-serif italic opacity-60">
                  More editions in progress — the library continues to grow.
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
