import { useEffect, useState } from "react";
import { AlertTriangle, Check, Copy, Info, KeyRound, Lock } from "lucide-react";
import {
  ITERATIONS,
  createConfig,
  cryptoAvailable,
  lockoutRemaining,
  recordFailure,
  recordSuccess,
  unlock,
  verify,
} from "./auth";
import { API_BASE, login } from "./store";

/**
 * The three ways into the console: the server login when a backend is
 * configured, the passphrase lock when one has been set, and the setup screen
 * that creates a passphrase the first time.
 */

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="adm flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="adm-serif text-xl text-[var(--c-f0ead8)]">
            Composer’s Record
          </h1>
          <p className="adm-kicker mt-1">{title}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Shown when VITE_ADMIN_API is set: the server decides. */
export function ServerLogin({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFailure("");
    try {
      await login(password);
      setPassword("");
      onDone();
    } catch (err) {
      setFailure(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell title="Sign in">
      <form onSubmit={submit} className="adm-panel p-7">
        <label className="adm-label">Password</label>
        <input
          type="password"
          className="adm-input"
          value={password}
          autoFocus
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {failure && (
          <div className="adm-note adm-note-error mt-4">
            <AlertTriangle size={15} className="mt-px shrink-0" />
            <span>{failure}</span>
          </div>
        )}
        <button
          type="submit"
          className="adm-btn adm-btn-primary mt-5 w-full justify-center"
          disabled={busy || !password}
        >
          {busy ? "Checking…" : "Sign in"}
        </button>
        <p className="adm-help mt-4">
          Checked by {API_BASE}. The token it returns is kept for this tab only.
        </p>
      </form>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

/** The passphrase lock for the static build. */
export function PassphraseLock({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const [wait, setWait] = useState(0);

  // Count the backoff down on screen rather than silently refusing.
  useEffect(() => {
    if (wait <= 0) return;
    const timer = window.setInterval(() => {
      const left = lockoutRemaining();
      setWait(left);
      if (left <= 0) window.clearInterval(timer);
    }, 250);
    return () => window.clearInterval(timer);
  }, [wait]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining() > 0) return;
    setBusy(true);
    setFailure("");
    try {
      if (await verify(value)) {
        recordSuccess();
        unlock();
        setValue("");
        onDone();
      } else {
        recordFailure();
        setWait(lockoutRemaining());
        setFailure("That isn't the passphrase.");
      }
    } catch (err) {
      setFailure(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Shell title="Locked">
      <form onSubmit={submit} className="adm-panel p-7">
        <label className="adm-label">Passphrase</label>
        <input
          type="password"
          className="adm-input"
          value={value}
          autoFocus
          autoComplete="current-password"
          onChange={(e) => setValue(e.target.value)}
        />

        {failure && (
          <div className="adm-note adm-note-error mt-4">
            <AlertTriangle size={15} className="mt-px shrink-0" />
            <span>{failure}</span>
          </div>
        )}

        <button
          type="submit"
          className="adm-btn adm-btn-primary mt-5 w-full justify-center"
          disabled={busy || !value || wait > 0}
        >
          <Lock size={13} />
          {busy
            ? "Checking…"
            : wait > 0
              ? `Wait ${Math.ceil(wait / 1000)}s`
              : "Unlock"}
        </button>

        <p className="adm-help mt-4">
          Checking takes a moment on purpose — the passphrase is stretched
          through {ITERATIONS.toLocaleString("en-GB")} rounds before it's
          compared.
        </p>
      </form>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

/** First run: choose a passphrase and get the config block to commit. */
export function PassphraseSetup({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState("");
  const [again, setAgain] = useState("");
  const [busy, setBusy] = useState(false);
  const [block, setBlock] = useState("");
  const [copied, setCopied] = useState(false);
  const [failure, setFailure] = useState("");

  const tooShort = value.length > 0 && value.length < 12;
  const mismatch = again.length > 0 && again !== value;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tooShort || mismatch || !value) return;
    setBusy(true);
    setFailure("");
    try {
      const config = await createConfig(value);
      setBlock(
        `export const passphrase: PassphraseConfig | null = {\n` +
          `  salt: ${JSON.stringify(config.salt)},\n` +
          `  iterations: ${config.iterations},\n` +
          `  hash: ${JSON.stringify(config.hash)},\n` +
          `};\n`
      );
      setValue("");
      setAgain("");
    } catch (err) {
      setFailure(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  if (!cryptoAvailable()) {
    return (
      <Shell title="Setup">
        <div className="adm-note adm-note-error">
          <AlertTriangle size={15} className="mt-px shrink-0" />
          <span>
            This browser won't do the crypto needed to set a passphrase. That
            usually means the page isn't on https or localhost.
          </span>
        </div>
      </Shell>
    );
  }

  if (block) {
    return (
      <Shell title="Setup">
        <div className="adm-panel p-6">
          <h2 className="text-[15px] text-[var(--c-eee8dd)]">
            Paste this into the repo
          </h2>
          <p className="adm-help mt-1.5">
            Replace the <code className="adm-mono">passphrase</code> line at the
            bottom of{" "}
            <code className="adm-mono">src/admin/auth.config.ts</code>, then
            commit. The passphrase itself isn't in here — only its salt and
            hash — so this is safe to keep in a public repo.
          </p>

          <pre className="adm-code mt-4">{block}</pre>

          <div className="mt-3 flex gap-2">
            <button
              className="adm-btn"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(block);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1600);
                } catch {
                  /* clipboard blocked — it's on screen to select by hand */
                }
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              className="adm-btn adm-btn-primary flex-1 justify-center"
              onClick={() => {
                unlock();
                onDone();
              }}
            >
              Done — open the console
            </button>
          </div>

          <div className="adm-note adm-note-warn mt-4">
            <Info size={15} className="mt-px shrink-0" />
            <span>
              The lock only appears once this is committed and deployed. Until
              then /admin stays open — and even after, it's a deterrent rather
              than a wall, since the check runs in the browser. See the note at
              the top of auth.config.ts.
            </span>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell title="Setup">
      <form onSubmit={submit} className="adm-panel p-7">
        <div className="adm-note mb-5">
          <KeyRound size={15} className="mt-px shrink-0" />
          <span>
            No passphrase is set yet. Choose one and you'll get a block to paste
            into the repo — it's never sent anywhere, and never written down
            except as a hash.
          </span>
        </div>

        <label className="adm-label">Passphrase</label>
        <input
          type="password"
          className={`adm-input ${tooShort ? "adm-invalid" : ""}`}
          value={value}
          autoFocus
          autoComplete="new-password"
          onChange={(e) => setValue(e.target.value)}
        />
        {tooShort && (
          <p className="adm-field-error">Use at least 12 characters.</p>
        )}
        <p className="adm-help">
          A few unrelated words beat a short clever one — length is what makes
          guessing expensive.
        </p>

        <label className="adm-label mt-4">Again</label>
        <input
          type="password"
          className={`adm-input ${mismatch ? "adm-invalid" : ""}`}
          value={again}
          autoComplete="new-password"
          onChange={(e) => setAgain(e.target.value)}
        />
        {mismatch && <p className="adm-field-error">These don't match.</p>}

        {failure && (
          <div className="adm-note adm-note-error mt-4">
            <AlertTriangle size={15} className="mt-px shrink-0" />
            <span>{failure}</span>
          </div>
        )}

        <button
          type="submit"
          className="adm-btn adm-btn-primary mt-5 w-full justify-center"
          disabled={busy || !value || tooShort || mismatch || !again}
        >
          {busy ? "Deriving…" : "Create passphrase"}
        </button>

        <button
          type="button"
          className="adm-btn adm-btn-ghost mt-2 w-full justify-center"
          onClick={() => {
            unlock();
            onDone();
          }}
        >
          Skip for now
        </button>
      </form>
    </Shell>
  );
}
