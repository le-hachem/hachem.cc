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
    id: "myrrha-prague-2026",
    date: "2026-06-01",
    monthOnly: true,
    city: { en: "Prague", fr: "Prague", de: "Prag" },
    role: "composer",
    program: {
      en: "Myrrha — A Cantata on the Death of Sardanapalus",
      fr: "Myrrha — Cantate sur la mort de Sardanapale",
      de: "Myrrha — Kantate über den Tod des Sardanapal",
    },
    note: { en: "World premiere", fr: "Création mondiale", de: "Uraufführung" },
  },
  // Add upcoming concerts here, e.g.:
  // {
  //   id: "some-recital-2026",
  //   date: "2026-11-14",
  //   city: { en: "Paris", fr: "Paris", de: "Paris" },
  //   venue: { en: "Salle Cortot", fr: "Salle Cortot", de: "Salle Cortot" },
  //   role: "pianist",
  //   program: { en: "…", fr: "…", de: "…" },
  //   ticketUrl: "https://…",
  // },
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
    program: c.program[lang],
    note: c.note ? c.note[lang] : undefined,
    ticketUrl: c.ticketUrl,
  }));
}
