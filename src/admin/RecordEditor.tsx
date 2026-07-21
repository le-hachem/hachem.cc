import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Info,
  Languages,
  Trash2,
  Wand2,
} from "lucide-react";
import { Field } from "./Field";
import { validateRecord } from "./validate";
import {
  slugify,
  type CollectionDef,
  type FieldValue,
  type Lang,
  type Rec,
} from "./types";

/**
 * The form for a single record. Fields come from the collection definition, so
 * this file never mentions concerts or works by name.
 *
 * Saving is blocked while there are errors — a duplicate id or a malformed
 * date would break the build. Translation gaps are shown but never block:
 * writing the English first and the French later is the normal way round.
 */

interface Props {
  def: CollectionDef;
  /** The record as last saved; null when creating. */
  original: Rec | null;
  /** Everything else in the collection — for the id-uniqueness check. */
  siblings: Rec[];
  initial: Rec;
  lang: Lang;
  showAllLangs: boolean;
  onPickLang: (lang: Lang) => void;
  onToggleAllLangs: () => void;
  onSave: (rec: Rec, previousId?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onBack: () => void;
  onDirtyChange: (dirty: boolean) => void;
  upload?: (file: File) => Promise<string>;
}

export function RecordEditor({
  def,
  original,
  siblings,
  initial,
  lang,
  showAllLangs,
  onPickLang,
  onToggleAllLangs,
  onSave,
  onDelete,
  onBack,
  onDirtyChange,
  upload,
}: Props) {
  const [draft, setDraft] = useState<Rec>(initial);
  const [attempted, setAttempted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [failure, setFailure] = useState("");

  const isNew = original === null;
  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(initial),
    [draft, initial]
  );

  useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange]);

  const { errors, warnings } = useMemo(
    () => validateRecord(def, draft, siblings),
    [def, draft, siblings]
  );

  // Errors only start showing once you've tried to save, so a half-filled new
  // record isn't red before you've had a chance to type in it.
  const errorFor = (key: string) =>
    attempted ? errors.find((e) => e.field === key)?.message : undefined;

  const set = (key: string, value: FieldValue) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const suggestedId = def.slugFrom(draft);

  const save = async () => {
    setAttempted(true);
    setFailure("");
    if (errors.length > 0) return;
    setSaving(true);
    try {
      await onSave(draft, original?.id);
    } catch (err) {
      setFailure(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  // ⌘S / Ctrl+S saves, the way any editor should.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Fields in their declared order, gathered under their group headings.
  const groups = useMemo(() => {
    const out: { name: string; fields: typeof def.fields }[] = [];
    for (const field of def.fields) {
      const name = field.group ?? "Details";
      const existing = out.find((g) => g.name === name);
      if (existing) existing.fields.push(field);
      else out.push({ name, fields: [field] });
    }
    return out;
  }, [def]);

  const summary = def.summary(draft);

  return (
    <div className="mx-auto max-w-3xl px-5 py-7 sm:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <button className="adm-btn adm-btn-ghost adm-btn-sm -ml-2 mb-2" onClick={onBack}>
            <ArrowLeft size={13} />
            {def.label}
          </button>
          <h1 className="adm-serif truncate text-2xl text-[var(--c-f0ead8)]">
            {isNew ? `New ${def.singular}` : summary.title}
          </h1>
          {!isNew && summary.meta && (
            <p className="mt-1 text-[13px] text-[var(--c-8a8071)]">{summary.meta}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            className="adm-btn"
            onClick={onToggleAllLangs}
            title={
              showAllLangs
                ? "Show one language at a time"
                : "Show English, French and German together"
            }
          >
            <Languages size={13} />
            {showAllLangs ? "One language" : "All languages"}
          </button>
          <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>
            <Check size={13} />
            {saving ? "Saving…" : dirty || isNew ? "Save" : "Saved"}
          </button>
        </div>
      </div>

      {failure && (
        <div className="adm-note adm-note-error mb-5">
          <AlertTriangle size={15} className="mt-px shrink-0" />
          <span>{failure}</span>
        </div>
      )}

      {attempted && errors.length > 0 && (
        <div className="adm-note adm-note-error mb-5">
          <AlertTriangle size={15} className="mt-px shrink-0" />
          <span>
            {errors.length === 1
              ? errors[0].message
              : `${errors.length} things need fixing before this can be saved.`}
          </span>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="adm-note adm-note-warn mb-5">
          <Info size={15} className="mt-px shrink-0" />
          <span>
            {warnings.slice(0, 3).map((w) => w.message).join(" ")}
            {warnings.length > 3 && ` +${warnings.length - 3} more.`}
          </span>
        </div>
      )}

      {/* Identity */}
      <section className="adm-panel mb-5 p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label className="adm-label">
              Id<span className="ml-1 text-[var(--adm-alarm)]">*</span>
            </label>
            <input
              className={`adm-input adm-mono ${errorFor("id") ? "adm-invalid" : ""}`}
              value={draft.id}
              placeholder="a-url-safe-name"
              spellCheck={false}
              onChange={(e) => set("id", slugify(e.target.value))}
            />
            {errorFor("id") && <p className="adm-field-error">{errorFor("id")}</p>}
            <p className="adm-help">
              {def.key === "compositions"
                ? "The piece's own address — hachem.cc/" + (draft.id || "…") +
                  ". Changing it breaks any link already shared."
                : "A stable name for this entry. Changing it is safe, but keep it readable."}
            </p>
          </div>
          {suggestedId && suggestedId !== draft.id && (
            <button
              className="adm-btn"
              onClick={() => set("id", suggestedId)}
              title={suggestedId}
            >
              <Wand2 size={13} />
              Use suggested
            </button>
          )}
        </div>

        <div className="adm-hairline mt-4 pt-4">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={draft.published !== false}
              onChange={(e) => set("published", e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--c-8a8071)]"
            />
            <span>
              <span className="text-[13.5px] text-[var(--c-dfd6c7)]">Published</span>
              <span className="adm-help block">
                Unpublished entries stay here and are left out of the export, so
                you can draft something before it's announced.
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* Fields */}
      <div className="space-y-5">
        {groups.map((group) => (
          <section key={group.name} className="adm-panel p-5">
            <h2 className="adm-kicker mb-4">{group.name}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {group.fields.map((field) => (
                <div
                  key={field.key}
                  className={field.half ? "sm:col-span-1" : "sm:col-span-2"}
                >
                  <Field
                    field={field}
                    value={draft[field.key]}
                    lang={lang}
                    showAllLangs={showAllLangs}
                    error={errorFor(field.key)}
                    onChange={(v) => set(field.key, v)}
                    onPickLang={onPickLang}
                    upload={upload}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          {!isNew &&
            (confirmingDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[var(--c-a1998a)]">
                  Delete this {def.singular}?
                </span>
                <button
                  className="adm-btn adm-btn-danger adm-btn-sm"
                  onClick={() => void onDelete(original.id)}
                >
                  Delete
                </button>
                <button
                  className="adm-btn adm-btn-ghost adm-btn-sm"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Keep
                </button>
              </div>
            ) : (
              <button
                className="adm-btn adm-btn-danger"
                onClick={() => setConfirmingDelete(true)}
              >
                <Trash2 size={13} />
                Delete
              </button>
            ))}
        </div>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="text-[12.5px] text-[var(--adm-caution)]">
              Unsaved changes
            </span>
          )}
          <button className="adm-btn" onClick={onBack}>
            Back to {def.label}
          </button>
          <button className="adm-btn adm-btn-primary" onClick={save} disabled={saving}>
            <Check size={13} />
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
