import { AlertTriangle, RotateCcw } from "lucide-react";
import { SETTINGS, COLLECTIONS } from "./collections";
import { hasLocalDrafts, type StoreMode } from "./store";
import type { Rec } from "./types";

/**
 * The switches that aren't content: which sections of the paper are printed at
 * all. On a static build these are VITE_* flags read at build time, so the
 * console can only tell you what to put in .env — it can't flip them live.
 *
 * The bottom of this screen is the escape hatch: discard local drafts and go
 * back to exactly what's in the repo.
 */

interface Props {
  settings: Record<string, boolean>;
  data: Record<string, Rec[]>;
  mode: StoreMode;
  onChange: (key: string, value: boolean) => void;
  onReset: (collection?: string) => void;
}

export function SettingsView({ settings, data, mode, onChange, onReset }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-7 sm:px-8">
      <h1 className="adm-serif text-2xl text-[var(--c-f0ead8)]">Settings</h1>
      <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-[var(--c-8a8071)]">
        Which sections of the paper get printed.
        {mode === "local" &&
          " These are read when the site is built, so a change here shows up in the .env tab of Publish rather than on the site straight away."}
      </p>

      <section className="adm-panel mt-6 divide-y divide-[var(--seam)]">
        {SETTINGS.map((setting) => (
          <label
            key={setting.key}
            className="flex cursor-pointer items-start gap-3 p-5"
          >
            <input
              type="checkbox"
              checked={settings[setting.key] === true}
              onChange={(e) => onChange(setting.key, e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--c-8a8071)]"
            />
            <span className="min-w-0">
              <span className="block text-[14px] text-[var(--c-eee8dd)]">
                {setting.label}
              </span>
              <span className="adm-help block">{setting.help}</span>
              <code className="adm-mono mt-1.5 block text-[11.5px] text-[var(--c-5e564f)]">
                {setting.key}={settings[setting.key] === true ? "true" : "false"}
              </code>
            </span>
          </label>
        ))}
      </section>

      {mode === "local" && (
        <section className="mt-8">
          <h2 className="adm-kicker mb-3">Drafts in this browser</h2>
          <div className="adm-panel divide-y divide-[var(--seam)]">
            {COLLECTIONS.map((def) => {
              const edited = hasLocalDrafts(def.key);
              return (
                <div
                  key={def.key}
                  className="flex flex-wrap items-center justify-between gap-3 p-4"
                >
                  <div>
                    <span className="text-[14px] text-[var(--c-eee8dd)]">
                      {def.label}
                    </span>
                    <span className="ml-2 text-[12.5px] text-[var(--c-7b7267)]">
                      {(data[def.key] ?? []).length} entries ·{" "}
                      {edited ? "edited here" : "as shipped"}
                    </span>
                  </div>
                  <button
                    className="adm-btn adm-btn-sm"
                    disabled={!edited}
                    onClick={() => onReset(def.key)}
                  >
                    <RotateCcw size={12} />
                    Revert to repo
                  </button>
                </div>
              );
            })}
          </div>

          <div className="adm-note adm-note-warn mt-4">
            <AlertTriangle size={15} className="mt-px shrink-0" />
            <span>
              Drafts live in this browser only — they aren't on the site and
              they aren't backed up. Export what you want to keep before
              clearing site data or switching machines.
            </span>
          </div>

          <button
            className="adm-btn adm-btn-danger mt-4"
            onClick={() => onReset()}
          >
            <RotateCcw size={13} />
            Discard every draft
          </button>
        </section>
      )}
    </div>
  );
}
