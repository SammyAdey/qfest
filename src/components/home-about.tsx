"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MorphBlobs, aboutBlobs } from "@/components/morph-blobs";
import { PosterScrollVisual } from "@/components/poster-scroll";
import { festival } from "@/lib/festival";

export function HomeAbout() {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      if (media.matches) {
        setProgress(1);
        return;
      }

      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      setProgress(scrolled / travel);
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

  return (
    <section
      ref={trackRef}
      className="home-about home-about--track relative bg-paper"
    >
      <div className="home-about__sticky">
        <MorphBlobs blobs={aboutBlobs} />

        <div className="relative mx-auto w-full max-w-[100rem] px-5 py-12 md:px-8 md:py-16 lg:px-12">
          <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-ink/55">
            ◊ About {festival.name} ◊
          </p>

          <h2 className="home-about__headline mx-auto mt-5 max-w-6xl text-center font-voyage text-[2.35rem] leading-[1.15] text-ink sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem]">
            Our Lagos festival comes{" "}
            <em className="home-about__oval not-italic">alive</em>
            <br />
            between the <span className="home-about__underline">page</span> and
            the <span className="home-about__underline">stage</span>.
          </h2>

          <div className="mt-12 grid items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-24">
            <div className="home-about__media relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-2xl">
              <div className="home-about__media-blob" aria-hidden />
              <PosterScrollVisual
                progress={progress}
                className="home-about__scroll"
              />
            </div>

            <div className="relative max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg md:text-xl md:leading-relaxed">
              <p>
                {festival.name} is a joyous gathering for readers and writers —
                centred around new manuscripts, prize nights, and the voices that
                keep African storytelling moving. This tenth year,{" "}
                <em className="text-crimson">{festival.title}</em> brings the
                festival back to {festival.city}, {festival.dates}.
              </p>
              <p className="mt-6">
                We’ve spent a decade putting emerging writers beside established
                ones, so find out how you can be part of the next chapter.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:text-banner"
              >
                Read more
              </Link>
              <p className="mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink/40">
                {progress > 0.92 ? festival.title : "Scroll to unroll"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
