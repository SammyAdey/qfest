"use client";

import { createContext, use, useSyncExternalStore } from "react";

type ScheduleContextValue = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

const ScheduleContext = createContext<ScheduleContextValue | null>(null);
const KEY = "qfest-2026-schedule";
const EMPTY: string[] = [];

let snapshot: string[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return EMPTY;
    const ids = parsed.filter((id) => typeof id === "string");
    return ids.length ? ids : EMPTY;
  } catch {
    localStorage.removeItem(KEY);
    return EMPTY;
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  snapshot = readStorage();
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return snapshot;
}

function persist(next: string[]) {
  snapshot = next.length ? next : EMPTY;
  localStorage.setItem(KEY, JSON.stringify(snapshot));
  listeners.forEach((listener) => listener());
}

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);

  const value: ScheduleContextValue = {
    ids,
    toggle(id) {
      persist(
        snapshot.includes(id)
          ? snapshot.filter((item) => item !== id)
          : [...snapshot, id],
      );
    },
    has(id) {
      return ids.includes(id);
    },
  };

  return <ScheduleContext value={value}>{children}</ScheduleContext>;
}

export function useSchedule() {
  const ctx = use(ScheduleContext);
  if (!ctx) {
    throw new Error("useSchedule must be used within ScheduleProvider");
  }
  return ctx;
}
