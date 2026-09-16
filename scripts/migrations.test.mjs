import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

test("migrations are numbered SQL files in apply order", async () => {
  const dir = join(dirname(fileURLToPath(import.meta.url)), "../migrations");
  const files = (await readdir(dir)).filter((name) => name.endsWith(".sql")).sort();
  assert.deepEqual(files, [
    "0001_auth.sql",
    "0002_portfolio.sql",
    "0003_studio_lock.sql",
  ]);
});
