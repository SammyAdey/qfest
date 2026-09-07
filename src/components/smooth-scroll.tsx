"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const syncIntroLock = () => {
      if (document.documentElement.classList.contains("intro-lock")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    syncIntroLock();

    const observer = new MutationObserver(syncIntroLock);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onReducedChange = () => {
      if (reduced.matches) {
        lenis.destroy();
        cancelAnimationFrame(frame);
      }
    };
    reduced.addEventListener("change", onReducedChange);

    return () => {
      reduced.removeEventListener("change", onReducedChange);
      observer.disconnect();
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
