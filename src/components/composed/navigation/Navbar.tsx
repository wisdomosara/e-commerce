"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/authProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const shouldTextBeWhite = isHomePage && !isScrolled && theme === "light";
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".user-dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-neutral-50/60 dark:bg-neutral-900/10 backdrop-blur-xl shadow-sm dark:shadow-neutral-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 ">
        <div className="flex h-16 items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center md:space-x-4 shrink-0">
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
            <div className="hidden md:flex items-center space-x-4">
              {["Products", "Categories"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`${
                    shouldTextBeWhite
                      ? "text-white"
                      : "text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full p-2 pl-4 pr-10 rounded-md border shadow-sm ${
                  shouldTextBeWhite
                    ? "bg-white/90 text-neutral-700 border-white/20"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700"
                }`}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Cart, Theme Toggle, and Auth */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <Link
              href="/cart"
              className={`p-2 ${
                shouldTextBeWhite
                  ? "text-white"
                  : "text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 ${
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
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    shouldTextBeWhite
                      ? "text-white hover:bg-white/10"
                      : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                    <User className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                  </div>
                  <span className="text-sm">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        role="menuitem"
                      >
                        <Settings className="inline-block w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        role="menuitem"
                      >
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-2">
                <Link
                  href={`/login?redirect=${pathname}`}
                  className={`text-sm ${
                    shouldTextBeWhite
                      ? "text-white"
                      : "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }`}
                >
                  Login
                </Link>
                <span
                  className={
                    shouldTextBeWhite ? "text-white" : "text-neutral-400"
                  }
                >
                  /
                </span>
                <Link
                  href={`/register?redirect=${pathname}`}
                  className={`text-sm ${
                    shouldTextBeWhite
                      ? "text-white"
                      : "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`pt-1 ${
                shouldTextBeWhite
                  ? "text-white"
                  : "text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 rounded-[12px] mb-[12px] px-4 bg-neutral-50/60 dark:bg-neutral-900/60 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {["Home", "Products", "Categories"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {item}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-neutral-200/60 dark:border-neutral-700/60">
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-700 dark:text-neutral-200">
                      {user.name}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    <Settings className="inline-block w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    <LogOut className="inline-block w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2 pt-4 border-t border-neutral-200/60 dark:border-neutral-700/60">
                  <Link
                    href={`/login?redirect=${pathname}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    Login
                  </Link>
                  <span className="text-neutral-400">/</span>
                  <Link
                    href={`/register?redirect=${pathname}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    Register
                  </Link>
                </div>
              )}
              <div className="flex items-center space-x-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-700/60">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
