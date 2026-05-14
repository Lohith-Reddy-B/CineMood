"use client";

import { useEffect, useState } from "react";
import { MovieGrid } from "@/components/movies/movie-grid";
import { Movie } from "@/types/movie";

export default function SearchPage() {
  const [query, setQuery] = useState("interstellar");
  const [debounced, setDebounced] = useState(query);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    fetch(`/api/movies/search?query=${encodeURIComponent(debounced)}`)
      .then((response) => response.json())
      .then((payload) => setMovies(payload.results ?? []));
  }, [debounced]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-yellow-300">Search</h1>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title"
        className="w-full rounded-lg border border-white/20 bg-zinc-900 px-3 py-2"
      />
      <MovieGrid
        key={debounced}
        initialMovies={movies}
        endpoint={`/api/movies/search?query=${encodeURIComponent(debounced)}`}
      />
    </section>
  );
}
