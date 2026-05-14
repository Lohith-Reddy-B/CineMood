import { WatchWithSelector } from "@/components/watch-with/watch-with-selector";
import { discoverMovies } from "@/services/tmdb";

export const dynamic = "force-dynamic";

export default async function WatchWithPage() {
  const seed = await discoverMovies({ page: 1, genres: "10749,18", language: "te" });
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-yellow-300">Watch With</h1>
      <p className="text-zinc-300">Choose context and language to get instant smart recommendations.</p>
      <WatchWithSelector initialMovies={seed.results} />
    </section>
  );
}
