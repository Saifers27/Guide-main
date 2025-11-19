import { NextRequest, NextResponse } from "next/server";

type LessonEntry = {
  id: number;
  jp: string;
  romaji: string;
  np: string;
  category: string;
  type: "phrase" | "vocab";
};

// Lightweight fallback dataset so builds succeed even without Prisma/
// DATABASE_URL. Replace with a real data source when ready.
const fallbackLessons: LessonEntry[] = [
  {
    id: 1,
    jp: "駅はどこですか？",
    romaji: "eki wa doko desu ka?",
    np: "रेल स्टेशन कहाँ छ?",
    category: "travel",
    type: "phrase",
  },
  {
    id: 2,
    jp: "この電車は新宿に行きますか。",
    romaji: "kono densha wa shinjuku ni ikimasu ka",
    np: "यो ट्रेन शिन्जुकु जान्छ?",
    category: "transport",
    type: "phrase",
  },
  {
    id: 3,
    jp: "アルバイトの時間を教えてください。",
    romaji: "arubaito no jikan o oshiete kudasai",
    np: "पार्ट–टाइमको समय बताइदिनुस्।",
    category: "work",
    type: "phrase",
  },
  {
    id: 4,
    jp: "健康保険証は持っていますか。",
    romaji: "kenkō hokenshō wa motteimasu ka",
    np: "स्वास्थ्य बीमा कार्ड छ?",
    category: "health",
    type: "phrase",
  },
  {
    id: 5,
    jp: "掃除機をかけてもいいですか。",
    romaji: "sōjiki o kakete mo ii desu ka",
    np: "भ्याकुम चलाउन सक्छु?",
    category: "home",
    type: "phrase",
  },
  {
    id: 6,
    jp: "提出期限は来週の火曜日です。",
    romaji: "teishutsu kigen wa raishū no kayōbi desu",
    np: "सबमिट गर्ने मिति अर्को हप्ताको मंगलबार हो।",
    category: "school",
    type: "phrase",
  },
  {
    id: 7,
    jp: "安全確認をしてから出発します。",
    romaji: "anzen kakunin o shite kara shuppatsu shimasu",
    np: "सुरक्षा जाँच पछि मात्र प्रस्थान गर्छौं।",
    category: "safety",
    type: "phrase",
  },
  {
    id: 8,
    jp: "予約の名前を教えていただけますか。",
    romaji: "yoyaku no namae o oshiete itadakemasu ka",
    np: "बुकिङको नाम बताइदिनुहुन्छ?",
    category: "service",
    type: "phrase",
  },
  {
    id: 9,
    jp: "携帯を充電できる場所はありますか。",
    romaji: "keitai o jūden dekiru basho wa arimasu ka",
    np: "मोबाइल चार्ज गर्न ठाउँ छ?",
    category: "daily",
    type: "phrase",
  },
  {
    id: 10,
    jp: "書類が届いたら連絡してください。",
    romaji: "shorui ga todoitara renraku shite kudasai",
    np: "कागजात पुगेपछि खबर गर्नुहोस्।",
    category: "admin",
    type: "phrase",
  },
];

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get("search")?.trim().toLowerCase();

  if (!term) {
    return NextResponse.json(fallbackLessons.slice(0, 50));
  }

  const results = fallbackLessons
    .filter((entry) => {
      const blob =
        `${entry.jp} ${entry.romaji} ${entry.np} ${entry.category}`.toLowerCase();
      return blob.includes(term);
    })
    .slice(0, 50);

  return NextResponse.json(results);
}
