"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const shouldTextBeWhite = isHomePage && !isScrolled && theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/60 dark:bg-black/10 backdrop-blur-xl shadow-sm dark:shadow-gray-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-xl font-bold ${shouldTextBeWhite ? "text-white" : "text-black dark:text-white"}`}>
              Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}
            >
              Categories
            </Link>
          </div>

          {/* Search, Cart and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className={`p-2 ${shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/cart"
              className={`p-2 ${shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 ${shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${shouldTextBeWhite ? "text-white" : "text-black dark:text-gray-300 dark:hover:text-white"}`}
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
          <div className="md:hidden pb-4 bg-white/60 dark:bg-black/60 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-black dark:text-gray-300 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-black dark:text-gray-300 dark:hover:text-white"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-black dark:text-gray-300 dark:hover:text-white"
              >
                Categories
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                <button
                  className="p-2 text-black dark:text-gray-300 dark:hover:text-white"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <Link
                  href="/cart"
                  className="p-2 text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-black dark:text-gray-300 dark:hover:text-white"
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
