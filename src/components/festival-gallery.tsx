import Link from "next/link";
import { CurvedGallery } from "@/components/curved-gallery";

export const galleryImages = [
  {
    src: "/gallery/gallery-01-crowd.png",
    alt: "Festival crowd gathering outdoors",
    position: "center",
  },
  {
    src: "/gallery/gallery-02-stage.png",
    alt: "Conference stage and keynote speaker",
    position: "center",
  },
  {
    src: "/gallery/gallery-03-panel.png",
    alt: "Writers panel discussion at a festival",
    position: "center",
  },
  {
    src: "/gallery/gallery-04-books.png",
    alt: "Books and programmes on a festival table",
    position: "center",
  },
  {
    src: "/gallery/gallery-05-networking.png",
    alt: "Attendees networking in a conference foyer",
    position: "center",
  },
] as const;

type Props = {
  id?: string;
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
};

export function FestivalGallery({
  id = "gallery",
  ctaHref = "/about#gallery",
  ctaLabel = "Explore the gallery",
  showCta = true,
}: Props) {
  return (
    <section
      id={id}
      className="about-gallery relative scroll-mt-28 overflow-x-clip bg-paper"
    >
      <div className="mx-auto max-w-[100rem] px-5 pt-20 text-center md:px-8 md:pt-28 lg:px-12">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-ink/50">
          ◊ Gallery ◊
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.12] text-ink">
          Moments from the festival
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
          Pages, stages, and gatherings — a continuous loop through the spirit of
          QFest.
        </p>
      </div>

      <div className="mt-3 md:mt-4">
        <CurvedGallery images={galleryImages} />
      </div>

      {showCta ? (
        <div className="mx-auto flex max-w-[100rem] justify-center px-5 pb-16 pt-4 md:px-8 md:pb-20 lg:px-12">
          <Link
            href={ctaHref}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:text-ember"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : (
        <div className="pb-16 md:pb-20" />
      )}
    </section>
  );
}
