import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  EyeOff,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { en } from "./collections";
import { translationProgress, validateRecord } from "./validate";
import { LANGS, type CollectionDef, type Rec } from "./types";

/**
 * The list of everything in one collection: what exists, what state it's in,
 * and the way into editing it. The badges are the point — at a glance you can
 * see which entries are still drafts, which are missing a translation, and
 * which have something wrong that would stop them being published.
 */

interface Props {
  def: CollectionDef;
  records: Rec[];
  onOpen: (id: string) => void;
  onCreate: () => void;
  onReorder: (ids: string[]) => void;
}

/** Everything a record's row needs to say about itself. */
function rowState(def: CollectionDef, rec: Rec, siblings: Rec[]) {
  const { errors } = validateRecord(def, rec, siblings);
  const progress = translationProgress(def, rec);
  return {
    errors: errors.length,
    untranslated: progress.total - progress.done,
    langsMissing: LANGS.filter((l) =>
      def.fields.some((f) => {
        if (!f.localized) return false;
        const map = rec[f.key] as Record<string, string | string[]> | undefined;
        if (!map) return false;
        const anySet = LANGS.some((x) => {
          const v = map[x];
          return Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim());
        });
        if (!anySet) return false;
        const v = map[l];
        return Array.isArray(v) ? v.length === 0 : !v || !String(v).trim();
      })
    ),
  };
}

export function CollectionView({
  def,
  records,
  onOpen,
  onCreate,
  onReorder,
}: Props) {
  const [query, setQuery] = useState("");

  const ordered = useMemo(() => {
    const list = [...records];
    if (def.order === "sorted" && def.compare) list.sort(def.compare);
    return list;
  }, [records, def]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ordered;
    return ordered.filter((rec) => {
      const haystack = [
        rec.id,
        def.summary(rec).title,
        def.summary(rec).meta,
        ...def.fields.map((f) =>
          f.localized ? en(rec[f.key]) : String(rec[f.key] ?? "")
        ),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [ordered, query, def]);

  // Groups in the order their first record appears.
  const groups = useMemo(() => {
    if (!def.groupBy) return [{ name: "", records: filtered }];
    const out: { name: string; records: Rec[] }[] = [];
    for (const rec of filtered) {
      const name = def.groupBy(rec);
      const existing = out.find((g) => g.name === name);
      if (existing) existing.records.push(rec);
      else out.push({ name, records: [rec] });
    }
    return out;
  }, [filtered, def]);

  const move = (id: string, direction: -1 | 1) => {
    const ids = ordered.map((r) => r.id);
    const from = ids.indexOf(id);
    const to = from + direction;
    if (from === -1 || to < 0 || to >= ids.length) return;
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    onReorder(ids);
  };

  const draftCount = records.filter((r) => r.published === false).length;

  return (
    <div className="mx-auto max-w-4xl px-5 py-7 sm:px-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="adm-serif text-2xl text-[var(--c-f0ead8)]">{def.label}</h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--c-8a8071)]">
            {def.blurb}
          </p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={onCreate}>
          <Plus size={14} />
          New {def.singular}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--c-5e564f)]"
          />
          <input
            className="adm-input pl-9"
            placeholder={`Search ${def.label}…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <span className="text-[12.5px] text-[var(--c-7b7267)]">
          {records.length} {records.length === 1 ? "entry" : "entries"}
          {draftCount > 0 && ` · ${draftCount} unpublished`}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="adm-panel px-6 py-14 text-center">
          <p className="text-[var(--c-8a8071)]">
            {query
              ? `Nothing here matches “${query}”.`
              : `Nothing here yet.`}
          </p>
          {!query && (
            <button className="adm-btn mt-4" onClick={onCreate}>
              <Plus size={14} />
              Add the first one
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.name || "all"}>
              {group.name && (
                <h2 className="adm-kicker mb-2 px-1">
                  {group.name}
                  <span className="ml-2 text-[var(--c-5e564f)]">
                    {group.records.length}
                  </span>
                </h2>
              )}
              <div className="adm-panel overflow-hidden">
                {group.records.map((rec) => {
                  const { title, meta } = def.summary(rec);
                  const state = rowState(
                    def,
                    rec,
                    records.filter((r) => r !== rec)
                  );
                  const index = ordered.indexOf(rec);

                  return (
                    <div key={rec.id || index} className="flex items-stretch">
                      <button
                        className="adm-row min-w-0 flex-1"
                        onClick={() => onOpen(rec.id)}
                      >
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                          <span className="truncate text-[14.5px] font-medium text-[var(--c-eee8dd)]">
                            {title}
                          </span>
                          {rec.featured === true && (
                            <span className="adm-badge adm-badge-ok">
                              <Star size={9} />
                              Featured
                            </span>
                          )}
                          {rec.published === false && (
                            <span className="adm-badge">
                              <EyeOff size={9} />
                              Draft
                            </span>
                          )}
                          {state.errors > 0 && (
                            <span className="adm-badge adm-badge-error">
                              <AlertTriangle size={9} />
                              {state.errors} to fix
                            </span>
                          )}
                          {state.errors === 0 && state.langsMissing.length > 0 && (
                            <span className="adm-badge adm-badge-warn">
                              No {state.langsMissing.map((l) => l.toUpperCase()).join(" / ")}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--c-7b7267)]">
                          <span>{meta}</span>
                          <span className="adm-mono text-[var(--c-5e564f)]">
                            {rec.id}
                          </span>
                        </div>
                      </button>

                      {def.order === "manual" && !query && (
                        <div className="flex shrink-0 flex-col justify-center gap-px border-b border-[var(--seam)] pr-2">
                          <button
                            className="adm-btn adm-btn-ghost adm-btn-sm px-1.5"
                            title="Move up"
                            disabled={index === 0}
                            onClick={() => move(rec.id, -1)}
                          >
                            <ChevronUp size={13} />
                          </button>
                          <button
                            className="adm-btn adm-btn-ghost adm-btn-sm px-1.5"
                            title="Move down"
                            disabled={index === ordered.length - 1}
                            onClick={() => move(rec.id, 1)}
                          >
                            <ChevronDown size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
