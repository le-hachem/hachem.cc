import { useEffect } from "react";

/* ------------------------------------------------------------------ *
 * Easter eggs — small, quiet delights for the curious.               *
 * ------------------------------------------------------------------ */

let audioCtx: AudioContext | null = null;

/** [frequency (or chord), duration] */
type Note = [number | number[], number];

/** Schedules a sequence of notes on a soft triangle "bell". Created lazily on
 *  the first user gesture so audio never autoplays. */
function playSeq(seq: Note[]) {
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    audioCtx = audioCtx ?? new Ctor();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    const ctx = audioCtx;

    let t0 = ctx.currentTime + 0.03;
    seq.forEach(([f, dur], i) => {
      const last = i === seq.length - 1;
      const tail = last ? dur : dur * 0.92;
      const freqs = Array.isArray(f) ? f : [f];
      const peak = freqs.length > 1 ? 0.12 : 0.17; // keep chords from clipping

      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + tail);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + tail + 0.05);
      });
      t0 += dur;
    });
  } catch {
    /* audio unavailable — stay silent */
  }
}

/**
 * The nameplate's motif: an eighth-note H pickup, then H · A · C · H
 * (quarters), a triplet E · B♮ · G, and a held D above the G.
 * (German note names — H = B♮.)
 */
export function playCipher() {
  playSeq([
    [493.88, 0.17], // H — B4 (eighth-note pickup)
    [493.88, 0.34], // H — B4
    [440.0, 0.34],  // A — A4
    [523.25, 0.34], // C — C5
    [493.88, 0.34], // H — B4
    [659.25, 0.16], // E5 ┐
    [493.88, 0.16], // B4 │ triplet (B natural)
    [392.0, 0.16],  // G4 ┘
    [587.33, 1.2],  // D — D5, above the G, held
  ]);
}

/** The BACH motif — B♭ · A · C · B♮ — a nod to the elder cipher. */
export function playBach() {
  playSeq([
    [466.16, 0.34], // B♭4
    [440.0, 0.34],  // A4
    [523.25, 0.34], // C5
    [493.88, 1.0],  // B♮4 (held)
  ]);
}

export function EasterEggs() {
  useEffect(() => {
    // 1) A colophon for anyone who opens the source / console.
    try {
      // eslint-disable-next-line no-console
      console.log(
        "%c♪ Hachem — Composer's Record%c\n" +
          "You found the source. Hello, fellow reader.\n" +
          "The nameplate is a cipher — it spells H·A·C·H·Em. Click it to hear.\n" +
          "(Try typing “bach”, too.)",
        "font:700 15px Georgia,serif;color:#e6e0d5",
        "font:italic 12px Georgia,serif;color:#8a8071"
      );
    } catch {
      /* ignore */
    }

    // 2) When you leave the tab, the paper falls silent — "tacet".
    let savedTitle = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        savedTitle = document.title;
        document.title = "— tacet —";
      } else {
        document.title = savedTitle;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // 3) Keyboard secrets: the Konami code (cipher encore) and typing "bach".
    const konami = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let kpos = 0;
    let typed = "";
    const flashTitle = (msg: string) => {
      const prev = document.title;
      document.title = msg;
      window.setTimeout(() => {
        if (!document.hidden) document.title = prev;
      }, 2200);
    };
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // Konami → encore of the cipher.
      kpos = key === konami[kpos] ? kpos + 1 : key === konami[0] ? 1 : 0;
      if (kpos === konami.length) {
        kpos = 0;
        playCipher();
        flashTitle("♪ encore ♪");
      }

      // Type "bach" → the BACH motif.
      if (/^[a-z]$/.test(key)) {
        typed = (typed + key).slice(-4);
        if (typed === "bach") {
          typed = "";
          playBach();
          flashTitle("♪ B–A–C–H ♪");
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
