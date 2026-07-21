/**
 * The console's passphrase, stored as a PBKDF2-SHA-256 hash.
 *
 * Set this from the console itself: open /admin, type the passphrase you want
 * into the setup screen, and paste the block it prints over `passphrase`
 * below. The passphrase itself is never written down anywhere — only the salt
 * and the derived hash, which is what gets committed.
 *
 * ── What this does and doesn't do ────────────────────────────────────────
 * While the site is a static build there is no server to check anything, so
 * this check runs in JavaScript the visitor has already downloaded. It keeps
 * the console out of reach of anyone who wanders to /admin, and a strong
 * passphrase behind 600k PBKDF2 iterations makes guessing it expensive. It is
 * NOT a security boundary: someone who opens devtools can step past the check,
 * because the code doing the checking is theirs to edit.
 *
 * That is survivable today, because the console only edits drafts in the
 * visitor's own browser — it cannot change hachem.cc, which is published by
 * committing to the repo. When VITE_ADMIN_API is set and content lives on a
 * server, the server's own login becomes the real boundary and this file stops
 * being what stands between a stranger and the content.
 */

export interface PassphraseConfig {
  /** Base64 random salt, unique to this passphrase. */
  salt: string;
  /** PBKDF2 iteration count. */
  iterations: number;
  /** Base64 derived key. */
  hash: string;
}

/**
 * Set from the console's setup screen. To change the passphrase, put this back
 * to `null`, reload /admin, and set a new one.
 */
export const passphrase: PassphraseConfig | null = {
  salt: "wwhfQYRFWKbZ/0fGk9ptyw==",
  iterations: 600000,
  hash: "xURn9PNqunP1eaQhjbUGW64z+IKm8rAvjlv3+MPVmrs=",
};
