
// "use client";
// import React, { useState } from "react";

// // ✅ Reusable Map Component
// const AddressWithMap = ({
//   address,
//   height = 200,
// }: {
//   address: string;
//   height?: number;
// }) => {
//   const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
//     address
//   )}&output=embed`;
//   return (
//     <div style={{ marginTop: "0.5rem" }}>
//       <p style={{ fontWeight: 500 }}>{address}</p>
//       <iframe
//         src={mapUrl}
//         width="100%"
//         height={height}
//         loading="lazy"
//         style={{ border: 0, borderRadius: "12px", marginTop: "0.3rem" }}
//       ></iframe>
//     </div>
//   );
// };

// // ✅ Locations
// const locations = {
//   Banks: [
//     { name: "Japan Post Bank (JP Bank) Naha Branch", address: "〒900-8799 沖縄県那覇市旭町116−37" },
//     { name: "Okinawa Bank Head Office", address: "〒900-0015 沖縄県那覇市久茂地3丁目10−1" },
//     { name: "Bank of the Ryukyus", address: "〒900-0015 沖縄県那覇市久茂地1丁目11−1" },
//   ],
//   Transport: [
//     { name: "Naha Bus Terminal", address: "〒900-0021 沖縄県那覇市泉崎1丁目20−1" },
//     { name: "Asahibashi Monorail Station", address: "〒900-0029 沖縄県那覇市旭町" },
//     { name: "Miebashi Monorail Station", address: "〒900-0016 沖縄県那覇市前島2丁目" },
//   ],
//   Emergency: [
//     { name: "Naha City Hospital", address: "〒902-0076 沖縄県那覇市与儀1丁目3−21" },
//     { name: "Okinawa Prefectural Police Headquarters", address: "〒900-0021 沖縄県那覇市泉崎1丁目2−2" },
//   ],
//   Embassy: [
//     { name: "Embassy of Nepal in Tokyo", address: "〒108-0074 東京都港区高輪4丁目17−23" },
//     { name: "Honorary Consulate of Nepal in Okinawa", address: "〒900-0015 沖縄県那覇市久茂地2丁目3−15" },
//   ],
//   Restaurants: [
//     { name: "Nepali Chulo Restaurant (Tokyo)", address: "〒169-0073 東京都新宿区百人町1丁目19−13" },
//     { name: "Everest Kitchen Okinawa", address: "〒901-0152 沖縄県那覇市小禄1丁目1−1" },
//     { name: "Himalayan Curry House Tokyo", address: "〒160-0023 東京都新宿区西新宿7丁目8−11" },
//   ],
// };

// export default function SurvivalGuide() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   // ✅ Map search query to categories
//   const searchToCategory = (query: string) => {
//     const q = query.toLowerCase();
//     if (q.includes("bank")) return "Banks";
//     if (q.includes("restaurant") || q.includes("food") || q.includes("curry") || q.includes("nepali")) return "Restaurants";
//     if (q.includes("police") || q.includes("hospital") || q.includes("emergency")) return "Emergency";
//     if (q.includes("transport") || q.includes("station") || q.includes("bus") || q.includes("train")) return "Transport";
//     if (q.includes("embassy") || q.includes("consulate")) return "Embassy";
//     return null;
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     const category = searchToCategory(searchQuery);
//     setSelectedCategory(category);
//   };

//   return (
//     <div style={{ padding: "1rem", backgroundColor: "#fffaf0", minHeight: "100vh" }}>
//       <h1 style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", color: "#c47f00", marginBottom: "2rem" }}>
//         🏮 Survival Guide for Students in Japan
//       </h1>

//       {/* 🔹 Search bar */}
//       <form onSubmit={handleSearch} style={{ display: "flex", justifyContent: "center", marginBottom: "2rem", gap: "0.5rem" }}>
//         <input
//           type="text"
//           placeholder="Search category (e.g., bank, restaurant, police)"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "0.6rem 1rem",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             width: "300px",
//             fontSize: "1rem",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             background: "#2563eb",
//             color: "#fff",
//             border: "none",
//             borderRadius: "8px",
//             padding: "0.6rem 1.2rem",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>
//       </form>

//       {/* 🔹 Clickable categories */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "2rem" }}>
//         {Object.keys(locations).map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
//             style={{
//               padding: "0.5rem 1rem",
//               borderRadius: "8px",
//               border: "1px solid #b36e00",
//               backgroundColor: selectedCategory === cat ? "#b36e00" : "#fff",
//               color: selectedCategory === cat ? "#fff" : "#b36e00",
//               cursor: "pointer",
//               fontWeight: 500,
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* 🔹 Show maps dynamically */}
//       {selectedCategory ? (
//         <section style={{ marginTop: "1rem" }}>
//           <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", color: "#b36e00" }}>
//             {selectedCategory} Locations
//           </h3>
//           {locations[selectedCategory as keyof typeof locations].map((loc, idx) => (
//             <div key={idx} style={{ marginBottom: "1.5rem" }}>
//               <strong>{loc.name}</strong>
//               <AddressWithMap address={loc.address} height={200} />
//             </div>
//           ))}
//         </section>
//       ) : searchQuery && (
//         <p style={{ textAlign: "center", color: "#777" }}>No results found for "{searchQuery}"</p>
//       )}

//       {/* 🔹 Other Guide Info */}
//       <section style={{ marginTop: "2.5rem" }}>
//         <h3>🏠 Residence Registration / 住民登録</h3>
//         <p>
//           Within 14 days after arriving, visit your local city or ward office to register your residence (住民登録 / じゅうみんとうろく).
//         </p>

