import { motion } from "motion/react";
import { Music, Clock, Calendar, Headphones, Award } from "lucide-react";
import { useState } from "react";
import { PerchedDeco } from "./PerchedDeco";
import { CatSitting, MusicalNotes, BirdOnBranch } from "./Deco";

const cardPerches = [
  { Deco: CatSitting,   className: "absolute -top-[34px] right-5 w-9 h-9",  idle: "sway"  as const },
  { Deco: BirdOnBranch, className: "absolute -top-[30px] right-4 w-12 h-8", idle: "bob"   as const },
  { Deco: MusicalNotes, className: "absolute -top-6 left-6 w-9 h-6",        idle: "bob"   as const },
];

export type CompositionCategory =
  | "Large Ensemble"
  | "Chamber Music"
  | "Piano Solo"
  | "Voice & Piano";

export interface Composition {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  duration: string;
  description: string;
  instrumentation: string[];
  inspired: string;
  category: CompositionCategory;
  /** Relative URL of a streamable audio file (served from /public). */
  audioUrl?: string;
  /** Relative URL of the cover image (served from /public). */
  coverUrl?: string;
  /** Relative URL of a pre-computed peaks.json for waveform rendering. */
  peaksUrl?: string;
  /** Exact duration in seconds, used as a fallback while audio loads. */
  durationSeconds?: number;
  /** Prizes, awards, and other accolades. */
  accolades?: string[];
}

interface CompositionRackProps {
  onCompositionClick: (composition: Composition) => void;
  onViewAllClick: () => void;
}

