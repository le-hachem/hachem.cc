import {
  LANGS,
  isBlank,
  missingLangs,
  type CollectionDef,
  type FieldError,
  type Localized,
  type LocalizedList,
  type Rec,
} from "./types";

/**
 * What must be true before a record can be saved, and what merely ought to be.
 *
 * Errors block saving: they are the things that would break the page or the
 * build — a missing headline, a malformed date, two records claiming the same
 * id. Warnings don't block: an untranslated French body is worth flagging, but
 * it is a normal state to be in halfway through writing one.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(value + "T12:00:00");
  if (Number.isNaN(d.getTime())) return false;
  // Rejects 2026-02-31, which Date would roll forward into March.
  return d.toISOString().slice(0, 10) === value;
}

function isValidUrl(value: string): boolean {
  // Site-relative paths are how audio and covers are referenced.
  if (value.startsWith("/")) return true;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateRecord(
  def: CollectionDef,
  rec: Rec,
  others: Rec[]
): { errors: FieldError[]; warnings: FieldError[] } {
  const errors: FieldError[] = [];
  const warnings: FieldError[] = [];

  const id = String(rec.id ?? "").trim();
  if (!id) {
    errors.push({ field: "id", message: "An id is required." });
  } else if (!SLUG.test(id)) {
    errors.push({
      field: "id",
      message: "Use lowercase letters, numbers and single hyphens.",
    });
  } else if (others.some((o) => o.id === id)) {
    errors.push({
      field: "id",
      message: `Another ${def.singular} already uses this id.`,
    });
  }

  for (const field of def.fields) {
    const value = rec[field.key];

    if (field.localized) {
      const map = value as Localized | LocalizedList | undefined;
      const blank = isBlank(map);
      if (field.required && blank) {
        errors.push({ field: field.key, message: `${field.label} is required.` });
      } else if (!blank) {
        for (const lang of missingLangs(map)) {
          warnings.push({
            field: field.key,
            lang,
            message: `${field.label} has no ${lang.toUpperCase()} translation.`,
          });
        }
      }
      continue;
    }

    switch (field.kind) {
      case "date": {
        const s = String(value ?? "");
        if (!s) {
          if (field.required) {
            errors.push({ field: field.key, message: `${field.label} is required.` });
          }
        } else if (!isValidDate(s)) {
          errors.push({
            field: field.key,
            message: "Give a real date as YYYY-MM-DD.",
          });
        }
        break;
      }
      case "number": {
        if (value !== "" && value !== undefined && !Number.isFinite(Number(value))) {
          errors.push({ field: field.key, message: `${field.label} must be a number.` });
        }
        break;
      }
      case "url":
      case "media": {
        const s = String(value ?? "").trim();
        if (s && !isValidUrl(s)) {
          errors.push({
            field: field.key,
            message: "Use a full https:// address or a path starting with /.",
          });
        }
        break;
      }
      case "list": {
        const items = (value as string[] | undefined) ?? [];
        if (field.required && items.length === 0) {
          errors.push({ field: field.key, message: `${field.label} is required.` });
        }
        break;
      }
      case "boolean":
        break;
      default: {
        if (field.required && !String(value ?? "").trim()) {
          errors.push({ field: field.key, message: `${field.label} is required.` });
        }
      }
    }
  }

  // A month-only date that isn't on the 1st renders as the wrong month edge.
  if (rec.monthOnly === true && String(rec.date ?? "").slice(-2) !== "01") {
    warnings.push({
      field: "date",
      message: "Month-only dates should sit on the 1st of the month.",
    });
  }

  return { errors, warnings };
}

/** Errors across the whole collection, for the badge in the nav. */
export function collectionIssues(
  def: CollectionDef,
  records: Rec[]
): { errors: number; warnings: number } {
  let errors = 0;
  let warnings = 0;
  for (const rec of records) {
    const others = records.filter((r) => r !== rec);
    const result = validateRecord(def, rec, others);
    errors += result.errors.length;
    warnings += result.warnings.length;
  }
  return { errors, warnings };
}

/** How many of a record's localized fields are fully translated. */
export function translationProgress(
  def: CollectionDef,
  rec: Rec
): { done: number; total: number } {
  const localizedFields = def.fields.filter((f) => f.localized);
  let done = 0;
  let total = 0;
  for (const field of localizedFields) {
    const map = rec[field.key] as Localized | LocalizedList | undefined;
    if (isBlank(map)) continue; // an optional field left off isn't untranslated
    total += LANGS.length;
    done += LANGS.length - missingLangs(map).length;
  }
  return { done, total };
}
