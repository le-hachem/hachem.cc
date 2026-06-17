import type { Lang, CompositionCategory } from "./translations";

export type { CompositionCategory };

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

/** A localized string: same value per language. */
type L = Record<Lang, string>;

interface CompositionSource {
  id: string;
  title: string;
  subtitle: L;
  year: string;
  duration: string;
  durationSeconds?: number;
  category: CompositionCategory;
  description: L;
  /** Instrumentation is stored as English tokens, translated at render time. */
  instrumentation: string[];
  inspired: L;
  audioUrl?: string;
  coverUrl?: string;
  peaksUrl?: string;
  accolades?: Record<Lang, string[]>;
}

const source: CompositionSource[] = [
  // ── Large Ensemble ──────────────────────────────────────────────
  {
    id: "myrrha",
    title: "Myrrha",
    subtitle: {
      en: "A Cantata on the Death of Sardanapalus",
      fr: "Cantate sur la mort de Sardanapale",
      de: "Kantate über den Tod des Sardanapal",
    },
    year: "2026",
    duration: "23'08\"",
    durationSeconds: 1387.9,
    category: "Large Ensemble",
    description: {
      en: "A dramatic cantata on the fall of Nineveh. As the city falls to invading forces, the slave Myrrha begs King Sardanapalus to flee with her, while the high priest Bélésis insists he accept his fate rather than live in dishonour. Torn between love and duty, the king orders a great pyre built and chooses to die in the flames rather than be taken by his enemies. Myrrha refuses to leave him, and the two die together as the kingdom burns. First performed in Prague in June 2026.",
      fr: "Cantate dramatique sur la chute de Ninive. Tandis que la ville tombe aux mains des envahisseurs, l'esclave Myrrha supplie le roi Sardanapale de fuir avec elle, alors que le grand prêtre Bélésis le presse d'accepter son destin plutôt que de vivre dans le déshonneur. Déchiré entre l'amour et le devoir, le roi fait dresser un grand bûcher et choisit de périr dans les flammes plutôt que d'être livré à ses ennemis. Myrrha refuse de le quitter, et tous deux meurent ensemble tandis que le royaume brûle. Créée à Prague en juin 2026.",
      de: "Eine dramatische Kantate über den Fall von Ninive. Während die Stadt den Invasoren anheimfällt, fleht die Sklavin Myrrha König Sardanapal an, mit ihr zu fliehen, während der Hohepriester Bélésis darauf besteht, dass er sein Schicksal annimmt, statt in Schande weiterzuleben. Zwischen Liebe und Pflicht zerrissen, lässt der König einen gewaltigen Scheiterhaufen errichten und wählt den Tod in den Flammen, statt seinen Feinden in die Hände zu fallen. Myrrha weigert sich, ihn zu verlassen, und beide sterben gemeinsam, während das Königreich brennt. Uraufgeführt in Prag im Juni 2026.",
    },
    instrumentation: [
      "2 Flutes", "2 Oboes", "2 Clarinets in A", "2 Bassoons",
      "4 Horns", "4 Trumpets", "3 Trombones",
      "3 Timpani", "Cymbals", "Harp",
      "Soprano", "Alto", "Tenor",
      "Violins I", "Violins II", "Violas", "Cellos", "Double Basses",
    ],
    inspired: {
      en: "Byron's tragedy Sardanapalus.",
      fr: "La tragédie Sardanapalus de Byron.",
      de: "Byrons Tragödie Sardanapalus.",
    },
    audioUrl: "/music/Myrrha/audio.mp3",
    peaksUrl: "/music/Myrrha/peaks.json",
  },
  {
    id: "mephistopheles",
    title: "Mephistopheles",
    subtitle: {
      en: "A Cantata on the Story of Faust",
      fr: "Cantate sur l'histoire de Faust",
      de: "Kantate über die Geschichte von Faust",
    },
    year: "2025",
    duration: "24'07\"",
    durationSeconds: 1447.97,
    category: "Large Ensemble",
    description: {
      en: "A dramatic cantata after Goethe's Faust, following the pact between the restless scholar and Mephistopheles. Written in January 2025, it alternates aria and chorus in the tradition of the German oratorio, moving through temptation, rapture and reckoning. The harmonic language is late Romantic, with a broader, almost cinematic orchestral colour in the infernal scenes.",
      fr: "Cantate dramatique d'après le Faust de Goethe, retraçant le pacte entre le savant tourmenté et Méphistophélès. Composée en janvier 2025, elle alterne airs et chœurs dans la tradition de l'oratorio allemand, traversant la tentation, l'extase et le jugement. Le langage harmonique est postromantique, avec une couleur orchestrale plus ample, presque cinématographique, dans les scènes infernales.",
      de: "Eine dramatische Kantate nach Goethes Faust, die den Pakt zwischen dem ruhelosen Gelehrten und Mephistopheles verfolgt. Im Januar 2025 geschrieben, wechselt sie zwischen Arie und Chor in der Tradition des deutschen Oratoriums und durchschreitet Versuchung, Verzückung und Abrechnung. Die harmonische Sprache ist spätromantisch, mit einer breiteren, fast filmischen Orchesterfarbe in den Höllenszenen.",
    },
    instrumentation: [
      "Piccolo", "2 Flutes", "2 Oboes", "Cor Anglais",
      "2 Clarinets", "Bass Clarinet", "2 Bassoons", "Sarrusophone",
      "4 Horns", "3 Trumpets", "3 Trombones", "Tuba",
      "Timpani", "Celesta", "2 Harps", "Organ",
      "Soprano", "Alto", "Tenor", "Bass",
      "Violins I", "Violins II", "Violas", "Cellos", "Double Basses",
    ],
    inspired: {
      en: "Goethe's Faust, Part One, and the tradition of Faustian cantatas from Schumann to Berlioz.",
      fr: "Le Faust de Goethe (première partie) et la tradition des cantates faustiennes, de Schumann à Berlioz.",
      de: "Goethes Faust (erster Teil) und die Tradition der Faust-Kantaten, von Schumann bis Berlioz.",
    },
    accolades: {
      en: [
        "ICS Composition Competition · 4th place overall",
        "ICS Composition Competition · 1st place in Harmony & Orchestration",
      ],
      fr: [
        "Concours de composition ICS · 4ᵉ place au classement général",
        "Concours de composition ICS · 1ʳᵉ place en harmonie et orchestration",
      ],
      de: [
        "ICS-Kompositionswettbewerb · 4. Platz in der Gesamtwertung",
        "ICS-Kompositionswettbewerb · 1. Platz in Harmonik & Orchestrierung",
      ],
    },
    audioUrl: "/music/Mephistopheles/audio.mp3",
    coverUrl: "/music/Mephistopheles/cover.png",
    peaksUrl: "/music/Mephistopheles/peaks.json",
  },

  // ── Chamber Music ───────────────────────────────────────────────
  {
    id: "quatuor-no-1",
    title: "Quatuor à cordes No. 1",
    subtitle: { en: "String Quartet", fr: "Quatuor à cordes", de: "Streichquartett" },
    year: "2024",
    duration: "18'40\"",
    durationSeconds: 1120,
    category: "Chamber Music",
    description: {
      en: "A single-movement quartet in broad sonata form. An agitated opening, all driving sixteenths and grinding semitones, leads into a lyrical, chorale-like development and a compressed, darker recapitulation. It was a first serious attempt at the medium.",
      fr: "Quatuor en un seul mouvement, de forme sonate ample. Une ouverture agitée, tout en doubles croches martelées et demi-tons grinçants, conduit à un développement lyrique, presque choral, puis à une réexposition resserrée et plus sombre. C'était une première tentative sérieuse dans le genre.",
      de: "Ein einsätziges Quartett in weit gespannter Sonatenform. Eine erregte Eröffnung – ganz aus treibenden Sechzehnteln und reibenden Halbtönen – führt zu einer lyrischen, choralartigen Durchführung und einer gedrängten, dunkleren Reprise. Es war ein erster ernsthafter Versuch in dieser Gattung.",
    },
    instrumentation: ["Violin I", "Violin II", "Viola", "Cello"],
    inspired: {
      en: "Ravel's Quartet in F and the late quartets of Beethoven.",
      fr: "Le Quatuor en fa de Ravel et les derniers quatuors de Beethoven.",
      de: "Ravels Quartett in F und die späten Quartette Beethovens.",
    },
  },
  {
    id: "fantaisie",
    title: "Fantaisie",
    subtitle: { en: "For Violin and Piano", fr: "Pour violon et piano", de: "Für Violine und Klavier" },
    year: "2024",
    duration: "7'50\"",
    durationSeconds: 470,
    category: "Chamber Music",
    description: {
      en: "A free fantasy in two linked sections. The first is rhapsodic and improvisatory, the violin spinning out long phrases while the piano interrupts and redirects. The second is a strict passacaglia, the same bass line returning seven times under changing harmony.",
      fr: "Fantaisie libre en deux sections enchaînées. La première, rhapsodique et improvisée, voit le violon dérouler de longues phrases que le piano interrompt et réoriente. La seconde est une passacaille rigoureuse, la même basse revenant sept fois sous une harmonie changeante.",
      de: "Eine freie Fantasie in zwei verbundenen Abschnitten. Der erste ist rhapsodisch und improvisatorisch: Die Violine spinnt lange Phrasen, während das Klavier unterbricht und umlenkt. Der zweite ist eine strenge Passacaglia, in der dieselbe Basslinie siebenmal unter wechselnder Harmonie wiederkehrt.",
    },
    instrumentation: ["Violin", "Piano"],
    inspired: {
      en: "The solo sonatas of Prokofiev and the chamber music of Bartók.",
      fr: "Les sonates pour instrument seul de Prokofiev et la musique de chambre de Bartók.",
      de: "Die Solosonaten Prokofjews und die Kammermusik Bartóks.",
    },
  },
  {
    id: "nocturne-flute",
    title: "Nocturne",
    subtitle: { en: "For Flute and Piano", fr: "Pour flûte et piano", de: "Für Flöte und Klavier" },
    year: "2022",
    duration: "5'20\"",
    durationSeconds: 320,
    category: "Chamber Music",
    description: {
      en: "An early work, written during a period of concentrated counterpoint study. The flute carries a long, winding melody in the manner of Fauré, over a piano part that thins from arpeggios to bare, widely spaced notes. One of the few early pieces considered finished rather than abandoned.",
      fr: "Œuvre de jeunesse, écrite durant une période d'étude intensive du contrepoint. La flûte porte une longue mélodie sinueuse à la manière de Fauré, sur une partie de piano qui s'éclaircit, des arpèges jusqu'à des notes nues et largement espacées. L'une des rares pièces de jeunesse jugée achevée plutôt qu'abandonnée.",
      de: "Ein frühes Werk, entstanden in einer Phase intensiven Kontrapunktstudiums. Die Flöte trägt eine lange, gewundene Melodie in der Art Faurés über einem Klavierpart, der sich von Arpeggien zu kahlen, weit gespreizten Tönen lichtet. Eines der wenigen frühen Stücke, das als vollendet statt als aufgegeben gilt.",
    },
    instrumentation: ["Flute", "Piano"],
    inspired: {
      en: "Fauré's Fantaisie for flute and Debussy's Syrinx.",
      fr: "La Fantaisie pour flûte de Fauré et Syrinx de Debussy.",
      de: "Faurés Fantaisie für Flöte und Debussys Syrinx.",
    },
  },

  // ── Piano Solo ──────────────────────────────────────────────────
  {
    id: "quatre-preludes",
    title: "Quatre Préludes",
    subtitle: { en: "For Solo Piano", fr: "Pour piano seul", de: "Für Klavier solo" },
    year: "2024",
    duration: "12'30\"",
    durationSeconds: 750,
    category: "Piano Solo",
    description: {
      en: "Four character pieces in contrasting moods: a restless perpetual motion, a quiet nocturne in a remote key, a sardonic scherzo, and a closing passacaille that gathers up material from the other three.",
      fr: "Quatre pièces de caractère aux atmosphères contrastées : un mouvement perpétuel fébrile, un nocturne paisible dans une tonalité lointaine, un scherzo sardonique, et une passacaille finale qui rassemble le matériau des trois autres.",
      de: "Vier Charakterstücke in kontrastierenden Stimmungen: ein ruheloses Perpetuum mobile, ein stilles Nocturne in entlegener Tonart, ein sardonisches Scherzo und eine abschließende Passacaille, die das Material der anderen drei aufgreift.",
    },
    instrumentation: ["Piano"],
    inspired: {
      en: "The keyboard preludes of Chopin and Debussy, and the early harmonic language of Scriabin.",
      fr: "Les préludes pour clavier de Chopin et de Debussy, et le premier langage harmonique de Scriabine.",
      de: "Die Klavierpräludien von Chopin und Debussy und die frühe harmonische Sprache Skrjabins.",
    },
  },

  // ── Voice & Piano ───────────────────────────────────────────────
  {
    id: "trois-melodies",
    title: "Trois Mélodies",
    subtitle: { en: "For Mezzo-Soprano and Piano", fr: "Pour mezzo-soprano et piano", de: "Für Mezzosopran und Klavier" },
    year: "2023",
    duration: "9'15\"",
    durationSeconds: 555,
    category: "Voice & Piano",
    description: {
      en: "Three settings of French symbolist poetry on loss, memory and the turning of the seasons. The vocal lines are plain and lyrical; the piano underneath is restless, and often harmonically at odds with the apparent simplicity of the text.",
      fr: "Trois mélodies sur des poèmes symbolistes français, autour de la perte, du souvenir et du passage des saisons. Les lignes vocales sont simples et lyriques ; au-dessous, le piano est inquiet, souvent en désaccord harmonique avec la simplicité apparente du texte.",
      de: "Drei Vertonungen französischer symbolistischer Dichtung über Verlust, Erinnerung und den Wechsel der Jahreszeiten. Die Gesangslinien sind schlicht und lyrisch; das Klavier darunter ist ruhelos und steht harmonisch oft im Widerspruch zur scheinbaren Schlichtheit des Textes.",
    },
    instrumentation: ["Mezzo-Soprano", "Piano"],
    inspired: {
      en: "The mélodies of Fauré, Duparc, and the later songs of Debussy.",
      fr: "Les mélodies de Fauré, de Duparc et les dernières mélodies de Debussy.",
      de: "Die Mélodies von Fauré, Duparc und die späten Lieder Debussys.",
    },
  },
];

/** Only these appear in the featured rack on the homepage. */
export const featuredCompositionIds = ["myrrha", "mephistopheles"];

/** Build the composition list flattened to a single language. */
export function getCompositions(lang: Lang): Composition[] {
  return source.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.subtitle[lang],
    year: c.year,
    duration: c.duration,
    durationSeconds: c.durationSeconds,
    category: c.category,
    description: c.description[lang],
    instrumentation: c.instrumentation,
    inspired: c.inspired[lang],
    audioUrl: c.audioUrl,
    coverUrl: c.coverUrl,
    peaksUrl: c.peaksUrl,
    accolades: c.accolades ? c.accolades[lang] : undefined,
  }));
}
