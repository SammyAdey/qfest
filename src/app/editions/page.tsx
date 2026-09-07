import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { editions } from "@/lib/festival";

export const metadata: Metadata = {
  title: "Past editions",
};

export default function EditionsPage() {
  return (
    <PageFrame kicker="2017 — now" title="Past editions">
      <div className="mx-auto max-w-[100rem] px-5 pb-24 md:px-8 lg:px-12">
        <ul className="divide-y divide-ink/10">
          {editions.map((edition) => (
            <li key={edition.year} className="py-8">
              <p className="text-crimson">{edition.year}</p>
              <p className="mt-2 font-display text-3xl">{edition.theme}</p>
              <p className="mt-2 text-mute">{edition.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageFrame>
  );
}
