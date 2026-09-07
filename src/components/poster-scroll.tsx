"use client";

import Image from "next/image";
import { festival } from "@/lib/festival";

const TOP_SCROLL = "/paper_scroll/top-scroll.png";
const BOTTOM_SCROLL = "/paper_scroll/bottom-scroll.png";
const POSTER = "/paper_scroll/poster-textured-v2.png";

type Props = {
  progress: number;
  className?: string;
};

export function PosterScrollVisual({ progress, className = "" }: Props) {
  const reveal = 12 + progress * 88;
  const hidden = Math.max(0, 100 - reveal);
  const bottomTop = `calc(8% + ${(reveal / 100) * 92}% - 7%)`;

  return (
    <div
      className={`poster-scroll__stage poster-scroll__stage--inline ${className}`.trim()}
      aria-label={`${festival.name} ${festival.year} poster scroll`}
    >
      <div className="poster-scroll__cap poster-scroll__cap--top" aria-hidden>
        <Image
          src={TOP_SCROLL}
          alt=""
          width={1024}
          height={294}
          sizes="(max-width: 1024px) 90vw, 28rem"
          className="poster-scroll__cap-img"
        />
      </div>

      <div
        className="poster-scroll__sheet"
        style={{ clipPath: `inset(0 0 ${hidden}% 0)` }}
      >
        <Image
          src={POSTER}
          alt={`${festival.name} ${festival.year} poster — ${festival.title}. ${festival.datesLong}.`}
          width={1200}
          height={1500}
          sizes="(max-width: 1024px) 80vw, 24rem"
          className="poster-scroll__image"
        />
      </div>

      <div
        className="poster-scroll__cap poster-scroll__cap--bottom"
        style={{ top: bottomTop }}
        aria-hidden
      >
        <Image
          src={BOTTOM_SCROLL}
          alt=""
          width={1024}
          height={294}
          sizes="(max-width: 1024px) 90vw, 28rem"
          className="poster-scroll__cap-img"
        />
      </div>
    </div>
  );
}
