import { Movie, MovieResponse } from "@/types/movie";

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const CACHE_SECONDS = 300;

function tmdbToken() {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN is missing");
  }
  return token;
}

async function request<T>(path: string, params = new URLSearchParams()) {
  params.set("include_adult", "false");
  const response = await fetch(`${TMDB_API_BASE}${path}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${tmdbToken()}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getTrending(page = 1): Promise<MovieResponse> {
  return request<MovieResponse>("/trending/movie/week", new URLSearchParams({ page: String(page) }));
}

export async function getTopRated(page = 1): Promise<MovieResponse> {
  return request<MovieResponse>("/movie/top_rated", new URLSearchParams({ page: String(page) }));
}

export async function discoverMovies(input: {
  page?: number;
  language?: string;
  genres?: string;
  sortBy?: string;
  runtimeLte?: number;
}): Promise<MovieResponse> {
  const params = new URLSearchParams({
    page: String(input.page ?? 1),
    sort_by: input.sortBy ?? "vote_average.desc",
    "vote_average.gte": "6",
    "vote_average.lte": "10",
  });

  if (input.language) params.set("with_original_language", input.language);
  if (input.genres) params.set("with_genres", input.genres);
  if (input.runtimeLte) {
    params.set("with_runtime.gte", "60");
    params.set("with_runtime.lte", String(input.runtimeLte));
  }

  return request<MovieResponse>("/discover/movie", params);
}

export async function searchMovies(query: string, page = 1): Promise<MovieResponse> {
  return request<MovieResponse>(
    "/search/movie",
    new URLSearchParams({ query, page: String(page) }),
  );
}

export async function getMovieDetails(id: number): Promise<Movie> {
  return request<Movie>(`/movie/${id}`);
}

export async function getSimilarMovies(id: number, page = 1): Promise<MovieResponse> {
  return request<MovieResponse>(`/movie/${id}/similar`, new URLSearchParams({ page: String(page) }));
}

export async function getMovieVideos(id: number) {
  return request<{ results: Array<{ key: string; site: string; type: string }> }>(`/movie/${id}/videos`);
}

export async function getWatchProviders(id: number) {
  return request<{ results: Record<string, { flatrate?: Array<{ provider_name: string }> }> }>(
    `/movie/${id}/watch/providers`,
  );
}
