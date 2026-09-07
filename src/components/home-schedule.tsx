import Link from "next/link";
import { days, sessions } from "@/lib/festival";

export function HomeSchedule() {
  return (
    <section id="programme" className="bg-paper">
      <div className="mx-auto max-w-[100rem] px-5 py-16 md:px-8 md:py-20">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.24em] text-crimson">2026</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-6xl">Schedule</h2>
          <p className="mt-3 text-mute">
            Three days of prize conversations, masterclasses, film, and live rooms.
          </p>
        </div>

        <div className="mt-14 space-y-16">
          {days.map((day) => {
            const daySessions = sessions.filter((session) => session.day === day);
            const first = daySessions[0];
            return (
              <div key={day}>
                <div className="mb-8 flex flex-wrap items-end gap-4 border-b border-ink/15 pb-4">
                  <p className="font-display text-4xl text-ink sm:text-5xl">
                    {first.dayLabel}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-mute">
                    {first.dateLabel}
                  </p>
                </div>
                <ul className="space-y-8">
                  {daySessions.map((session) => (
                    <li
                      key={session.id}
                      className="grid gap-4 border-b border-ink/10 pb-8 last:border-0 md:grid-cols-[7rem_1fr_auto] md:gap-8"
                    >
                      <p className="font-display text-2xl text-crimson md:text-3xl">
                        {session.timeDisplay}
                      </p>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-mute">
                          {session.kind}
                        </p>
                        <h3 className="mt-2 font-sans text-2xl font-normal text-ink md:text-3xl">
                          {session.title}
                        </h3>
                        <p className="mt-2 text-sm text-ink/70">{session.note}</p>
                        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                          <div>
                            <dt className="text-xs uppercase tracking-[0.16em] text-mute">
                              Location
                            </dt>
                            <dd className="mt-1 text-ink">{session.room}</dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-[0.16em] text-mute">
                              When
                            </dt>
                            <dd className="mt-1 text-ink">{session.timeDisplay}</dd>
                          </div>
                        </dl>
                      </div>
                      <Link
                        href="/register"
                        className="h-fit self-start border border-ink/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                      >
                        Register
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
