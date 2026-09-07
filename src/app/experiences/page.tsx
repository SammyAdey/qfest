import type { Metadata } from "next";
import Image from "next/image";
import { PageFrame } from "@/components/page-frame";
import { rooms } from "@/lib/festival";

export const metadata: Metadata = {
  title: "Experience rooms",
};

export default function ExperiencesPage() {
  return (
    <PageFrame kicker="Three paths" title="Experience rooms">
      <div className="mx-auto grid max-w-[100rem] gap-10 px-5 pb-24 md:grid-cols-3 md:px-8">
        {rooms.map((room) => (
          <article key={room.name}>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Image
                src="/brand/poster.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                style={{ objectPosition: room.position }}
              />
            </div>
            <h2 className="mt-5 font-display text-3xl">{room.name}</h2>
            <p className="mt-2 text-mute">{room.copy}</p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
