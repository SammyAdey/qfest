"use client";

import { useEffect, useId, useRef } from "react";

type BlobSpec = {
  x: number; // 0–1 relative to container
  y: number;
  radius: number; // fraction of min(w,h)
  fill: string;
  opacity?: number;
  speed?: number;
  mouse?: number; // how strongly it follows the pointer (px scale)
};

type Props = {
  blobs: BlobSpec[];
  className?: string;
};

function blobPath(
  cx: number,
  cy: number,
  radius: number,
  t: number,
  seed: number,
) {
  const points = 8;
  const coords: Array<[number, number]> = [];

  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const wobble =
      Math.sin(t * 1.6 + i * 1.7 + seed) * 0.16 +
      Math.cos(t * 1.05 + i * 0.95 + seed * 0.7) * 0.12 +
      Math.sin(t * 0.55 + i * 2.3 + seed * 1.3) * 0.08;
    const r = radius * (1 + wobble);
    coords.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }

  let d = `M ${coords[0]![0]} ${coords[0]![1]}`;
  for (let i = 0; i < points; i += 1) {
    const current = coords[i]!;
    const next = coords[(i + 1) % points]!;
    const midX = (current[0] + next[0]) / 2;
    const midY = (current[1] + next[1]) / 2;
    d += ` Q ${current[0]} ${current[1]} ${midX} ${midY}`;
  }
  d += " Z";
  return d;
}

export function MorphBlobs({ blobs, className = "" }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const cursor = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let cancelled = false;
    const start = performance.now();

    // Seed static shapes if reduced motion
    const paintStatic = () => {
      const { width: w, height: h } = root.getBoundingClientRect();
      const base = Math.min(w, h);
      blobs.forEach((blob, i) => {
        const path = pathRefs.current[i];
        if (!path) return;
        const cx = blob.x * w;
        const cy = blob.y * h;
        const r = blob.radius * base;
        path.setAttribute("d", blobPath(cx, cy, r, i * 1.7, i + 1));
      });
    };

    if (media.matches) {
      paintStatic();
      return;
    }

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      mouse.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      if (cancelled) return;

      const { width: w, height: h } = root.getBoundingClientRect();
      if (w > 0 && h > 0) {
        const ease = 0.08;
        cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
        cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

        const t = (now - start) / 1000;
        const base = Math.min(w, h);

        blobs.forEach((blob, i) => {
          const path = pathRefs.current[i];
          if (!path) return;

          const pull = blob.mouse ?? 0.12;
          const cx =
            blob.x * w + (cursor.current.x - 0.5) * w * pull;
          const cy =
            blob.y * h + (cursor.current.y - 0.5) * h * pull;
          const speed = blob.speed ?? 1;
          const r = blob.radius * base;

          path.setAttribute(
            "d",
            blobPath(cx, cy, r, t * speed, i * 2.4 + 1),
          );
        });
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [blobs]);

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id={`blob-soft-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        {blobs.map((blob, i) => (
          <path
            key={i}
            ref={(node) => {
              pathRefs.current[i] = node;
            }}
            fill={blob.fill}
            opacity={blob.opacity ?? 0.7}
            filter={`url(#blob-soft-${uid})`}
          />
        ))}
      </svg>
    </div>
  );
}

export const aboutBlobs: BlobSpec[] = [
  {
    x: 0.18,
    y: 0.55,
    radius: 0.28,
    fill: "#e8d59a",
    opacity: 0.55,
    speed: 0.85,
    mouse: 0.1,
  },
  {
    x: 0.88,
    y: 0.48,
    radius: 0.18,
    fill: "#f0c4c0",
    opacity: 0.65,
    speed: 1.15,
    mouse: 0.16,
  },
];

export const verseBlobs: BlobSpec[] = [
  {
    x: 0.9,
    y: 0.12,
    radius: 0.26,
    fill: "#e8d4a8",
    opacity: 0.55,
    speed: 0.9,
    mouse: 0.12,
  },
  {
    x: 0.12,
    y: 0.82,
    radius: 0.24,
    fill: "#edd5cf",
    opacity: 0.6,
    speed: 1.05,
    mouse: 0.14,
  },
  {
    x: 0.22,
    y: 0.22,
    radius: 0.14,
    fill: "#d9cbb8",
    opacity: 0.55,
    speed: 1.25,
    mouse: 0.18,
  },
  {
    x: 0.82,
    y: 0.78,
    radius: 0.16,
    fill: "#f0e2d0",
    opacity: 0.7,
    speed: 0.95,
    mouse: 0.11,
  },
];
