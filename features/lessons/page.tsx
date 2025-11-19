"use client";

import { useMemo, useState } from "react";
import styles from "./lessons.module.css";
import jlptKanji from "../../data/jlpt-kanji.json";

type ExampleEntry = {
  written: string;
  reading: string;
  meaning: string;
};

type DatasetEntry = {
  kanji: string;
  jlpt: number | null;
  grade: number | null;
  strokeCount: number | null;
  meanings: string[];
  kunReadings: string[];
  onReadings: string[];
  unicode: string;
  examples: ExampleEntry[];
};

const levelMeta = [
  {
    slug: "n5",
    label: "N5",
    name: "JLPT N5",
    description:
      "Foundation kanji you meet in tickets, menus, and classroom instructions. Mastering these removes fear of daily signage.",
    badgeColor: "#fef3c7",
    badgeText: "#b45309",
    focus: ["Numbers & time", "School life", "Daily places"],
  },
  {
    slug: "n4",
    label: "N4",
    name: "JLPT N4",
    description:
      "Story-driven kanji that appear in diaries, work chats, and travel logs. They connect basic reading to real community life.",
    badgeColor: "#e0f2fe",
    badgeText: "#0369a1",
    focus: ["Work & transport", "Feelings", "Schedules"],
  },
  {
    slug: "n3",
    label: "N3",
    name: "JLPT N3",
    description:
      "Bridge-level kanji that show up in campus notices, government paperwork, and senpai feedback. They turn survival reading into confident comprehension.",
    badgeColor: "#e0e7ff",
    badgeText: "#4338ca",
    focus: ["Campus work", "City admin", "Travel diaries"],
  },
  {
    slug: "n2",
    label: "N2",
    name: "JLPT N2",
    description:
      "Professional kanji you need for job hunting, formal messaging, and long-form news. Essential for internships and office communication.",
    badgeColor: "#fee2e2",
    badgeText: "#b91c1c",
    focus: ["Business chat", "News & media", "Reports"],
  },
  {
    slug: "n1",
    label: "N1",
    name: "JLPT N1",
    description:
      "Native-level kanji pulled from research papers, policy briefs, and high-context novels. Complete this set to access any Japanese source.",
    badgeColor: "#f3e8ff",
    badgeText: "#7e22ce",
    focus: ["Academia", "Legal & policy", "Opinion pieces"],
  },
] as const;

type LevelSlug = (typeof levelMeta)[number]["slug"];

type KanjiDataset = Partial<Record<LevelSlug, DatasetEntry[]>>;

type AugmentedEntry = DatasetEntry & {
  level: LevelSlug;
  displayLevel: string;
};

const numberFormatter = new Intl.NumberFormat("en-US");

const dataset = jlptKanji as KanjiDataset;
const allKanji: AugmentedEntry[] = levelMeta.flatMap((meta) =>
  (dataset[meta.slug] ?? []).map((item) => ({
    ...item,
    level: meta.slug,
    displayLevel: meta.label,
  }))
);

const highlightCards = [
  {
    emoji: "🧠",
    title: "Chunked Learning",
    text: "Group kanji by shared radicals and repeat with spaced intervals for better recall.",
  },
  {
    emoji: "📝",
    title: "Dual Translation",
    text: "Write the Japanese sentence, then Nepalese and English to anchor the context.",
  },
  {
    emoji: "🎧",
    title: "Shadowing",
    text: "Read the example sentences aloud to match rhythm and improve pronunciation.",
  },
  {
    emoji: "📅",
    title: "Micro Goals",
    text: "Master 3 kanji per day and review every Sunday for long-term retention.",
  },
];

const strokeFilters = [
  { id: "all", label: "All strokes" },
  { id: "tiny", label: "1–5", min: 1, max: 5 },
  { id: "short", label: "6–10", min: 6, max: 10 },
  { id: "mid", label: "11–15", min: 11, max: 15 },
  { id: "long", label: "16+", min: 16, max: 99 },
];

