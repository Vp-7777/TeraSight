export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-24">
      <main className="flex max-w-2xl flex-col items-center text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Powered by PrithviQ AI
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          TeraSight
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
          Turning Environmental Imagery into Actionable Intelligence.
        </p>
      </main>
    </div>
  );
}
