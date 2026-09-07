import Link from "next/link";
import { festival, keynotes } from "@/lib/festival";

export function HomeKeynotes() {
  return (
    <section className="home-keynotes bg-paper">
      <div className="mx-auto max-w-[100rem] px-5 py-20 md:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-ink/45">
            ◊ Keynote speakers ◊
          </p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Voices of the tenth year
          </h2>
          <p className="mt-4 text-base text-ink/65 sm:text-lg">
            Headliners for {festival.title} — names land closer to October.
            Register now and we’ll keep you first in line.
          </p>
        </div>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {keynotes.map((speaker) => (
            <li key={speaker.id} className="group text-center lg:text-left">
              <div className="home-keynotes__portrait relative mx-auto aspect-[3/4] w-full max-w-[16rem] overflow-hidden bg-paper-deep lg:max-w-none">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,9,18,0.12),transparent_55%)]" />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/10 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center font-display text-6xl text-crimson/35 transition-colors duration-500 group-hover:text-crimson/55 sm:text-7xl">
                  {speaker.initials}
                </span>
              </div>
              <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-crimson">
                {speaker.role}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                {speaker.name}
              </h3>
              <p className="mt-2 text-sm text-mute">{speaker.focus}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
          <Link
            href="/programme"
            className="inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:text-ember"
          >
            View programme
          </Link>
          <Link
            href="/register"
            className="inline-flex bg-crimson px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ember"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
