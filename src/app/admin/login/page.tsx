"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.setupRequired) {
          setSetupRequired(true);
        }
        throw new Error(data.error || "Authentication failed");
      }

      router.push(from);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error occurred";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F4F1EA]">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E6E1D6] p-8 md:p-10 shadow-lg text-left">
        <div className="text-center mb-8">
          <div className="w-14 h-14 relative mx-auto mb-3 rounded-2xl overflow-hidden border border-[#E6E1D6] bg-white shadow-sm">
            <Image
              src="/brand/vv-properties-logo.jpg"
              alt="V.V Properties Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#B08D57] font-semibold">
            Internal Operations Portal
          </span>
          <h1 className="font-serif text-2xl text-[#0B1F3A] mt-1 font-normal">
            V.V Properties Admin
          </h1>
          <p className="text-xs text-[#5B6577] mt-1">
            Enter administrative credentials to access lead intelligence and compliance controls.
          </p>
        </div>

        {setupRequired && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-[#0B1F3A] leading-relaxed">
            <strong className="block text-amber-900 font-semibold mb-1">
              Configuration Notice:
            </strong>
            Please configure <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> in your <code>.env.local</code> or hosting platform environment variables.
          </div>
        )}

        {error && !setupRequired && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-mono uppercase tracking-wider text-[#0B1F3A] mb-2 font-medium"
            >
              Master Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#E6E1D6] bg-[#F7F4EE]/60 text-sm text-[#0B1F3A] focus:outline-none focus:border-[#B08D57] focus:bg-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 px-6 rounded-full bg-[#0B1F3A] text-[#F7F4EE] hover:bg-[#0B1F3A]/90 font-medium text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E6E1D6] text-center text-[11px] text-[#5B6577]">
          <span>Protected by HMAC-SHA256 session tokens and IP rate limiting.</span>
        </div>
      </div>
    </div>
  );
}
