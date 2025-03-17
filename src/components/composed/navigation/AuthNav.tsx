"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function AuthNav({ shouldTextBeWhite = false }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center w-full h-16 px-4 shadow-sm dark:shadow-neutral-900/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex w-max items-center">
          <span
            className={`text-xl font-bold ${
              shouldTextBeWhite
                ? "text-white"
                : "text-neutral-700 dark:text-neutral-200"
            }`}
          >
            Store
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`mt-1 ${
              shouldTextBeWhite
                ? "text-white"
                : "text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {isLoginPage && (
            <Link
              href="/register"
              className={`text-sm font-medium ${
                shouldTextBeWhite
                  ? "text-white"
                  : "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              Register
            </Link>
          )}
          {isRegisterPage && (
            <Link
              href="/login"
              className={`text-sm font-medium ${
                shouldTextBeWhite
                  ? "text-white"
                  : "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