//         <h3>💳 Opening a Bank Account / 銀行口座</h3>
//         <p>
//           Bring your residence card and student ID. Major banks include JP Bank and local banks like Okinawa Bank.
//         </p>

//         <h3>🚆 Public Transport / 公共交通機関</h3>
//         <p>
//           Use IC cards like Suica or OKICA for easy travel on buses and trains.
//         </p>

//         <h3>🚨 Emergency Contacts / 緊急連絡先</h3>
//         <ul>
//           <li>Police (警察): 110</li>
//           <li>Ambulance / Fire (救急・消防): 119</li>
//           <li>Japan Helpline (English): 0570-000-911</li>
//         </ul>

//         <h3>🗑️ Garbage Separation / ごみの分別</h3>
//         <p>
//           Separate trash properly: burnable, non-burnable, and recyclable. Follow your city’s collection schedule.
//         </p>
//       </section>
//     </div>
//   );
// }
// "use client";
// import React, { useState, useMemo } from "react";

// /**
//  * Okinawa Student Survival Guide — Category Tabs (Okinawa only)
//  *
//  * Features:
//  * - Category tabs (Banks, Police, Hospitals, Immigration/City Hall, Shopping, Transport)
//  * - Exact place list per category (Naha, Ginowan, Urasoe examples)
//  * - Google Maps embed (by address)
//  * - Attractive Q&A-style tips (EN / Nep / JP)
//  * - Searchable FAQ (search by keywords)
//  *
//  * Paste into a client component file (e.g., app/SurvivalGuideOkinawa/page.tsx or components/SurvivalGuideOkinawa.tsx)
//  */

// // Simple reusable map embed
// const MapEmbed = ({ address, height = 220 }: { address: string; height?: number }) => {
//   const url = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
//   return (
//     <div style={{ marginTop: 8 }}>
//       <div style={{ fontSize: 13, color: "#444", marginBottom: 6 }}>{address}</div>
//       <iframe
//         title={address}
//         src={url}
//         width="100%"
//         height={height}
//         loading="lazy"
//         style={{ border: 0, borderRadius: 10 }}
//       />
//     </div>
//   );
// };

// // Tip UI: labelled Q -> answers in three languages
// const QATip = ({ q, en, ne, jp }: { q: string; en: string; ne: string; jp: string }) => (
//   <div style={{ background: "#fffaf0", padding: 12, borderRadius: 10, marginBottom: 10, border: "1px solid #f1d8a6" }}>
//     <div style={{ fontWeight: 700, marginBottom: 6 }}>{q}</div>
//     <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6 }}>
//       <div><strong>EN:</strong> {en}</div>
//       <div><strong>ने:</strong> {ne}</div>
//       <div><strong>JP:</strong> {jp}</div>
//     </div>
//   </div>
// );

// // ---------------------------
// // Data (Okinawa only)
// // ---------------------------
// const okinawaData = {
//   Banks: {
//     places: [
//       { name: "Japan Post Bank (JP Bank) Naha Branch", address: "〒900-8799 沖縄県那覇市旭町116-37" },
//       { name: "Okinawa Bank Head Office (沖縄銀行 本店)", address: "〒900-0015 沖縄県那覇市久茂地3丁目10-1" },
//       { name: "Bank of the Ryukyus (琉球銀行 本店)", address: "〒900-0015 沖縄県那覇市久茂地1丁目11-1" }
//     ],
//     tips: [
//       {
//         q: "What to bring to open an account?",
//         en: "Bring your Residence Card (在留カード), Passport, Student ID and a phone number. Bring originals and a photocopy.",
//         ne: "रेसिडेन्स कार्ड, पासपोर्ट, विद्यार्थी परिचयपत्र र फोन नम्बर ल्याउनुहोस्। मूल कागजात र प्रतिलिपि साथ लैजानुहोस्।",
//         jp: "在留カード、パスポート、学生証、電話番号を持参。原本とコピーを用意してください。"
//       },
//       {
//         q: "What to say at the counter (short phrase)?",
//         en: "\"I would like to open a bank account.\" → 口座を開きたいです。 (Kōza o hirakitai desu.)",
//         ne: "\"म बैंक खाता खोल्न चाहन्छु।\"",
//         jp: "「口座を開きたいです。」"
//       },
//       {
//         q: "Checklist before visiting",
//         en: "Check bank hours (usually until ~15:00 weekdays), bring a Japanese address, and ask if English forms are available.",
//         ne: "बैंकको समय जाँच गर्नुहोस् (सामान्यतया हप्ता भित्र १५:०० सम्म), जापानी ठेगाना ल्याउनुहोस्, र अंग्रेजी फारम छ कि भनेर सोध्नुहोस्।",
//         jp: "営業時間を確認（平日15時頃までが多い）。日本の住所を準備し、英語の用紙があるか確認しましょう。"
//       }
//     ]
//   },

