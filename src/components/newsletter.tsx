"use client";

import { useState } from "react";
import { festival } from "@/lib/festival";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-20">
        <h2 className="font-display text-4xl md:text-5xl">Join our community</h2>
        <p className="mt-4 text-white/65">
          Building community through African storytelling in {festival.city}. You’ll be
          first to hear programme news — and can opt out anytime.
        </p>
        {done ? (
          <p className="mt-8 text-crimson">You’re on the list.</p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="h-12 flex-1 border border-white/20 bg-ink-soft px-4 text-white outline-none placeholder:text-white/40 focus:border-crimson"
            />
            <button
              type="submit"
              className="h-12 bg-crimson px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-ember"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
