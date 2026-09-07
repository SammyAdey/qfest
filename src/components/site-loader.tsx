"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 3200;
const INTRO_VIDEO = "/about/about-landing.mp4";
const INTRO_POSTER = "/brand/QFest-key-visual.png";

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

export function SiteLoader() {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const startRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("intro-lock");

    if (reduced) {
      const id = window.requestAnimationFrame(() => setPhase("gate"));
      return () => {
        window.cancelAnimationFrame(id);
        document.documentElement.classList.remove("intro-lock");
      };
    }

    const boot = window.requestAnimationFrame(() => setPhase("loading"));
    mouse.current = {
      x: window.innerWidth * 0.28,
      y: window.innerHeight * 0.32,
    };
    cursor.current = { ...mouse.current };
    startRef.current = performance.now();

    const onMove = (event: PointerEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const nextProgress = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      if (nextProgress !== progressRef.current) {
        progressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      const ease = 0.12;
      cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
      cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.2;
      pathRef.current?.setAttribute(
        "d",
        blobPath(cursor.current.x, cursor.current.y, radius, now / 1000),
      );

      if (elapsed < DURATION_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      setPhase("gate");
    };

    frame = requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(boot);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || phase !== "gate") return;

    const onEnded = () => {
      setPlaying(false);
      video.muted = true;
      video.loop = true;
      void video.play().catch(() => {});
    };

    const onError = () => {
      setPlaying(false);
    };

    // Cover is the about-landing video — muted loop until Play
    video.muted = true;
    video.loop = true;
    void video.play().catch(() => {});

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [phase]);

  async function playVideo() {
    const video = videoRef.current;
    if (!video) return;

    setPlaying(true);
    try {
      video.muted = false;
      video.loop = false;
      video.currentTime = 0;
      await video.play();
    } catch {
      setPlaying(false);
      video.muted = true;
      video.loop = true;
      void video.play().catch(() => {});
    }
  }

  function enterSite() {
    videoRef.current?.pause();
    setPlaying(false);
    document.documentElement.classList.remove("intro-lock");
    setPhase("done");
  }

  if (!phase || phase === "done") return null;

  return (
    <div className="site-loader" aria-hidden={phase === "loading"}>
      {phase === "loading" ? (
        <>
          <div className="site-loader__paper" />
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
                ref={videoRef}
                className="site-gate__video is-active"
                src={INTRO_VIDEO}
                poster={INTRO_POSTER}
                playsInline
                muted
                loop
                autoPlay
                preload="auto"
              />
            </div>
            {!playing ? (
              <button
                type="button"
                className="site-gate__play"
                onClick={() => void playVideo()}
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