//   Police: {
//     places: [
//       { name: "Okinawa Prefectural Police Headquarters (沖縄県警察本部)", address: "〒900-0021 沖縄県那覇市泉崎1丁目2-2" },
//       { name: "Naha Police Station (那覇警察署)", address: "〒900-0015 沖縄県那覇市久茂地2丁目" }, // approximate central area
//       { name: "Ginowan Police Box (宜野湾交番)", address: "Ginowan, Okinawa (local police box near Ginowan central area)" }
//     ],
//     tips: [
//       {
//         q: "Emergency number and what to say",
//         en: "Call 110 for police emergencies. Say your location and the problem clearly (e.g., theft, lost passport).",
//         ne: "पुलिस आपतकालका लागि 110 मा फोन गर्नुहोस्। स्थान र समस्या स्पष्ट रूपमा भन्नुहोस् (जस्तै: चोरी, पासपोर्ट हरायो)।",
//         jp: "警察の緊急は110。所在地と状況（例：盗難、パスポート紛失）をはっきり伝えてください。"
//       },
//       {
//         q: "If you lost your residence card or passport",
//         en: "Report loss at the nearest police station and then contact your embassy/immigration.",
//         ne: "नजिकको पुलिस स्टेशनमा हराएको जानकारी दिनुहोस् र त्यसपछि दूतावास/इमिग्रेशनसँग सम्पर्क गर्नुहोस्।",
//         jp: "最寄りの交番・警察署で紛失届を出し、その後大使館や入国管理局に連絡してください。"
//       }
//     ]
//   },

//   Hospitals: {
//     places: [
//       { name: "Naha City Hospital (那覇市立病院)", address: "〒902-0076 沖縄県那覇市与儀1丁目3-21" },
//       { name: "Okinawa Prefectural Chubu Hospital (example regional hospital)", address: "Search local emergency hospitals in Naha area" }
//     ],
//     tips: [
//       {
//         q: "What to bring to the hospital",
//         en: "Bring your National Health Insurance card (保険証) and Residence Card, plus passport if available.",
//         ne: "बीमा कार्ड र रेसिडेन्स कार्ड साथ ल्याउनुहोस्; पासपोर्ट भए राम्रो।",
//         jp: "保険証と在留カード、可能ならパスポートを持参してください。"
//       },
//       {
//         q: "Useful phrase at hospital",
//         en: "\"I need a doctor.\" → 医者が必要です。(Isha ga hitsuyō desu.)",
//         ne: "\"मलाई डाक्टर चाहिन्छ।\"",
//         jp: "「医者が必要です。」"
//       }
//     ]
//   },

//   Immigration: {
//     places: [
//       { name: "Naha Immigration Office (出入国在留管理局 那覇出張所)", address: "Naha Immigration (check official site for exact address & hours)" },
//       { name: "Naha City Hall (那覇市役所) — residence registration", address: "〒900-8585 沖縄県那覇市泉崎1丁目1-1" }
//     ],
//     tips: [
//       {
//         q: "Residence registration (住民登録)",
//         en: "Register at the city hall within 14 days of moving to a new address. Bring Residence Card and rental contract.",
//         ne: "नयाँ ठेगानामा १४ दिनभित्र सिटी हलमा रेजिस्टर गर्नुहोस्। रेसिडेन्स कार्ड र भाडामा सम्झौता साथ ल्याउनुहोस्।",
//         jp: "転居後14日以内に市役所で住民登録を。在留カードと賃貸契約書を持参。"
//       },
//       {
//         q: "Immigration appointments & documents",
//         en: "For visas/renewals, check the immigration website and bring passport, residence card, and any required forms.",
//         ne: "भिसा नवीकरणका लागि इमिग्रेशन साइट हेरेर पासपोर्ट, रेसिडेन्स कार्ड र आवश्यक फारमहरू साथ लैजानुहोस्।",
//         jp: "ビザや在留資格更新は入国管理局の案内を確認し、パスポート・在留カード・必要書類を持参。"
//       }
//     ]
//   },

//   Shopping: {
//     places: [
//       { name: "Don Quijote Kokusai-dori (ドン・キホーテ 国際通り店)", address: "〒900-0014 沖縄県那覇市松尾2丁目8-19" },
//       { name: "AEON Mall Rycom (イオンモール沖縄ライカム)", address: "〒901-2306 沖縄県中頭郡北中城村字ライカム1" },
//       { name: "Gyomu Super (業務スーパー) — local branches", address: "Search nearby Gyomu Super branches in Naha/Ginowan" },
//       { name: "Daiso (100-yen shop) — many branches", address: "Look for 'DAISO' signs locally" }
//     ],
//     tips: [
//       {
//         q: "Where to shop cheap",
//         en: "Don Quijote, Gyomu Super, Daiso and AEON discount floors are best for budget shopping.",
//         ne: "Don Quijote, Gyomu Super, Daiso र AEON का छुट स्टोरहरू सस्तो हुन्छन्।",
//         jp: "ドン・キホーテ、業務スーパー、ダイソー、イオンの割引コーナーが安いです。"
//       },
//       {
//         q: "Money tips for markets",
//         en: "Carry small cash for markets; many discount stores accept cards but small vendors might not.",
//         ne: "बजारका लागि सानो नगद साथ राख्नुहोस्; ठूला पसलले कार्ड लिन्छन् तर साना स्टलले नलिए पनि हुन्छ।",
//         jp: "市場では小銭を用意。大手はカード可ですが、小さなお店は現金のみの場合あり。"
//       }
//     ]
//   },

