//     const res = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${source}|${target}`
//     );
//     const data = await res.json();
//     return data.responseData.translatedText || "(translation unavailable)";
//   } catch {
//     return "(translation unavailable)";
//   }
// }

// // 📘 Example Sentences (Japanese + English)
// async function fetchExamples(word: string, lang: string) {
//   try {
//     if (lang === "ja") {
//       const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`);
//       const data = await res.json();
//       const senses = data.data[0]?.senses || [];
//       const examples = senses.flatMap((sense: any) =>
//         (sense.english_definitions || []).map((en: string) => ({
//           jp: data.data[0]?.japanese?.[0]?.word || "",
//           en,
//         }))
//       );
//       return examples.slice(0, 5);
//     } else if (lang === "en") {
//       const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
//       const data = await res.json();
//       return (
//         data[0]?.meanings[0]?.definitions
//           ?.slice(0, 3)
//           .map((d: any) => ({ en: d.example || d.definition }))
//           .filter(Boolean) || []
//       );
//     }
//     return [];
//   } catch {
//     return [];
//   }
// }

// // 🔊 Pronunciation / Reading
// async function fetchPronunciation(word: string, lang: string) {
//   try {
//     if (lang === "ja") {
//       const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`);
//       const data = await res.json();
//       return data.data[0]?.japanese[0]?.reading || "";
//     } else if (lang === "en") {
//       const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
//       const data = await res.json();
//       return data[0]?.phonetics?.[0]?.text || "";
//     }
//     return "";
//   } catch {
//     return "";
//   }
// }
// "use client";
// import React, { useState } from "react";

// export default function SearchPage() {
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     setLoading(true);
//     setResult(null);

//     try {
//       const detected = await detectLanguage(query);
//       let targets: string[] = [];

//       if (detected === "ja") targets = ["en", "ne"];
//       else if (detected === "ne") targets = ["ja", "en"];
//       else targets = ["ne", "ja"];

//       const translations: Record<string, any> = {};
//       for (const target of targets) {
//         translations[target] = await translateWordSmart(query, detected, target);
//       }

//       const examples = await fetchExamples(query, detected);
//       const pronunciation = await fetchPronunciation(query, detected);

//       setResult({ detected, translations, examples, pronunciation });
//     } catch (err) {
//       console.error(err);
//       setResult({ error: "Failed to get results" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-[#fffaf0] px-4 py-8"
//       style={{ fontFamily: "system-ui, sans-serif" }}
//     >
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//         <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//           🌏 Multi-Language Dictionary
//         </h1>

//         {/* 🔍 Search Bar */}
//         <div className="flex gap-3 mb-6">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Type a word (English / 日本語 / नेपाली)"
//             className="flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={handleSearch}
//             disabled={loading}
//             className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
//           >
//             {loading ? "..." : "Search"}
//           </button>
//         </div>

//         {/* 🔤 Search Results */}
//         {result && (
//           <div className="bg-blue-50 rounded-xl p-5 shadow-inner border border-blue-100">
//             {result.error ? (
//               <p className="text-red-600 font-medium">{result.error}</p>
//             ) : (
//               <>
//                 <p className="text-gray-700 mb-3">
//                   <strong>Detected Language:</strong> {flagFor(result.detected)}{" "}
//                   {result.detected.toUpperCase()}
//                 </p>

//                 <div className="space-y-2 mb-4">
//                   {Object.entries(result.translations).map(([lang, text]) => (
//                     <p key={lang} className="text-gray-800">
//                       <strong>
//                         {flagFor(lang)} {lang.toUpperCase()}:
//                       </strong>{" "}
//                       {typeof text === "string" ? text : JSON.stringify(text)}
//                     </p>
//                   ))}
//                 </div>

//                 {result.pronunciation && (
//                   <p className="text-gray-700 mb-3">
//                     <strong>🔊 Pronunciation:</strong> {result.pronunciation}
//                   </p>
//                 )}

