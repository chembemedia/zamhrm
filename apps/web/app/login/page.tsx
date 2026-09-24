"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(""); const form = new FormData(event.currentTarget); const result = await signIn("credentials", { email: form.get("email"), password: form.get("password"), redirect: false }); if (result?.error) setError("Invalid email or password."); else router.push("/"); setLoading(false); }
  return <main className="grid min-h-screen place-items-center bg-canvas p-5"><div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-soft"><div className="mb-8 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-2xl font-extrabold text-white">Z</span><div><p className="font-display text-lg font-extrabold">ZamConnect</p><p className="text-[10px] font-bold tracking-[.25em] text-brand">PEOPLE</p></div></div><h1 className="font-display text-2xl font-extrabold">Welcome back</h1><p className="mt-2 text-sm text-muted">Sign in to your workforce intelligence workspace.</p><form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-sm font-semibold">Work email<input required name="email" type="email" className="mt-2 h-11 w-full rounded-xl border border-line px-3 outline-none focus:border-brand" placeholder="you@company.com" /></label><label className="block text-sm font-semibold">Password<input required name="password" type="password" className="mt-2 h-11 w-full rounded-xl border border-line px-3 outline-none focus:border-brand" /></label>{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="h-11 w-full rounded-xl bg-brand font-bold text-white transition hover:bg-blue-700 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button></form></div></main>;
}
