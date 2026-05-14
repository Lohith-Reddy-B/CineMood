import Image from "next/image";
import { getMovieDetails, getMovieVideos, getSimilarMovies, getWatchProviders } from "@/services/tmdb";
import { MovieGrid } from "@/components/movies/movie-grid";
import { TMDB_IMAGE_BASE } from "@/utils/constants";

export const dynamic = "force-dynamic";

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movieId = Number(id);
  const [movie, similar, videos, providers] = await Promise.all([
    getMovieDetails(movieId),
    getSimilarMovies(movieId, 1),
    getMovieVideos(movieId),
    getWatchProviders(movieId),
  ]);

  const trailer = videos.results.find((video) => video.site === "YouTube" && video.type === "Trailer");
  const inProviders = providers.results.IN?.flatrate?.map((provider) => provider.provider_name) ?? [];

  return (
    <article className="space-y-8">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
        {movie.backdrop_path && (
          <Image
            src={`${TMDB_IMAGE_BASE}/w1280${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            width={1280}
            height={720}
            className="h-72 w-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <h1 className="text-3xl font-semibold text-white">{movie.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-200">{movie.overview}</p>
            <p className="mt-2 text-sm text-yellow-300">
              ⭐ {movie.vote_average.toFixed(1)} • {movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-pink-300">Where to Watch</h2>
        <div className="flex flex-wrap gap-2">
          {inProviders.length === 0 && <span className="text-sm text-zinc-400">No IN provider data available.</span>}
          {inProviders.map((provider) => (
            <span key={provider} className="rounded bg-white/10 px-2 py-1 text-sm">
              {provider}
            </span>
          ))}
        </div>
      </section>

      {trailer && (
        <section>
          <h2 className="mb-3 text-xl font-semibold text-pink-300">Trailer</h2>
          <iframe
            title="Movie trailer"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            className="h-72 w-full rounded-xl"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </section>
      )}

      <section>
        <h2 className="mb-3 text-xl font-semibold text-pink-300">Similar Movies</h2>
        <MovieGrid initialMovies={similar.results} endpoint={`/api/movies/${movieId}/similar`} />
      </section>
    </article>
  );
}