const compositions: Composition[] = [
  // ── Large Ensemble ──────────────────────────────────────────────────────────
  {
    id: "myrrha",
    title: "Myrrha",
    subtitle: "A Cantata on the Death of Sardanapalus",
    year: "2026",
    duration: "23'08\"",
    durationSeconds: 1387.9,
    category: "Large Ensemble",
    description:
      "A dramatic cantata on the fall of Nineveh. As the city falls to invading forces, the slave Myrrha begs King Sardanapalus to flee with her, while the high priest Bélésis insists he accept his fate rather than live in dishonour. Torn between love and duty, the king orders a great pyre built and chooses to die in the flames rather than be taken by his enemies. Myrrha refuses to leave him, and the two die together as the kingdom burns. First performed in Prague in June 2026.",
    instrumentation: [
      "2 Flutes", "2 Oboes", "2 Clarinets in A", "2 Bassoons",
      "4 Horns", "4 Trumpets", "3 Trombones",
      "3 Timpani", "Cymbals", "Harp",
      "Soprano", "Alto", "Tenor",
      "Violins I", "Violins II", "Violas", "Cellos", "Double Basses",
    ],
    inspired: "Byron's tragedy Sardanapalus.",
    audioUrl: "/music/Myrrha/audio.mp3",
    peaksUrl: "/music/Myrrha/peaks.json",
  },
  {
    id: "mephistopheles",
    title: "Mephistopheles",
    subtitle: "A Cantata on the Story of Faust",
    year: "2025",
    duration: "24'07\"",
    durationSeconds: 1447.97,
    category: "Large Ensemble",
    description:
      "A dramatic cantata after Goethe's Faust, following the pact between the restless scholar and Mephistopheles. Written in January 2025, it alternates aria and chorus in the tradition of the German oratorio, moving through temptation, rapture and reckoning. The harmonic language is late Romantic, with a broader, almost cinematic orchestral colour in the infernal scenes.",
    instrumentation: [
      "Piccolo", "2 Flutes", "2 Oboes", "Cor Anglais",
      "2 Clarinets", "Bass Clarinet", "2 Bassoons", "Sarrusophone",
      "4 Horns", "3 Trumpets", "3 Trombones", "Tuba",
      "Timpani", "Celesta", "2 Harps", "Organ",
      "Soprano", "Alto", "Tenor", "Bass",
      "Violins I", "Violins II", "Violas", "Cellos", "Double Basses",
    ],
    inspired: "Goethe's Faust, Part One, and the tradition of Faustian cantatas from Schumann to Berlioz.",
    accolades: [
      "ICS Composition Competition · 4th place overall",
      "ICS Composition Competition · 1st place in Harmony & Orchestration",
    ],
    audioUrl: "/music/Mephistopheles/audio.mp3",
    coverUrl: "/music/Mephistopheles/cover.png",
    peaksUrl: "/music/Mephistopheles/peaks.json",
  },

  // ── Chamber Music ────────────────────────────────────────────────────────────
  {
    id: "quatuor-no-1",
    title: "Quatuor à cordes No. 1",
    subtitle: "String Quartet",
    year: "2024",
    duration: "18'40\"",
    durationSeconds: 1120,
    category: "Chamber Music",
    description:
      "A single-movement quartet in broad sonata form. An agitated opening, all driving sixteenths and grinding semitones, leads into a lyrical, chorale-like development and a compressed, darker recapitulation. It was a first serious attempt at the medium.",
    instrumentation: ["Violin I", "Violin II", "Viola", "Cello"],
    inspired: "Ravel's Quartet in F and the late quartets of Beethoven.",
  },
  {
    id: "fantaisie",
    title: "Fantaisie",
    subtitle: "For Violin and Piano",
    year: "2024",
    duration: "7'50\"",
    durationSeconds: 470,
    category: "Chamber Music",
    description:
      "A free fantasy in two linked sections. The first is rhapsodic and improvisatory, the violin spinning out long phrases while the piano interrupts and redirects. The second is a strict passacaglia, the same bass line returning seven times under changing harmony.",
    instrumentation: ["Violin", "Piano"],
    inspired: "The solo sonatas of Prokofiev and the chamber music of Bartók.",
  },
  {
    id: "nocturne-flute",
    title: "Nocturne",
    subtitle: "For Flute and Piano",
    year: "2022",
    duration: "5'20\"",
    durationSeconds: 320,
    category: "Chamber Music",
    description:
      "An early work, written during a period of concentrated counterpoint study. The flute carries a long, winding melody in the manner of Fauré, over a piano part that thins from arpeggios to bare, widely spaced notes. One of the few early pieces considered finished rather than abandoned.",
    instrumentation: ["Flute", "Piano"],
    inspired: "Fauré's Fantaisie for flute and Debussy's Syrinx.",
  },

  // ── Piano Solo ──────────────────────────────────────────────────────────────
  {
    id: "quatre-preludes",
    title: "Quatre Préludes",
    subtitle: "For Solo Piano",
    year: "2024",
    duration: "12'30\"",
    durationSeconds: 750,
    category: "Piano Solo",
    description:
      "Four character pieces in contrasting moods: a restless perpetual motion, a quiet nocturne in a remote key, a sardonic scherzo, and a closing passacaille that gathers up material from the other three.",
    instrumentation: ["Piano"],
    inspired: "The keyboard preludes of Chopin and Debussy, and the early harmonic language of Scriabin.",
  },

  // ── Voice & Piano ────────────────────────────────────────────────────────────
  {
    id: "trois-melodies",
    title: "Trois Mélodies",
    subtitle: "For Mezzo-Soprano and Piano",
    year: "2023",
    duration: "9'15\"",
    durationSeconds: 555,
    category: "Voice & Piano",
    description:
      "Three settings of French symbolist poetry on loss, memory and the turning of the seasons. The vocal lines are plain and lyrical; the piano underneath is restless, and often harmonically at odds with the apparent simplicity of the text.",
    instrumentation: ["Mezzo-Soprano", "Piano"],
    inspired: "The mélodies of Fauré, Duparc, and the later songs of Debussy.",
  },
];

// Only these appear in the featured rack on the homepage.
const featuredCompositionIds = ["myrrha", "mephistopheles"];

export { compositions };

export function CompositionRack({ onCompositionClick, onViewAllClick }: CompositionRackProps) {
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
            Featured Works
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black" />
          <p className="mt-4 text-xs tracking-[0.4em] uppercase text-neutral-500"
             style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
            Selected Compositions
          </p>
        </motion.div>

        {isHidden ? (
          <div className="text-center py-16 px-4">
            <Music className="w-6 h-6 mx-auto mb-4 text-neutral-300" />
            <p className="font-serif text-base text-neutral-400 italic">
              Currently compositions are hidden due to maintenance,<br />check back in a few days.
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
                  All Compositions
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
                                    Awarded
                                  </span>
                                </div>
                              )}
                              {composition.audioUrl && (
                                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 text-white">
                                  <Headphones className="w-3 h-3" />
                                  <span className="text-[10px] uppercase tracking-wider"
                                        style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
                                    Listen
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
                                Instrumentation
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {composition.instrumentation.map((inst, i) => (
                                  <span
                                    key={i}
                                    className="text-[11px] font-serif border border-neutral-200 px-1.5 py-0.5 text-neutral-600 bg-neutral-50"
                                  >
                                    {inst}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredId === composition.id ? 1 : 0 }}
                              className="absolute bottom-4 right-4 text-xs font-serif italic text-neutral-400"
                            >
                              Open →
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
