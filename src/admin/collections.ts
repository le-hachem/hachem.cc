import {
  compositionSource,
  type CompositionSource,
} from "../app/i18n/compositions";
import { concertSource, type ConcertSource } from "../app/i18n/concerts";
import { dispatchSource, type DispatchSource } from "../app/i18n/dispatches";
import { liliSource, type LiliWorkSource } from "../app/i18n/lili";
import {
  serializeCollection,
  serializeFeatured,
} from "./serialize";
import {
  LANGS,
  emptyLocalized,
  emptyLocalizedList,
  slugify,
  type CollectionDef,
  type Lang,
  type Localized,
  type LocalizedList,
  type Rec,
} from "./types";

/**
 * What the console can edit, and how. Each collection describes its fields
 * once; the list view, the editor form, validation and the TypeScript export
 * are all generated from that description, so adding a field to a section of
 * the site means adding one entry here.
 */

/* ------------------------------------------------------------------ */
/* Seeding — the site's current content, widened into editable records */
/* ------------------------------------------------------------------ */

/** Fill in any language the source left out, so the form always has a slot. */
function toLocalized(v: Partial<Record<Lang, string>> | undefined): Localized {
  const out = emptyLocalized();
  if (v) for (const l of LANGS) out[l] = v[l] ?? "";
  return out;
}

function toLocalizedList(
  v: Partial<Record<Lang, string[]>> | undefined
): LocalizedList {
  const out = emptyLocalizedList();
  if (v) for (const l of LANGS) out[l] = [...(v[l] ?? [])];
  return out;
}

function seedConcerts(): Rec[] {
  return concertSource.map((c: ConcertSource) => ({
    id: c.id,
    published: true,
    date: c.date,
    monthOnly: c.monthOnly === true,
    city: toLocalized(c.city),
    venue: toLocalized(c.venue),
    role: c.role,
    title: toLocalized(c.title),
    program: toLocalized(c.program),
    note: toLocalized(c.note),
    ticketUrl: c.ticketUrl ?? "",
  }));
}

function seedDispatches(): Rec[] {
  return dispatchSource.map((d: DispatchSource) => ({
    id: d.id,
    published: true,
    date: d.date,
    monthOnly: d.monthOnly === true,
    headline: toLocalized(d.headline),
    body: toLocalized(d.body),
    href: d.href ?? "",
    linkLabel: toLocalized(d.linkLabel),
  }));
}

/** Ids in the featured rack today, so the toggle starts in the right state. */
const FEATURED_SEED = new Set(["myrrha", "mephistopheles"]);

function seedCompositions(): Rec[] {
  return compositionSource.map((c: CompositionSource) => ({
    id: c.id,
    published: true,
    featured: FEATURED_SEED.has(c.id),
    title: c.title,
    subtitle: toLocalized(c.subtitle),
    year: c.year,
    duration: c.duration,
    durationSeconds: c.durationSeconds ?? "",
    category: c.category,
    description: toLocalized(c.description),
    instrumentation: [...c.instrumentation],
    inspired: toLocalized(c.inspired),
    accolades: toLocalizedList(c.accolades),
    audioUrl: c.audioUrl ?? "",
    coverUrl: c.coverUrl ?? "",
    peaksUrl: c.peaksUrl ?? "",
  }));
}

function seedLili(): Rec[] {
  return liliSource.map((w: LiliWorkSource) => ({
    id: w.id,
    published: true,
    title: w.title,
    year: w.year,
    category: w.category,
    instrumentation: toLocalized(w.instrumentation),
    text: toLocalized(w.text),
    imslpUrl: w.imslpUrl ?? "",
    pdfUrl: w.pdfUrl ?? "",
  }));
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

/** The English value of a localized field, falling back to any language set. */
export function en(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  const map = v as Localized;
  return map.en || map.fr || map.de || "";
}

/** Whether a date is today or later — the split the Agenda section makes. */
export function isUpcoming(iso: string): boolean {
  if (!iso) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + "T12:00:00");
  return !Number.isNaN(d.getTime()) && d >= today;
}

/** "12 June 2026", or "June 2026" when only the month is known. */
export function formatDate(iso: string, monthOnly?: boolean): string {
  if (!iso) return "No date";
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: monthOnly ? undefined : "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_OPTIONS = [
  { value: "Large Ensemble", label: "Large Ensemble" },
  { value: "Chamber Music", label: "Chamber Music" },
  { value: "Piano Solo", label: "Piano Solo" },
  { value: "Voice & Piano", label: "Voice & Piano" },
];

