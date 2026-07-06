import type { Lang } from "./translations";

/**
 * Whether the Dispatches (news) section is published. Shown by default; set
 * VITE_HIDE_DISPATCHES=true in your .env to remove it entirely — the section,
 * its nav entry and its front-page index row all drop out, and the remaining
 * sections renumber themselves so there's no gap.
 */
export const hideDispatches =
  import.meta.env.VITE_HIDE_DISPATCHES === "true";

/** A localized string: one value per language. */
type L = Record<Lang, string>;

interface DispatchSource {
  id: string;
  /** ISO date (YYYY-MM-DD); the column is ordered newest first. */
  date: string;
  monthOnly?: boolean;
  headline: L;
  body: L;
  /** Optional outward link (IMSLP edition, video, ticketing, etc.). */
  href?: string;
  linkLabel?: L;
}

export interface Dispatch {
  id: string;
  date: string;
  monthOnly?: boolean;
  headline: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

/**
 * The news column — short bulletins, most recent first. Add a new entry at the
 * top (or anywhere; they're sorted by date) whenever there's something to
 * report: a premiere, a prize, a new edition.
 */
const source: DispatchSource[] = [
  {
    id: "myrrha-premiere",
    date: "2026-06-01",
    monthOnly: true,
    headline: {
      en: "Myrrha receives its world premiere in Prague",
      fr: "Myrrha créée en première mondiale à Prague",
      de: "Myrrha in Prag uraufgeführt",
    },
    body: {
      en: "The dramatic cantata on the fall of Nineveh — for soloists, chorus and orchestra — was given its first performance in Prague, after Byron's tragedy Sardanapalus.",
      fr: "La cantate dramatique sur la chute de Ninive — pour solistes, chœur et orchestre — a été donnée pour la première fois à Prague, d'après la tragédie Sardanapalus de Byron.",
      de: "Die dramatische Kantate über den Fall von Ninive — für Solisten, Chor und Orchester — erklang zum ersten Mal in Prag, nach Byrons Tragödie Sardanapalus.",
    },
  },
  {
    id: "mephistopheles-ics",
    date: "2025-01-15",
    headline: {
      en: "Mephistopheles honoured at the ICS Composition Competition",
      fr: "Mephistopheles distinguée au concours de composition ICS",
      de: "Mephistopheles beim ICS-Kompositionswettbewerb ausgezeichnet",
    },
    body: {
      en: "The Faust cantata took first place in Harmony & Orchestration and fourth place overall — a late-Romantic score with a broad, cinematic orchestral palette in its infernal scenes.",
      fr: "La cantate faustienne a remporté la première place en harmonie et orchestration et la quatrième au classement général — une partition postromantique à la palette orchestrale ample et cinématographique dans ses scènes infernales.",
      de: "Die Faust-Kantate errang den ersten Platz in Harmonik & Orchestrierung und den vierten in der Gesamtwertung — eine spätromantische Partitur mit breiter, filmischer Orchesterfarbe in ihren Höllenszenen.",
    },
  },
  // Add newer bulletins above this line, e.g.:
  // {
  //   id: "new-edition",
  //   date: "2026-09-01",
  //   headline: { en: "…", fr: "…", de: "…" },
  //   body: { en: "…", fr: "…", de: "…" },
  //   href: "https://imslp.org/…",
  //   linkLabel: { en: "Read the edition", fr: "…", de: "…" },
  // },
];

/** Flatten the column to a single language, newest first. */
export function getDispatches(lang: Lang): Dispatch[] {
  return source
    .map((d) => ({
      id: d.id,
      date: d.date,
      monthOnly: d.monthOnly,
      headline: d.headline[lang],
      body: d.body[lang],
      href: d.href,
      linkLabel: d.linkLabel ? d.linkLabel[lang] : undefined,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
