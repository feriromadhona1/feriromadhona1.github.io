import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const allowedBranches = new Set(["master"]);
const sourceBranch = "master";

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

function getGitStatus() {
  return execFileSync("git", ["status", "--porcelain"], {
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
    `Deploy diblok dari branch "${branch}". Pindah ke branch "${sourceBranch}" untuk menjalankan deploy.`,
  );
  process.exit(1);
}

requireDependency(
  "node_modules/.bin/next",
  'Dependency belum terpasang. Jalankan "npm install" di branch source sebelum deploy.',
);

const gitStatus = getGitStatus();

if (gitStatus) {
  console.error(
    "Working tree belum bersih. Commit atau stash perubahan dulu sebelum deploy.",
  );
  process.exit(1);
}

console.log(`Building branch "${branch}" lalu push ke origin/${sourceBranch}...`);

run("npm", ["run", "build"]);
run("git", ["fetch", "origin"]);
run("git", ["pull", "--rebase", "origin", sourceBranch]);
run("git", ["push", "origin", `${sourceBranch}:${sourceBranch}`]);
