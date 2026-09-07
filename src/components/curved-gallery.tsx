"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
};

type Props = {
  images: readonly GalleryImage[];
};

/** Infinite horizontal image slider. */
export function CurvedGallery({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();
    let cancelled = false;

    const onEnter = () => {
      pausedRef.current = true;
    };
    const onLeave = () => {
      pausedRef.current = false;
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(track);

    const layout = (now: number) => {
      if (cancelled) return;

      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;

      const setWidth = track.scrollWidth / 2;
      if (
        setWidth > 0 &&
        !media.matches &&
        visibleRef.current &&
        !pausedRef.current
      ) {
        offsetRef.current += dt * 48;
        if (offsetRef.current >= setWidth) {
          offsetRef.current -= setWidth;
        }
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      frame = requestAnimationFrame(layout);
    };

    if (media.matches) {
      track.style.transform = "translate3d(0, 0, 0)";
      return () => {
        track.removeEventListener("pointerenter", onEnter);
        track.removeEventListener("pointerleave", onLeave);
        io.disconnect();
      };
    }

    frame = requestAnimationFrame(layout);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      io.disconnect();
    };
  }, [images]);

  const loop = [...images, ...images];

  return (
    <div
      className="gallery-slider relative w-full min-w-0 max-w-full overflow-hidden"
      aria-label="Festival gallery"
    >
      <div
        ref={trackRef}
        className="gallery-slider__track flex w-max gap-4 will-change-transform md:gap-5"
      >
        {loop.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            className="relative aspect-3/4 w-[min(72vw,18rem)] shrink-0 overflow-hidden bg-ink sm:w-[min(48vw,20rem)] md:w-[22rem]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="352px"
              className="object-cover"
              style={{ objectPosition: image.position ?? "center" }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
