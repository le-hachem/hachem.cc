import { passphrase, type PassphraseConfig } from "./auth.config";

/**
 * The passphrase gate for the static build.
 *
 * The passphrase is never stored — only a PBKDF2-SHA-256 hash of it, with a
 * random per-passphrase salt, which is what sits in auth.config.ts. Checking a
 * passphrase means deriving the same key again and comparing.
 *
 * See the note at the top of auth.config.ts for what this protects and what it
 * doesn't. Once a backend is answering, `store.ts` handles auth against the
 * server instead and none of this is involved.
 */

/** OWASP's floor for PBKDF2-SHA-256. Costs about half a second in-browser. */
export const ITERATIONS = 600_000;

const KEY_BITS = 256;
const SESSION_KEY = "hh-admin-unlocked";

/** Whether the browser will do the crypto — needs https or localhost. */
export function cryptoAvailable(): boolean {
  return typeof crypto !== "undefined" && !!crypto.subtle;
}

/** True when a passphrase has been committed to auth.config.ts. */
export function isConfigured(): boolean {
  return passphrase !== null && Boolean(passphrase.hash);
}

const toBase64 = (bytes: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(bytes)));

const fromBase64 = (value: string): Uint8Array =>
  Uint8Array.from(atob(value), (c) => c.charCodeAt(0));

async function derive(
  input: string,
  salt: Uint8Array,
  iterations: number
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(input.normalize("NFKC")),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    key,
    KEY_BITS
  );
  return toBase64(bits);
}

/** Build the config block for a new passphrase, with a fresh random salt. */
export async function createConfig(input: string): Promise<PassphraseConfig> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return {
    salt: toBase64(salt.buffer),
    iterations: ITERATIONS,
    hash: await derive(input, salt, ITERATIONS),
  };
}

/** Compare without short-circuiting on the first differing byte. */
function equal(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Check a passphrase against the committed hash. */
export async function verify(input: string): Promise<boolean> {
  if (!passphrase) return false;
  const candidate = await derive(
    input,
    fromBase64(passphrase.salt),
    passphrase.iterations
  );
  return equal(candidate, passphrase.hash);
}

/* ── Session ──────────────────────────────────────────────────────────── */

/**
 * Unlocking lasts for the tab, not the browser: sessionStorage is cleared when
 * the tab closes, so a shared or forgotten machine doesn't stay open.
 */
export function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlock(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private browsing — the session just won't survive a reload */
  }
}

export function lock(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/* ── Throttling ───────────────────────────────────────────────────────── */

/**
 * A slow, escalating backoff after wrong guesses. PBKDF2 already makes each
 * attempt cost half a second; this makes a run of them tedious rather than
 * merely slow. It lives in memory, so it is a speed bump for a person at the
 * keyboard, not a defence against a script.
 */
let failures = 0;
let blockedUntil = 0;

export function lockoutRemaining(): number {
  return Math.max(0, blockedUntil - Date.now());
}

export function recordFailure(): void {
  failures += 1;
  if (failures >= 3) {
    const seconds = Math.min(60, 2 ** (failures - 2));
    blockedUntil = Date.now() + seconds * 1000;
  }
}

export function recordSuccess(): void {
  failures = 0;
  blockedUntil = 0;
}
