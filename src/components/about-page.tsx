"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FestivalGallery } from "@/components/festival-gallery";
import { festival, stats } from "@/lib/festival";

const sections = [
  { id: "story", label: "Our story", index: "01" },
  { id: "gallery", label: "Gallery", index: "02" },
  { id: "join", label: "Join us", index: "03" },
] as const;

const storyBeats = [
  {
    kicker: "The gathering",
    title: "Find the joy between the page and the stage.",
    body: `The ${festival.presenter} sits at the heart of Lagos literary life — full of rooms for new manuscripts, prize nights, and the voices that still need a seat.`,
    image: "/gallery/gallery-01-crowd.png",
    imageAlt: "Festival crowd gathering outdoors",
    imagePosition: "center",
  },
  {
    kicker: "A decade",
    title: "A love song of connection, told in ten editions.",
    body: "Convened by Gbemi Shasore and Quramo Publishing, QFest has spent a decade putting emerging writers beside established ones — and letting Lagos sit with both.",
    image: "/gallery/gallery-03-panel.png",
    imageAlt: "Writers in conversation at a festival panel",
    imagePosition: "center",
  },
  {
    kicker: festival.title,
    title: "Extending as far as the eye can read.",
    body: `This tenth year is titled ${festival.title}. Prize winners, book chats, masterclasses, and nights that spill from the hall into the dark — ${festival.dates}, at ${festival.venue}.`,
    image: "/gallery/gallery-02-stage.png",
    imageAlt: "Speaker on a festival conference stage",
    imagePosition: "center",
  },
] as const;

export function AboutPageView() {
  const [active, setActive] = useState<(typeof sections)[number]["id"]>("story");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id as (typeof sections)[number]["id"] | undefined;
        if (id) setActive(id);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    nodes.forEach((n) => observerRef.current?.observe(n));
    return () => observerRef.current?.disconnect();
  }, []);

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
    <main className="about-page bg-paper text-ink">
      <section className="about-hero relative flex min-h-[calc(100svh-var(--site-header-h,7.5rem))] items-center justify-center overflow-hidden bg-paper">
        <h1 className="sr-only">
          {festival.name} — Bringing stories together
        </h1>

        <video
          ref={videoRef}
          className="about-hero__video absolute inset-0 h-full w-full object-cover"
          src="/about/about-landing.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        <div className="about-hero__footer absolute inset-x-0 bottom-8 z-10 grid grid-cols-[1fr_auto_1fr] items-end gap-3 px-5 md:bottom-10 md:px-8 lg:px-12">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink/40">
            <span className="hidden sm:inline">
              {festival.datesShort} {festival.year}
            </span>
          </p>

          <a
            href="#story"
            className="about-hero__index inline-flex items-center gap-3 border border-ink/80 bg-paper/90 px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ink backdrop-blur-sm transition-colors hover:border-crimson hover:text-crimson"
          >
            Index
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-px w-3.5 bg-current" />
              <span className="block h-px w-3.5 bg-current" />
              <span className="block h-px w-3.5 bg-current" />
            </span>
          </a>

          <p className="justify-self-end font-mono text-[0.7rem] tracking-[0.14em] text-ink/45">
            01 / 03
          </p>
        </div>
      </section>

      {/* Sticky side index */}
      <nav
        className="about-index pointer-events-none fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 lg:block xl:left-8"
        aria-label="About sections"
      >
        <ol className="pointer-events-auto space-y-4">
          {sections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`group flex items-baseline gap-3 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.65rem] tracking-[0.14em] ${
                      isActive ? "text-crimson" : "text-ink"
                    }`}
                  >
                    {section.index}
                  </span>
                  <span
                    className={`text-[0.68rem] font-semibold uppercase tracking-[0.22em] ${
                      isActive ? "text-crimson" : "text-ink"
                    }`}
                  >
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Our story — interleaved beats */}
      <section id="story" className="about-story relative scroll-mt-28 overflow-x-clip border-b border-ink/10">
        <div className="about-story__blob about-story__blob--a" aria-hidden />
        <div className="about-story__blob about-story__blob--b" aria-hidden />

        <div className="relative mx-auto max-w-[100rem] px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:pl-36 xl:pl-44">
          <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-ink/50">
            ◊ Our story ◊
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-center font-display text-[clamp(2rem,4.8vw,4rem)] leading-[1.12] text-ink">
            The joy at{" "}
            <em className="not-italic text-crimson">{festival.name}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-ink/65 sm:text-lg">
            {festival.mission}
          </p>

          <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
            {storyBeats.map((beat, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={beat.kicker}
                  className={`about-beat grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24 ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="about-beat__copy max-w-lg">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-crimson">
                      {beat.kicker}
                    </p>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
                      {beat.title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
                      {beat.body}
                    </p>
                  </div>

                  <div className="about-beat__media relative aspect-4/5 overflow-hidden bg-paper-deep sm:aspect-5/6">
                    <Image
                      src={beat.image}
                      alt={beat.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                      style={{ objectPosition: beat.imagePosition }}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-24 grid max-w-3xl grid-cols-3 gap-6 border-t border-ink/10 pt-14 text-center md:mt-32 md:gap-10">
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
        </div>
      </section>

      {/* Gallery — infinite curved slider */}
      <FestivalGallery
        ctaHref="/experiences"
        ctaLabel="Explore the rooms"
      />

      {/* Join us — Centre Court equivalent */}
      <section
        id="join"
        className="about-join relative scroll-mt-28 overflow-hidden bg-ink text-white"
      >
        <div className="about-join__media absolute inset-0" aria-hidden>
          <Image
            src="/gallery/gallery-06-night.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="about-join__veil" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[100rem] flex-col justify-center px-5 py-24 md:px-8 md:py-32 lg:px-12 lg:pl-36 xl:pl-44">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/50">
            ◊ Join us ◊
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-white">
            Be part of{" "}
            <em className="not-italic text-crimson">{festival.title}</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Three days in {festival.city}. Free registration. Manuscripts, prize
            nights, and the next chapter of African storytelling.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex bg-crimson px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ember"
            >
              Register now
            </Link>
            <Link
              href="/programme"
              className="inline-flex border border-white/35 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10"
            >
              See the programme
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