const studyTips = [
  {
    title: "1. Visualize Radicals",
    text: "Highlight the repeating pieces (氵, 扌, 宀) to decode meaning faster during exams.",
  },
  {
    title: "2. Speak & Write",
    text: "Read the sentence aloud, then copy it by hand. Dual activity locks the kanji in memory.",
  },
  {
    title: "3. Context Review",
    text: "Use the example situations (school, work, travel) when talking to teachers or senpai.",
  },
  {
    title: "4. Layered Reading",
    text: "For N3+ passages, skim first, then annotate grammar and kanji tone on a second pass to mimic exam timing.",
  },
  {
    title: "5. Topic Bundles",
    text: "Group the new N2/N1 kanji by news themes (economy, society, policy) so you can retell each story in Nepali and English.",
  },
];

const Lessons = () => {
  const [query, setQuery] = useState("");
  const [activeLevels, setActiveLevels] = useState<LevelSlug[]>(
    levelMeta.map((meta) => meta.slug)
  );
  const [strokeFilter, setStrokeFilter] = useState("all");

  const filteredKanji = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filterMeta = strokeFilters.find((item) => item.id === strokeFilter);

    return allKanji.filter((entry) => {
      if (!activeLevels.includes(entry.level)) {
        return false;
      }

      if (filterMeta && filterMeta.id !== "all" && entry.strokeCount) {
        const { min = 0, max = 999 } = filterMeta;
        if (entry.strokeCount < min || entry.strokeCount > max) {
          return false;
        }
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = [
        entry.kanji,
        entry.meanings.join(" "),
        entry.kunReadings.join(" "),
        entry.onReadings.join(" "),
        entry.examples.map((ex) => `${ex.written} ${ex.meaning}`).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [query, activeLevels, strokeFilter]);

  const totalExamples = useMemo(
    () => allKanji.reduce((sum, entry) => sum + entry.examples.length, 0),
    []
  );

  const toggleLevel = (level: LevelSlug) => {
    setActiveLevels((prev) => {
      if (prev.includes(level)) {
        if (prev.length === 1) return prev; // keep at least one level active
        return prev.filter((item) => item !== level);
      }
      return [...prev, level];
    });
  };

  const heroStats = [
    { label: "Total Kanji", value: numberFormatter.format(allKanji.length) },
    { label: "Usage Samples", value: numberFormatter.format(totalExamples) },
    ...levelMeta.map((meta) => ({
      label: `${meta.label} Set`,
      value: numberFormatter.format((dataset[meta.slug] ?? []).length),
    })),
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroBadge}>N5 → N1 Kanji Journey</span>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Build confident reading skills step by step.
          </h1>
          <p className={styles.heroSubtitle}>
            नेपालबाट जापानमा आएका विद्यार्थीका लागि तयार पारिएको पठाइ
            मार्गदर्शिका। Memorize essential kanji with examples you can speak,
            write, and use at school or part-time work.
          </p>
          <div className={styles.heroStats}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.statBlock}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.highlights}>
        {highlightCards.map((card) => (
          <article key={card.title} className={styles.highlightCard}>
            <div className={styles.highlightEmoji}>{card.emoji}</div>
            <h3 className={styles.highlightTitle}>{card.title}</h3>
            <p className={styles.highlightText}>{card.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.explorerSection}>
        <div className={styles.explorerHeader}>
          <div>
            <h2 className={styles.levelTitle}>Kanji Explorer</h2>
            <p className={styles.levelDescription}>
              Filter the full JLPT N5–N1 set, search by English meaning,
              readings, or sample word, then add the kanji to today’s study
              deck.
            </p>
          </div>
          <span className={styles.resultBadge}>
            {filteredKanji.length} / {allKanji.length} kanji
          </span>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.searchBox}>
            <span className={styles.searchHint}>Search</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例: travel, べんきょう, 日"
            />
          </label>

          <div className={styles.filterGroup}>
            {levelMeta.map((level) => (
              <button
                key={level.slug}
                type="button"
                className={`${styles.filterChip} ${
                  activeLevels.includes(level.slug)
                    ? styles.filterChipActive
                    : ""
                }`}
                onClick={() => toggleLevel(level.slug)}
              >
                {level.label}
              </button>
            ))}
          </div>

          <div className={styles.filterGroup}>
            {strokeFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`${styles.filterChip} ${
                  strokeFilter === filter.id ? styles.filterChipActive : ""
                }`}
                onClick={() => setStrokeFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredKanji.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nothing matched that search. Try clearing one of the filters.</p>
          </div>
        ) : (
          <div className={styles.kanjiGrid}>
            {filteredKanji.map((item) => (
              <article
                key={`${item.level}-${item.kanji}`}
                className={styles.kanjiCard}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <div className={styles.kanjiCharacter}>{item.kanji}</div>
                    <div className={styles.meaning}>
                      {item.meanings.slice(0, 3).join(", ")}
                    </div>
                  </div>
                  <span className={styles.cardTag}>
                    {item.displayLevel} • {item.strokeCount ?? "?"}画
                  </span>
                </div>

                <div className={styles.readingRow}>
                  <span className={styles.readingLabel}>Onyomi</span>
                  <span className={styles.readingValue}>
                    {item.onReadings.length
                      ? item.onReadings.join(" ・ ")
                      : "—"}
                  </span>
                </div>
                <div className={styles.readingRow}>
                  <span className={styles.readingLabel}>Kunyomi</span>
                  <span className={styles.readingValue}>
                    {item.kunReadings.length
                      ? item.kunReadings.join(" ・ ")
                      : "—"}
                  </span>
                </div>

                {item.examples.length > 0 && (
                  <div className={styles.exampleBlock}>
                    {item.examples.map((example) => (
                      <div
                        key={`${item.kanji}-${example.written}`}
                        className={styles.exampleLine}
                      >
                        <div className={styles.exampleHeader}>
                          <span className={styles.exampleJp}>
                            {example.written}
                          </span>
                          <span className={styles.exampleReading}>
                            {example.reading}
                          </span>
                        </div>
                        <p className={styles.exampleEn}>{example.meaning}</p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {levelMeta.map((level) => {
        const levelData = dataset[level.slug] ?? [];
        if (!levelData.length) {
          return null;
        }

        const avgStrokes = levelData.length
          ? Math.round(
              levelData.reduce(
                (sum, entry) => sum + (entry.strokeCount || 0),
                0
              ) / levelData.length
            )
          : 0;
        const preview = levelData.slice(0, 6);

        return (
          <section key={level.slug} className={styles.levelSection}>
            <div className={styles.levelCard}>
              <div className={styles.levelHeader}>
                <div>
                  <h2 className={styles.levelTitle}>{level.name}</h2>
                  <p className={styles.levelDescription}>{level.description}</p>
                </div>
                <span
                  className={styles.levelBadge}
                  style={{
                    backgroundColor: level.badgeColor,
                    color: level.badgeText,
                  }}
                >
                  {levelData.length} kanji • avg {avgStrokes || "—"}画
                </span>
              </div>

              <ul className={styles.focusList}>
                {level.focus.map((item) => (
                  <li key={`${level.slug}-${item}`}>{item}</li>
                ))}
              </ul>

              <div className={styles.previewGrid}>
                {preview.map((item) => (
                  <div
                    key={`${level.slug}-${item.kanji}`}
                    className={styles.previewCard}
                  >
                    <div className={styles.previewKanji}>{item.kanji}</div>
                    <p>{item.meanings[0] ?? ""}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className={styles.studyTips}>
        {studyTips.map((tip) => (
          <div key={tip.title}>
            <h3 className={styles.tipTitle}>{tip.title}</h3>
            <p className={styles.tipText}>{tip.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Lessons;
