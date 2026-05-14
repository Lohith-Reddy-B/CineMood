import { discoverMovies, getTopRated, getTrending } from "@/services/tmdb";
import { MovieGrid } from "@/components/movies/movie-grid";
import { LANGUAGE_OPTIONS } from "@/utils/constants";

export async function HomeSections() {
  const [trending, topRated, hiddenGems, under2Hours, telugu, thrillers, couple] = await Promise.all([
    getTrending(1),
    getTopRated(1),
    discoverMovies({ page: 1, sortBy: "vote_average.desc", genres: "18", language: "en" }),
    discoverMovies({ page: 1, runtimeLte: 120 }),
    discoverMovies({ page: 1, language: "te" }),
    discoverMovies({ page: 1, genres: "53,9648" }),
    discoverMovies({ page: 1, genres: "10749,18" }),
  ]);

  const languageCollections = await Promise.all(
    LANGUAGE_OPTIONS.map(async (language) => ({
      language,
      data: await discoverMovies({ page: 1, language: language.code }),
    })),
  );

  return (
    <div className="space-y-12">
      <section className="rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-6 shadow-[0_0_40px_rgba(255,215,0,0.15)]">
        <h1 className="text-4xl font-semibold text-white">CineMood</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          AI-powered movie discovery engine for language-first and context-first recommendations.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Trending Now</h2>
        <MovieGrid initialMovies={trending.results} endpoint="/api/movies/trending" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Hidden Gems</h2>
        <MovieGrid
          initialMovies={hiddenGems.results.filter((movie) => movie.vote_count < 1000 && movie.vote_average >= 7.5)}
          endpoint="/api/movies/discover?sort_by=vote_average.desc&with_genres=18&with_original_language=en"
        />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Top IMDb Movies</h2>
        <MovieGrid initialMovies={topRated.results} endpoint="/api/movies/top-rated" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Best Thrillers</h2>
        <MovieGrid initialMovies={thrillers.results} endpoint="/api/movies/discover?with_genres=53,9648" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Movies Under 2 Hours</h2>
        <MovieGrid initialMovies={under2Hours.results} endpoint="/api/movies/discover?with_runtime.lte=120" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Best Couple Movies</h2>
        <MovieGrid initialMovies={couple.results} endpoint="/api/movies/discover?with_genres=10749,18" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Best by Language</h2>
        <div className="space-y-10">
          {languageCollections.map((collection) => (
            <div key={collection.language.code}>
              <h3 className="mb-3 text-lg font-semibold text-pink-300">{collection.language.label}</h3>
              <MovieGrid
                initialMovies={collection.data.results}
                endpoint={`/api/movies/discover?with_original_language=${collection.language.code}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-yellow-300">Telugu Spotlight</h2>
        <MovieGrid initialMovies={telugu.results} endpoint="/api/movies/discover?with_original_language=te" />
      </section>
    </div>
  );
}
