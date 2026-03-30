import { motion } from "motion/react";
import { Music, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import { CardDecoration, LampPost, BirdFlying, GrandPiano, TrebleClefVine, MusicalNotes } from "./Deco";

export interface Composition {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  duration: string;
  description: string;
  instrumentation: string[];
  inspired: string;
}

interface CompositionRackProps {
  onCompositionClick: (composition: Composition) => void;
  onViewAllClick: () => void;
}

const compositions: Composition[] = [
  {
    id: "1",
    title: "Nocturne in D Minor",
    subtitle: "Pour Piano et Violoncelle",
    year: "2024",
    duration: "8'30\"",
    description: "A contemplative piece exploring the dialogue between piano and cello, inspired by moonlit conversations and the quiet intensity of nocturnal introspection. The harmonic language draws from late Romantic traditions while incorporating contemporary modal exploration.",
    instrumentation: ["Piano", "Violoncello"],
    inspired: "Lili Boulanger's 'D'un matin de printemps'"
  },
  {
    id: "2",
    title: "Psalms of Yesterday",
    subtitle: "For Mixed Choir",
    year: "2025",
    duration: "12'15\"",
    description: "A choral work that weaves together ancient psalm texts with modern harmonic progressions. The piece creates a timeless atmosphere through careful voice leading and the exploration of sustained sonorities.",
    instrumentation: ["SATB Choir", "Soprano Solo"],
    inspired: "Lili Boulanger's 'Psaume 24'"
  },
  {
    id: "3",
    title: "Étude Printanière",
    subtitle: "Pour Orchestre",
    year: "2025",
    duration: "6'45\"",
    description: "An orchestral study that captures the awakening of spring through delicate textures and gradually building intensity. The work explores timbral colors and the interplay between solo instruments and full ensemble.",
    instrumentation: ["Full Orchestra", "Solo Flute", "Solo Violin"],
    inspired: "Lili Boulanger's approach to orchestration"
  },
  {
    id: "4",
    title: "Trois Poèmes Sombres",
    subtitle: "Song Cycle",
    year: "2024",
    duration: "15'00\"",
    description: "A song cycle setting three poems exploring themes of loss, memory, and transcendence. The piano accompaniment creates a rich harmonic landscape that supports and enhances the vocal line.",
    instrumentation: ["Mezzo-Soprano", "Piano"],
    inspired: "Lili Boulanger's 'Clairières dans le ciel'"
  },
  {
    id: "5",
    title: "Variations on a Theme",
    subtitle: "Pour Quatuor à Cordes",
    year: "2026",
    duration: "11'20\"",
    description: "A set of variations exploring different aspects of a simple melodic theme. Each variation reveals new harmonic possibilities while maintaining the essential character of the original material.",
    instrumentation: ["String Quartet"],
    inspired: "Formal structures in Boulanger's chamber works"
  },
  {
    id: "6",
    title: "Hymne du Soir",
    subtitle: "For Chamber Ensemble",
    year: "2026",
    duration: "9'30\"",
    description: "An evening hymn for chamber ensemble that explores the transition from day to night through evolving textures and harmonic colors. The piece creates an atmosphere of reflection and peaceful resolution.",
    instrumentation: ["Flute", "Clarinet", "Violin", "Cello", "Piano"],
    inspired: "Lili Boulanger's use of color and atmosphere"
  },
  {
    id: "7",
    title: "Fantaisie Lyrique",
    subtitle: "Pour Harpe et Cordes",
    year: "2025",
    duration: "10'15\"",
    description: "A lyrical fantasy that places the harp at the center of a string tapestry, weaving arpeggiated passages through sustained harmonic fields. The piece draws on impressionist textures while maintaining a clear melodic through-line.",
    instrumentation: ["Harp", "String Orchestra"],
    inspired: "The timbral palette of early 20th-century French music"
  },
  {
    id: "8",
    title: "Messe Brève",
    subtitle: "For Chorus and Organ",
    year: "2026",
    duration: "14'00\"",
    description: "A concise setting of the ordinary of the Mass, blending Renaissance contrapuntal techniques with modern harmonic language. The organ accompaniment ranges from austere to lush, supporting the choral voices through moments of devotion and exaltation.",
    instrumentation: ["SATB Choir", "Organ"],
    inspired: "Lili Boulanger's sacred works"
  }
];

// Featured compositions to display in the rack (8 featured)
const featuredCompositionIds = ["1", "2", "3", "4", "5", "6", "7", "8"];

export { compositions };

export function CompositionRack({ onCompositionClick, onViewAllClick }: CompositionRackProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isHidden = import.meta.env.VITE_HIDE_COMPOSITIONS === "true";

  const featuredCompositions = compositions.filter(c => featuredCompositionIds.includes(c.id));

  return (
    <section className="relative bg-white px-4 pb-5 pt-14">
      {/* Newspaper texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{
             backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 3px), repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)'
           }}>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="relative border-2 sm:border-4 border-black inline-block px-4 py-3 sm:px-8 sm:py-4 bg-white">
            {/* Elaborate decorations */}
            <LampPost className="absolute -top-16 right-4 w-8 h-16 text-neutral-500 pointer-events-none hidden sm:block" />
            <BirdFlying className="absolute -top-10 right-16 w-6 h-3 text-neutral-400 pointer-events-none hidden sm:block" />
            <BirdFlying className="absolute -top-12 right-24 w-4 h-2 text-neutral-300 pointer-events-none -scale-x-100 hidden md:block" />
            <GrandPiano className="absolute -top-10 left-4 w-14 h-10 text-neutral-300 pointer-events-none hidden md:block" />
            <MusicalNotes className="absolute -top-6 left-20 w-8 h-5 text-neutral-200 pointer-events-none hidden md:block" />
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black tracking-tight">
              Featured Compositions
            </h2>
            <div className="h-1 w-full bg-black mt-2"></div>
            <p className="text-lg font-serif italic mt-2">Selected Works</p>
          </div>
        </motion.div>

        {isHidden ? (
          <div className="text-center py-16 px-4">
            <div className="inline-block border-4 border-dashed border-neutral-300 px-10 py-8 bg-neutral-50">
              <Music className="w-8 h-8 mx-auto mb-4 text-neutral-400" />
              <p className="font-serif text-lg text-neutral-500 italic">
                Currently compositions are hidden due to maintenance,<br />check back in a few days.
              </p>
            </div>
          </div>
        ) : (
        <>
        {/* Scrollable rack */}
        <div className="relative">
          {/* View all button */}
          <button
            onClick={onViewAllClick}
            className="absolute -top-12 right-4 border-4 border-black bg-white px-6 py-2 font-serif text-sm font-bold transition-colors flex items-center gap-2 group hover:bg-neutral-200 active:bg-neutral-300"
          >
            <Music className="w-4 h-4" />
            View All Compositions
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
          <div className="overflow-visible py-10">
            <div className="scrollbar-thin overflow-x-auto">
              <div className="flex min-w-max gap-6 px-4 py-4">
              {featuredCompositions.map((composition, index) => (
                <motion.div
                  key={composition.id}
                  initial={{ opacity: 1, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -6, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
                  onHoverStart={() => setHoveredId(composition.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => onCompositionClick(composition)}
                  className="group relative w-64 sm:w-72 md:w-80 cursor-pointer border-2 sm:border-4 border-black bg-white shadow-[4px_4px_0_0_rgb(24_24_24)] sm:shadow-[6px_6px_0_0_rgb(24_24_24)] transition-[transform,box-shadow] hover:shadow-[9px_9px_0_0_rgb(24_24_24)]"
                >
                  {/* Whimsical decoration perched on card */}
                  <CardDecoration index={index} />
                  <div className="relative z-10 p-6">
                    {/* Corner decorations */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-black"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-black"></div>
                    
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white border-4 border-white flex items-center justify-center">
                      <span className="text-2xl font-serif font-bold">{index + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <div className="flex items-start gap-2 mb-2">
                        <Music className="w-6 h-6 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-serif font-bold leading-tight">
                            {composition.title}
                          </h3>
                          <p className="text-sm font-serif italic opacity-80 mt-1">
                            {composition.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="border-t-2 border-black my-4"></div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-serif">{composition.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-serif">{composition.duration}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t-2 border-dashed border-black">
                        <p className="text-xs font-serif uppercase tracking-wide opacity-60 mb-2">
                          Instrumentation
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {composition.instrumentation.map((inst, i) => (
                            <span
                              key={i}
                              className="text-xs font-serif border border-black px-2 py-1 bg-gray-50"
                            >
                              {inst}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Click indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === composition.id ? 1 : 0 }}
                        className="absolute bottom-4 right-4 text-xs font-serif italic opacity-60"
                      >
                        Click to expand →
                      </motion.div>
                    </div>

                    {/* Bottom decorations */}
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-black"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-black"></div>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative separator */}
        <div className="relative mt-8 flex items-center justify-center gap-4">
          <TrebleClefVine className="absolute -left-4 -top-10 w-4 h-10 text-neutral-200 pointer-events-none hidden md:block" />
          <div className="h-0.5 w-32 bg-black"></div>
          <Music className="w-6 h-6" />
          <div className="h-0.5 w-32 bg-black"></div>
        </div>
        </>
        )}
      </div>

      <style>
        {`
          .scrollbar-thin::-webkit-scrollbar {
            height: 8px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #e5e5e5;
            border: 1px solid #000;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #000;
            border: 1px solid #d4d4d4;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #333;
          }
        `}
      </style>
    </section>
  );
}