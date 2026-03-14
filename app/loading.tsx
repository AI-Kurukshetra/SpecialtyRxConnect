export default function Loading() {
  return (
    <main className="page-shell">
      <div className="content-shell">
        <div className="panel h-40 animate-pulse bg-slate-100" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="panel h-44 animate-pulse bg-slate-100" key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
