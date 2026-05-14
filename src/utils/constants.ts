export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const LANGUAGE_OPTIONS = [
  { code: "te", label: "Telugu" },
  { code: "kn", label: "Kannada" },
  { code: "ta", label: "Tamil" },
  { code: "ml", label: "Malayalam" },
  { code: "hi", label: "Hindi" },
  { code: "en", label: "English" },
  { code: "ko", label: "Korean" },
  { code: "ja", label: "Japanese" },
] as const;

export const WATCH_CONTEXTS = [
  { key: "couple", label: "Couple", genres: "10749,18" },
  { key: "friends", label: "Friends", genres: "28,35,12,80" },
  { key: "family", label: "Family", genres: "16,12,14" },
  { key: "solo", label: "Solo", genres: "18,878,9648" },
  { key: "parents", label: "Parents", genres: "36,18,10751" },
  { key: "children", label: "Children", genres: "16,10751" },
  { key: "late-night-watch", label: "Late Night Watch", genres: "53,27,9648" },
] as const;
