"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { MorphBlobs, verseBlobs } from "@/components/morph-blobs";
import { festival, stats } from "@/lib/festival";

const TITLE = "Celebrating African storytelling.";

function LeafMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" aria-hidden>
      <path
        d="M60 188C60 188 18 140 18 88 18 42 42 18 60 12c18 6 42 30 42 76 0 52-42 100-42 100Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M60 24v150"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M60 64c-16 10-26 28-28 48M60 88c14 12 24 28 26 46M60 118c-12 8-20 20-22 34"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuillMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden>
      <path
        d="M28 132c28-18 58-48 78-78 8-12 18-28 22-40-14 6-30 18-42 30C58 70 36 100 28 132Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M48 112c18-8 36-24 48-40"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M24 138l18-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="118" cy="28" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="132" cy="48" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="104" cy="52" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function BookMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 140" fill="none" aria-hidden>
      <path
        d="M90 28c-22-14-52-16-72-10v84c24-8 52-4 72 12 20-16 48-20 72-12V18c-20-6-50-4-72 10Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M90 28v86"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M48 48h24M48 64h20M112 50h24M112 66h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BirdMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 70" fill="none" aria-hidden>
      <path
        d="M12 42c18-22 40-30 62-18-10 2-18 8-22 16 14-2 28 4 38 14-24-2-46 2-62 16-4-8-10-18-16-28Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeVerse() {
  const rawId = useId();
  const pathId = `verse-path-${rawId.replace(/:/g, "")}`;
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const loop = `${TITLE}    ·    ${TITLE}    ·    ${TITLE}    ·    ${TITLE}    ·    `;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      if (media.matches) {
        setProgress(0.35);
        return;
      }

      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.85;
      const end = view * 0.15 - rect.height;
      const range = start - end;
      const raw = (start - rect.top) / Math.max(1, range);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onScroll);
    };
  }, []);

  // Move text along the path as the section scrolls through the viewport.
  const startOffset = `${progress * -55}%`;

  return (
    <section
      ref={trackRef}
      className="home-verse relative overflow-visible bg-paper"
    >
      <MorphBlobs blobs={verseBlobs} />

      <div className="home-verse__art home-verse__art--leaf" aria-hidden>
        <LeafMotif />
      </div>
      <div className="home-verse__art home-verse__art--quill" aria-hidden>
        <QuillMotif />
      </div>
      <div className="home-verse__art home-verse__art--book" aria-hidden>
        <BookMotif />
      </div>
      <div className="home-verse__art home-verse__art--bird" aria-hidden>
        <BirdMotif />
      </div>
      <div className="home-verse__art home-verse__art--bird-2" aria-hidden>
        <BirdMotif />
      </div>

      <div className="relative flex min-h-[70svh] flex-col justify-center py-20 md:min-h-[78svh] md:py-24">
        <h2 className="sr-only">{TITLE}</h2>

        <div className="home-verse__path-wrap" aria-hidden>
          <svg
            className="home-verse__path-svg"
            viewBox="0 0 1600 320"
            preserveAspectRatio="xMidYMid meet"
            overflow="visible"
          >
            <defs>
              <path
                id={pathId}
                d="M -80 70 C 320 210, 720 250, 1120 150 S 1680 40, 1720 90"
              />
            </defs>
            <text className="home-verse__path-text">
              <textPath href={`#${pathId}`} startOffset={startOffset}>
                {loop}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="relative mx-auto mt-10 grid w-full max-w-4xl grid-cols-3 gap-6 px-5 text-center md:mt-12 md:gap-10 md:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-5xl text-crimson sm:text-6xl md:text-7xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-12 w-full max-w-[100rem] px-5 md:mt-16 md:px-8 lg:px-12">
          <div className="mx-auto max-w-lg text-center">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-ink/45">
              ◊ {festival.title} ◊
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/65 sm:text-lg">
              {festival.tagline} Three days of manuscripts, prize nights, and
              the voices that still need a room.
            </p>
            <Link
              href="/programme"
              className="mt-7 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:text-ember"
            >
              See the programme
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