//   Transport: {
//     places: [
//       { name: "Naha Bus Terminal (那覇バスターミナル)", address: "〒900-0021 沖縄県那覇市泉崎1丁目20-1" },
//       { name: "Asahibashi Station (旭橋駅) — Yui Rail", address: "〒900-0029 沖縄県那覇市旭町" },
//       { name: "Miebashi Station (美栄橋駅) — Yui Rail", address: "〒900-0016 沖縄県那覇市前島" },
//       { name: "Naha Airport (那覇空港)", address: "〒901-0142 沖縄県那覇市鏡水" }
//     ],
//     tips: [
//       {
//         q: "IC card and fares",
//         en: "Get an IC card (OKICA or Suica) for easy travel. Keep small change for buses that require cash.",
//         ne: "यातायात सजिलो बनाउन IC कार्ड (OKICA वा Suica) लिनुहोस्। बसका लागि सानो रकम राख्नुहोस्।",
//         jp: "ICカード（OKICAやSuica）を用意。バスでは小銭があると安心です。"
//       },
//       {
//         q: "Last train/bus",
//         en: "Check last service times — many lines stop before midnight in regional areas.",
//         ne: "अन्तिम बस/ट्रेन समय जाँच गर्नुहोस् — स्थानिय लाइनहरू मध्यरात अघि बन्द हुन सक्छन्।",
//         jp: "最終バスや最終列車の時刻を確認。地域によっては深夜前に運行終了します。"
//       }
//     ]
//   }
// };

// // ---------------------------
// // FAQ data (searchable)
// // ---------------------------
// const faqData = [
//   {
//     category: "Banks",
//     question: "What documents do I need to open a bank account?",
//     answerEng: "Residence Card, Passport, Student ID, and a Japanese address & phone number.",
//     answerNep: "रेसिडेन्स कार्ड, पासपोर्ट, विद्यार्थी परिचयपत्र, जापानी ठेगाना र फोन नम्बर।",
//     answerJP: "在留カード、パスポート、学生証、日本の住所と電話番号。"
//   },
//   {
//     category: "Banks",
//     question: "How do I say 'I want to open a bank account' in Japanese?",
//     answerEng: "\"I want to open a bank account.\" → 口座を開きたいです。",
//     answerNep: "\"म बैंक खाता खोल्न चाहन्छु।\"",
//     answerJP: "「口座を開きたいです。」"
//   },
//   {
//     category: "Immigration",
//     question: "When should I register my address?",
//     answerEng: "Register at your city hall within 14 days of moving in.",
//     answerNep: "नयाँ ठेगानामा १४ दिनभित्र सिटी हलमा रेजिस्टर गर्नुहोस्।",
//     answerJP: "転入後14日以内に市役所で住民登録を行ってください。"
//   },
//   {
//     category: "Hospitals",
//     question: "What if I need an ambulance?",
//     answerEng: "Call 119 for ambulance and fire. Explain your location clearly.",
//     answerNep: "एम्बुलेन्स/आगलागीको लागि 119 मा फोन गर्नुहोस्। स्थान स्पष्ट रूपमा भन्नुहोस्।",
//     answerJP: "救急・消防は119。場所をはっきり伝えてください。"
//   },
//   {
//     category: "Police",
//     question: "What number for police emergency?",
//     answerEng: "Call 110 for police emergency.",
//     answerNep: "पुलिस आपतकालका लागि 110 मा फोन गर्नुहोस्।",
//     answerJP: "警察の緊急は110です。"
//   },
//   {
//     category: "Shopping",
//     question: "Where can I buy cheap groceries?",
//     answerEng: "Gyomu Super and discount floors at AEON and Don Quijote are good choices.",
//     answerNep: "Gyomu Super, AEON र Don Quijote का छुट भागहरू राम्रा छन्।",
//     answerJP: "業務スーパーやイオン・ドンキの割引コーナーがおすすめです。"
//   },
//   {
//     category: "Transport",
//     question: "How do I use a bus in Naha?",
//     answerEng: "Board and pay with IC card or exact change; check driver instructions and stop names.",
//     answerNep: "बस चढ्दा IC कार्ड वा सटिक रकम दिएर तिर्नुहोस्; ड्राइभरको संकेत र स्टप नाम हेर्नुहोस्।",
//     answerJP: "ICカードか小銭で支払い。運転手の案内と停留所名を確認してください。"
//   },
//   // add more FAQs as needed...
// ];

// // ---------------------------
// // Main component
// // ---------------------------
// export default function SurvivalGuideOkinawa() {
//   const categories = Object.keys(okinawaData) as (keyof typeof okinawaData)[];
//   const [activeCat, setActiveCat] = useState<string>("Banks");
//   const [faqSearch, setFaqSearch] = useState<string>("");

//   // FAQ filtered
//   const faqResults = useMemo(() => {
//     const q = faqSearch.trim().toLowerCase();
//     if (!q) return faqData;
//     return faqData.filter((f) =>
//       f.question.toLowerCase().includes(q) ||
//       f.answerEng.toLowerCase().includes(q) ||
//       f.answerNep.toLowerCase().includes(q) ||
//       f.category.toLowerCase().includes(q)
//     );
//   }, [faqSearch]);

//   const currentCategory = (okinawaData as any)[activeCat];

//   return (
//     <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans JP'", background: "#fffaf0", minHeight: "100vh", padding: 18 }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <header style={{ textAlign: "center", marginBottom: 18 }}>
//           <h1 style={{ color: "#c47f00", fontSize: 28, margin: 0 }}>🏮 Okinawa Student Survival Guide</h1>
//           <p style={{ color: "#6b6b6b", marginTop: 8 }}>Focused on Naha / Ginowan / Urasoe — maps, tips, and FAQs in English / Nepali / Japanese</p>
//         </header>

