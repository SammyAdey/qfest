export function PageFrame({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-paper">
      <header className="border-b border-ink/10 bg-paper-deep/40">
        <div className="mx-auto max-w-[100rem] px-5 py-14 md:px-8 md:py-20">
          <p className="text-xs uppercase tracking-[0.24em] text-crimson">{kicker}</p>
          <h1 className="mt-3 font-display text-5xl text-ink md:text-7xl">{title}</h1>
        </div>
      </header>
      {children}
    </main>
  );
}
