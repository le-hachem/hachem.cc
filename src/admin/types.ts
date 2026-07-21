import type { Lang } from "../app/i18n/translations";

export type { Lang };

/** Every language the console edits, in the order the tabs show them. */
export const LANGS: Lang[] = ["en", "fr", "de"];

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

/** A string with one value per language. */
export type Localized = Record<Lang, string>;
/** A list of strings with one list per language. */
export type LocalizedList = Record<Lang, string[]>;

/** Any value a field can hold, before it is written back out to source. */
export type FieldValue =
  | string
  | number
  | boolean
  | string[]
  | Localized
  | LocalizedList
  | undefined;

/**
 * A record as the console holds it: a flat bag of field values keyed by the
 * field definitions of its collection, plus the two pieces of bookkeeping
 * every record carries.
 */
export interface Rec {
  id: string;
  /** Unpublished records stay in the console and are left out of the export. */
  published: boolean;
  [key: string]: FieldValue;
}

export type FieldKind =
  | "text"
  | "textarea"
  | "date"
  | "select"
  | "boolean"
  | "list"
  | "url"
  | "number"
  | "media";

export interface FieldDef {
  key: string;
  label: string;
  kind: FieldKind;
  /** When set, the value is a per-language map rather than a bare value. */
  localized?: boolean;
  required?: boolean;
  /** Shown under the input — say what the field is for, not what it is. */
  help?: string;
  placeholder?: string;
  /** `select` only. */
  options?: { value: string; label: string }[];
  /** `textarea` only. */
  rows?: number;
  /** `media` only — what the file picker accepts once a backend is connected. */
  accept?: string;
  /** Lay the field out at half width so short fields pair up on one row. */
  half?: boolean;
  /** Fields are rendered grouped under these headings, in first-seen order. */
  group?: string;
  /**
   * Edited in the console but never written into the source array — the piece
   * `featured` flag, for instance, feeds a separate export instead.
   */
  consoleOnly?: boolean;
}

export interface CollectionDef {
  key: string;
  /** Plural, for the nav and list heading. */
  label: string;
  /** Singular, for buttons like "New concert". */
  singular: string;
  /** One line under the list heading saying what this collection feeds. */
  blurb: string;
  fields: FieldDef[];
  /**
   * The source file the export writes back into, and the name of the array
   * inside it, so the export screen can tell you exactly what to replace.
   */
  file: string;
  arrayName: string;
  /**
   * What to select in `file` before pasting the export over it. Most
   * collections regenerate only their array; compositions also regenerate the
   * featured list that follows it, so the region is larger.
   */
  replaces: string;
  /**
   * "manual" keeps the order you arrange by hand — which is the order the
   * records are written to the source file. "sorted" derives the order from
   * `compare`, so nothing has to be moved as dates pass.
   */
  order: "manual" | "sorted";
  compare?: (a: Rec, b: Rec) => number;
  /** Optional heading a record is filed under in the list. */
  groupBy?: (rec: Rec) => string;
  /** Headline and supporting line for a record's row in the list. */
  summary: (r: Rec) => { title: string; meta: string };
  /** Proposed id for a new or renamed record. */
  slugFrom: (r: Rec) => string;
  /** Serialize the whole collection to the TypeScript that goes in `file`. */
  serialize: (records: Rec[]) => string;
}

/** A validation problem on one field of one record. */
export interface FieldError {
  field: string;
  lang?: Lang;
  message: string;
}

export const emptyLocalized = (): Localized => ({ en: "", fr: "", de: "" });
export const emptyLocalizedList = (): LocalizedList => ({
  en: [],
  fr: [],
  de: [],
});

/** True when a localized value is entirely empty — an optional field left off. */
export function isBlank(v: Localized | LocalizedList | undefined): boolean {
  if (!v) return true;
  return LANGS.every((l) => {
    const val = v[l];
    return Array.isArray(val) ? val.length === 0 : !val || !val.trim();
  });
}

/** Which languages are still missing from a localized value. */
export function missingLangs(v: Localized | LocalizedList | undefined): Lang[] {
  if (!v) return [...LANGS];
  return LANGS.filter((l) => {
    const val = v[l];
    return Array.isArray(val) ? val.length === 0 : !val || !val.trim();
  });
}

/** An empty record with every field of a collection present and typed. */
export function blankRecord(def: CollectionDef): Rec {
  const rec: Rec = { id: "", published: true };
  for (const field of def.fields) {
    if (field.localized) {
      rec[field.key] =
        field.kind === "list" ? emptyLocalizedList() : emptyLocalized();
    } else if (field.kind === "boolean") {
      rec[field.key] = false;
    } else if (field.kind === "list") {
      rec[field.key] = [];
    } else if (field.kind === "select") {
      rec[field.key] = field.options?.[0]?.value ?? "";
    } else {
      rec[field.key] = "";
    }
  }
  return rec;
}

/** Combining marks left behind by NFD, stripped so "Méphisto" → "mephisto". */
const COMBINING = new RegExp("[\\u0300-\\u036f]", "g");

/** Longest id we'll propose — long enough to stay readable in a URL. */
const SLUG_MAX = 60;

/** A URL-safe id: lowercase, hyphens, no accents, cut at a word boundary. */
export function slugify(input: string): string {
  const full = input
    .normalize("NFD")
    .replace(COMBINING, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (full.length <= SLUG_MAX) return full;
  // Trim the half-word the cut would otherwise leave behind, unless doing so
  // would throw away most of the name.
  const cut = full.slice(0, SLUG_MAX);
  const boundary = cut.lastIndexOf("-");
  return boundary > SLUG_MAX / 3 ? cut.slice(0, boundary) : cut;
}
