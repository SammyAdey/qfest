import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { days, sessions } from "@/lib/festival";

export const metadata: Metadata = {
  title: "Programme",
};

export default function ProgrammePage() {
  return (
    <PageFrame kicker="1–3 October 2026" title="Programme">
      <div className="mx-auto max-w-[100rem] px-5 pb-24 md:px-8">
        <div className="mt-2 space-y-16">
          {days.map((day) => {
            const daySessions = sessions.filter((session) => session.day === day);
            const first = daySessions[0];
            return (
              <section key={day}>
                <div className="flex flex-wrap items-end gap-4 border-b border-ink/15 pb-4">
                  <h2 className="font-display text-4xl text-ink sm:text-5xl">
                    {first.dayLabel}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-mute">
                    {first.dateLabel}
                  </p>
                </div>
                <ul className="mt-8 space-y-8">
                  {daySessions.map((session) => (
                    <li
                      key={session.id}
                      className="grid gap-4 border-b border-ink/10 pb-8 md:grid-cols-[7rem_1fr_auto]"
                    >
                      <p className="font-display text-2xl text-crimson">
                        {session.timeDisplay}
                      </p>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-mute">
                          {session.kind}
                        </p>
                        <p className="mt-2 font-sans text-2xl font-normal text-ink">
                          {session.title}
                        </p>
                        <p className="mt-2 text-sm text-mute">
                          {session.room} · {session.note}
                        </p>
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
              </section>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}
