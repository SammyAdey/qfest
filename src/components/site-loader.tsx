"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const COVER_VIDEO = "/about/about-landing.mp4";
const COVER_POSTER = "/brand/QFest-key-visual.png";
/** Swap this ID for the real QFest intro when ready (Big Buck Bunny placeholder) */
const YOUTUBE_PLACEHOLDER_ID = "aqz-KE-bpKQ";

/** Homepage + intro assets that should be ready before Enter site */
const CRITICAL_IMAGES = [
  "/brand/poster.png",
  COVER_POSTER,
  "/brand/Qfest-logo.png",
  "/Quramo.PNG",
  "/paper_scroll/top-scroll.png",
  "/paper_scroll/bottom-scroll.png",
  "/paper_scroll/poster-textured-v2.png",
  "/gallery/gallery-01-crowd.png",
  "/gallery/gallery-02-stage.png",
  "/gallery/gallery-03-panel.png",
  "/gallery/gallery-04-books.png",
  "/gallery/gallery-05-networking.png",
] as const;

const CRITICAL_VIDEOS = [
  COVER_VIDEO,
  "/brand/QFest-key-visual-v2.mp4",
] as const;

const ASSET_TIMEOUT_MS = 45_000;
const MIN_LOADER_MS = 600;

type Phase = "loading" | "gate" | "done";

function blobPath(cx: number, cy: number, radius: number, t: number) {
  const points = 8;
  const coords: Array<[number, number]> = [];

  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const wobble =
      Math.sin(t * 1.8 + i * 1.6) * 0.14 + Math.cos(t * 1.1 + i * 0.9) * 0.1;
    const r = radius * (1 + wobble);
    coords.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }

  let d = `M ${coords[0][0]} ${coords[0][1]}`;
  for (let i = 0; i < points; i += 1) {
    const current = coords[i];
    const next = coords[(i + 1) % points];
    const midX = (current[0] + next[0]) / 2;
    const midY = (current[1] + next[1]) / 2;
    d += ` Q ${current[0]} ${current[1]} ${midX} ${midY}`;
  }
  d += " Z";
  return d;
}

function withTimeout(promise: Promise<void>, ms: number) {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) resolve();
  });
}

function loadVideo(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const done = () => {
      video.removeEventListener("canplaythrough", done);
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("error", done);
      video.removeAttribute("src");
      video.load();
      resolve();
    };

    video.addEventListener("canplaythrough", done, { once: true });
    video.addEventListener("error", done, { once: true });
    // Fallback if canplaythrough never fires on some browsers
    video.addEventListener("loadeddata", done, { once: true });
    video.src = src;
    video.load();
  });
}

function waitForFonts() {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(
    () => undefined,
    () => undefined,
  );
}

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

export function SiteLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const coverVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.documentElement.classList.add("intro-lock");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("gate");
      return () => {
        document.documentElement.classList.remove("intro-lock");
      };
    }

    let cancelled = false;
    let frame = 0;

    mouse.current = {
      x: window.innerWidth * 0.28,
      y: window.innerHeight * 0.32,
    };
    cursor.current = { ...mouse.current };

    const onMove = (event: PointerEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const tickBlob = (now: number) => {
      const ease = 0.12;
      cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
      cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.2;
      pathRef.current?.setAttribute(
        "d",
        blobPath(cursor.current.x, cursor.current.y, radius, now / 1000),
      );

      frame = requestAnimationFrame(tickBlob);
    };
    frame = requestAnimationFrame(tickBlob);

    const totalUnits =
      CRITICAL_IMAGES.length + CRITICAL_VIDEOS.length + 2; // fonts + window load
    let completed = 0;

    const markDone = () => {
      if (cancelled) return;
      completed += 1;
      const next = Math.min(99, Math.round((completed / totalUnits) * 100));
      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }
    };

    const startedAt = performance.now();

    void (async () => {
      const tasks: Promise<void>[] = [
        ...CRITICAL_IMAGES.map((src) =>
          withTimeout(loadImage(src), ASSET_TIMEOUT_MS).then(markDone),
        ),
        ...CRITICAL_VIDEOS.map((src) =>
          withTimeout(loadVideo(src), ASSET_TIMEOUT_MS).then(markDone),
        ),
        withTimeout(waitForFonts(), ASSET_TIMEOUT_MS).then(markDone),
        withTimeout(waitForWindowLoad(), ASSET_TIMEOUT_MS).then(markDone),
      ];

      await Promise.all(tasks);
      if (cancelled) return;

      const elapsed = performance.now() - startedAt;
      const waitMore = Math.max(0, MIN_LOADER_MS - elapsed);
      if (waitMore > 0) {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, waitMore);
        });
      }
      if (cancelled) return;

      progressRef.current = 100;
      setProgress(100);
      cancelAnimationFrame(frame);
      setPhase("gate");
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  useEffect(() => {
    const video = coverVideoRef.current;
    if (!video || phase !== "gate") return;

    if (playing) {
      video.pause();
      return;
    }

    video.muted = true;
    video.loop = true;
    void video.play().catch(() => {});
  }, [phase, playing]);

  function playVideo() {
    coverVideoRef.current?.pause();
    setPlaying(true);
  }

  function enterSite() {
    coverVideoRef.current?.pause();
    setPlaying(false);
    document.documentElement.classList.remove("intro-lock");
    setPhase("done");
  }

  if (phase === "done") return null;

  return (
    <div className="site-loader" aria-hidden={phase === "loading"}>
      {/* Always paint paper so loading → gate never reveals the page underneath */}
      <div className="site-loader__paper" />

      {phase === "loading" ? (
        <>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <clipPath id="qfest-loader-blob" clipPathUnits="userSpaceOnUse">
                <path ref={pathRef} d="" />
              </clipPath>
            </defs>
          </svg>
          <div className="site-loader__reveal">
            <Image
              src="/brand/poster.png"
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover object-[center_28%]"
            />
            <div className="site-loader__wash" />
          </div>
          <div className="site-loader__ui">
            <p className="site-loader__progress font-voyage">
              <span>{progress}</span>
              <span className="site-loader__percent">%</span>
            </p>
            <p className="site-loader__label">Loading</p>
          </div>
        </>
      ) : null}

      {phase === "gate" ? (
        <div className="site-gate">
          <div className="site-gate__stage">
            <div className="site-gate__cover">
              <video
                ref={coverVideoRef}
                className={`site-gate__cover-video${playing ? " is-hidden" : ""}`}
                src={COVER_VIDEO}
                poster={COVER_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="QFest about landing"
              />
              {playing ? (
                <iframe
                  className="site-gate__youtube is-active"
                  src={`https://www.youtube.com/embed/${YOUTUBE_PLACEHOLDER_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="QFest intro video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : null}
            </div>
            {!playing ? (
              <button
                type="button"
                className="site-gate__play"
                onClick={playVideo}
              >
                Play video
              </button>
            ) : null}
          </div>
          <button
            type="button"
            className="site-gate__enter"
            onClick={enterSite}
          >
            Enter site
          </button>
        </div>
      ) : null}
    </div>
  );
}
