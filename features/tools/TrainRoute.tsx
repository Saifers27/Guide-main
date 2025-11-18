// "use client";
// import React, { useState } from "react";

// const TrainRoute: React.FC = () => {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [result, setResult] = useState("");

//   // Placeholder: In a real app, fetch route from an API
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setResult(`Route from ${from} to ${to}: Take JR Yamanote Line.`);
//   };

//   return (
//     <div style={{ marginBottom: "2rem" }}>
//       <h3>Train Route Finder</h3>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={from}
//           onChange={(e) => setFrom(e.target.value)}
//           placeholder="From"
//           style={{ padding: "0.5rem" }}
//         />
//         <input
//           type="text"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           placeholder="To"
//           style={{ padding: "0.5rem", marginLeft: "1rem" }}
//         />
//         <button
//           type="submit"
//           style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}
//         >
//           Search
//         </button>
//       </form>
//       {result && <p style={{ marginTop: "1rem" }}>{result}</p>}
//       <p style={{ fontSize: "0.9rem", color: "#888" }}>
//         * Route data is a placeholder.
//       </p>
//     </div>
//   );
// };

// export default TrainRoute;
// "use client";
// import React, { useState } from "react";

// const apiKey = process.env.NEXT_PUBLIC_ODPT_KEY; // put your token in .env

// export default function TrainRoute() {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [route, setRoute] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const lookupStation = async (name: string) => {
//     const url = `https://api.odpt.org/api/v4/odpt:Station?dc:title=${encodeURIComponent(name)}`;
//     const res = await fetch(url, {
//       headers: { "Authorization": `Bearer ${apiKey}` }
//     });
//     const data = await res.json();
//     return data[0]; // assuming first match
//   };

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setRoute(null);
//     setLoading(true);

//     try {
//       const fromStation = await lookupStation(from);
//       const toStation = await lookupStation(to);

//       if (!fromStation || !toStation) {
//         throw new Error("Station not found");
//       }

//       // Simplified: check if share same line
//       const fromLines = fromStation["odpt:railway"];
//       const toLines = toStation["odpt:railway"];
//       const commonLine = fromLines.find((l: string) => toLines.includes(l));

//       if (commonLine) {
//         setRoute({
//           summary: `Direct on line ${commonLine}`,
//           steps: [{ line: commonLine, stationFrom: from, stationTo: to }]
//         });
//       } else {
//         setRoute({
//           summary: `No direct line found; you may need a transfer.`,
//           steps: []
//         });
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ marginBottom: "2rem" }}>
//       <h3>Train Route Finder</h3>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={from}
//           onChange={e => setFrom(e.target.value)}
//           placeholder="From station"
//           style={{ padding: "0.5rem", width: "45%" }}
//         />
//         <input
//           type="text"
//           value={to}
//           onChange={e => setTo(e.target.value)}
//           placeholder="To station"
//           style={{ padding: "0.5rem", width: "45%", marginLeft: "1rem" }}
//         />
//         <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}>
//           Search
//         </button>
//       </form>

//       {loading && <p>Loading route …</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {route && (
//         <div style={{ marginTop: "1rem" }}>
//           <h4>Route Result:</h4>
//           <p>{route.summary}</p>
//           <ul>
//             {route.steps.map((step: any, idx: number) => (
//               <li key={idx}>
//                 {step.line}: {step.stationFrom} → {step.stationTo}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";

const TrainRoute: React.FC = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_ODPT_API_KEY"; // 🔑 replace this after registration

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRoutes([]);

    try {
      const query = `https://api.odpt.org/api/v4/odpt:TrainInformation?acl:consumerKey=${API_KEY}`;
      const res = await fetch(query);
      if (!res.ok) throw new Error("Failed to fetch train info");
      const data = await res.json();

      // Example: Filter trains related to the input
      const filtered = data.filter(
        (t: any) =>
          (t["odpt:railway"]?.toLowerCase().includes(from.toLowerCase()) ||
            t["odpt:trainInformationText"]?.includes(from)) &&
          (t["odpt:railway"]?.toLowerCase().includes(to.toLowerCase()) ||
            t["odpt:trainInformationText"]?.includes(to))
      );

      setRoutes(filtered.slice(0, 5)); // Show first 5 routes
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>🚉 Live Train Route Finder (Tokyo)</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From station or line"
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To station or line"
          style={{ padding: "0.5rem", marginLeft: "1rem" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            marginLeft: "1rem",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading live data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {routes.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Results:</h4>
          {routes.map((r, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: "0.75rem",
                marginBottom: "0.5rem",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Railway:</strong>{" "}
                {r["odpt:railway"]?.replace("odpt.Railway:", "")}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {r["odpt:trainInformationText"] || "No delay info"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainRoute;
