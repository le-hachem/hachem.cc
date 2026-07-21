import { useRef, useState } from "react";
import { Upload, ExternalLink } from "lucide-react";
import {
  LANGS,
  emptyLocalized,
  emptyLocalizedList,
  type FieldDef,
  type FieldValue,
  type Lang,
  type Localized,
  type LocalizedList,
} from "./types";

/**
 * One field of one record. Everything the editor renders comes through here,
 * so a new field type is added in one switch rather than in three forms.
 *
 * Translated fields show one language at a time — the one selected in the top
 * bar — with EN/FR/DE pips beside the label that are filled when that language
 * has a value. Clicking a pip switches the whole form to that language, which
 * is how you sweep a record for gaps without hunting field by field.
 */

interface Props {
  field: FieldDef;
  value: FieldValue;
  lang: Lang;
  /** Stack every language at once instead of following the top-bar tab. */
  showAllLangs: boolean;
  error?: string;
  onChange: (value: FieldValue) => void;
  onPickLang: (lang: Lang) => void;
  /** Present only when a backend is connected to accept files. */
  upload?: (file: File) => Promise<string>;
}

function hasValue(v: string | string[] | undefined): boolean {
  return Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim());
}

/** Language pips: filled where there's copy, clickable to switch the form. */
function Pips({
  value,
  lang,
  onPick,
}: {
  value: Localized | LocalizedList | undefined;
  lang: Lang;
  onPick: (l: Lang) => void;
}) {
  return (
    <span className="flex items-center gap-1">
      {LANGS.map((l) => {
        const filled = hasValue(value?.[l]);
        return (
          <button
            key={l}
            type="button"
            onClick={() => onPick(l)}
            title={
              filled ? `${l.toUpperCase()} — written` : `${l.toUpperCase()} — empty`
            }
            className={[
              "adm-pip",
              filled ? "adm-pip-filled" : "",
              l === lang ? "adm-pip-active" : "",
            ].join(" ")}
          >
            {l}
          </button>
        );
      })}
    </span>
  );
}

/** A list is edited as one item per line — fastest for a 25-line orchestra. */
function LinesInput({
  value,
  rows,
  invalid,
  onChange,
}: {
  value: string[];
  rows: number;
  invalid: boolean;
  onChange: (next: string[]) => void;
}) {
  // Kept as raw text while focused so a trailing newline doesn't vanish
  // mid-typing; only split into items on the way out.
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? value.join("\n");

  return (
    <textarea
      className={`adm-textarea adm-mono ${invalid ? "adm-invalid" : ""}`}
      rows={rows}
      value={text}
      onChange={(e) => {
        setDraft(e.target.value);
        onChange(
          e.target.value
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
        );
      }}
      onBlur={() => setDraft(null)}
      spellCheck={false}
    />
  );
}

/** A path to a file under /public, with upload once a backend can take one. */
function MediaInput({
  field,
  value,
  invalid,
  onChange,
  upload,
}: {
  field: FieldDef;
  value: string;
  invalid: boolean;
  onChange: (next: string) => void;
  upload?: (file: File) => Promise<string>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const isImage = field.accept?.startsWith("image");
  const isAudio = field.accept?.startsWith("audio");

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          className={`adm-input adm-mono ${invalid ? "adm-invalid" : ""}`}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
        {upload ? (
          <>
            <input
              ref={inputRef}
              type="file"
              accept={field.accept}
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setBusy(true);
                setFailure("");
                try {
                  onChange(await upload(file));
                } catch (err) {
                  setFailure(err instanceof Error ? err.message : String(err));
                } finally {
                  setBusy(false);
                  if (inputRef.current) inputRef.current.value = "";
                }
              }}
            />
            <button
              type="button"
              className="adm-btn"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={13} />
              {busy ? "Sending…" : "Upload"}
            </button>
          </>
        ) : (
          <button
            type="button"
            className="adm-btn"
            disabled
            title="Uploading needs a backend. For now, commit the file under public/ and give its path."
          >
            <Upload size={13} />
            Upload
          </button>
        )}
      </div>

      {failure && <p className="adm-field-error">{failure}</p>}

      {value && isImage && (
        <img
          src={value}
          alt=""
          className="h-20 w-auto rounded-sm border border-[var(--seam)] object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {value && isAudio && (
        <audio src={value} controls className="w-full max-w-sm" />
      )}
      {value && !isImage && !isAudio && (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] text-[var(--c-8a8071)] hover:text-[var(--c-dfd6c7)]"
        >
          <ExternalLink size={11} />
          Open
        </a>
      )}
    </div>
  );
}

