// One-Liner Laughs — entry program.
// Writes one funny line (1-200 chars) to /output/entry.txt.
// The joke turns twice: the printer prints a boarding pass in Wingdings,
// the narrator becomes fluent in Wingdings, and the flight was yesterday.
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const LIMIT = 200;

async function main(): Promise<void> {
  const setup = "The printer printed my boarding pass in Wingdings.";
  const turn = "I am now fluent in Wingdings.";
  const punch = "The flight was yesterday.";
  const line = [setup, turn, punch].join(" ");
  const n = [...line].length;
  if (n < 1 || n > LIMIT) {
    throw new Error(`joke fails the 1-${LIMIT} character gate (${n})`);
  }
  if (/\n/.test(line)) {
    throw new Error("joke must be a single line");
  }
  // It must be a one-line joke with a surprise turn: Wingdings fluency.
  if (!/I am now fluent in Wingdings\./.test(line)) {
    throw new Error("joke must carry the Wingdings turn");
  }
  // The final turn lands last: the flight was yesterday.
  if (!/The flight was yesterday\.$/.test(line)) {
    throw new Error("joke must end on the missed flight");
  }
  // Three sentences, each one turn: setup, fluency, missed flight.
  const sentences = line.split(/(?<=\.)\s+/);
  if (sentences.length !== 3 || !/Wingdings\.$/.test(sentences[1])) {
    throw new Error("joke must be setup plus fluency plus missed flight");
  }
  const dir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  await mkdir(dir, { recursive: true });
  const target = resolve(dir, "entry.txt");
  await writeFile(target, new TextEncoder().encode(line));
  console.log(`wrote ${n} chars to ${target}`);
}

await main();
