import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-semibold text-yellow-300">CineMood</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Your cinematic AI movie decision engine for language-first and watch-context-first recommendations.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/login" className="rounded-lg bg-yellow-400 px-5 py-3 text-zinc-900">
          Login
        </Link>
        <Link href="/signup" className="rounded-lg border border-white/20 px-5 py-3 text-white">
          Signup
        </Link>
      </div>
    </main>
  );
}
