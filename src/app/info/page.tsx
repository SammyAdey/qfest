import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { festival } from "@/lib/festival";

export const metadata: Metadata = {
  title: "Festival info",
};

export default function InfoPage() {
  return (
    <PageFrame kicker="Arrive ready" title="Festival info">
      <div className="mx-auto max-w-[100rem] space-y-12 px-5 pb-24 text-lg leading-relaxed text-ink/80 md:px-8 lg:px-12">
        <section>
          <h2 className="font-display text-3xl text-crimson">When</h2>
          <p className="mt-3">
            {festival.datesLong}. Doors to the Hub open Thursday morning; Prize Night
            closes the first day.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl text-crimson">Where</h2>
          <p className="mt-3">
            {festival.venue}, {festival.city} — the festival’s home on Victoria Island.
            Masterclasses sit at the Quramo Hub nearby.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl text-crimson">Who it is for</h2>
          <p className="mt-3">
            Readers, writers, filmmakers, students, and anyone curious enough to sit
            still for a story. Some Hub studios require a studio add-on.
          </p>
        </section>
        <section>
          <h2 className="font-display text-3xl text-crimson">Contact</h2>
          <p className="mt-3">
            <a href={`mailto:${festival.email}`} className="text-crimson hover:text-ember">
              {festival.email}
            </a>
          </p>
        </section>
      </div>
    </PageFrame>
  );
}
