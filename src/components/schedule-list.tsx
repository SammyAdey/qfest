"use client";

import Link from "next/link";
import { useSchedule } from "@/components/schedule-provider";
import { sessions } from "@/lib/festival";

export function ScheduleList() {
  const { ids, toggle } = useSchedule();
  const mine = sessions.filter((session) => ids.includes(session.id));

  return (
    <div className="mx-auto max-w-[100rem] px-5 pb-24 md:px-8 lg:px-12">
      {mine.length === 0 ? (
        <p className="text-mute">
          Nothing here yet.{" "}
          <Link href="/programme" className="text-crimson hover:text-ember">
            Open the programme
          </Link>{" "}
          and pin the rooms you want.
        </p>
      ) : (
        <ul className="divide-y divide-ink/10">
          {mine.map((session) => (
            <li key={session.id} className="flex items-start justify-between gap-6 py-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-mute">
                  {session.dayLabel} · {session.timeDisplay}
                </p>
                <p className="mt-2 font-sans text-2xl font-normal">{session.title}</p>
                <p className="mt-1 text-sm text-mute">{session.room}</p>
              </div>
              <button
                type="button"
                className="text-xs uppercase tracking-[0.16em] text-mute hover:text-crimson"
                onClick={() => toggle(session.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
