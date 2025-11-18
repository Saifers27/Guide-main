
"use client";
// import lessonsData from "../../data/dailyData.json";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
interface DailyEntry {
  jp: string;
  en: string;
  np: string;
  category: string;
  type: "vocab" | "phrase" | "kanji" | "sentence";
}

// ---------------- Example Data (expand later to 2000+ entries) ----------------
const allData: DailyEntry[] = [
  // Bank
  { jp: "口座を開きたいです", en: "I want to open a bank account", np: "म बैंक खाता खोल्न चाहन्छु", category: "Bank", type: "phrase" },
  { jp: "印鑑を持っていますか？", en: "Do you have a personal seal?", np: "तपाईंसँग निजी मुहर छ?", category: "Bank", type: "phrase" },

  // School
  { jp: "教室はどこですか？", en: "Where is the classroom?", np: "कक्षा कहाँ छ?", category: "School", type: "phrase" },
  { jp: "宿題を出してください", en: "Please submit your homework", np: "कृपया गृहकार्य बुझाउनुहोस्", category: "School", type: "phrase" },

  // Hospital
  { jp: "頭が痛いです", en: "I have a headache", np: "मलाई टाउको दुख्छ", category: "Hospital", type: "phrase" },
  { jp: "保険証を見せてください", en: "Please show your insurance card", np: "कृपया बीमा कार्ड देखाउनुहोस्", category: "Hospital", type: "phrase" },

  // Police
  { jp: "財布をなくしました", en: "I lost my wallet", np: "मैले वालेट हराएँ", category: "Police", type: "phrase" },
  { jp: "助けてください", en: "Please help me", np: "कृपया मद्दत गर्नुहोस्", category: "Police", type: "phrase" },

  // Airport
  { jp: "搭乗券を見せてください", en: "Please show your boarding pass", np: "कृपया बोर्डिङ पास देखाउनुहोस्", category: "Airport", type: "phrase" },
  { jp: "荷物はどこで受け取りますか？", en: "Where do I collect my luggage?", np: "मेरो सामान कहाँ लिनु पर्छ?", category: "Airport", type: "phrase" },

  // Supermarket
  { jp: "この野菜はいくらですか？", en: "How much is this vegetable?", np: "यो तरकारी कति हो?", category: "Supermarket", type: "phrase" },
  { jp: "袋は必要ですか？", en: "Do you need a bag?", np: "तपाईँलाई झोला चाहिन्छ?", category: "Supermarket", type: "phrase" },

  // Weather
  { jp: "今日は暑いです", en: "It’s hot today", np: "आज तातो छ", category: "Weather", type: "sentence" },
  { jp: "雨が降りそうです", en: "It looks like it will rain", np: "मौसमले पानी पर्न सक्छ जस्तो देखिन्छ", category: "Weather", type: "sentence" },

  // Casual conversation / jokes
  { jp: "元気ですか？", en: "How are you?", np: "तपाईं कस्तो हुनुहुन्छ?", category: "Casual", type: "phrase" },
  { jp: "昨日の冗談聞いた？", en: "Did you hear yesterday's joke?", np: "हिजोको मजाक सुन्नुभयो?", category: "Casual", type: "phrase" },

  // ... more entries to reach 2000+
];

// ---------------- Component ----------------
const Lessons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DailyEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredData([]);
      return;
    }

    // Save search term to history if new
    setHistory((prev) => (term && !prev.includes(term) ? [term, ...prev].slice(0, 10) : prev));

    // Filter by category or keyword
    const results = allData.filter(
      (w) =>
        w.category.toLowerCase().includes(term) ||
        w.jp.includes(term) ||
        w.en.toLowerCase().includes(term) ||
        w.np.includes(term)
    );

    setFilteredData(results);
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: "#fffaf0", minHeight: "100vh", padding: "2rem 1rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", color: "#c47f00", marginBottom: "2rem" }}>
        🎌 Japanese Learning (नेपाली विद्यार्थीहरूका लागि)
      </h1>

      {/* Search History */}
      {history.length > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
          {history.map((h, i) => (
            <button
              key={i}
              onClick={() => setSearchTerm(h)}
              style={{
                padding: "0.3rem 0.6rem",
                borderRadius: "0.5rem",
                border: "1px solid #c47f00",
                background: "#fff8e1",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {h}
            </button>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="श्रेणी वा शब्द खोज्नुहोस् / Type category or word"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "0.75rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Results */}
      <AnimatePresence>
        <motion.div key={searchTerm} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
          {filteredData.length > 0 ? (
            <section style={{ marginBottom: "2rem", background: "#fff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "1rem", color: "#b36e00" }}>📚 परिणाम / Results</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #eee" }}>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Japanese</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>English</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>नेपाली</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Category</th>
                    <th style={{ textAlign: "left", padding: "0.5rem" }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((w, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "0.5rem" }}>{w.jp}</td>
                      <td style={{ padding: "0.5rem" }}>{w.en}</td>
                      <td style={{ padding: "0.5rem" }}>{w.np}</td>
                      <td style={{ padding: "0.5rem" }}>{w.category}</td>
                      <td style={{ padding: "0.5rem" }}>{w.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : searchTerm ? (
            <p style={{ textAlign: "center", color: "#777", marginTop: "2rem" }}>सामग्री फेला परेन / No results found</p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Lessons;
