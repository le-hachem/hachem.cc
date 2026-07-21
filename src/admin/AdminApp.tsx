import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ExternalLink,
  Feather,
  Library,
  Loader2,
  LogOut,
  Moon,
  Newspaper,
  Settings2,
  Sun,
  Upload,
} from "lucide-react";
import { CollectionView } from "./CollectionView";
import { ExportView } from "./ExportView";
import { RecordEditor } from "./RecordEditor";
import { SettingsView } from "./SettingsView";
import { COLLECTIONS, collectionByKey } from "./collections";
import {
  API_BASE,
  checkSession,
  isHttpMode,
  logout,
  store,
} from "./store";
import { collectionIssues } from "./validate";
import { PassphraseLock, PassphraseSetup, ServerLogin } from "./GateScreens";
import { isConfigured, isUnlocked, lock } from "./auth";
import {
  LANGS,
  LANG_LABEL,
  blankRecord,
  type Lang,
  type Rec,
} from "./types";
import { THEMES, applyTheme, readStoredTheme } from "../app/theme";
import "./admin.css";

/**
 * The console shell: navigation, the loaded content, and the routing between
 * a collection's list and its editor.
 *
 * Routing is on the hash (#/works/myrrha) rather than the path, so this works
 * unchanged on GitHub Pages today and behind any server later without needing
 * a rewrite rule.
 */

const ICONS: Record<string, typeof CalendarDays> = {
  concerts: CalendarDays,
  dispatches: Newspaper,
  compositions: Library,
  lili: Feather,
};

type Route =
  | { view: "collection"; key: string }
  | { view: "editor"; key: string; id: string }
  | { view: "publish" }
  | { view: "settings" };

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [head, id] = raw.split("/").filter(Boolean);
  if (head === "publish") return { view: "publish" };
  if (head === "settings") return { view: "settings" };
  const def = collectionByKey(head ?? "");
  if (!def) return { view: "collection", key: COLLECTIONS[0].key };
  if (id) return { view: "editor", key: def.key, id };
  return { view: "collection", key: def.key };
}

function go(hash: string) {
  window.location.hash = hash;
}

/* ------------------------------------------------------------------ */

