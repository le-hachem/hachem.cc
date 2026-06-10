import { useState } from "react";
import { motion } from "motion/react";

/**
 * Portrait pulled live from the GitHub avatar (kept in sync with Instagram
 * by its owner), so updating the profile picture there updates the site
 * automatically — no rebuild. Overridable via VITE_AVATAR_URL.
 */
const AVATAR_URL =
  (import.meta.env.VITE_AVATAR_URL as string | undefined) ??
  "https://avatars.githubusercontent.com/u/83752039?s=480";

export function ProfilePortrait({ className = "" }: { className?: string }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true, margin: "-40px" }}
      className={`border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="p-2.5">
        <div className="relative aspect-square overflow-hidden border border-neutral-100 bg-neutral-50">
          {!errored ? (
            <img
              src={AVATAR_URL}
              alt="Hachem H., portrait"
              loading="lazy"
              draggable={false}
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            /* Monogram fallback if the avatar can't be fetched */
            <div className="h-full w-full flex items-center justify-center">
              <span className="font-display font-black text-4xl text-neutral-300 select-none">
                H.H.
              </span>
            </div>
          )}
        </div>

        <div className="mt-2.5 text-center border-t border-neutral-100 pt-2.5">
          <p className="text-xs font-serif font-bold uppercase tracking-wide">
            Moi
          </p>
        </div>
      </div>
    </motion.div>
  );
}
