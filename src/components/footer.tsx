import Image from "next/image";
import Link from "next/link";
import { festival, footerNav } from "@/lib/festival";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto grid max-w-[100rem] gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Link href="/" className="inline-block">
            <Image
              src="/brand/Qfest-logo.png"
              alt="QFest 2026 — 10th Year Anniversary"
              width={603}
              height={363}
              className="h-28 w-auto md:h-32"
              sizes="260px"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            Building community through African storytelling in {festival.city}.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Main</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerNav.main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerNav.company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${festival.email}`} className="text-white/80 hover:text-white">
                Contact us
              </a>
            </li>
          </ul>
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/45">
            Follow us
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a href={festival.instagram} className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={festival.x} className="hover:text-white">
                X / Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[100rem] px-5 py-5 text-xs text-white/45 md:px-8">
          Copyright © {festival.year} Quramo Publishing · {festival.name}
        </p>
      </div>
    </footer>
  );
}
