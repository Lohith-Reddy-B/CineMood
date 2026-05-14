# CineMood

Production-ready Next.js movie discovery and recommendation platform with Firebase auth and TMDB integration.

## Setup

1. Copy `.env.example` to `.env.local` and fill credentials.
2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

## Features

- Firebase authentication (email/password + Google OAuth + verification flow)
- Protected routes for browse/search/watch-with/movie details/watchlist/profile
- TMDB v4 token based server-side API integration with caching
- Discover, trending, top-rated, search, similar, trailer, and OTT provider endpoints
- Language-based and context-based movie recommendations with Load More
- Cinematic dark UI with Tailwind + Framer Motion
- Policy pages, sitemap, robots, and production environment template
