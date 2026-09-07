"use client";

import { useMemo, useState } from "react";
import { days, sessions, type Session } from "@/lib/festival";

const emptyDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function SessionRegister() {
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState(emptyDetails);
  const [submitted, setSubmitted] = useState(false);

  const selectedSessions = useMemo(
    () => sessions.filter((session) => selected.includes(session.id)),
    [selected],
  );

  const detailsComplete =
    details.firstName.trim() &&
    details.lastName.trim() &&
    details.email.trim() &&
    details.phone.trim();

  const canSubmit = Boolean(detailsComplete && selected.length > 0);

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function selectDay(day: Session["day"]) {
    const dayIds = sessions
      .filter((session) => session.day === day)
      .map((session) => session.id);
    const allSelected = dayIds.every((id) => selected.includes(id));
    setSelected((current) =>
      allSelected
        ? current.filter((id) => !dayIds.includes(id))
        : [...new Set([...current, ...dayIds])],
    );
  }

  function updateField(field: keyof typeof emptyDetails, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  function registerAnother() {
    setSelected([]);
    setDetails(emptyDetails);
    setSubmitted(false);
  }

  const fieldClass =
    "mt-2 w-full border border-ink/15 bg-white px-4 py-3 font-sans text-base text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-crimson";

  if (submitted) {
    return (
      <div className="mx-auto max-w-[100rem] px-5 pb-24 pt-16 md:px-8 md:pt-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-crimson">
            ◊ Registration received ◊
          </p>
          <h2 className="mt-5 font-display text-4xl text-ink sm:text-5xl md:text-6xl">
            Thanks for registering
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg">
            {details.firstName.trim()}, you’re down for{" "}
            {selectedSessions.length} session
            {selectedSessions.length === 1 ? "" : "s"}. We’ll be in touch at{" "}
            <span className="text-ink">{details.email.trim()}</span> with
            confirmation details.
          </p>
          <ul className="mt-8 space-y-3 border-t border-ink/10 pt-8 text-left text-sm text-ink/70">
            {selectedSessions.map((session) => (
              <li key={session.id}>
                <span className="text-crimson">{session.timeDisplay}</span>
                <span className="mx-2 text-ink/25">·</span>
                {session.dayLabel} — {session.title}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={registerAnother}
            className="mt-10 inline-flex bg-crimson px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ember"
          >
            Register another guest
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[100rem] px-5 pb-16 pt-10 md:px-8 md:pt-14"
    >
      <p className="max-w-2xl text-mute">
        QFest is free. Fill in your details, choose one session or as many as
        you like, then submit your registration.
      </p>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-16">
        <div className="order-2 min-w-0 space-y-14 lg:order-1">
          <div className="border-b border-ink/15 pb-4">
            <h2 className="font-display text-3xl text-ink">Your sessions</h2>
            <p className="mt-2 text-sm text-mute">
              Select every session you plan to attend.
            </p>
          </div>

          {days.map((day) => {
            const daySessions = sessions.filter(
              (session) => session.day === day,
            );
            const first = daySessions[0];
            const dayIds = daySessions.map((session) => session.id);
            const selectedCount = dayIds.filter((id) =>
              selected.includes(id),
            ).length;
            const allSelected = selectedCount === dayIds.length;

            return (
              <section key={day}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4">
                  <div>
                    <h3 className="font-display text-3xl text-ink">
                      {first.dayLabel}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mute">
                      {first.dateLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectDay(day)}
                    className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson transition-colors hover:text-ember"
                  >
                    {allSelected ? "Clear day" : "Select full day"}
                  </button>
                </div>

                <ul className="mt-2">
                  {daySessions.map((session) => {
                    const active = selected.includes(session.id);
                    return (
                      <li key={session.id}>
                        <label
                          className={`flex cursor-pointer items-start gap-4 border-b border-ink/10 py-6 transition-colors md:gap-6 ${
                            active
                              ? "bg-crimson/[0.03]"
                              : "hover:bg-ink/[0.02]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => toggle(session.id)}
                            className="sr-only"
                          />
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                              active
                                ? "border-crimson bg-crimson text-white"
                                : "border-ink/25 bg-white"
                            }`}
                            aria-hidden
                          >
                            {active ? (
                              <svg
                                viewBox="0 0 16 16"
                                className="h-3 w-3"
                                fill="none"
                              >
                                <path
                                  d="M3.5 8.5 6.5 11.5 12.5 4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : null}
                          </span>

                          <div className="grid min-w-0 flex-1 gap-3 md:grid-cols-[6.5rem_1fr]">
                            <p className="font-sans text-xl text-crimson md:text-2xl">
                              {session.timeDisplay}
                            </p>
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-mute">
                                {session.kind}
                                <span className="mx-2 text-ink/20">·</span>
                                {session.room}
                              </p>
                              <p className="mt-2 font-sans text-xl font-normal text-ink md:text-2xl">
                                {session.title}
                              </p>
                              <p className="mt-2 text-sm text-ink/65">
                                {session.note}
                              </p>
                            </div>
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <aside className="order-1 lg:sticky lg:top-[calc(var(--site-header-h,7.5rem)+1.25rem)] lg:order-2">
          <div className="border border-ink/10 bg-white p-6 md:p-7">
            <h2 className="font-display text-3xl text-ink">Your details</h2>
            <p className="mt-2 text-sm text-mute">
              We’ll use this to confirm your place.
            </p>

            <div className="mt-7 grid gap-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">
                  First name
                </span>
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={details.firstName}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                  className={fieldClass}
                  placeholder="Ada"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">
                  Last name
                </span>
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  value={details.lastName}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                  className={fieldClass}
                  placeholder="Nwosu"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={details.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={fieldClass}
                  placeholder="you@email.com"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">
                  Phone number
                </span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={details.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={fieldClass}
                  placeholder="+234 …"
                />
              </label>
            </div>

            <div className="mt-8 border-t border-ink/10 pt-6">
              <p className="text-sm text-ink/70">
                {!detailsComplete
                  ? "Complete your details to continue"
                  : selected.length === 0
                    ? "No sessions selected yet"
                    : `${selected.length} session${selected.length === 1 ? "" : "s"} selected`}
              </p>
              {selected.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
                >
                  Clear sessions
                </button>
              ) : null}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`mt-5 inline-flex w-full justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors ${
                  canSubmit
                    ? "bg-crimson hover:bg-ember"
                    : "cursor-not-allowed bg-ink/25"
                }`}
              >
                {canSubmit
                  ? `Register for ${selected.length} session${selected.length === 1 ? "" : "s"}`
                  : "Complete form to register"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
