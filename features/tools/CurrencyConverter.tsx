// "use client";
// import React, { useState } from "react";

// const CurrencyConverter: React.FC = () => {
//   const [jpy, setJpy] = useState(1000);
//   const [npr, setNpr] = useState(jpy * 0.88);

//   const handleJpyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     setJpy(value);
//     setNpr(Number((value * 0.88).toFixed(2)));
//   };

//   return (
//     <div style={{ marginBottom: "2rem" }}>
//       <h3>Currency Converter (JPY → NPR)</h3>
//       <input
//         type="number"
//         value={jpy}
//         onChange={handleJpyChange}
//         style={{ padding: "0.5rem" }}
//       />
//       <span style={{ marginLeft: "1rem" }}>= {npr} NPR</span>
//       <p style={{ fontSize: "0.9rem", color: "#888" }}>
//         * Rate is approximate.
//       </p>
//     </div>
//   );
// };

// export default CurrencyConverter;
// "use client";
// import React, { useEffect, useState } from "react";

// const CurrencyConverter: React.FC = () => {
//   const [jpy, setJpy] = useState(1000);
//   const [npr, setNpr] = useState(0);
//   const [rate, setRate] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

//   // Fetch live exchange rate
//   const fetchRate = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("https://api.exchangerate.host/latest?base=JPY&symbols=NPR");
//       const data = await res.json();
//       const newRate = data.rates?.NPR || 0.88;
//       setRate(newRate);
//       setNpr(Number((jpy * newRate).toFixed(2)));
//       setLastUpdated(new Date());
//     } catch (err) {
//       console.error("Failed to fetch exchange rate:", err);
//       setRate(0.88);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch on load + every 5 minutes
//   useEffect(() => {
//     fetchRate();
//     const interval = setInterval(fetchRate, 5 * 60 * 1000); // 5 min
//     return () => clearInterval(interval);
//   }, []);

//   const handleJpyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     setJpy(value);
//     if (rate) setNpr(Number((value * rate).toFixed(2)));
//   };

//   return (
//     <div style={{ marginBottom: "2rem", textAlign: "center" }}>
//       <h3>💱 Currency Converter (JPY → NPR)</h3>

//       {loading ? (
//         <p>Loading live exchange rate...</p>
//       ) : (
//         <>
//           <input
//             type="number"
//             value={jpy}
//             onChange={handleJpyChange}
//             style={{ padding: "0.5rem", width: "140px" }}
//           />
//           <span style={{ marginLeft: "1rem" }}>
//             = <strong>{npr}</strong> NPR
//           </span>

//           <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" }}>
//             Current rate: <strong>1 JPY = {rate?.toFixed(2)} NPR</strong>
//           </p>

//           {lastUpdated && (
//             <p style={{ fontSize: "0.8rem", color: "#888" }}>
//               ⏱ Last updated: {lastUpdated.toLocaleTimeString()}
//             </p>
//           )}

//           <p style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.5rem" }}>
//             * Rates auto-refresh every 5 minutes.
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default CurrencyConverter;
"use client";
import React, { useEffect, useState } from "react";

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [converted, setConverted] = useState(0);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [reverse, setReverse] = useState(false); // false = JPY→NPR, true = NPR→JPY

  // Fetch exchange rate (JPY base)
  const fetchRate = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.exchangerate.host/latest?base=JPY&symbols=NPR");
      const data = await res.json();
      const newRate = data.rates?.NPR || 0.88;
      setRate(newRate);
      updateConversion(amount, newRate, reverse);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch exchange rate:", err);
      setRate(0.88);
    } finally {
      setLoading(false);
    }
  };

  // Update conversion based on direction
  const updateConversion = (value: number, rateValue: number | null, isReversed: boolean) => {
    if (!rateValue) return;
    const result = isReversed
      ? value / rateValue // NPR → JPY
      : value * rateValue; // JPY → NPR
    setConverted(Number(result.toFixed(2)));
  };

  useEffect(() => {
    fetchRate();
    const interval = setInterval(fetchRate, 5 * 60 * 1000); // auto refresh 5 min
    return () => clearInterval(interval);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
    if (rate) updateConversion(value, rate, reverse);
  };

  const toggleReverse = () => {
    setReverse(!reverse);
    if (rate) updateConversion(converted, rate, !reverse);
  };

  const refreshNow = () => {
    fetchRate();
  };

  return (
    <div style={{ marginBottom: "2rem", textAlign: "center" }}>
      <h3>💱 Currency Converter</h3>

      {loading ? (
        <p>Loading live exchange rate...</p>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>{reverse ? "🇳🇵" : "🇯🇵"}</span>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              style={{ padding: "0.5rem", width: "140px", textAlign: "center" }}
            />
            <span style={{ fontSize: "1.5rem" }}>➡️</span>
            <span style={{ fontSize: "1.5rem" }}>{reverse ? "🇯🇵" : "🇳🇵"}</span>
            <input
              type="text"
              value={converted}
              readOnly
              style={{ padding: "0.5rem", width: "140px", textAlign: "center", background: "#f8f8f8" }}
            />
          </div>

          <button
            onClick={toggleReverse}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
          >
            🔁 Reverse
          </button>

          <button
            onClick={refreshNow}
            style={{
              background: "#28a745",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔄 Refresh
          </button>

          <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "0.8rem" }}>
            1 JPY = <strong>{rate?.toFixed(2)} NPR</strong>
          </p>

          {lastUpdated && (
            <p style={{ fontSize: "0.8rem", color: "#888" }}>
              ⏱ Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}

          <p style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.3rem" }}>
            * Rates auto-refresh every 5 minutes.
          </p>
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
