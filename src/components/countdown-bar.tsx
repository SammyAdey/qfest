"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { festival } from "@/lib/festival";

type Parts = { d: number; h: number; m: number; s: number };

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function serialize(parts: Parts) {
  return `${parts.d}:${parts.h}:${parts.m}:${parts.s}`;
}

function parse(raw: string): Parts {
  const [d, h, m, s] = raw.split(":").map(Number);
  return { d, h, m, s };
}

function useCountdownParts() {
  const target = new Date(festival.opensAt).getTime();
  const raw = useSyncExternalStore(
    (onStoreChange) => {
      const id = window.setInterval(onStoreChange, 1000);
      return () => window.clearInterval(id);
    },
    () => serialize(getParts(target)),
    () => "0:0:0:0",
  );
  return parse(raw);
}

export function CountdownBar({ className = "" }: { className?: string }) {
  const display = useCountdownParts();
  const units = [
    { label: "D", value: display.d },
    { label: "H", value: display.h },
    { label: "M", value: display.m },
    { label: "S", value: display.s },
  ];

  return (
    <div
      className={`flex items-center gap-4 bg-banner px-4 py-2.5 text-white xl:gap-5 xl:px-5 ${className}`}
    >
      <div className="flex items-end gap-3">
        {units.map((unit) => (
          <div key={unit.label} className="min-w-[1.75rem] text-center">
            <p className="text-lg font-semibold tabular-nums leading-none tracking-tight xl:text-xl">
              {pad(unit.value)}
            </p>
            <p className="mt-0.5 text-[0.6rem] font-medium tracking-[0.08em]">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
      <p className="hidden text-[0.7rem] leading-snug lg:block xl:text-xs">
        Remaining Until
        <br />
        the {festival.year} Festival
      </p>
      <Link
        href="/register"
        className="inline-flex shrink-0 items-center justify-center border border-white px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-banner xl:px-4"
      >
        Register
      </Link>
    </div>
  );
}