/** Rebuild the `// ── Category ──…` divider comments in compositions.ts. */
function categoryBanner(rec: Rec, previous: Rec | null): string | null {
  const category = String(rec.category ?? "");
  if (previous && String(previous.category ?? "") === category) return null;
  // 67 characters wide, matching the dividers already in the file.
  const head = `// ── ${category} `;
  return head + "─".repeat(Math.max(3, 67 - head.length));
}

/* ------------------------------------------------------------------ */
/* The collections                                                     */
/* ------------------------------------------------------------------ */

export const concerts: CollectionDef = {
  key: "concerts",
  label: "Concerts",
  singular: "concert",
  blurb:
    "The diary in the Agenda section. Upcoming and past are split automatically by date, so nothing needs moving as a date passes.",
  file: "src/app/i18n/concerts.ts",
  arrayName: "source",
  replaces: "the `const source: ConcertSource[] = [ … ];` array",
  order: "sorted",
  // Upcoming dates run nearest-first, the way the diary reads; the archive
  // below them runs most-recent-first.
  compare: (a, b) => {
    const aUp = isUpcoming(String(a.date ?? ""));
    const bUp = isUpcoming(String(b.date ?? ""));
    if (aUp !== bUp) return aUp ? -1 : 1;
    const order = String(a.date ?? "").localeCompare(String(b.date ?? ""));
    return aUp ? order : -order;
  },
  groupBy: (r) => (isUpcoming(String(r.date ?? "")) ? "Upcoming" : "Past"),
  fields: [
    {
      key: "date",
      label: "Date",
      kind: "date",
      required: true,
      half: true,
      group: "When and where",
      help: "Sorts the diary and decides upcoming vs. past.",
    },
    {
      key: "monthOnly",
      label: "Month only",
      kind: "boolean",
      half: true,
      group: "When and where",
      help: "For dates fixed to a month — renders as “June 2026”. Set the day to the 1st.",
    },
    {
      key: "city",
      label: "City",
      kind: "text",
      localized: true,
      required: true,
      half: true,
      group: "When and where",
    },
    {
      key: "venue",
      label: "Venue",
      kind: "text",
      localized: true,
      half: true,
      group: "When and where",
      help: "Optional — leave empty when the hall isn't settled.",
    },
    {
      key: "role",
      label: "Role",
      kind: "select",
      required: true,
      half: true,
      group: "Programme",
      options: [
        { value: "composer", label: "Composer" },
        { value: "pianist", label: "Pianist" },
        { value: "conductor", label: "Conductor" },
      ],
    },
    {
      key: "note",
      label: "Tag",
      kind: "text",
      localized: true,
      half: true,
      group: "Programme",
      help: "The small label beside the entry — “World premiere”, “Recital”.",
    },
    {
      key: "title",
      label: "Event title",
      kind: "text",
      localized: true,
      group: "Programme",
      help: "Only when the event has a name distinct from the works played.",
    },
    {
      key: "program",
      label: "Programme",
      kind: "textarea",
      localized: true,
      required: true,
      rows: 3,
      group: "Programme",
      help: "Separate works with a semicolon — the first is set as the headline.",
    },
    {
      key: "ticketUrl",
      label: "Ticket link",
      kind: "url",
      group: "Links",
      placeholder: "https://",
    },
  ],
  summary: (r) => ({
    title: en(r.program) || "Untitled date",
    meta: [formatDate(String(r.date), r.monthOnly === true), en(r.city)]
      .filter(Boolean)
      .join(" · "),
  }),
  slugFrom: (r) => {
    const year = String(r.date ?? "").slice(0, 4);
    return [slugify(en(r.program).split(";")[0] ?? ""), slugify(en(r.city)), year]
      .filter(Boolean)
      .join("-");
  },
  serialize: (records) =>
    serializeCollection(records, concerts.fields, {
      typeName: "ConcertSource",
      arrayName: "source",
    }),
};

