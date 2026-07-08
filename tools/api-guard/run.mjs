#!/usr/bin/env node

// Guards the public API surface of @ng-brutalism/ui against accidental
// changes: every entry point's rolled-up .d.ts is diffed against a checked-in
// snapshot in libs/ui/api-guard/. A real API change (new/removed/renamed
// export, changed signature) requires the snapshot to be regenerated
// deliberately (`pnpm api-guard:update`) rather than shipping unnoticed.
// Also asserts package.json's exports map stays a closed allowlist (no
// wildcard entries), so deep imports outside declared subpaths can't creep in.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const distTypesDir = join(repoRoot, 'dist/ui/types');
const snapshotDir = join(repoRoot, 'libs/ui/api-guard');
const packageJsonPath = join(repoRoot, 'dist/ui/package.json');

const entryPoints = [
  { dist: 'ng-brutalism-ui.d.ts', snapshot: 'ng-brutalism-ui.api.d.ts' },
  {
    dist: 'ng-brutalism-ui-tokens.d.ts',
    snapshot: 'ng-brutalism-ui-tokens.api.d.ts',
  },
];

const shouldUpdate = process.argv.includes('--update');
let failed = false;

if (!existsSync(distTypesDir)) {
  console.error(
    `Cannot find ${distTypesDir}. Run "pnpm nx build ui" before the API guard.`
  );
  process.exit(1);
}

for (const { dist, snapshot } of entryPoints) {
  const distPath = join(distTypesDir, dist);
  const snapshotPath = join(snapshotDir, snapshot);
  const current = readFileSync(distPath, 'utf8');

  if (shouldUpdate) {
    writeFileSync(snapshotPath, current);
    console.log(`Updated snapshot: ${snapshot}`);
    continue;
  }

  if (!existsSync(snapshotPath)) {
    console.error(
      `Missing API snapshot ${snapshot}. Run "pnpm api-guard:update" and commit the result.`
    );
    failed = true;
    continue;
  }

  const baseline = readFileSync(snapshotPath, 'utf8');
  if (normalize(current) !== normalize(baseline)) {
    console.error(
      `\nPublic API for "${dist}" changed but its snapshot wasn't updated.\n` +
        `If this change is intentional, run "pnpm api-guard:update" and commit ` +
        `libs/ui/api-guard/${snapshot}.\n`
    );
    printDiff(normalize(baseline), normalize(current));
    failed = true;
  }
}

if (!shouldUpdate) {
  failed = !assertNoWildcardExports(packageJsonPath) || failed;
}

if (failed) {
  process.exit(1);
}

console.log(
  shouldUpdate ? 'API snapshots updated.' : 'API guard passed: no unreviewed public API changes.'
);

// Normalizes a rolled-up .d.ts before diffing: strips JSDoc/block comments and
// blank lines so cosmetic churn from ng-packagr (dropped comments, blank-line
// shifts) can't fail the guard. Real API changes — added/removed/renamed
// exports or changed signatures — survive normalization and still trip it.
function normalize(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .filter((line) => line.trim() !== '')
    .join('\n');
}

function printDiff(baseline, current) {
  const baseLines = baseline.split('\n');
  const currentLines = current.split('\n');
  const max = Math.max(baseLines.length, currentLines.length);

  for (let i = 0; i < max; i++) {
    if (baseLines[i] !== currentLines[i]) {
      if (baseLines[i] !== undefined) console.error(`- ${baseLines[i]}`);
      if (currentLines[i] !== undefined) console.error(`+ ${currentLines[i]}`);
    }
  }
}

function assertNoWildcardExports(pkgPath) {
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const wildcardKeys = Object.keys(pkg.exports ?? {}).filter((key) =>
    key.includes('*')
  );

  if (wildcardKeys.length > 0) {
    console.error(
      `package.json "exports" contains wildcard entries, which would allow deep imports: ${wildcardKeys.join(', ')}`
    );
    return false;
  }

  return true;
}
