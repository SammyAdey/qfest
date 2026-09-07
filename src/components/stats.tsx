import { festival, stats } from "@/lib/festival";

export function Stats() {
  return (
    <section className="border-b border-ink/10 bg-paper-deep/60">
      <div className="mx-auto max-w-[100rem] px-5 py-14 md:px-8 md:py-16">
        <div className="ornament" aria-hidden />
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            Celebrating
            <br />
            African storytelling
          </h2>
          <p className="mt-4 text-mute">{festival.mission}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-5xl text-crimson sm:text-6xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-lg text-center text-sm text-ink/70">
          Join us in {festival.city} for our tenth annual festival this October.
        </p>
      </div>
    </section>
  );
}
