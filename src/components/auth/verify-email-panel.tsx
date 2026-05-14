"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { resendVerification } from "@/services/auth";

export function VerifyEmailPanel() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  return (
    <main className="mx-auto mt-16 w-full max-w-md rounded-xl border border-white/10 bg-zinc-900/70 p-6 text-zinc-100 backdrop-blur">
      <h1 className="text-2xl font-semibold text-yellow-300">Verify Your Email</h1>
      <p className="mt-3 text-sm text-zinc-300">Please verify your email before accessing CineMood.</p>
      <button
        type="button"
        className="mt-6 rounded-lg border border-white/20 px-4 py-2"
        onClick={async () => {
          if (!user) {
            setMessage("Login first to resend verification.");
            return;
          }
          await resendVerification(user);
          setMessage("Verification email resent.");
        }}
      >
        Resend Verification Email
      </button>
      {message && <p className="mt-3 text-sm text-pink-300">{message}</p>}
    </main>
  );
}
