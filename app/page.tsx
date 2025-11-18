// "use client";
// import React from "react";
// import AnimatedFadeIn from "../components/AnimatedFadeIn";

// const features = [
//   {
//     name: "Lessons",
//     path: "/lessons",
//     desc: "Japanese N5 level vocabulary, grammar, kanji, and quizzes.",
//   },
  
//   {
//     name: "Survival Guide",
//     path: "/survival",
//     desc: "Registration, banking, transport, emergency contacts.",
//   },
  
//   {
//     name: "Tools",
//     path: "/tools",
//     desc: "Currency converter, weather, train routes, maps.",
//   },
//   // Progress page removed
//   {
//     name: "News",
//     path: "/news",
//     desc: "Latest news and updates for students.",
//   },
//   {
//     name:"Search",
//     path:"/search",
//     desc:"Search for lessons, conversations, etiquette tips, and more.",
//   }
 
// ];

// export default function Home() {
//   return (
//     <>
//       <AnimatedFadeIn delay={100}>
//         <h2>Welcome to Nepalese Guide to Japan</h2>
//       </AnimatedFadeIn>
//       <AnimatedFadeIn delay={300}>
//         <p>
//           This app helps Nepalese students coming to Japan learn Japanese (N5
//           level), basic conversations, rules, and much more. Explore each
//           section below:
//         </p>
//       </AnimatedFadeIn>
//       <div className="feature-summary">
//         {features.map((feature, idx) => (
//           <AnimatedFadeIn key={feature.name} delay={500 + idx * 200}>
//             <div className="feature-card">
//               <h3>
//                 <a href={feature.path}>{feature.name}</a>
//               </h3>
//               <p>{feature.desc}</p>
//             </div>
//           </AnimatedFadeIn>
//         ))}
//       </div>
//     </>
//   );
// }
"use client";
import React from "react";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

const features = [
  {
    name: "📘 Lessons",
    path: "/lessons",
    desc: "Study Japanese vocabulary, kanji, and grammar with examples.",
  },
  {
    name: "🗾 Survival Guide",
    path: "/survival",
    desc: "Learn how to handle banks, hospitals, and local registration.",
  },
  {
    name: "🧭 Tools",
    path: "/tools",
    desc: "Use helpful tools like currency converter, weather, and maps.",
  },
  {
    name: "📰 News",
    path: "/news",
    desc: "Stay updated with the latest news and student info.",
  },
  {
    name: "🔍 Search",
    path: "/search",
    desc: "Quickly find lessons, phrases, or important tips.",
  },
];

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#fffaf0",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <AnimatedFadeIn delay={100}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#b36e00",
            marginBottom: "1rem",
          }}
        >
          🇳🇵 Nepalese Guide to Japan 🇯🇵
        </h1>
      </AnimatedFadeIn>

      <AnimatedFadeIn delay={300}>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#444",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: "1.7",
          }}
        >
          A complete guide for Nepalese students in Japan — learn the language,
          explore useful places, and get essential tips for daily life. Start
          your journey below 👇
        </p>
      </AnimatedFadeIn>

      {/* Feature Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {features.map((feature, idx) => (
          <AnimatedFadeIn key={feature.name} delay={500 + idx * 200}>
            <a
              href={feature.path}
              style={{
                display: "block",
                backgroundColor: "#ffffff",
                padding: "1.5rem",
                borderRadius: "16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                textDecoration: "none",
                color: "#333",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#c47f00",
                  marginBottom: "0.6rem",
                }}
              >
                {feature.name}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#555",
                  lineHeight: "1.5",
                }}
              >
                {feature.desc}
              </p>
            </a>
          </AnimatedFadeIn>
        ))}
      </div>

            {/* Footer */}
            <footer
              style={{
                marginTop: "3rem",
                color: "#888",
                fontSize: "0.9rem",
              }}
            >
              <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <p style={{ margin: 0 }}>
                  © {new Date().getFullYear()} Nepalese Guide to Japan — Built with ❤️ for students.
                </p>
                <p style={{ margin: "0.25rem 0 0" }}>
                  <a href="/privacy" style={{ color: "#888", textDecoration: "underline" }}>Privacy</a>{" "}
                  · <a href="/terms" style={{ color: "#888", textDecoration: "underline" }}>Terms</a>
                </p>
              </div>
            </footer>
          </div>
        );
      }
        