"use client";

import { useState } from "react";
import { useAuth } from "@/providers/authProvider";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // This is a mock login - replace with actual API call
      const mockUser = {
        id: "1",
        email: email,
        name: "Test User",
      };

      login(mockUser);
      window.location.href = redirect;
    } catch (err) {
      console.log(err);
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-full grow py-[24px] flex items-center justify-center bg-neutral-50 dark:bg-black px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-800 p-4 py-8 md:p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            {`Don't have an account?`}{" "}
            <Link
              href={`/register?redirect=${redirect}`}
              className="font-medium text-neutral-900 dark:text-neutral-200 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:text-neutral-100"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 dark:bg-neutral-700 dark:text-neutral-100"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
