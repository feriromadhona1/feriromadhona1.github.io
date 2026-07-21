import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const allowedBranches = new Set(["master"]);
const pagesRepo = "https://github.com/feriromadhona1/feriromadhona1.github.io.git";
const pagesBranch = "master";

function run(command, args, cwd) {
  execFileSync(command, args, {
    stdio: "inherit",
    ...(cwd ? { cwd } : {}),
  });
}

function getCurrentBranch() {
  return execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    encoding: "utf8",
  }).trim();
}

function requireDependency(binaryPath, installHint) {
  if (!existsSync(binaryPath)) {
    console.error(installHint);
    process.exit(1);
  }
}

const branch = getCurrentBranch();

if (!allowedBranches.has(branch)) {
  console.error(
    `Deploy diblok dari branch "${branch}". Pindah ke branch "master" untuk publish ke "gh-pages".`,
  );
  process.exit(1);
}

requireDependency(
  "node_modules/.bin/next",
  'Dependency belum terpasang. Jalankan "npm install" di branch source sebelum deploy.',
);

console.log(
  `Deploying branch "${branch}" ke ${pagesRepo} (${pagesBranch})...`,
);

run("npm", ["run", "build"]);

mkdirSync("out", { recursive: true });
writeFileSync("out/.nojekyll", "");

const publishDir = mkdtempSync(join(tmpdir(), "feri-pages-"));

try {
  cpSync("out", publishDir, { recursive: true });
  run("git", ["init"], publishDir);
  run("git", ["checkout", "-B", pagesBranch], publishDir);
  run("git", ["add", "."], publishDir);
  run("git", ["commit", "-m", "Deploy site"], publishDir);
  run("git", ["remote", "add", "origin", pagesRepo], publishDir);
  run("git", ["push", "--force", "origin", `${pagesBranch}:${pagesBranch}`], publishDir);
} finally {
  rmSync(publishDir, { recursive: true, force: true });
}
