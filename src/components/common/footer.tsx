import Link from "next/link";

const columns = {
  Product: [
    { href: "/browse", label: "Browse" },
    { href: "/search", label: "Search" },
    { href: "/watch-with", label: "Watch With" },
    { href: "/watchlist", label: "Watchlist" },
  ],
  Legal: [
    { href: "/policy/privacy", label: "Privacy Policy" },
    { href: "/policy/terms", label: "Terms & Conditions" },
    { href: "/policy/disclaimer", label: "Disclaimer" },
    { href: "/policy/cookies", label: "Cookie Policy" },
  ],
  Community: [
    { href: "/policy/community", label: "Community Guidelines" },
    { href: "/policy/about", label: "About Us" },
    { href: "/policy/contact", label: "Contact Us" },
  ],
  Connect: [
    { href: "https://www.themoviedb.org/", label: "TMDB Attribution" },
    { href: "https://x.com", label: "X" },
    { href: "https://instagram.com", label: "Instagram" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/50 px-6 py-10 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        {Object.entries(columns).map(([title, links]) => (
          <section key={title}>
            <h3 className="mb-3 text-sm font-semibold text-yellow-400">{title}</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-pink-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-zinc-500">© {new Date().getFullYear()} CineMood</p>
    </footer>
  );
}
