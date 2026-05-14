"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { loginWithEmail, loginWithGoogle, sendReset, signupWithEmail } from "@/services/auth";

function authErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  if (code.includes("invalid-credential")) return "Invalid email or password.";
  if (code.includes("email-already-in-use")) return "An account already exists with this email.";
  if (code.includes("weak-password")) return "Password is too weak. Please use a stronger password.";
  if (code.includes("user-not-found")) return "No account found with this email.";
  return "We couldn't process your request. Please try again.";
}

export function AuthForm({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        await signupWithEmail(email, password);
        router.push("/verify-email/pending");
      } else if (mode === "forgot") {
        await sendReset(email);
        setMessage("Password reset email sent.");
      } else {
        await loginWithEmail(email, password);
        router.push("/browse");
      }
    } catch (error) {
      setMessage(authErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      await loginWithGoogle();
      router.push("/browse");
    } catch (error) {
      setMessage(authErrorMessage(error));
    }
  }

  return (
    <main className="mx-auto mt-16 w-full max-w-md rounded-xl border border-white/10 bg-zinc-900/70 p-6 text-zinc-100 backdrop-blur">
      <h1 className="mb-6 text-2xl font-semibold text-yellow-300">
        {mode === "login" ? "Login" : mode === "signup" ? "Signup" : "Forgot Password"}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        {mode !== "forgot" && (
          <input
            className="w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
        )}
        <button className="w-full rounded-lg bg-yellow-400 px-3 py-2 text-zinc-900" type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : mode === "signup" ? "Signup" : "Send Reset Link"}
        </button>
      </form>

      {mode !== "forgot" && (
        <button className="mt-3 w-full rounded-lg border border-white/20 px-3 py-2" type="button" onClick={handleGoogle}>
          Continue with Google
        </button>
      )}

      {mode === "login" && (
        <p className="mt-4 text-sm text-zinc-400">
          <Link href="/forgot-password" className="text-pink-300">
            Forgot password?
          </Link>
        </p>
      )}

      {mode === "signup" && (
        <p className="mt-4 text-sm text-zinc-400">
          Already have an account? <Link href="/login" className="text-pink-300">Login</Link>
        </p>
      )}

      {message && <p className="mt-4 text-sm text-pink-300">{message}</p>}
    </main>
  );
}