export const dispatches: CollectionDef = {
  key: "dispatches",
  label: "Dispatches",
  singular: "dispatch",
  blurb:
    "The news column — short bulletins, newest first. A premiere, a prize, a new edition.",
  file: "src/app/i18n/dispatches.ts",
  arrayName: "source",
  replaces: "the `const source: DispatchSource[] = [ … ];` array",
  order: "sorted",
  compare: (a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")),
  groupBy: (r) => String(r.date ?? "").slice(0, 4) || "Undated",
  fields: [
    {
      key: "date",
      label: "Date",
      kind: "date",
      required: true,
      half: true,
      group: "Bulletin",
    },
    {
      key: "monthOnly",
      label: "Month only",
      kind: "boolean",
      half: true,
      group: "Bulletin",
    },
    {
      key: "headline",
      label: "Headline",
      kind: "text",
      localized: true,
      required: true,
      group: "Bulletin",
    },
    {
      key: "body",
      label: "Body",
      kind: "textarea",
      localized: true,
      required: true,
      rows: 6,
      group: "Bulletin",
      help: "A sentence or two. The column is set narrow, so keep it tight.",
    },
    {
      key: "href",
      label: "Link",
      kind: "url",
      group: "Links",
      placeholder: "https://imslp.org/…",
      help: "Optional — an IMSLP edition, a video, a ticketing page.",
    },
    {
      key: "linkLabel",
      label: "Link label",
      kind: "text",
      localized: true,
      group: "Links",
      help: "The words the link is set on, e.g. “Read the edition”.",
    },
  ],
  summary: (r) => ({
    title: en(r.headline) || "Untitled dispatch",
    meta: formatDate(String(r.date), r.monthOnly === true),
  }),
  slugFrom: (r) => slugify(en(r.headline)),
  serialize: (records) =>
    serializeCollection(records, dispatches.fields, {
      typeName: "DispatchSource",
      arrayName: "source",
    }),
};

export const compositions: CollectionDef = {
  key: "compositions",
  label: "Works",
  singular: "work",
  blurb:
    "The catalogue behind the featured rack, the full library and every /piece-id page. Order here is the order on the page.",
  file: "src/app/i18n/compositions.ts",
  arrayName: "source",
  replaces:
    "everything from `const source: CompositionSource[] = [` down to and including the `featuredCompositionIds` line below it — both are regenerated",
  order: "manual",
  groupBy: (r) => String(r.category || "Uncategorised"),
  fields: [
    {
      key: "title",
      label: "Title",
      kind: "text",
      required: true,
      half: true,
      group: "The work",
      help: "Not translated — the title stands as written.",
    },
    {
      key: "category",
      label: "Category",
      kind: "select",
      required: true,
      half: true,
      group: "The work",
      options: CATEGORY_OPTIONS,
    },
    {
      key: "subtitle",
      label: "Subtitle",
      kind: "text",
      localized: true,
      required: true,
      group: "The work",
      help: "The line under the title — “For Violin and Piano”.",
    },
    {
      key: "year",
      label: "Year",
      kind: "text",
      required: true,
      half: true,
      group: "The work",
      placeholder: "2026",
    },
    {
      key: "featured",
      label: "Featured on the front page",
      kind: "boolean",
      half: true,
      consoleOnly: true,
      group: "The work",
      help: "Puts the work in the rack above the fold.",
    },
    {
      key: "duration",
      label: "Duration",
      kind: "text",
      half: true,
      group: "Recording",
      placeholder: "23'08\"",
      help: "As printed, apostrophe for minutes.",
    },
    {
      key: "durationSeconds",
      label: "Duration in seconds",
      kind: "number",
      half: true,
      group: "Recording",
      help: "Shown by the player before the audio has loaded.",
    },
    {
      key: "audioUrl",
      label: "Audio",
      kind: "media",
      accept: "audio/*",
      group: "Recording",
      placeholder: "/music/Myrrha/audio.mp3",
    },
    {
      key: "coverUrl",
      label: "Cover image",
      kind: "media",
      accept: "image/*",
      group: "Recording",
      placeholder: "/music/Myrrha/cover.jpg",
    },
    {
      key: "peaksUrl",
      label: "Waveform peaks",
      kind: "media",
      accept: "application/json",
      group: "Recording",
      placeholder: "/music/Myrrha/peaks.json",
      help: "Pre-computed peaks.json, so the waveform draws before the audio arrives.",
    },
    {
      key: "description",
      label: "Description",
      kind: "textarea",
      localized: true,
      required: true,
      rows: 10,
      group: "Notes",
    },
    {
      key: "inspired",
      label: "After",
      kind: "textarea",
      localized: true,
      rows: 2,
      group: "Notes",
      help: "What the piece stands on — a text, a tradition, another composer.",
    },
    {
      key: "instrumentation",
      label: "Instrumentation",
      kind: "list",
      required: true,
      group: "Notes",
      help: "One force per line, in score order. Kept in English and translated on the page.",
    },
    {
      key: "accolades",
      label: "Prizes",
      kind: "list",
      localized: true,
      group: "Notes",
      help: "One per line, e.g. “ICS Composition Competition · 1st place”.",
    },
  ],
  summary: (r) => ({
    title: String(r.title || "Untitled work"),
    meta: [r.year, r.category, en(r.subtitle)].filter(Boolean).join(" · "),
  }),
  slugFrom: (r) => slugify(String(r.title ?? "")),
  serialize: (records) =>
    serializeCollection(records, compositions.fields, {
      typeName: "CompositionSource",
      arrayName: "source",
      banner: categoryBanner,
    }) +
    "\n" +
    serializeFeatured(records),
};

export const lili: CollectionDef = {
  key: "lili",
  label: "Lili Boulanger",
  singular: "Boulanger work",
  blurb:
    "The catalogue in the restoration project's library. Order here is the order within each category on the page — add an IMSLP or PDF link and the work gets its “Edition” badge.",
  file: "src/app/i18n/lili.ts",
  arrayName: "source",
  replaces: "the `const source: LiliWorkSource[] = [ … ];` array",
  order: "manual",
  groupBy: (r) => String(r.category || "Uncategorised"),
  fields: [
    {
      key: "title",
      label: "Title",
      kind: "text",
      required: true,
      group: "The work",
      help: "Not translated — Boulanger's titles stand as she wrote them.",
    },
    {
      key: "year",
      label: "Year",
      kind: "text",
      required: true,
      half: true,
      group: "The work",
      placeholder: "1918",
      help: "An approximate year is fine, e.g. “c. 1910”.",
    },
    {
      key: "category",
      label: "Category",
      kind: "select",
      required: true,
      half: true,
      group: "The work",
      options: [
        { value: "Piano", label: "Piano" },
        { value: "Chamber", label: "Chamber" },
        { value: "Voice", label: "Voice" },
        { value: "Choral", label: "Choral" },
      ],
    },
    {
      key: "instrumentation",
      label: "Instrumentation",
      kind: "text",
      localized: true,
      required: true,
      group: "The work",
      placeholder: "Voice and piano",
    },
    {
      key: "text",
      label: "Text or poet",
      kind: "text",
      localized: true,
      group: "The work",
      help: "The poet's name, or the source of the text. Names read the same in every language — copy them across unchanged.",
    },
    {
      key: "imslpUrl",
      label: "IMSLP page",
      kind: "url",
      group: "Restored edition",
      placeholder: "https://imslp.org/wiki/…",
      help: "Leave both links empty for works not yet engraved.",
    },
    {
      key: "pdfUrl",
      label: "Score PDF",
      kind: "url",
      group: "Restored edition",
      placeholder: "https://…/IMSLP…pdf",
    },
  ],
  summary: (r) => ({
    title: String(r.title || "Untitled work"),
    meta: [r.year, en(r.instrumentation)].filter(Boolean).join(" · "),
  }),
  slugFrom: (r) => slugify(String(r.title ?? "")),
  serialize: (records) =>
    serializeCollection(records, lili.fields, {
      typeName: "LiliWorkSource",
      arrayName: "source",
    }),
};

export const COLLECTIONS: CollectionDef[] = [
  concerts,
  dispatches,
  compositions,
  lili,
];

export const SEEDS: Record<string, () => Rec[]> = {
  concerts: seedConcerts,
  dispatches: seedDispatches,
  compositions: seedCompositions,
  lili: seedLili,
};

export function collectionByKey(key: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

/* ------------------------------------------------------------------ */
/* Build-time flags                                                    */
/* ------------------------------------------------------------------ */

export interface SettingDef {
  key: string;
  label: string;
  help: string;
}

/**
 * The VITE_* flags in .env. These are read at build time, so changing one here
 * produces a .env block to commit rather than something the console can apply
 * on its own — until the content is served at runtime by a backend.
 */
export const SETTINGS: SettingDef[] = [
  {
    key: "VITE_HIDE_COMPOSITIONS",
    label: "Hide the works section",
    help: "Takes the rack and library off the page. Deep links to a piece still open.",
  },
  {
    key: "VITE_HIDE_DISPATCHES",
    label: "Hide the dispatches section",
    help: "Removes the news column, its nav entry and its index row; the rest renumber.",
  },
  {
    key: "VITE_SHOW_PAST_CONCERTS",
    label: "Show past concerts",
    help: "Publishes the archive under the upcoming dates.",
  },
  {
    key: "VITE_COMMISSIONS_OPEN",
    label: "Commissions open",
    help: "Whether the commissions section invites enquiries.",
  },
];

export function seedSettings(): Record<string, boolean> {
  const env = import.meta.env as Record<string, string | undefined>;
  const out: Record<string, boolean> = {};
  for (const s of SETTINGS) out[s.key] = env[s.key] === "true";
  return out;
}
