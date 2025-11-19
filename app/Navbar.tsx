"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import styles from "./Navbar.module.css";

type Theme = "light" | "dark";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Lessons", href: "/lessons" },
  { label: "Survival", href: "/survival" },
  { label: "Tools", href: "/tools" },
  { label: "News", href: "/news" },
  { label: "Search", href: "/search" },
  { label: "Login", href: "/login" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("theme") as Theme | null;
    const nextTheme: Theme = saved === "dark" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Go to home">
          <span className={styles.flag} aria-hidden="true">
            🇳🇵
          </span>
          <span className={styles.title}>Nepalese Guide</span>
        </Link>

        <ul
          id="site-nav"
          className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${
                  isActive(link.href) ? styles.activeLink : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={styles.mobileTheme}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              <span>{theme === "light" ? "Dark" : "Light"} mode</span>
            </button>
          </li>
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.themeToggle} ${styles.desktopTheme}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