export function Field({
  field,
  value,
  lang,
  showAllLangs,
  error,
  onChange,
  onPickLang,
  upload,
}: Props) {
  const invalid = Boolean(error);

  /* ── Translated fields ───────────────────────────────────────────── */
  if (field.localized) {
    const isList = field.kind === "list";
    const map = (value ??
      (isList ? emptyLocalizedList() : emptyLocalized())) as
      | Localized
      | LocalizedList;

    const setLangValue = (l: Lang, next: string | string[]) =>
      onChange({ ...map, [l]: next } as FieldValue);

    const editorFor = (l: Lang) => {
      if (isList) {
        return (
          <LinesInput
            value={((map as LocalizedList)[l] ?? []) as string[]}
            rows={field.rows ?? 4}
            invalid={invalid}
            onChange={(next) => setLangValue(l, next)}
          />
        );
      }
      const text = ((map as Localized)[l] ?? "") as string;
      if (field.kind === "textarea") {
        return (
          <textarea
            className={`adm-textarea ${invalid ? "adm-invalid" : ""}`}
            rows={field.rows ?? 4}
            value={text}
            placeholder={field.placeholder}
            onChange={(e) => setLangValue(l, e.target.value)}
          />
        );
      }
      return (
        <input
          className={`adm-input ${invalid ? "adm-invalid" : ""}`}
          value={text}
          placeholder={field.placeholder}
          onChange={(e) => setLangValue(l, e.target.value)}
        />
      );
    };

    return (
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label className="adm-label mb-0">
            {field.label}
            {field.required && (
              <span className="ml-1 text-[var(--adm-alarm)]">*</span>
            )}
          </label>
          <Pips value={map} lang={lang} onPick={onPickLang} />
        </div>

        {showAllLangs ? (
          <div className="space-y-2">
            {LANGS.map((l) => (
              <div key={l} className="flex gap-2.5">
                <span className="adm-pip mt-2 shrink-0">{l}</span>
                <div className="flex-1">{editorFor(l)}</div>
              </div>
            ))}
          </div>
        ) : (
          editorFor(lang)
        )}

        {error && <p className="adm-field-error">{error}</p>}
        {field.help && <p className="adm-help">{field.help}</p>}
      </div>
    );
  }

  /* ── Plain fields ────────────────────────────────────────────────── */

  if (field.kind === "boolean") {
    return (
      <div>
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--c-8a8071)]"
          />
          <span>
            <span className="text-[13.5px] text-[var(--c-dfd6c7)]">
              {field.label}
            </span>
            {field.help && <span className="adm-help block">{field.help}</span>}
          </span>
        </label>
      </div>
    );
  }

  const label = (
    <label className="adm-label">
      {field.label}
      {field.required && <span className="ml-1 text-[var(--adm-alarm)]">*</span>}
    </label>
  );

  const control = () => {
    switch (field.kind) {
      case "textarea":
        return (
          <textarea
            className={`adm-textarea ${invalid ? "adm-invalid" : ""}`}
            rows={field.rows ?? 4}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "select":
        return (
          <select
            className={`adm-select ${invalid ? "adm-invalid" : ""}`}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">—</option>
            {(field.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case "date":
        return (
          <input
            type="date"
            className={`adm-input adm-mono ${invalid ? "adm-invalid" : ""}`}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "number":
        return (
          <input
            type="number"
            step="any"
            className={`adm-input adm-mono ${invalid ? "adm-invalid" : ""}`}
            value={value === undefined ? "" : String(value)}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "list":
        return (
          <LinesInput
            value={(value as string[] | undefined) ?? []}
            rows={field.rows ?? 6}
            invalid={invalid}
            onChange={(next) => onChange(next)}
          />
        );
      case "media":
        return (
          <MediaInput
            field={field}
            value={String(value ?? "")}
            invalid={invalid}
            onChange={(next) => onChange(next)}
            upload={upload}
          />
        );
      case "url":
        return (
          <input
            className={`adm-input adm-mono ${invalid ? "adm-invalid" : ""}`}
            value={String(value ?? "")}
            placeholder={field.placeholder ?? "https://"}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
          />
        );
      default:
        return (
          <input
            className={`adm-input ${invalid ? "adm-invalid" : ""}`}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div>
      {label}
      {control()}
      {error && <p className="adm-field-error">{error}</p>}
      {field.help && <p className="adm-help">{field.help}</p>}
    </div>
  );
}
