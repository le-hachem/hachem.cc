import { useMemo, useState } from "react";
import { Check, Copy, Download, FileCode2, Info } from "lucide-react";
import { COLLECTIONS, SETTINGS } from "./collections";
import { serializeEnv, serializeJson } from "./serialize";
import type { Rec } from "./types";

/**
 * Publishing, for as long as the site is a static build.
 *
 * Each collection is rendered back as the TypeScript array that lives in its
 * source file: copy it, replace the `source` array, commit, and the deploy
 * workflow does the rest. Unpublished records are left out.
 *
 * The JSON tab is the same content in the shape the HTTP store expects, which
 * is what you'd seed the database with the day the site moves to a server.
 */

interface Props {
  data: Record<string, Rec[]>;
  settings: Record<string, boolean>;
  mode: "local" | "http";
}

function download(filename: string, contents: string) {
  const url = URL.createObjectURL(new Blob([contents], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="adm-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked — the text is on screen to select by hand */
        }
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function ExportView({ data, settings, mode }: Props) {
  const tabs = useMemo(() => {
    const out = COLLECTIONS.map((def) => {
      const records = data[def.key] ?? [];
      const held = records.filter((r) => r.published === false).length;
      return {
        key: def.key,
        label: def.label,
        filename: def.file.split("/").pop() ?? `${def.key}.ts`,
        target: def.file,
        instruction: `In ${def.file}, replace ${def.replaces} with this.`,
        contents: def.serialize(records),
        held,
      };
    });

    out.push({
      key: "json",
      label: "JSON",
      filename: "content.json",
      target: "",
      instruction:
        "Every collection in one file, in the shape the console's HTTP store reads and writes — what a backend would be seeded with.",
      contents: serializeJson(
        Object.fromEntries(COLLECTIONS.map((d) => [d.key, data[d.key] ?? []]))
      ),
      held: 0,
    });

    out.push({
      key: "env",
      label: ".env",
      filename: ".env",
      target: ".env",
      instruction:
        "The build-time flags. These are read when the site is built, so they take effect on the next deploy.",
      contents: serializeEnv(
        Object.fromEntries(SETTINGS.map((s) => [s.key, settings[s.key] === true]))
      ),
      held: 0,
    });

    return out;
  }, [data, settings]);

  const [active, setActive] = useState(tabs[0].key);
  const tab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="mx-auto max-w-4xl px-5 py-7 sm:px-8">
      <div className="mb-5">
        <h1 className="adm-serif text-2xl text-[var(--c-f0ead8)]">Publish</h1>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-[var(--c-8a8071)]">
          {mode === "local"
            ? "The site is built from the files in the repo, so publishing means pasting these back in and committing. Each tab is one file's worth of content, generated from what you've edited here."
            : "Content is saved on the server as you edit, so this is a snapshot rather than the publishing route — useful for committing the current state back into the repo."}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`adm-btn adm-btn-sm ${t.key === active ? "adm-btn-primary" : ""}`}
            onClick={() => setActive(t.key)}
          >
            <FileCode2 size={12} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="adm-note mb-3">
        <Info size={15} className="mt-px shrink-0" />
        <span>
          {tab.instruction}
          {tab.held > 0 && (
            <>
              {" "}
              <strong className="font-semibold">
                {tab.held} unpublished{" "}
                {tab.held === 1 ? "entry is" : "entries are"} left out.
              </strong>
            </>
          )}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <code className="adm-mono text-[var(--c-8a8071)]">
          {tab.target || tab.filename}
        </code>
        <div className="flex gap-2">
          <CopyButton text={tab.contents} />
          <button
            className="adm-btn"
            onClick={() => download(tab.filename, tab.contents)}
          >
            <Download size={13} />
            Download
          </button>
        </div>
      </div>

      <pre className="adm-code">{tab.contents}</pre>
    </div>
  );
}
