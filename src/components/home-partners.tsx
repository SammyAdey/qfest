import Image from "next/image";
import Link from "next/link";
import { partners, sponsors } from "@/lib/festival";

type Org = {
  name: string;
  logo?: string;
  href?: string;
};

function LogoMark({ org }: { org: Org }) {
  const inner = org.logo ? (
    <Image
      src={org.logo}
      alt={org.name}
      width={220}
      height={88}
      className="h-12 w-auto max-w-[11rem] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:h-14"
    />
  ) : (
    <span className="text-center font-sans text-sm font-semibold tracking-[0.06em] text-ink/50 transition-colors duration-300 group-hover:text-ink/80 sm:text-base">
      {org.name}
    </span>
  );

  const className =
    "group flex min-h-24 items-center justify-center px-5 py-6";

  if (org.href) {
    return (
      <a
        href={org.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function HomePartners() {
  return (
    <section className="bg-paper-deep/50">
      <div className="mx-auto max-w-[100rem] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-ink/45">
            ◊ With thanks ◊
          </p>
          <h2 className="mt-5 font-display text-4xl text-ink md:text-5xl">
            Partners & sponsors
          </h2>
          <p className="mt-3 text-mute">
            The organisations helping bring ten years of African storytelling
            back to Lagos.
          </p>
        </div>

        <div className="mt-14">
          <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-mute">
            Presenting partner
          </p>
          <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-8 border-b border-ink/10 pb-12">
            {partners.map((org) => (
              <li key={org.name}>
                <LogoMark org={org} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-mute">
            Sponsors
          </p>
          <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {sponsors.map((org) => (
              <li
                key={org.name}
                className="border border-ink/10 -mt-px -ml-px"
              >
                <LogoMark org={org} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 text-center">
          <Link
            href={`mailto:info@quramo.com?subject=${encodeURIComponent("QFest 2026 partnership")}`}
            className="inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-crimson transition-colors hover:text-ember"
          >
            Partner with QFest
          </Link>
        </div>
      </div>
    </section>
  );
}
