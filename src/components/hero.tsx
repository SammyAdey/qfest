import Image from "next/image";
import Link from "next/link";
import { HeroVisual } from "@/components/hero-visual";
import { festival } from "@/lib/festival";

export function Hero() {
  return (
    <section className="hero relative flex min-h-[calc(100svh-var(--site-header-h,7.5rem))] overflow-hidden bg-paper text-ink lg:h-[calc(100svh-var(--site-header-h,7.5rem))]">
      <div className="relative mx-auto grid w-full max-w-[100rem] items-center gap-8 px-5 py-10 md:px-8 lg:h-full lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-4 lg:px-12 lg:py-10 xl:gap-6">
        <div className="hero-rise relative z-10 mx-auto flex w-full max-w-xl flex-col justify-center text-left lg:mx-auto lg:pr-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-crimson">
            {festival.datesShort} {festival.year}
            <span className="mx-3 text-ink/20">·</span>
            {festival.city}
          </p>

          <Image
            src="/brand/Qfest-logo.png"
            alt={`${festival.name} ${festival.year} — 10th Year Anniversary`}
            width={603}
            height={363}
            preload
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
            className="mt-6 h-auto w-[min(100%,16rem)] sm:w-[min(100%,18rem)] lg:w-[min(100%,20rem)]"
          />

          <h1 className="mt-5 font-display text-3xl italic leading-tight text-crimson sm:text-4xl md:text-5xl">
            {festival.title}
          </h1>

          <p className="hero-rise hero-rise--late mt-5 max-w-xl font-display text-[2.5rem] leading-[1.15] text-ink/75 sm:text-[3rem] md:text-[3.75rem]">
            {festival.tagline}
          </p>

          <div className="hero-rise hero-rise--later mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex bg-crimson px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ember"
            >
              Register
            </Link>
            <Link
              href="/programme"
              className="inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-crimson"
            >
              View programme
            </Link>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
