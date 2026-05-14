export function PolicyPage({ title, content }: { title: string; content: string }) {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-10 text-zinc-200">
      <h1 className="text-3xl font-semibold text-yellow-300">{title}</h1>
      <p className="leading-8">{content}</p>
    </main>
  );
}
