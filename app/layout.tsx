
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import "../styles/globals.css";

// export const metadata = {
//   title: "Nepalese Guide to Japan",
//   description: "A student guide app",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [theme, setTheme] = useState<"light"|"dark">("light");

//   useEffect(() => {
//     // load saved theme
//     const saved = typeof window !== "undefined" && localStorage.getItem("theme");
//     if (saved === "dark") {
//       setTheme("dark");
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       setTheme("light");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const next = theme === "light" ? "dark" : "light";
//     setTheme(next);
//     if (next === "dark") document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", next);
//   };

//   return (
//     <html lang="en">
//       <body>
//         <header className="app-header">
//           <div className="nav-container">
//             <div className="brand">
//               <button
//                 className={`hamburger ${menuOpen ? "active" : ""}`}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 aria-label="Toggle menu"
//               >
//                 <span></span><span></span><span></span>
//               </button>
//               <h1 className="app-title">Nepalese Guide to Japan</h1>
//             </div>

//             <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
//               <Link href="/">Home</Link>
//               <Link href="/lessons">Lessons</Link>
//               <Link href="/conversation">Conversation</Link>
//               <Link href="/etiquette">Etiquette</Link>
//               <Link href="/survival">Survival Guide</Link>
//               <Link href="/community">Community</Link>
//               <Link href="/tools">Tools</Link>
//               <Link href="/news">News</Link>
//               <Link href="/search">Search</Link>
//             </nav>

//             <div className="actions">
//               <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
//                 {theme === "light" ? "🌙" : "☀️"}
//               </button>
//             </div>
//           </div>
//         </header>

//         <main className="app-main">
//           <div className="content">{children}</div>
//         </main>

//         <footer className="app-footer">
//           &copy; {new Date().getFullYear()} Nepalese Guide to Japan
//         </footer>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../app/Navbar";

export const metadata: Metadata = {
  title: "Nepalese Guide to Japan",
  description: "A student guide app for Nepali students in Japan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
        <footer>&copy; {new Date().getFullYear()} Nepalese Guide to Japan</footer>
      </body>
    </html>
  );
}
