import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-crimson">Missing page</p>
      <h1 className="mt-4 font-display text-5xl text-ink">This story isn’t here.</h1>
      <Link
        href="/"
        className="mt-8 text-xs uppercase tracking-[0.2em] text-crimson hover:text-ember"
      >
        Back to QFest
      </Link>
    </main>
  );
}
