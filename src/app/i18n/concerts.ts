import type { Lang } from "./translations";

/**
 * Whether past concerts are shown. Hidden by default so the diary always leads
 * with what's coming up; flip to `true` (or set VITE_SHOW_PAST_CONCERTS=true in
 * your .env) to publish the archive of past dates as well.
 */
export const showPastConcerts =
  import.meta.env.VITE_SHOW_PAST_CONCERTS === "true";

/** A localized string: one value per language. */
type L = Record<Lang, string>;

/** The hat worn at a given date — rendered from a localized label. */
export type ConcertRole = "composer" | "pianist" | "conductor";

interface ConcertSource {
  id: string;
  /**
   * ISO date (YYYY-MM-DD), used both to sort and to decide upcoming vs. past.
   * When only the month is known, use the 1st and set `monthOnly` so the date
   * renders as e.g. "June 2026" instead of a spurious day.
   */
  date: string;
  monthOnly?: boolean;
  city: L;
  venue?: L;
  role: ConcertRole;
  /** Optional event title, when it is distinct from the works on the programme. */
  title?: L;
  /** What's on the programme — usually the work(s) performed. */
  program: L;
  /** Optional tag, e.g. "World premiere". */
  note?: L;
  /** External ticketing / event link. */
  ticketUrl?: string;
}

export interface Concert {
  id: string;
  date: string;
  monthOnly?: boolean;
  city: string;
  venue?: string;
  role: ConcertRole;
  title?: string;
  program: string;
  note?: string;
  ticketUrl?: string;
}

/**
 * The concert diary. Add new dates here — the Agenda section splits them into
 * "Upcoming" and "Past" automatically by comparing `date` to today, so nothing
 * needs to be moved as events pass.
 */
const source: ConcertSource[] = [
  {
    id: "counterpoint-lecture-brussels-2026",
    date: "2026-06-29",
    city: { en: "Brussels", fr: "Bruxelles", de: "Brüssel" },
    venue: {
      en: "Royal Conservatory of Brussels",
      fr: "Conservatoire royal de Bruxelles",
      de: "Königliches Konservatorium Brüssel",
    },
    role: "composer",
    program: {
      en: "Lecture on Counterpoint",
      fr: "Conférence sur le contrepoint",
      de: "Vortrag über Kontrapunkt",
    },
    note: {
      en: "Guest lecture",
      fr: "Conférence invitée",
      de: "Gastvortrag",
    },
  },

  {
    id: "myrrha-prague-2026",
    date: "2026-06-01",
    city: { en: "Prague", fr: "Prague", de: "Prag" },
    role: "composer",
    program: {
      en: "Myrrha — A Cantata on the Death of Sardanapalus",
      fr: "Myrrha — Cantate sur la mort de Sardanapale",
      de: "Myrrha — Kantate über den Tod des Sardanapal",
    },
    note: {
      en: "World premiere",
      fr: "Création mondiale",
      de: "Uraufführung",
    },
  },

  {
    id: "mantis-masterclass-brussels-2026",
    date: "2026-05-21",
    city: { en: "Brussels", fr: "Bruxelles", de: "Brüssel" },
    role: "pianist",
    program: {
      en: "Masterclass on the Praying Mantis technique; Brahms — Intermezzo No. 2; Liszt — Gnomenreigen",
      fr: "Masterclasse sur la technique « Praying Mantis » ; Brahms — Intermezzo n° 2 ; Liszt — Gnomenreigen",
      de: "Meisterkurs über die »Praying Mantis«-Technik; Brahms — Intermezzo Nr. 2; Liszt — Gnomenreigen",
    },
    note: {
      en: "Masterclass",
      fr: "Masterclasse",
      de: "Meisterkurs",
    },
  },

  {
    id: "ravel-sorbonne-2026",
    date: "2026-05-19",
    city: { en: "Paris", fr: "Paris", de: "Paris" },
    venue: {
      en: "Sorbonne Hall of Music",
      fr: "Salle de musique de la Sorbonne",
      de: "Musiksaal der Sorbonne",
    },
    role: "pianist",
    program: {
      en: "Ravel — Rapsodie espagnole",
      fr: "Ravel — Rapsodie espagnole",
      de: "Ravel — Rapsodie espagnole",
    },
    note: {
      en: "Recital",
      fr: "Récital",
      de: "Klavierabend",
    },
  },

  {
    id: "recital-brussels-2026",
    date: "2026-05-02",
    city: { en: "Brussels", fr: "Bruxelles", de: "Brüssel" },
    role: "pianist",
    program: {
      en: "Mendelssohn — A Midsummer Night's Dream; Piano Concerto for Two Pianos (arrangement)",
      fr: "Mendelssohn — Le Songe d'une nuit d'été ; Concerto pour deux pianos (arrangement)",
      de: "Mendelssohn — Ein Sommernachtstraum; Konzert für zwei Klaviere (Bearbeitung)",
    },
    note: {
      en: "Recital",
      fr: "Récital",
      de: "Klavierabend",
    },
  },

  {
    id: "mephistopheles-prague-2026",
    date: "2026-04-17",
    city: { en: "Prague", fr: "Prague", de: "Prag" },
    role: "composer",
    program: {
      en: "Mephistopheles",
      fr: "Méphistophélès",
      de: "Mephistopheles",
    },
    note: {
      en: "Prize-winning work",
      fr: "Œuvre primée",
      de: "Preisgekröntes Werk",
    },
  },

  {
    id: "paris-conservatoire-recital-2026",
    date: "2026-03-26",
    city: { en: "Paris", fr: "Paris", de: "Paris" },
    venue: {
      en: "Paris Conservatoire",
      fr: "Conservatoire de Paris",
      de: "Pariser Konservatorium",
    },
    role: "pianist",
    title: { en: "Recital", fr: "Récital", de: "Klavierabend" },
    program: {
      en: "Alkan — Les Preux; Sibelius Op. 76 No. 2; Chopin — Prelude Op. 28 No. 16; Ravel — Le Tombeau de Couperin",
      fr: "Alkan — Les Preux ; Sibelius op. 76 n° 2 ; Chopin — Prélude op. 28 n° 16 ; Ravel — Le Tombeau de Couperin",
      de: "Alkan — Les Preux; Sibelius op. 76 Nr. 2; Chopin — Präludium op. 28 Nr. 16; Ravel — Le Tombeau de Couperin",
    },
  },
];

/** Flatten the diary to a single language. */
export function getConcerts(lang: Lang): Concert[] {
  return source.map((c) => ({
    id: c.id,
    date: c.date,
    monthOnly: c.monthOnly,
    city: c.city[lang],
    venue: c.venue ? c.venue[lang] : undefined,
    role: c.role,
    title: c.title ? c.title[lang] : undefined,
    program: c.program[lang],
    note: c.note ? c.note[lang] : undefined,
    ticketUrl: c.ticketUrl,
  }));
}
