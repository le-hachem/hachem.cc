import { SEEDS, seedSettings } from "./collections";
import type { Rec } from "./types";

/**
 * Where the console reads and writes content.
 *
 * There are two implementations behind one interface. With no backend the
 * console keeps drafts in this browser and you publish by pasting the export
 * into the repo. Point VITE_ADMIN_API at a server and the same screens start
 * talking to it instead — nothing above this file knows which is in use.
 *
 * The HTTP contract a backend has to satisfy is documented in README.md next
 * to this file; it is deliberately small.
 */

export type StoreMode = "local" | "http";

export interface ContentStore {
  mode: StoreMode;
  list(collection: string): Promise<Rec[]>;
  /** Insert or update. `previousId` is set when a record's id was edited. */
  save(collection: string, rec: Rec, previousId?: string): Promise<Rec[]>;
  remove(collection: string, id: string): Promise<Rec[]>;
  /** Persist a manual ordering; ids arrive in the order they should appear. */
  reorder(collection: string, ids: string[]): Promise<Rec[]>;
  settings(): Promise<Record<string, boolean>>;
  saveSettings(values: Record<string, boolean>): Promise<void>;
  /** Only a backend can accept files; the local store leaves this undefined. */
  upload?(file: File): Promise<string>;
  /** Local only: throw away drafts and return to the content in the repo. */
  reset?(collection?: string): Promise<void>;
}

export const API_BASE = (
  (import.meta.env as Record<string, string | undefined>).VITE_ADMIN_API ?? ""
).replace(/\/+$/, "");

export const isHttpMode = API_BASE.length > 0;

const TOKEN_KEY = "hh-admin-token";

export function getToken(): string {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

export function setToken(token: string): void {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private browsing — the session simply won't survive a reload */
  }
}

/** Thrown when the backend rejects the request; `status` drives the UI. */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/* ------------------------------------------------------------------ */
/* Local store — drafts in this browser, seeded from the shipped site  */
/* ------------------------------------------------------------------ */

const LOCAL_PREFIX = "hh-admin:v1:";
const SETTINGS_KEY = `${LOCAL_PREFIX}settings`;

function readLocal(collection: string): Rec[] {
  const key = LOCAL_PREFIX + collection;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as Rec[];
    }
  } catch {
    /* corrupt or unavailable — fall back to the shipped content */
  }
  return SEEDS[collection]?.() ?? [];
}

function writeLocal(collection: string, records: Rec[]): Rec[] {
  try {
    localStorage.setItem(LOCAL_PREFIX + collection, JSON.stringify(records));
  } catch (err) {
    throw new Error(
      "Couldn't save to this browser's storage — it may be full or blocked. " +
        String(err)
    );
  }
  return records;
}

/** Whether a collection has drafts that differ from what shipped. */
export function hasLocalDrafts(collection: string): boolean {
  try {
    return localStorage.getItem(LOCAL_PREFIX + collection) !== null;
  } catch {
    return false;
  }
}

function upsert(records: Rec[], rec: Rec, previousId?: string): Rec[] {
  const target = previousId ?? rec.id;
  const index = records.findIndex((r) => r.id === target);
  if (index === -1) return [...records, rec];
  const next = [...records];
  next[index] = rec;
  return next;
}

const localStore: ContentStore = {
  mode: "local",
  async list(collection) {
    return readLocal(collection);
  },
  async save(collection, rec, previousId) {
    return writeLocal(collection, upsert(readLocal(collection), rec, previousId));
  },
  async remove(collection, id) {
    return writeLocal(
      collection,
      readLocal(collection).filter((r) => r.id !== id)
    );
  },
  async reorder(collection, ids) {
    const records = readLocal(collection);
    const byId = new Map(records.map((r) => [r.id, r]));
    const ordered = ids
      .map((id) => byId.get(id))
      .filter((r): r is Rec => Boolean(r));
    // Anything the caller didn't mention keeps its place at the end.
    for (const r of records) if (!ids.includes(r.id)) ordered.push(r);
    return writeLocal(collection, ordered);
  },
  async settings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return { ...seedSettings(), ...JSON.parse(raw) };
    } catch {
      /* fall through to the built values */
    }
    return seedSettings();
  },
  async saveSettings(values) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(values));
    } catch {
      /* ignore — the export still reflects what's on screen */
    }
  },
  async reset(collection) {
    const keys = collection
      ? [LOCAL_PREFIX + collection]
      : [
          ...Object.keys(SEEDS).map((k) => LOCAL_PREFIX + k),
          SETTINGS_KEY,
        ];
    for (const k of keys) {
      try {
        localStorage.removeItem(k);
      } catch {
        /* ignore */
      }
    }
  },
};

/* ------------------------------------------------------------------ */
/* HTTP store — the same operations against a real backend            */
/* ------------------------------------------------------------------ */

async function request<T>(
  path: string,
  init: RequestInit = {},
  parse = true
): Promise<T> {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(API_BASE + path, {
      ...init,
      headers: {
        ...(init.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError(0, `Couldn't reach the server at ${API_BASE}.`);
  }

  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body && typeof body.error === "string") message = body.error;
    } catch {
      /* not a JSON error body */
    }
    throw new ApiError(res.status, message);
  }

  if (!parse || res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const httpStore: ContentStore = {
  mode: "http",
  list: (collection) => request<Rec[]>(`/api/${collection}`),
  save: (collection, rec, previousId) =>
    request<Rec[]>(`/api/${collection}/${encodeURIComponent(previousId ?? rec.id)}`, {
      method: "PUT",
      body: JSON.stringify(rec),
    }),
  remove: (collection, id) =>
    request<Rec[]>(`/api/${collection}/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
  reorder: (collection, ids) =>
    request<Rec[]>(`/api/${collection}/reorder`, {
      method: "POST",
      body: JSON.stringify({ ids }),
    }),
  settings: () => request<Record<string, boolean>>("/api/settings"),
  saveSettings: (values) =>
    request<void>(
      "/api/settings",
      { method: "PUT", body: JSON.stringify(values) },
      false
    ),
  async upload(file) {
    const form = new FormData();
    form.append("file", file);
    const { url } = await request<{ url: string }>("/api/uploads", {
      method: "POST",
      body: form,
    });
    return url;
  },
};

export const store: ContentStore = isHttpMode ? httpStore : localStore;

/* ------------------------------------------------------------------ */
/* Auth — only meaningful once a backend is answering                  */
/* ------------------------------------------------------------------ */

/** Confirm the stored token is still good. Always true without a backend. */
export async function checkSession(): Promise<boolean> {
  if (!isHttpMode) return true;
  if (!getToken()) return false;
  try {
    await request<{ ok: boolean }>("/api/auth/me");
    return true;
  } catch {
    return false;
  }
}

export async function login(password: string): Promise<void> {
  const { token } = await request<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  if (!token) throw new ApiError(500, "The server didn't return a token.");
  setToken(token);
}

export function logout(): void {
  setToken("");
}
