#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = dirname(__dirname);
const DATA_SOURCE = join(ROOT, "data-jlpt.tsv");
const OUTPUT_FILE = join(ROOT, "data", "jlpt-kanji.json");
const API_ROOT = "https://kanjiapi.dev/v1";
const TARGET_LEVELS = [5, 4, 3, 2, 1];
const CONCURRENCY = 10;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chunk = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const parseJlptFile = async () => {
  const raw = await readFile(DATA_SOURCE, "utf8");
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const levelMap = new Map();

  for (const line of lines) {
    const match = line.match(/^(\d+)\s+(.*)$/);
    if (!match) continue;
    const level = Number(match[1]);
    const chars = match[2].replace(/\s+/g, "");
    levelMap.set(level, Array.from(chars));
  }

  return levelMap;
};

const pickExamples = (wordsPayload, limit = 2) => {
  const examples = [];
  for (const entry of wordsPayload) {
    const firstVariant = entry.variants?.[0];
    const firstMeaning = entry.meanings?.[0];
    if (!firstVariant || !firstMeaning) continue;
    const gloss = Array.isArray(firstMeaning.glosses)
      ? firstMeaning.glosses[0]
      : firstMeaning.glosses;
    if (!gloss) continue;
    examples.push({
      written: firstVariant.written || firstVariant.pronounced || "",
      reading: firstVariant.pronounced || "",
      meaning: gloss,
    });
    if (examples.length >= limit) break;
  }
  return examples;
};

const fetchKanjiDetails = async (character) => {
  const encoded = encodeURIComponent(character);
  const detailRes = await fetch(`${API_ROOT}/kanji/${encoded}`);
  if (!detailRes.ok) {
    throw new Error(`Failed to fetch kanji ${character}: ${detailRes.status}`);
  }
  const detail = await detailRes.json();

  let examples = [];
  try {
    const wordsRes = await fetch(`${API_ROOT}/words/${encoded}`);
    if (wordsRes.ok) {
      const wordsPayload = await wordsRes.json();
      examples = pickExamples(wordsPayload);
    }
  } catch (err) {
    console.warn(`⚠️  Example fetch failed for ${character}: ${err.message}`);
  }

  return {
    kanji: detail.kanji,
    jlpt: detail.jlpt ?? null,
    grade: detail.grade ?? null,
    strokeCount: detail.stroke_count ?? null,
    meanings: detail.meanings ?? [],
    kunReadings: detail.kun_readings ?? [],
    onReadings: detail.on_readings ?? [],
    unicode: detail.unicode ?? "",
    examples,
  };
};

const buildDatasetForLevel = async (characters) => {
  const dataset = [];
  const groups = chunk(characters, CONCURRENCY);
  for (const group of groups) {
    const results = await Promise.all(
      group.map(async (kanji) => {
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            return await fetchKanjiDetails(kanji);
          } catch (err) {
            const delay = 500 * (attempt + 1);
            console.warn(`Retry ${attempt + 1} for ${kanji} after ${delay}ms`);
            await sleep(delay);
          }
        }
        console.error(`❌ Skipping ${kanji} after repeated failures.`);
        return null;
      })
    );
    for (const item of results) {
      if (item) dataset.push(item);
    }
    await sleep(100); // small pause to respect API
  }
  return dataset;
};

const main = async () => {
  console.info("📄 Parsing JLPT index...");
  const levelMap = await parseJlptFile();

  const output = {};
  for (const level of TARGET_LEVELS) {
    const characters = levelMap.get(level);
    if (!characters) {
      console.warn(`No data found for JLPT N${level}`);
      continue;
    }
    console.info(`🔎 Fetching ${characters.length} kanji for N${level}...`);
    output[`n${level}`] = await buildDatasetForLevel(characters);
  }

  await writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf8");
  console.info(`✅ Dataset saved to ${OUTPUT_FILE}`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