//                 {result.examples?.length > 0 && (
//                   <div>
//                     <strong className="text-gray-700">📘 Example Sentences:</strong>
//                     <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
//                       {result.examples.map((ex: any, i: number) => (
//                         <li key={i}>
//                           {ex.jp && <span>🇯🇵 {ex.jp}</span>}{" "}
//                           {ex.en && <span>— 🇬🇧 {ex.en}</span>}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // 🇯🇵🇬🇧🇳🇵 Flags
// function flagFor(lang: string) {
//   switch (lang) {
//     case "ja":
//       return "🇯🇵";
//     case "ne":
//       return "🇳🇵";
//     case "en":
//       return "🇬🇧";
//     default:
//       return "🌐";
//   }
// }

// // 🧠 Detect Language
// async function detectLanguage(text: string) {
//   const res = await fetch("https://libretranslate.com/detect", {
//     method: "POST",
//     body: JSON.stringify({ q: text }),
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await res.json();
//   return data[0]?.language || "en";
// }

// // 🌍 Smart Translator
// async function translateWordSmart(word: string, source: string, target: string) {
//   try {
//     const res = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${source}|${target}`
//     );
//     const data = await res.json();
//     return data.responseData.translatedText || "(translation unavailable)";
//   } catch {
//     return "(translation unavailable)";
//   }
// }

// // 📘 Example Sentences (Japanese + English)
// async function fetchExamples(word: string, lang: string) {
//   try {
//     if (lang === "ja") {
//       const res = await fetch(
//         `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`
//       );
//       const data = await res.json();
//       const senses = data.data[0]?.senses || [];
//       return senses
//         .flatMap((s: any) =>
//           (s.english_definitions || []).map((en: string) => ({
//             jp: data.data[0]?.japanese?.[0]?.word || "",
//             en,
//           }))
//         )
//         .slice(0, 5);
//     } else if (lang === "en") {
//       const res = await fetch(
//         `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
//       );
//       const data = await res.json();
//       return (
//         data[0]?.meanings[0]?.definitions
//           ?.slice(0, 3)
//           .map((d: any) => ({ en: d.example || d.definition }))
//           .filter(Boolean) || []
//       );
//     }
//     return [];
//   } catch {
//     return [];
//   }
// }

