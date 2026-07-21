import {
  LANGS,
  isBlank,
  type FieldDef,
  type Localized,
  type LocalizedList,
  type Rec,
} from "./types";

/**
 * Turning console records back into the TypeScript that lives in
 * src/app/i18n/*.ts. The output is meant to be pasted over the `source` array
 * in the matching file, so it is formatted the way those files already are:
 * two-space indent, double quotes, localized maps inline when they are short
 * and stacked when they are not.
 *
 * Once a real backend is serving this content these generators stop being the
 * publishing route and become a way to snapshot the database back into the
 * repo — the shape they emit is the same either way.
 */

const INDENT = "  ";

/** A double-quoted TS string literal. */
function q(value: string): string {
  return `"${value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")}"`;
}

/** Longest line we will allow before breaking a localized map across lines. */
const WRAP_AT = 84;

function localized(value: Localized, indent: string): string {
  const inline = `{ ${LANGS.map((l) => `${l}: ${q(value[l] ?? "")}`).join(", ")} }`;
  if (indent.length + inline.length <= WRAP_AT) return inline;
  const inner = indent + INDENT;
  return `{\n${LANGS.map((l) => `${inner}${l}: ${q(value[l] ?? "")},`).join(
    "\n"
  )}\n${indent}}`;
}

function stringList(items: string[], indent: string): string {
  if (items.length === 0) return "[]";
  const inline = `[${items.map(q).join(", ")}]`;
  if (indent.length + inline.length <= WRAP_AT) return inline;
  const inner = indent + INDENT;
  return `[\n${items.map((i) => `${inner}${q(i)},`).join("\n")}\n${indent}]`;
}

function localizedList(value: LocalizedList, indent: string): string {
  const inner = indent + INDENT;
  const body = LANGS.map(
    (l) => `${inner}${l}: ${stringList(value[l] ?? [], inner)},`
  ).join("\n");
  return `{\n${body}\n${indent}}`;
}

/** One `key: value,` line (or block) for a field, or null when it is omitted. */
function fieldLine(field: FieldDef, rec: Rec, indent: string): string | null {
  const raw = rec[field.key];

  if (field.localized) {
    const value = raw as Localized | LocalizedList | undefined;
    // An empty optional field is simply left out. A required one can't get
    // this far — validation blocks saving before it reaches the export.
    if (isBlank(value)) return null;
    const rendered =
      field.kind === "list"
        ? localizedList(value as LocalizedList, indent)
        : localized(value as Localized, indent);
    return `${indent}${field.key}: ${rendered},`;
  }

  switch (field.kind) {
    case "boolean":
      // Optional flags read better by their absence than by `: false`.
      return raw === true ? `${indent}${field.key}: true,` : null;
    case "number": {
      if (raw === undefined || raw === "" || raw === null) return null;
      const n = Number(raw);
      return Number.isFinite(n) ? `${indent}${field.key}: ${n},` : null;
    }
    case "list": {
      const items = (raw as string[] | undefined) ?? [];
      if (items.length === 0) return null;
      return `${indent}${field.key}: ${stringList(items, indent)},`;
    }
    default: {
      const s = (raw as string | undefined) ?? "";
      if (!s.trim()) return null;
      return `${indent}${field.key}: ${q(s)},`;
    }
  }
}

export interface SerializeOptions {
  /** The array's TS type, e.g. `ConcertSource` — used in the declaration. */
  typeName: string;
  /** The array's variable name, e.g. `source`. */
  arrayName: string;
  /**
   * Optional banner comment emitted above a record, given the record and the
   * one before it — used to keep the category dividers in compositions.ts.
   */
  banner?: (rec: Rec, previous: Rec | null) => string | null;
}

/** Render a whole collection as its `const source: T[] = [...]` declaration. */
export function serializeCollection(
  records: Rec[],
  fields: FieldDef[],
  opts: SerializeOptions
): string {
  const published = records.filter((r) => r.published !== false);
  if (published.length === 0) {
    return `const ${opts.arrayName}: ${opts.typeName}[] = [];\n`;
  }

  const blocks: string[] = [];
  published.forEach((rec, i) => {
    const banner = opts.banner?.(rec, i === 0 ? null : published[i - 1]);
    if (banner) blocks.push(`${INDENT}${banner}`);

    const inner = INDENT + INDENT;
    const lines = [`${inner}id: ${q(rec.id)},`];
    for (const field of fields) {
      if (field.key === "id" || field.consoleOnly) continue;
      const line = fieldLine(field, rec, inner);
      if (line) lines.push(line);
    }
    blocks.push(`${INDENT}{\n${lines.join("\n")}\n${INDENT}},`);
  });

  return `const ${opts.arrayName}: ${opts.typeName}[] = [\n${blocks.join(
    "\n"
  )}\n];\n`;
}

/** The `featuredCompositionIds` export, kept in step with the rack toggles. */
export function serializeFeatured(records: Rec[]): string {
  const ids = records
    .filter((r) => r.published !== false && r.featured === true)
    .map((r) => r.id);
  return `/** Only these appear in the featured rack on the homepage. */\nexport const featuredCompositionIds = [${ids
    .map(q)
    .join(", ")}];\n`;
}

/**
 * The same records as JSON — what you would seed a database with, and what the
 * HTTP store expects back from `GET /api/:collection`.
 */
export function serializeJson(data: unknown): string {
  return JSON.stringify(data, null, 2) + "\n";
}

/** The build-time feature flags, as a .env file. */
export function serializeEnv(settings: Record<string, boolean>): string {
  return (
    Object.entries(settings)
      .map(([k, v]) => `${k}=${v ? "true" : "false"}`)
      .join("\n") + "\n"
  );
}
