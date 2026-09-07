"use client";

import { useEffect, useRef } from "react";
import { festival } from "@/lib/festival";

export function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (media.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <div className="hero__visual relative flex min-h-0 w-full items-center justify-center self-stretch">
      <div className="hero__image-feather mx-auto max-h-[min(58svh,34rem)] w-auto max-w-full lg:max-h-[min(78svh,48rem)]">
        <video
          ref={videoRef}
          className="hero__image mx-auto block h-auto max-h-[min(58svh,34rem)] w-auto max-w-full object-contain lg:max-h-[min(78svh,48rem)]"
          src="/brand/QFest-key-visual-v2.mp4"
          poster="/brand/QFest-key-visual.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`${festival.name} ${festival.year} — ${festival.title}. ${festival.presenter}.`}
        />
      </div>
    </div>
  );
}
