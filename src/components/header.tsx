"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CountdownBar } from "@/components/countdown-bar";
import { nav } from "@/lib/festival";

export function Header() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-h",
        `${header.getBoundingClientRect().height}px`,
      );
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--site-header-h");
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-6 px-5 py-3 md:px-8 lg:px-12">
        <Link href="/" className="shrink-0" aria-label="Quramo — QFest home">
          <Image
            src="/Quramo.PNG"
            alt="Quramo"
            width={480}
            height={160}
            className="h-8 w-auto sm:h-9 md:h-10"
            sizes="(max-width: 640px) 140px, 180px"
            preload
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          <nav className="flex items-center gap-5 xl:gap-6" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  item.href === "/register"
                    ? "text-ink"
                    : pathname === item.href
                      ? "text-banner"
                      : "text-banner/90 hover:text-banner"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CountdownBar />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-ink/20 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenFor(open ? null : pathname)}
        >
          <span className="flex w-4 flex-col gap-1">
            <span className={`h-px w-full bg-ink transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-ink ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-full bg-ink transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-ink/10 bg-paper px-5 py-5 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-ink"
                onClick={() => setOpenFor(null)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="inline-flex w-fit bg-banner px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setOpenFor(null)}
            >
              Register
            </Link>
          </div>
        </nav>
      ) : null}

      <div className="lg:hidden">
        <CountdownBar className="w-full justify-between px-5" />
      </div>
    </header>
  );
}
