"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

export function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/browse" className="text-xl font-semibold text-yellow-300">
          CineMood
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <Link href="/browse">Browse</Link>
          <Link href="/search">Search</Link>
          <Link href="/watch-with">Watch With</Link>
          <Link href="/watchlist">Watchlist</Link>
          <Link href="/profile">Profile</Link>
          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="rounded border border-white/20 px-2 py-1"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