//         {/* Category Tabs */}
//         <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCat(cat)}
//               style={{
//                 padding: "8px 14px",
//                 borderRadius: 10,
//                 border: activeCat === cat ? "2px solid #b36e00" : "1px solid #e9cfa2",
//                 background: activeCat === cat ? "#b36e00" : "#fff",
//                 color: activeCat === cat ? "#fff" : "#b36e00",
//                 cursor: "pointer",
//                 fontWeight: 700,
//                 boxShadow: activeCat === cat ? "0 2px 8px rgba(179,110,0,0.12)" : "none"
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//         </nav>

//         {/* Main grid: left = list & maps, right = tips & FAQ */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
//           {/* Left column: Places + Maps */}
//           <main>
//             <section>
//               <h2 style={{ color: "#b36e00", marginBottom: 10 }}>{activeCat} — Key places</h2>
//               {(currentCategory?.places ?? []).map((p: any, idx: number) => (
//                 <article key={idx} style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
//                     <div style={{ fontWeight: 800 }}>{p.name}</div>
//                     <a
//                       href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}
//                     >
//                       Open in Maps ↗
//                     </a>
//                   </div>
//                   <MapEmbed address={p.address} />
//                 </article>
//               ))}
//               {(!currentCategory || (currentCategory.places ?? []).length === 0) && (
//                 <p style={{ color: "#777" }}>No places listed. You can add more addresses later.</p>
//               )}
//             </section>
//           </main>

//           {/* Right column: Tips + FAQ */}
//           <aside>
//             <div style={{ position: "sticky", top: 18 }}>
//               {/* Attractive Tips for the active category */}
//               <section style={{ marginBottom: 14 }}>
//                 <h3 style={{ color: "#d47f00", marginBottom: 8 }}>💡 Quick Q&A Tips</h3>
//                 {(currentCategory?.tips ?? []).map((t: any, i: number) => (
//                   <QATip key={i} q={t.q} en={t.en} ne={t.ne} jp={t.jp} />
//                 ))}
//               </section>

//               {/* FAQ Search */}
//               <section style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
//                 <h4 style={{ marginTop: 0, color: "#b36e00" }}>❓ Search FAQs</h4>
//                 <input
//                   value={faqSearch}
//                   onChange={(e) => setFaqSearch(e.target.value)}
//                   placeholder="Search FAQ: e.g., 'open bank', 'ambulance', 'IC card'..."
//                   style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e6d6bb", marginBottom: 8 }}
//                 />
//                 <div style={{ maxHeight: 360, overflow: "auto", paddingRight: 6 }}>
//                   {faqResults.length === 0 && <div style={{ color: "#777" }}>No FAQ results found.</div>}
//                   {faqResults.map((f, i) => (
//                     <div key={i} style={{ marginBottom: 10, borderLeft: "4px solid #f4d8a6", background: "#fffaf6", padding: 10, borderRadius: 8 }}>
//                       <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.question}</div>
//                       <div style={{ fontSize: 13 }}>
//                         <div><strong>EN:</strong> {f.answerEng}</div>
//                         <div><strong>ने:</strong> {f.answerNep}</div>
//                         <div><strong>JP:</strong> {f.answerJP}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               {/* Quick emergency block */}
//               <section style={{ marginTop: 12, background: "#fff", padding: 12, borderRadius: 10 }}>
//                 <div style={{ fontWeight: 800, marginBottom: 6 }}>🆘 Emergency</div>
//                 <div style={{ fontSize: 14 }}>
//                   <div>Police: <strong>110</strong></div>
//                   <div>Ambulance / Fire: <strong>119</strong></div>
//                   <div>Japan Helpline (English): <strong>0570-000-911</strong></div>
//                 </div>
//               </section>
//             </div>
//           </aside>
//         </div>

//         {/* Footer: small checklist & phrases */}
//         <footer style={{ marginTop: 22, background: "#fff8e6", padding: 12, borderRadius: 10 }}>
//           <h4 style={{ marginTop: 0, color: "#b36e00" }}>✅ Quick Checklist & Useful Phrases</h4>
//           <div style={{ display: "grid", gap: 8 }}>
//             <div>
//               <strong>What to always bring:</strong>
//               <div>EN: Residence Card, Insurance Card, Student ID, Phone & Address in Japanese.</div>
//               <div>ने: रेसिडेन्स कार्ड, बीमा कार्ड, विद्यार्थी आईडी, फोन र जापानी ठेगाना साथ राख्नुहोस्।</div>
//               <div>JP: 在留カード、保険証、学生証、連絡先と住所（日本語）を持ち歩いてください。</div>
//             </div>

//             <div>
//               <strong>What to say when you need help:</strong>
//               <div>EN: "Excuse me, can you help me? I need ..."</div>
//               <div>ने: "म सँग सहायता गर्न सक्नुहुन्छ?"</div>
//               <div>JP: "すみません、手伝っていただけますか？" (Sumimasen, tetsudatte itadakemasu ka?)</div>
//             </div>

//             <div>
//               <strong>Bank phrase:</strong>
//               <div>EN: "I want to open a bank account."</div>
//               <div>ने: "म बैंक खाता खोल्न चाहन्छु।"</div>
//               <div>JP: "口座を開きたいです。" (Kōza o hirakitai desu.)</div>
//             </div>

//             <div>
//               <strong>Hospital phrase:</strong>
//               <div>EN: "I need a doctor."</div>
//               <div>ने: "मलाई डाक्टर चाहिन्छ।"</div>
//               <div>JP: "医者が必要です。" (Isha ga hitsuyō desu.)</div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useMemo, useState } from "react";

