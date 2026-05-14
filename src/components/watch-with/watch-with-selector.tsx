"use client";

import { useEffect, useMemo, useState } from "react";
import { MovieGrid } from "@/components/movies/movie-grid";
import { Movie } from "@/types/movie";
import { LANGUAGE_OPTIONS, WATCH_CONTEXTS } from "@/utils/constants";

type Props = {
  initialMovies: Movie[];
};

type WatchContext = (typeof WATCH_CONTEXTS)[number];
type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];

export function WatchWithSelector({ initialMovies }: Props) {
  const [context, setContext] = useState<WatchContext>(WATCH_CONTEXTS[0]);
  const [language, setLanguage] = useState<LanguageOption>(LANGUAGE_OPTIONS[0]);
  const [movies, setMovies] = useState(initialMovies);

  const endpoint = useMemo(
    () => `/api/movies/discover?with_genres=${context.genres}&with_original_language=${language.code}`,
    [context.genres, language.code],
  );

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => setMovies(payload.results ?? []));
  }, [endpoint]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-zinc-300">Who are you watching with?</span>
          <select
            value={context.key}
            onChange={(event) => setContext(WATCH_CONTEXTS.find((item) => item.key === event.target.value) ?? WATCH_CONTEXTS[0])}
            className="w-full rounded-lg border border-white/20 bg-zinc-900 px-3 py-2"
          >
            {WATCH_CONTEXTS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm text-zinc-300">Preferred language</span>
          <select
            value={language.code}
            onChange={(event) =>
              setLanguage(LANGUAGE_OPTIONS.find((item) => item.code === event.target.value) ?? LANGUAGE_OPTIONS[0])
            }
            className="w-full rounded-lg border border-white/20 bg-zinc-900 px-3 py-2"
          >
            {LANGUAGE_OPTIONS.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <MovieGrid key={`${context.key}-${language.code}`} initialMovies={movies} endpoint={endpoint} />
    </section>
  );
}
