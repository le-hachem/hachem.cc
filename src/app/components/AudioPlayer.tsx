import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";

interface PeaksData {
  duration: number;
  sampleRate: number;
  channels: number;
  buckets: number;
  peaks: number[];
}

interface AudioPlayerProps {
  audioUrl: string;
  peaksUrl?: string;
  /** Fallback duration in seconds if peaks.json is missing. */
  fallbackDuration?: number;
  title?: string;
  subtitle?: string;
  /** Number of bars to render. Defaults to the peak count, or 120 if no peaks. */
  barCount?: number;
}

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Streaming audio player with a pre-computed waveform.
 *
 * - `<audio preload="metadata">` lets the browser pull only the MP3 header
 *   and serve the rest via HTTP Range requests during playback. No full
 *   download up front, so this works on weak connections.
 * - The waveform comes from a tiny peaks.json (~1–2 KB) shipped alongside
 *   the audio, so the visualization renders instantly without decoding
 *   the audio in the browser.
 * - A live AnalyserNode pulse rides on top of the static bars while
 *   playing, so there's still a "living" feel.
 */
export function AudioPlayer({
  audioUrl,
  peaksUrl,
  fallbackDuration,
  title,
  subtitle,
  barCount,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barsRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [peaksData, setPeaksData] = useState<PeaksData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration ?? 0);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const [liveLevel, setLiveLevel] = useState(0);

  // Load peaks JSON (small, non-blocking)
  useEffect(() => {
    if (!peaksUrl) return;
    let cancelled = false;
    fetch(peaksUrl)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PeaksData | null) => {
        if (cancelled || !data) return;
        setPeaksData(data);
        if (data.duration && !duration) setDuration(data.duration);
      })
      .catch(() => {
        /* silent — we have a fallback */
      });
    return () => {
      cancelled = true;
    };
    // duration intentionally excluded: we only want the initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peaksUrl]);

  // Build the bars array: either real peaks or a deterministic placeholder
  const bars: number[] = useMemo(() => {
    if (peaksData?.peaks?.length) return peaksData.peaks;
    const n = barCount ?? 120;
    const out: number[] = [];
    // Deterministic pseudo-random pattern so the placeholder feels "musical"
    for (let i = 0; i < n; i++) {
      const x = i / n;
      const env =
        0.35 +
        0.35 * Math.sin(x * Math.PI) +
        0.18 * Math.sin(x * Math.PI * 7.3) +
        0.1 * Math.sin(x * Math.PI * 17.1);
      out.push(Math.max(0.05, Math.min(1, env)));
    }
    return out;
  }, [peaksData, barCount]);

  // --- Audio event wiring -------------------------------------------------
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onLoadedMeta = () => {
      if (isFinite(el.duration) && el.duration > 0) setDuration(el.duration);
    };
    const onTime = () => setCurrentTime(el.currentTime);
    const onPlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      startAnalyser();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopAnalyser();
    };
    const onEnded = () => {
      setIsPlaying(false);
      stopAnalyser();
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onCanPlay = () => setIsLoading(false);
    el.addEventListener("loadedmetadata", onLoadedMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("canplay", onCanPlay);
    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("canplay", onCanPlay);
      stopAnalyser();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Analyser for live "breath" on top of static waveform ---------------
  const startAnalyser = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      if (!sourceNodeRef.current) {
        sourceNodeRef.current = ctx.createMediaElementSource(el);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.75;
        sourceNodeRef.current.connect(analyser);
        analyser.connect(ctx.destination);
        analyserRef.current = analyser;
      }
      const analyser = analyserRef.current!;
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) sum += buf[i];
        const avg = sum / (buf.length * 255);
        setLiveLevel(avg);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // CORS / autoplay / already-connected — ignore, waveform still works
    }
  }, []);

  const stopAnalyser = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setLiveLevel(0);
  }, []);

  // --- Controls -----------------------------------------------------------
  const togglePlay = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      setIsLoading(true);
      try {
        await el.play();
      } catch {
        setIsLoading(false);
      }
    } else {
      el.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  }, []);

  const seekFromEvent = useCallback(
    (clientX: number) => {
      const el = audioRef.current;
      const box = barsRef.current;
      if (!el || !box || !duration) return;
      const rect = box.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      el.currentTime = ratio * duration;
      setCurrentTime(el.currentTime);
    },
    [duration]
  );

  // Keyboard support on the waveform
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const el = audioRef.current;
      if (!el) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        el.currentTime = Math.max(0, el.currentTime - 5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        el.currentTime = Math.min(duration, el.currentTime + 5);
      }
    },
    [duration, togglePlay]
  );

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="relative border-2 sm:border-4 border-black bg-white shadow-[4px_4px_0_0_rgb(24_24_24)] sm:shadow-[6px_6px_0_0_rgb(24_24_24)] p-3 sm:p-5">
      {/* Decorative corners */}
      <div className="absolute top-1 left-1 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-black pointer-events-none" />
      <div className="absolute top-1 right-1 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-black pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-black pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-black pointer-events-none" />

      {(title || subtitle) && (
        <div className="mb-3 sm:mb-4 border-b-2 border-dashed border-black pb-2">
          {title && (
            <p className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] opacity-70">
              Now Streaming
            </p>
          )}
          {title && (
            <h4 className="text-lg sm:text-2xl font-serif font-bold leading-tight">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm font-serif italic opacity-70">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Play / pause */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center border-2 sm:border-4 border-black bg-black text-white transition-colors hover:bg-neutral-800 active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Play className="h-5 w-5 sm:h-6 sm:w-6 translate-x-[1px]" />
          )}
        </button>

        {/* Waveform */}
        <div
          ref={barsRef}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onClick={(e) => seekFromEvent(e.clientX)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverRatio(
              Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
            );
          }}
          onMouseLeave={() => setHoverRatio(null)}
          className="relative flex h-14 sm:h-20 flex-1 cursor-pointer items-center gap-[2px] overflow-hidden select-none focus:outline-none focus:ring-2 focus:ring-black"
        >
          {bars.map((v, i) => {
            const barCenter = (i + 0.5) / bars.length;
            const played = barCenter <= progress;
            // Live "breath": pulse amplitude slightly during playback, max near
            // the current playhead so it feels alive without lying about peaks.
            const distanceFromPlayhead = Math.abs(barCenter - progress);
            const pulseGain = isPlaying
              ? Math.max(0, 1 - distanceFromPlayhead * 8) * liveLevel * 0.45
              : 0;
            const height = Math.max(0.08, Math.min(1, v + pulseGain));
            return (
              <span
                key={i}
                className={`w-full flex-1 ${
                  played ? "bg-black" : "bg-neutral-400"
                }`}
                style={{
                  height: `${height * 100}%`,
                  transition: "height 80ms linear, background-color 120ms",
                }}
              />
            );
          })}

          {/* Hover marker */}
          {hoverRatio != null && (
            <motion.div
              className="pointer-events-none absolute top-0 bottom-0 w-px bg-black/60"
              style={{ left: `${hoverRatio * 100}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
          {/* Playhead */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-black"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        {/* Mute */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="hidden sm:flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-black bg-white transition-colors hover:bg-neutral-200"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Time readout */}
      <div className="mt-2 sm:mt-3 flex items-center justify-between font-serif text-xs sm:text-sm">
        <span className="tabular-nums">{formatTime(currentTime)}</span>
        <span className="italic opacity-60">
          {isLoading
            ? "buffering…"
            : isPlaying
            ? "streaming"
            : peaksData
            ? "ready"
            : "tap play"}
        </span>
        <span className="tabular-nums">
          {duration ? formatTime(duration) : "—:—"}
        </span>
      </div>

      {/* The audio element itself.
          preload="metadata" → browser fetches only the header; the rest
          streams on demand via HTTP Range requests. No crossOrigin set:
          the audio is served from the same origin as the page (/music/…),
          so the AnalyserNode can read samples without CORS, and we don't
          trip up static hosts that omit CORS headers. */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        className="hidden"
      />
    </div>
  );
}
