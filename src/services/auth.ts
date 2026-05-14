"use client";

import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirebaseAuth } from "@/services/firebase";

const SESSION_COOKIE = "cinemood-auth=1; path=/; max-age=2592000; samesite=lax";
const CLEAR_SESSION_COOKIE = "cinemood-auth=; path=/; max-age=0; samesite=lax";

function setSessionCookie() {
  if (typeof document !== "undefined") document.cookie = SESSION_COOKIE;
}

function clearSessionCookie() {
  if (typeof document !== "undefined") document.cookie = CLEAR_SESSION_COOKIE;
}

export async function loginWithGoogle() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  setSessionCookie();
  return credential.user;
}

export async function signupWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(credential.user);
  setSessionCookie();
  return credential.user;
}

export async function loginWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  setSessionCookie();
  return credential.user;
}

export async function sendReset(email: string) {
  return sendPasswordResetEmail(getFirebaseAuth(), email);
}

export async function resendVerification(user: User) {
  return sendEmailVerification(user);
}

export async function logout() {
  await signOut(getFirebaseAuth());
  clearSessionCookie();
}
