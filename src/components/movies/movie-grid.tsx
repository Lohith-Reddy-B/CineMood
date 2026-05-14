"use client";

import { useState } from "react";
import { Movie } from "@/types/movie";
import { MovieCard } from "@/components/movies/movie-card";

type Props = {
  initialMovies: Movie[];
  endpoint: string;
};

export function MovieGrid({ initialMovies, endpoint }: Props) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`${endpoint}${endpoint.includes("?") ? "&" : "?"}page=${nextPage}`);
      const payload = await response.json();
      setMovies((prev) => [...prev, ...(payload.results ?? [])]);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}-${movie.release_date}`} movie={movie} />
        ))}
      </div>
      <button
        type="button"
        onClick={loadMore}
        className="w-full rounded-lg border border-yellow-400/40 bg-yellow-400/10 p-3 text-sm text-yellow-300 hover:bg-yellow-400/20"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </section>
  );
}
