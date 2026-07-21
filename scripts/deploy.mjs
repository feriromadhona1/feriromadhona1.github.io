import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const allowedBranches = new Set(["master"]);

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
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

requireDependency(
  "node_modules/.bin/gh-pages",
  'Package "gh-pages" belum terpasang. Jalankan "npm install" di branch source sebelum deploy.',
);

console.log(`Deploying branch "${branch}" ke branch "gh-pages"...`);

run("npm", ["run", "build"]);

mkdirSync("out", { recursive: true });
writeFileSync("out/.nojekyll", "");

run("npx", ["gh-pages", "-d", "out", "-b", "gh-pages"]);
