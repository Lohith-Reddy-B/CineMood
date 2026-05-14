"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Movie } from "@/types/movie";
import { TMDB_IMAGE_BASE } from "@/utils/constants";

const moodTags = ["Feel-Good", "Thrilling", "Romantic", "Mind-Bending", "Emotional"];

function posterSrc(movie: Movie) {
  return movie.poster_path ? `${TMDB_IMAGE_BASE}/w500${movie.poster_path}` : "/placeholder-poster.svg";
}

export function MovieCard({ movie }: { movie: Movie }) {
  const year = movie.release_date?.slice(0, 4) || "N/A";
  const [src, setSrc] = useState(posterSrc(movie));
  return (
    <motion.article
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80"
    >
      <Link href={`/movies/${movie.id}`}>
        <Image
          src={src}
          alt={`${movie.title} poster`}
          width={500}
          height={750}
          className="h-[320px] w-full object-cover"
          loading="lazy"
          onError={() => setSrc("/placeholder-poster.svg")}
        />
      </Link>
      <div className="space-y-2 p-3">
        <h3 className="line-clamp-1 font-semibold text-white">{movie.title}</h3>
        <div className="flex items-center justify-between text-xs text-zinc-300">
          <span className="rounded bg-amber-500/20 px-2 py-1 text-amber-300">⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{year}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {moodTags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded bg-pink-500/15 px-2 py-0.5 text-[10px] text-pink-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