/* 
  Okinawa Offline Search (Layout A)
  - Category tabs (Banks, Police, Hospitals, Immigration, Shopping, Transport)
  - Local search across all places (name, address, category)
  - Search Results panel with embedded Google Maps (query-based embed)
  - No external APIs required (offline/local dataset)
*/

// Small map embed component (uses google map search URL)
const MapEmbed = ({ address, height = 220 }: { address: string; height?: number }) => {
  const url = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 13, color: "#444", marginBottom: 6 }}>{address}</div>
      <iframe
        title={address}
        src={url}
        width="100%"
        height={height}
        loading="lazy"
        style={{ border: 0, borderRadius: 10 }}
      />
    </div>
  );
};

const QATip = ({ q, en, ne, jp }: { q: string; en: string; ne: string; jp: string }) => (
  <div style={{ background: "#fffaf0", padding: 12, borderRadius: 10, marginBottom: 10, border: "1px solid #f1d8a6" }}>
    <div style={{ fontWeight: 700, marginBottom: 6 }}>{q}</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6 }}>
      <div><strong>EN:</strong> {en}</div>
      <div><strong>ने:</strong> {ne}</div>
      <div><strong>JP:</strong> {jp}</div>
    </div>
  </div>
);

// ------------------ local Okinawa dataset ------------------
const okinawaData = {
  Banks: {
    places: [
      { name: "Japan Post Bank (JP Bank) Naha Branch", address: "〒900-8799 沖縄県那覇市旭町116-37" },
      { name: "Okinawa Bank Head Office (沖縄銀行 本店)", address: "〒900-0015 沖縄県那覇市久茂地3丁目10-1" },
      { name: "Bank of the Ryukyus (琉球銀行 本店)", address: "〒900-0015 沖縄県那覇市久茂地1丁目11-1" }
    ],
    tips: [
      { q: "What to bring to open an account?", en: "Residence Card, Passport, Student ID, phone number.", ne: "रेसिडेन्स कार्ड, पासपोर्ट, विद्यार्थी परिचयपत्र, फोन नम्बर।", jp: "在留カード、パスポート、学生証、電話番号。" },
      { q: "Short phrase to say", en: "\"I want to open a bank account.\" → 口座を開きたいです。", ne: "「म बैंक खाता खोल्न चाहन्छु।」", jp: "「口座を開きたいです。」" }
    ]
  },

  Police: {
    places: [
      { name: "Okinawa Prefectural Police Headquarters (沖縄県警察本部)", address: "〒900-0021 沖縄県那覇市泉崎1丁目2-2" },
      { name: "Naha Police Station (那覇警察署)", address: "〒900-0015 沖縄県那覇市久茂地2丁目" },
      { name: "Ginowan Police Box (宜野湾交番)", address: "Ginowan, Okinawa (Ginowan central area)" }
    ],
    tips: [
      { q: "Emergency number & what to say", en: "Call 110. Say your location and the problem clearly.", ne: "110 मा फोन गर्नुहोस्। स्थान र समस्या स्पष्ट रूपमा बताउनुहोस्।", jp: "110に電話。所在地と状況をはっきり伝えてください。" },
      { q: "Lost passport/residence card", en: "Report to nearest police station, then contact your embassy.", ne: "नजिकको पुलिस स्टेशनमा रिपोर्ट गर्नुहोस् र दूतावासलाई खबर गर्नुहोस्।", jp: "最寄りの警察署に紛失届を出し、大使館に連絡してください。" }
    ]
  },

  Hospitals: {
    places: [
      { name: "Naha City Hospital (那覇市立病院)", address: "〒902-0076 沖縄県那覇市与儀1丁目3-21" },
      { name: "Regional Emergency Hospital (check local list)", address: "Search local emergency hospitals in Naha area" }
    ],
    tips: [
      { q: "What to bring", en: "Health Insurance card and Residence Card; bring passport if possible.", ne: "बीमा कार्ड र रेसिडेन्स कार्ड ल्याउनुहोस्; पासपोर्ट भए राम्रो।", jp: "保険証と在留カード、可能ならパスポートを持参してください。" },
      { q: "Useful phrase", en: "\"I need a doctor.\" → 医者が必要です。", ne: "मलाई डाक्टर चाहिन्छ।", jp: "医者が必要です。" }
    ]
  },

  Immigration: {
    places: [
      { name: "Naha Immigration Office (那覇出張所)", address: "Naha Immigration (check official site for exact address & hours)" },
      { name: "Naha City Hall (那覇市役所) — residence registration", address: "〒900-8585 沖縄県那覇市泉崎1丁目1-1" }
    ],
    tips: [
      { q: "Residence registration", en: "Register within 14 days of moving; bring Residence Card and rental contract.", ne: "१४ दिनभित्र रेजिस्टर गर्नुहोस्; रेसिडेन्स कार्ड र भाडा सम्झौता साथ लैजानुहोस्।", jp: "住民登録は転入後14日以内に。在留カードと賃貸契約書を持参。" },
      { q: "Immigration documents", en: "Check immigration website for required forms before visiting.", ne: "訪問 अघि इमिग्रेशन साइट हेर्नुहोस्।", jp: "来所前に入国管理局の案内を確認してください。" }
    ]
  },

  Shopping: {
    places: [
      { name: "Don Quijote Kokusai-dori (ドン・キホーテ 国際通り店)", address: "〒900-0014 沖縄県那覇市松尾2丁目8-19" },
      { name: "AEON Mall Rycom (イオンモール沖縄ライカム)", address: "〒901-2306 沖縄県中頭郡北中城村字ライカム1" },
      { name: "Gyomu Super (業務スーパー) - local branches", address: "Search nearby Gyomu Super branches in Naha/Ginowan" },
      { name: "Daiso (100-yen shop)", address: "Look for 'DAISO' signs locally" }
    ],
    tips: [
      { q: "Cheap shopping spots", en: "Don Quijote, Gyomu Super, Daiso, and AEON discount floors.", ne: "Don Quijote, Gyomu Super, Daiso र AEON का छुट भागहरू।", jp: "ドンキ、業務スーパー、ダイソー、イオンの割引コーナー。" },
      { q: "Cash vs Card", en: "Bring small cash for markets; big stores often accept cards.", ne: "बजारमा सानो नगद साथ राख्नुहोस्; ठूला पसलले कार्ड चलाउँछन्।", jp: "市場は現金、チェーン店はカード可が多いです。" }
    ]
  },

  Transport: {
    places: [
      { name: "Naha Bus Terminal (那覇バスターミナル)", address: "〒900-0021 沖縄県那覇市泉崎1丁目20-1" },
      { name: "Asahibashi Station (旭橋駅) — Yui Rail", address: "〒900-0029 沖縄県那覇市旭町" },
      { name: "Miebashi Station (美栄橋駅) — Yui Rail", address: "〒900-0016 沖縄県那覇市前島" },
      { name: "Naha Airport (那覇空港)", address: "〒901-0142 沖縄県那覇市鏡水" }
    ],
    tips: [
      { q: "IC cards", en: "Get OKICA or Suica for convenient travel.", ne: "OKICA वा Suica लिनुहोस्।", jp: "OKICAやSuicaを用意しましょう。" },
      { q: "Last bus/train", en: "Check last service times; some lines stop before midnight.", ne: "अन्तिम सेवा समय जाँच गर्नुहोस्।", jp: "最終便の時刻を確認してください。" }
    ]
  }
};

