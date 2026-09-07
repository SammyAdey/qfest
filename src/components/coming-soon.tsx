import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/lib/festival";

export function ComingSoon() {
  return (
    <section className="border-t border-ink/10 bg-paper-deep/50">
      <div className="mx-auto max-w-[100rem] px-5 py-16 md:px-8 md:py-20">
        <div className="ornament" aria-hidden />
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <h2 className="font-display text-4xl text-ink md:text-5xl">Coming soon</h2>
          <p className="mt-3 text-mute">
            Building community through African storytelling — three rooms, one festival.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-crimson hover:text-ember"
          >
            Register now
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {rooms.map((room) => (
            <Link key={room.name} href="/experiences" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image
                  src="/brand/poster.png"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: room.position }}
                />
              </div>
              <h3 className="mt-4 font-display text-2xl text-ink">{room.name}</h3>
              <p className="mt-2 text-sm text-mute">{room.copy}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
