import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest sick-day excuse: a squirrel has moved into the car engine
// and is now, legally speaking, the registered keeper. The driver is home
// negotiating an eviction. Half believable (squirrels really do nest in
// engines), fresh (no fever, no dog, no dead grandmother), and the laugh
// lands on the last word.
const ENTRY =
  "My car won't start \u2014 a squirrel has moved into the engine and is now, legally speaking, the registered keeper. I'm home negotiating an eviction.";

const MAX_CHARS = 200;
const EXPECTED_CHARS = 144;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function guard(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (chars !== EXPECTED_CHARS) {
    throw new Error(`entry is ${chars} characters, expected ${EXPECTED_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // The joke lands on the last word: the line must end on "eviction."
  if (!text.endsWith("eviction.")) {
    throw new Error("entry must end on the punchline word");
  }
}

guard(ENTRY);

// Create the output directory if missing, but never delete it or its
// siblings: only the known output file is written.
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf-8");
console.log(`wrote ${OUT_FILE} (${[...ENTRY].length} chars)`);