// ------------------ FAQ data (local, searchable) ------------------
const faqData = [
  { category: "Banks", question: "What documents to open a bank account?", answerEng: "Residence Card, Passport, Student ID, Japanese address & phone number.", answerNep: "रेसिडेन्स कार्ड, पासपोर्ट, विद्यार्थी परिचयपत्र, जापानी ठेगाना र फोन नम्बर।", answerJP: "在留カード、パスポート、学生証、日本の住所と電話番号。" },
  { category: "Immigration", question: "When to register my address?", answerEng: "Within 14 days of moving.", answerNep: "१४ दिनभित्र रेजिस्टर गर्नुहोस्।", answerJP: "転入後14日以内に登録してください。" },
  { category: "Hospitals", question: "What to bring to hospital?", answerEng: "Insurance card and Residence Card.", answerNep: "बीमा कार्ड र रेसिडेन्स कार्ड।", answerJP: "保険証と在留カード。" },
  { category: "Police", question: "What number for police?", answerEng: "110", answerNep: "110", answerJP: "110" },
  { category: "Shopping", question: "Where to buy cheap groceries?", answerEng: "Gyomu Super or discount floors at AEON/Don Quijote.", answerNep: "Gyomu Super वा AEON/Don Quijote का छुट भागहरू।", answerJP: "業務スーパーやイオン・ドンキの割引コーナー。" },
  { category: "Transport", question: "How to use bus in Naha?", answerEng: "Use IC card or exact change; board at front/exit rules vary.", answerNep: "IC कार्ड वा सटिक रकम प्रयोग गर्नुहोस्; बस नियम फरक हुन सक्छ।", answerJP: "ICカードまたは小銭で乗車。降車時の支払い方法を確認。" }
];

