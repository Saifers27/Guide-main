// // import React from "react";
// // import CurrencyConverter from "./CurrencyConverter";
// // import Weather from "./Weather";
// // import TrainRoute from "./TrainRoute";
// // import Map from "./Map";

// // const Tools: React.FC = () => (
// //   <section>
// //     <h2>Practical Tools</h2>
// //     <CurrencyConverter />
// //     <Weather />
// //     <TrainRoute />
// //     <Map />
// //   </section>
// // );

// // export default Tools;
// "use client";
// import React from "react";
// import CurrencyConverter from "./CurrencyConverter";
// import Weather from "./Weather";
// import TrainRoute from "./TrainRoute";


// const Tools: React.FC = () => {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#fffaf0",
//         padding: "2rem 1rem",
//       }}
//     >
//       <h1
//         style={{
//           textAlign: "center",
//           fontSize: "2.5rem",
//           fontWeight: "bold",
//           color: "#c47f00",
//           marginBottom: "2rem",
//         }}
//       >
//         🛠️ Practical Tools
//       </h1>

//       <div
//         style={{
//           display: "grid",
//           gap: "2rem",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//         }}
//       >
//         {/* Currency Converter Card */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: "1rem",
//             padding: "1.5rem",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: 600,
//               marginBottom: "1rem",
//               color: "#b36e00",
//             }}
//           >
//             💰 Currency Converter
//           </h2>
//           <CurrencyConverter />
//         </div>

//         {/* Weather Card */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: "1rem",
//             padding: "1.5rem",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: 600,
//               marginBottom: "1rem",
//               color: "#b36e00",
//             }}
//           >
//             🌤️ Weather
//           </h2>
//           <Weather />
//         </div>

//         {/* Train Route Card */}
//         <div
//           style={{
//             background: "#fff",
//             borderRadius: "1rem",
//             padding: "1.5rem",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: 600,
//               marginBottom: "1rem",
//               color: "#b36e00",
//             }}
//           >
//             🚆 Train Route
//           </h2>
//           <TrainRoute />
//         </div>
          
        
          
//         </div>
//       </div>
    
//   );
// };

// export default Tools;
"use client";
import React, { useState } from "react";
import { DollarSign, Sun, Train, MapPin } from "lucide-react";
import CurrencyConverter from "./CurrencyConverter";
import Weather from "./Weather";
import TrainRoute from "./TrainRoute";
//import Map from "./Map"; // optional

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const toolsData = [
    { title: "Currency Converter", icon: <DollarSign size={22} color="#b36e00" />, component: <CurrencyConverter /> },
    { title: "Weather", icon: <Sun size={22} color="#b36e00" />, component: <Weather /> },
    { title: "Train Route", icon: <Train size={22} color="#b36e00" />, component: <TrainRoute /> },
    //{ title: "Map", icon: <MapPin size={22} color="#b36e00" />, component: <Map /> },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fdfaf6", padding: "2rem 1rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.2rem", fontWeight: 700, color: "#222", marginBottom: "2rem" }}>
        Practical Tools
      </h1>

      <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {toolsData.map((tool) => (
          <div key={tool.title} style={{ background: "#fff", borderRadius: "0.8rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            
            {/* Clickable header */}
            <button
              onClick={() => setActiveTool(activeTool === tool.title ? null : tool.title)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1rem 1.2rem",
                fontSize: "1.2rem",
                fontWeight: 600,
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                color: "#222",
              }}
            >
              {tool.icon} {tool.title}
              <span style={{ marginLeft: "auto" }}>{activeTool === tool.title ? "▲" : "▼"}</span>
            </button>

            {/* Pop-out content */}
            {activeTool === tool.title && (
              <div style={{ padding: "1rem 1.2rem", borderTop: "1px solid #eee" }}>
                {tool.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