// // 🔊 Pronunciation / Reading
// async function fetchPronunciation(word: string, lang: string) {
//   try {
//     if (lang === "ja") {
//       const res = await fetch(
//         `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(word)}`
//       );
//       const data = await res.json();
//       return data.data[0]?.japanese[0]?.reading || "";
//     } else if (lang === "en") {
//       const res = await fetch(
//         `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
//       );
//       const data = await res.json();
//       return data[0]?.phonetics?.[0]?.text || "";
//     }
//     return "";
//   } catch {
//     return "";
//   }
// }
"use client";
import React, { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const detected = await detectLanguage(query);
      let targets: string[] = [];

      if (detected === "ja") targets = ["en", "ne"];
      else if (detected === "ne") targets = ["ja", "en"];
      else targets = ["ne", "ja"];

      const translations: Record<string, any> = {};
      for (const target of targets) {
        translations[target] = await translateWordSmart(
          query,
          detected,
          target
        );
      }

      const examples = await fetchExamples(query, detected);
      const pronunciation = await fetchPronunciation(query, detected);

      setResult({ detected, translations, examples, pronunciation });
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to get results" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fffaf0",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#b36e00",
            marginBottom: "1rem",
          }}
        >
          🔍 Multi-Language Dictionary
        </h1>
        <p
          style={{
            color: "#555",
            marginBottom: "1.5rem",
            fontSize: "1.1rem",
          }}
        >
          Type a word in English, Japanese, or Nepali to get translations,
          examples, and pronunciation.
        </p>

        {/* Search bar */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a word..."
            style={{
              flex: 1,
              maxWidth: "400px",
              padding: "0.6rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "12px",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#aaa" : "#c47f00",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "0.6rem 1.5rem",
              fontSize: "1rem",
              cursor: loading ? "default" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div
            style={{
              textAlign: "left",
              backgroundColor: "#fffaf5",
              border: "1px solid #f0d8b8",
              borderRadius: "12px",
              padding: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            {result.error ? (
              <p style={{ color: "red" }}>{result.error}</p>
            ) : (
              <>
                <p>
                  <strong>Detected Language:</strong> {flagFor(result.detected)}{" "}
                  {result.detected.toUpperCase()}
                </p>

                <div style={{ margin: "1rem 0" }}>
                  {Object.entries(result.translations).map(([lang, text]) => {
                    const value: any = text;
                    const display =
                      typeof value === "string" || typeof value === "number"
                        ? value
                        : JSON.stringify(value);
                    return (
                      <p key={lang}>
                        <strong>
                          {flagFor(lang)} {lang.toUpperCase()}:
                        </strong>{" "}
                        {display}
                      </p>
                    );
                  })}
                </div>

                {result.pronunciation && (
                  <p>
                    <strong>🔊 Pronunciation:</strong> {result.pronunciation}
                  </p>
                )}

                {result.examples?.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <strong>📘 Example Sentences:</strong>
                    <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                      {result.examples.map((ex: any, i: number) => (
                        <li key={i}>
                          {ex.jp && <span>🇯🇵 {ex.jp}</span>}{" "}
                          {ex.en && <span>— 🇬🇧 {ex.en}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          color: "#888",
          fontSize: "0.9rem",
        }}
      >
        <p>
          © {new Date().getFullYear()} Nepalese Guide to Japan — Dictionary Tool
        </p>
      </footer>
    </div>
  );
}

// 🇯🇵🇬🇧🇳🇵 Flags
function flagFor(lang: string) {
  switch (lang) {
    case "ja":
      return "🇯🇵";
    case "ne":
      return "🇳🇵";
    case "en":
      return "🇬🇧";
    default:
      return "🌐";
  }
}

// 🧠 Detect Language
async function detectLanguage(text: string) {
  const res = await fetch("https://libretranslate.com/detect", {
    method: "POST",
    body: JSON.stringify({ q: text }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data[0]?.language || "en";
}

type Locale = "en" | "ne" | "ja";

const locales: Locale[] = ["en", "ne", "ja"];

const curatedLexicon: Array<Record<Locale, string>> = [
  { en: "girl", ne: "केटी", ja: "女の子" },
  { en: "boy", ne: "केटा", ja: "男の子" },
  { en: "teacher", ne: "शिक्षक", ja: "先生" },
  { en: "student", ne: "विद्यार्थी", ja: "学生" },
  { en: "school", ne: "विद्यालय", ja: "学校" },
  { en: "book", ne: "पुस्तक", ja: "本" },
  { en: "frustrate", ne: "हताश पार्नु", ja: "挫折させる" },
  { en: "frustrated", ne: "हताश", ja: "イライラしている" },
  { en: "frustration", ne: "हताशा", ja: "フラストレーション" },
  { en: "angry", ne: "रिसाएको", ja: "怒っている" },
  { en: "happy", ne: "खुसी", ja: "幸せ" },
  { en: "sad", ne: "दुःखी", ja: "悲しい" },
  { en: "tired", ne: "थाकेको", ja: "疲れた" },
  { en: "hungry", ne: "भोक लागेको", ja: "お腹が空いた" },
  { en: "thirsty", ne: "तिरसाएको", ja: "喉が渇いた" },
  { en: "help", ne: "मद्दत", ja: "助けて" },
  { en: "police", ne: "प्रहरी", ja: "警察" },
  { en: "bathroom", ne: "शौचालय", ja: "トイレ" },
  { en: "medicine", ne: "औषधि", ja: "薬" },
  { en: "water", ne: "पानी", ja: "水" },
  { en: "food", ne: "खाना", ja: "食べ物" },
  { en: "friend", ne: "साथी", ja: "友達" },
  { en: "family", ne: "परिवार", ja: "家族" },
  { en: "hospital", ne: "अस्पताल", ja: "病院" },
  { en: "bus", ne: "बस", ja: "バス" },
  { en: "train", ne: "रेलगाडी", ja: "電車" },
  { en: "station", ne: "स्टेशन", ja: "駅" },
  { en: "airport", ne: "विमानस्थल", ja: "空港" },
  { en: "rain", ne: "वर्षा", ja: "雨" },
  { en: "sun", ne: "घाम", ja: "太陽" },
  { en: "moon", ne: "चन्द्रमा", ja: "月" },
  { en: "mountain", ne: "पहाड", ja: "山" },
  { en: "river", ne: "नदी", ja: "川" },
  { en: "computer", ne: "कम्प्युटर", ja: "コンピューター" },
  { en: "phone", ne: "फोन", ja: "電話" },
  { en: "hello", ne: "नमस्ते", ja: "こんにちは" },
  { en: "thank you", ne: "धन्यवाद", ja: "ありがとうございます" },
];

const curatedTranslations: Record<
  string,
  Record<string, string>
> = curatedLexicon.reduce((map, entry) => {
  locales.forEach((source) => {
    const sourceWord = entry[source];
    if (!sourceWord) return;
    const key = `${source}-${normalizedKey(sourceWord)}`;
    map[key] = map[key] || {};
    locales.forEach((target) => {
      if (target === source) return;
      const targetWord = entry[target];
      if (!targetWord) return;
      map[key][target] = targetWord;
    });
  });
  return map;
}, {} as Record<string, Record<string, string>>);

function normalizedKey(word: string) {
  return word.trim().toLowerCase();
}

const translationAliases: Record<string, string> = {
  frustate: "frustrate",
  frustation: "frustration",
  frustrat: "frustrate",
  frustated: "frustrated",
  frust: "frustrate",
};

// 🌍 Smart Translator
async function translateWordSmart(
  word: string,
  source: string,
  target: string
) {
  const normalizedInput = normalizedKey(word);
  const canonicalNormalized =
    translationAliases[normalizedInput] ?? normalizedInput;

  const curatedKey = `${source}-${canonicalNormalized}`;
  const curated = curatedTranslations[curatedKey]?.[target];
  if (curated) return curated;

  const queryWord =
    canonicalNormalized !== normalizedInput ? canonicalNormalized : word;

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        queryWord
      )}&langpair=${source}|${target}`
    );
    const data = await res.json();
    return data.responseData.translatedText || "(translation unavailable)";
  } catch {
    return "(translation unavailable)";
  }
}

// 📘 Example Sentences (Japanese + English)
async function fetchExamples(word: string, lang: string) {
  try {
    if (lang === "ja") {
      const res = await fetch(
        `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(
          word
        )}`
      );
      const data = await res.json();
      const senses = data.data[0]?.senses || [];
      return senses
        .flatMap((s: any) =>
          (s.english_definitions || []).map((en: string) => ({
            jp: data.data[0]?.japanese?.[0]?.word || "",
            en,
          }))
        )
        .slice(0, 5);
    } else if (lang === "en") {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          word
        )}`
      );
      const data = await res.json();
      return (
        data[0]?.meanings[0]?.definitions
          ?.slice(0, 3)
          .map((d: any) => ({ en: d.example || d.definition }))
          .filter(Boolean) || []
      );
    }
    return [];
  } catch {
    return [];
  }
}

// 🔊 Pronunciation / Reading
async function fetchPronunciation(word: string, lang: string) {
  try {
    if (lang === "ja") {
      const res = await fetch(
        `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(
          word
        )}`
      );
      const data = await res.json();
      return data.data[0]?.japanese[0]?.reading || "";
    } else if (lang === "en") {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          word
        )}`
      );
      const data = await res.json();
      return data[0]?.phonetics?.[0]?.text || "";
    }
    return "";
  } catch {
    return "";
  }
}