// ------------------ Main component ------------------
export default function SurvivalGuideOkinawaOffline() {
  const categories = Object.keys(okinawaData);
  const [activeCat, setActiveCat] = useState<string>("Banks");
  const [placeSearch, setPlaceSearch] = useState<string>("");
  const [faqSearch, setFaqSearch] = useState<string>("");

  // Flatten places with category tag for searching
  const allPlaces = useMemo(() => {
    const arr: { category: string; name: string; address: string }[] = [];
    for (const cat of Object.keys(okinawaData)) {
      const c = (okinawaData as any)[cat];
      if (c && Array.isArray(c.places)) {
        c.places.forEach((p: any) => arr.push({ category: cat, name: p.name, address: p.address }));
      }
    }
    return arr;
  }, []);

  // Place search results (local)
  const placeResults = useMemo(() => {
    const q = placeSearch.trim().toLowerCase();
    if (!q) return [];
    return allPlaces.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [placeSearch, allPlaces]);

  // FAQ results
  const faqResults = useMemo(() => {
    const q = faqSearch.trim().toLowerCase();
    if (!q) return faqData;
    return faqData.filter(f =>
      f.question.toLowerCase().includes(q) ||
      f.answerEng.toLowerCase().includes(q) ||
      f.answerNep.toLowerCase().includes(q) ||
      f.answerJP.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  }, [faqSearch]);

  // UI
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans JP'", background: "#fffaf0", minHeight: "100vh", padding: 18 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 18 }}>
          <h1 style={{ color: "#c47f00", fontSize: 28, margin: 0 }}>🏮 Okinawa Student Survival Guide</h1>
          <p style={{ color: "#6b6b6b", marginTop: 8 }}>Offline local search (Okinawa only) — maps, tips and FAQs in English / Nepali / Japanese</p>
        </header>

        {/* Top global place search */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
          <input
            value={placeSearch}
            onChange={(e) => setPlaceSearch(e.target.value)}
            placeholder="Search places across Okinawa (e.g., 'bank', 'donki', 'Naha bus', 'gyomu')"
            style={{ width: 640, padding: "10px 12px", borderRadius: 10, border: "1px solid #e6d6bb" }}
          />
          <button onClick={() => setPlaceSearch("")} style={{ padding: "10px 12px", borderRadius: 10, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
            Clear
          </button>
        </div>

        {/* Category Tabs */}
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCat(cat); setPlaceSearch(""); }}
              style={{
                padding: "8px 14px",
                borderRadius: 10,
                border: activeCat === cat ? "2px solid #b36e00" : "1px solid #e9cfa2",
                background: activeCat === cat ? "#b36e00" : "#fff",
                color: activeCat === cat ? "#fff" : "#b36e00",
                cursor: "pointer",
                fontWeight: 700,
                boxShadow: activeCat === cat ? "0 2px 8px rgba(179,110,0,0.12)" : "none"
              }}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
          {/* Left: either search results or active category list */}
          <main>
            {placeSearch.trim() ? (
              <section>
                <h2 style={{ color: "#b36e00", marginBottom: 10 }}>🔎 Search Results ({placeResults.length})</h2>
                {placeResults.length === 0 && <p style={{ color: "#777" }}>No places found for "{placeSearch}". Try another keyword.</p>}
                {placeResults.map((r, i) => (
                  <article key={i} style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <div style={{ fontWeight: 800 }}>{r.name} <span style={{ fontWeight: 600, color: "#777", fontSize: 13 }}>({r.category})</span></div>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.address)}`} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#2563eb" }}>
                        Open in Maps ↗
                      </a>
                    </div>
                    <MapEmbed address={r.address} />
                  </article>
                ))}
              </section>
            ) : (
              <section>
                <h2 style={{ color: "#b36e00", marginBottom: 10 }}>{activeCat} — Key places</h2>
                {((okinawaData as any)[activeCat].places ?? []).map((p: any, idx: number) => (
                  <article key={idx} style={{ background: "#fff", borderRadius: 12, padding: 12, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <div style={{ fontWeight: 800 }}>{p.name}</div>
                      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address)}`} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#2563eb" }}>
                        Open in Maps ↗
                      </a>
                    </div>
                    <MapEmbed address={p.address} />
                  </article>
                ))}
              </section>
            )}
          </main>

          {/* Right: Tips + FAQ */}
          <aside>
            <div style={{ position: "sticky", top: 18 }}>
              <section style={{ marginBottom: 14 }}>
                <h3 style={{ color: "#d47f00", marginBottom: 8 }}>💡 Quick Q&A Tips</h3>
                {((okinawaData as any)[activeCat].tips ?? []).map((t: any, i: number) => (
                  <QATip key={i} q={t.q} en={t.en} ne={t.ne} jp={t.jp} />
                ))}
              </section>

              <section style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <h4 style={{ marginTop: 0, color: "#b36e00" }}>❓ Search FAQs</h4>
                <input
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search FAQ: e.g., 'open bank', 'ambulance', 'IC card'..."
                  style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e6d6bb", marginBottom: 8 }}
                />
                <div style={{ maxHeight: 360, overflow: "auto", paddingRight: 6 }}>
                  {faqResults.length === 0 && <div style={{ color: "#777" }}>No FAQ results found.</div>}
                  {faqResults.map((f, i) => (
                    <div key={i} style={{ marginBottom: 10, borderLeft: "4px solid #f4d8a6", background: "#fffaf6", padding: 10, borderRadius: 8 }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.question}</div>
                      <div style={{ fontSize: 13 }}>
                        <div><strong>EN:</strong> {f.answerEng}</div>
                        <div><strong>ने:</strong> {f.answerNep}</div>
                        <div><strong>JP:</strong> {f.answerJP}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section style={{ marginTop: 12, background: "#fff", padding: 12, borderRadius: 10 }}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>🆘 Emergency</div>
                <div style={{ fontSize: 14 }}>
                  <div>Police: <strong>110</strong></div>
                  <div>Ambulance / Fire: <strong>119</strong></div>
                  <div>Japan Helpline (EN): <strong>0570-000-911</strong></div>
                </div>
              </section>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: 22, background: "#fff8e6", padding: 12, borderRadius: 10 }}>
          <h4 style={{ marginTop: 0, color: "#b36e00" }}>✅ Quick Checklist & Useful Phrases</h4>
          <div style={{ display: "grid", gap: 8 }}>
            <div>
              <strong>What to always bring:</strong>
              <div>EN: Residence Card, Insurance Card, Student ID, Phone & Address in Japanese.</div>
              <div>ने: रेसिडेन्स कार्ड, बीमा कार्ड, विद्यार्थी आईडी, फोन र जापानी ठेगाना साथ राख्नुहोस्।</div>
              <div>JP: 在留カード、保険証、学生証、連絡先と住所（日本語）を持ち歩いてください。</div>
            </div>

            <div>
              <strong>What to say when you need help:</strong>
              <div>EN: "Excuse me, can you help me? I need ..."</div>
              <div>ने: "म सँग सहायता गर्न सक्नुहुन्छ?"</div>
              <div>JP: "すみません、手伝っていただけますか？"</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
