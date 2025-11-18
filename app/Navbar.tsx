"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">🇳🇵 Nepalese Guide</h1>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/lessons">Lessons</Link></li>
          {/* <li><Link href="/conversation">Conversation</Link></li> */}
          {/* <li><Link href="/etiquette">Etiquette</Link></li> */}
          <li><Link href="/survival">Survival</Link></li>
          {/* <li><Link href="/community">Community</Link></li> */}
          <li><Link href="/tools">Tools</Link></li>
          <li><Link href="/news">News</Link></li>
          <li><Link href="/search">Search</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