export default function AdminApp() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [data, setData] = useState<Record<string, Rec[]>>({});
  const [settings, setSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  // Locked until the gate says otherwise: the server in http mode, the
  // passphrase session in the static build. Which screen the gate shows when
  // locked — setup or the lock itself — depends on whether a passphrase has
  // been committed yet; either way it is `unlock()` that opens the console.
  const [authed, setAuthed] = useState(isHttpMode ? false : isUnlocked());
  const [toast, setToast] = useState("");
  const [dirty, setDirty] = useState(false);

  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("hh-admin-lang");
      return LANGS.includes(saved as Lang) ? (saved as Lang) : "en";
    } catch {
      return "en";
    }
  });
  const [showAllLangs, setShowAllLangs] = useState(false);
  const [theme, setTheme] = useState<string>(readStoredTheme);

  useEffect(() => applyTheme(theme), [theme]);
  useEffect(() => {
    try {
      localStorage.setItem("hh-admin-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  /* ── Routing ───────────────────────────────────────────────────── */

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) go(`/${COLLECTIONS[0].key}`);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Leaving a half-written record by accident is the one loss this tool can
  // actually cause, so both exits are guarded.
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  const navigate = useCallback(
    (hash: string) => {
      if (dirty && !window.confirm("Leave without saving your changes?")) return;
      setDirty(false);
      go(hash);
    },
    [dirty]
  );

  /* ── Loading ───────────────────────────────────────────────────── */

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const entries = await Promise.all(
        COLLECTIONS.map(async (def) => [def.key, await store.list(def.key)] as const)
      );
      setData(Object.fromEntries(entries));
      setSettings(await store.settings());
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // In http mode a stored token still has to be accepted by the server.
      const ok = isHttpMode ? await checkSession() : isUnlocked();
      if (cancelled) return;
      setAuthed(ok);
      if (ok) void load();
      else setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  const flash = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }, []);

  /* ── Mutations ─────────────────────────────────────────────────── */

  const handleSave = useCallback(
    async (collection: string, rec: Rec, previousId?: string) => {
      const next = await store.save(collection, rec, previousId);
      setData((d) => ({ ...d, [collection]: next }));
      setDirty(false);
      const def = collectionByKey(collection);
      flash(`Saved. ${def?.singular ?? "Entry"} “${rec.id}” is up to date.`);
      go(`/${collection}`);
    },
    [flash]
  );

  const handleDelete = useCallback(
    async (collection: string, id: string) => {
      const next = await store.remove(collection, id);
      setData((d) => ({ ...d, [collection]: next }));
      setDirty(false);
      flash(`Deleted “${id}”.`);
      go(`/${collection}`);
    },
    [flash]
  );

  const handleReorder = useCallback(
    async (collection: string, ids: string[]) => {
      const next = await store.reorder(collection, ids);
      setData((d) => ({ ...d, [collection]: next }));
    },
    []
  );

  const handleSetting = useCallback(
    async (key: string, value: boolean) => {
      const next = { ...settings, [key]: value };
      setSettings(next);
      await store.saveSettings(next);
    },
    [settings]
  );

  const handleReset = useCallback(
    async (collection?: string) => {
      const what = collection
        ? `every draft in ${collectionByKey(collection)?.label ?? collection}`
        : "every draft in this browser";
      if (!window.confirm(`Discard ${what} and go back to what's in the repo?`))
        return;
      await store.reset?.(collection);
      await load();
      flash("Back to the content in the repo.");
    },
    [load, flash]
  );

  /* ── Login gate ────────────────────────────────────────────────── */

  if (!authed) {
    const opened = () => {
      setAuthed(true);
      void load();
    };
    if (isHttpMode) return <ServerLogin onDone={opened} />;
    // No passphrase committed yet: offer to create one rather than silently
    // leaving the console open.
    if (!isConfigured()) return <PassphraseSetup onDone={opened} />;
    return <PassphraseLock onDone={opened} />;
  }

  /* ── Frame ─────────────────────────────────────────────────────── */

  const activeKey =
    route.view === "collection" || route.view === "editor" ? route.key : "";
  const isLight = THEMES[theme]?.light ?? false;

  return (
    <div className="adm">
      <div className="flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-50 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[var(--seam)] bg-[var(--c-151414)] px-4 py-2.5">
          <div className="mr-auto flex min-w-0 items-baseline gap-2.5">
            <span className="adm-serif truncate text-[15px] text-[var(--c-f0ead8)]">
              Composer’s Record
            </span>
            <span className="adm-kicker">Desk</span>
          </div>

          {/* Language — which translation every field shows */}
          <div className="flex items-center gap-1">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`adm-btn adm-btn-sm ${l === lang ? "adm-btn-primary" : "adm-btn-ghost"}`}
                onClick={() => setLang(l)}
                title={LANG_LABEL[l]}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <span
            className={`adm-badge ${isHttpMode ? "adm-badge-ok" : ""}`}
            title={
              isHttpMode
                ? `Saving to ${API_BASE}`
                : "No backend connected — edits are drafts in this browser, published by exporting."
            }
          >
            {isHttpMode ? "Live" : "Local drafts"}
          </span>

          <button
            className="adm-btn adm-btn-ghost adm-btn-sm"
            onClick={() => setTheme(isLight ? "night" : "day")}
            title="Switch printing"
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <a
            className="adm-btn adm-btn-ghost adm-btn-sm"
            href="/"
            target="_blank"
            rel="noreferrer"
            title="Open the site"
          >
            <ExternalLink size={14} />
          </a>

          {(isHttpMode || isConfigured()) && (
            <button
              className="adm-btn adm-btn-ghost adm-btn-sm"
              onClick={() => {
                logout();
                lock();
                setAuthed(false);
              }}
              title={isHttpMode ? "Sign out" : "Lock the console"}
            >
              <LogOut size={14} />
            </button>
          )}
        </header>

        <div className="flex flex-1 flex-col md:flex-row">
          {/* Rail */}
          <nav className="shrink-0 border-b border-[var(--seam)] p-3 md:w-56 md:border-b-0 md:border-r">
            {/* A scrolling row on narrow screens, a rail from md up. Without
                the scroll, Publish and Settings fall off the right edge on a
                phone with no way to reach them. */}
            <div className="flex gap-1.5 overflow-x-auto md:flex-col md:overflow-x-visible">
              {COLLECTIONS.map((def) => {
                const Icon = ICONS[def.key] ?? Library;
                const records = data[def.key] ?? [];
                const issues = collectionIssues(def, records);
                return (
                  <button
                    key={def.key}
                    className="adm-nav w-auto shrink-0 md:w-full"
                    aria-current={activeKey === def.key ? "page" : undefined}
                    onClick={() => navigate(`/${def.key}`)}
                  >
                    <Icon size={15} className="shrink-0" />
                    <span className="flex-1 truncate">{def.label}</span>
                    {issues.errors > 0 ? (
                      <span className="adm-badge adm-badge-error">
                        {issues.errors}
                      </span>
                    ) : (
                      <span className="text-[12px] text-[var(--c-5e564f)]">
                        {records.length}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="hidden h-4 md:block" />

              <button
                className="adm-nav w-auto shrink-0 md:w-full"
                aria-current={route.view === "publish" ? "page" : undefined}
                onClick={() => navigate("/publish")}
              >
                <Upload size={15} className="shrink-0" />
                <span className="flex-1 truncate">Publish</span>
              </button>
              <button
                className="adm-nav w-auto shrink-0 md:w-full"
                aria-current={route.view === "settings" ? "page" : undefined}
                onClick={() => navigate("/settings")}
              >
                <Settings2 size={15} className="shrink-0" />
                <span className="flex-1 truncate">Settings</span>
              </button>
            </div>
          </nav>

          {/* Main */}
          <main className="min-w-0 flex-1">
            {loading ? (
              <div className="flex items-center justify-center gap-2.5 py-24 text-[var(--c-8a8071)]">
                <Loader2 size={16} className="animate-spin" />
                Loading the paper…
              </div>
            ) : loadError ? (
              <div className="mx-auto max-w-xl px-6 py-16">
                <div className="adm-note adm-note-error">
                  <AlertTriangle size={15} className="mt-px shrink-0" />
                  <span>{loadError}</span>
                </div>
                <button className="adm-btn mt-4" onClick={() => void load()}>
                  Try again
                </button>
              </div>
            ) : (
              <Screen
                route={route}
                data={data}
                settings={settings}
                lang={lang}
                showAllLangs={showAllLangs}
                onPickLang={setLang}
                onToggleAllLangs={() => setShowAllLangs((v) => !v)}
                onNavigate={navigate}
                onSave={handleSave}
                onDelete={handleDelete}
                onReorder={handleReorder}
                onSetting={handleSetting}
                onReset={handleReset}
                onDirtyChange={setDirty}
              />
            )}
          </main>
        </div>
      </div>

      {toast && (
        <div className="adm-toast" role="status">
          <Check size={14} />
          {toast}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

interface ScreenProps {
  route: Route;
  data: Record<string, Rec[]>;
  settings: Record<string, boolean>;
  lang: Lang;
  showAllLangs: boolean;
  onPickLang: (l: Lang) => void;
  onToggleAllLangs: () => void;
  onNavigate: (hash: string) => void;
  onSave: (collection: string, rec: Rec, previousId?: string) => Promise<void>;
  onDelete: (collection: string, id: string) => Promise<void>;
  onReorder: (collection: string, ids: string[]) => Promise<void>;
  onSetting: (key: string, value: boolean) => Promise<void>;
  onReset: (collection?: string) => Promise<void>;
  onDirtyChange: (dirty: boolean) => void;
}

function Screen(props: ScreenProps) {
  const { route, data } = props;

  if (route.view === "publish") {
    return (
      <ExportView data={data} settings={props.settings} mode={store.mode} />
    );
  }

  if (route.view === "settings") {
    return (
      <SettingsView
        settings={props.settings}
        data={data}
        mode={store.mode}
        onChange={(k, v) => void props.onSetting(k, v)}
        onReset={(c) => void props.onReset(c)}
      />
    );
  }

  const def = collectionByKey(route.key);
  if (!def) return null;
  const records = data[def.key] ?? [];

  if (route.view === "collection") {
    return (
      <CollectionView
        def={def}
        records={records}
        onOpen={(id) => props.onNavigate(`/${def.key}/${encodeURIComponent(id)}`)}
        onCreate={() => props.onNavigate(`/${def.key}/new`)}
        onReorder={(ids) => void props.onReorder(def.key, ids)}
      />
    );
  }

  const isNew = route.id === "new";
  const original = isNew
    ? null
    : records.find((r) => r.id === decodeURIComponent(route.id)) ?? null;

  if (!isNew && !original) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <div className="adm-note">
          <AlertTriangle size={15} className="mt-px shrink-0" />
          <span>
            There's no {def.singular} with the id “{decodeURIComponent(route.id)}”.
          </span>
        </div>
        <button
          className="adm-btn mt-4"
          onClick={() => props.onNavigate(`/${def.key}`)}
        >
          Back to {def.label}
        </button>
      </div>
    );
  }

  return (
    <RecordEditor
      key={route.id}
      def={def}
      original={original}
      initial={original ?? blankRecord(def)}
      siblings={records.filter((r) => r !== original)}
      lang={props.lang}
      showAllLangs={props.showAllLangs}
      onPickLang={props.onPickLang}
      onToggleAllLangs={props.onToggleAllLangs}
      onSave={(rec, previousId) => props.onSave(def.key, rec, previousId)}
      onDelete={(id) => props.onDelete(def.key, id)}
      onBack={() => props.onNavigate(`/${def.key}`)}
      onDirtyChange={props.onDirtyChange}
    />
  );
}

/* ------------------------------------------------------------------ */
