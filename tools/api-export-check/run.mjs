#!/usr/bin/env node

// Export-drift guard for the public type surface.
//
// Every public `export type Nb*` declared in the library source must be
// reachable from its package's root entry point, so a type that annotates (or
// documents the accepted values of) a public input can always be imported by
// consumers from `@ng-brutalism/ui` / `@ng-brutalism/ui/tokens`.
//
// This complements api-guard: api-guard snapshots the *built* rolled-up `.d.ts`
// and catches signature changes, but a type that is declared yet never
// re-exported simply never reaches the rollup, so it drifts silently. This
// check runs on *source* (no build needed), and makes "added a type, forgot to
// re-export it at root" a hard failure. It runs as part of `pnpm api-guard`.
//
// Policy for intentionally-internal exports: anything genuinely internal (e.g.
// generic transform helpers, controller/injection-token types) is exempt via
// INTERNAL_ALLOWLIST below, each with a documented reason. Keep that list tiny.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

// Types that are deliberately NOT part of the public API and so are exempt from
// the reachable-from-root requirement. Keep this map small; document each entry.
const INTERNAL_ALLOWLIST = new Map([
  [
    'NbTokenStyleTransform',
    'internal generic helper in core/input-transforms; types the transform ' +
      'factory, never a public input',
  ],
]);

const entryPoints = [
  {
    name: '@ng-brutalism/ui',
    root: 'libs/ui/src/index.ts',
    srcDir: 'libs/ui/src/lib',
  },
  {
    name: '@ng-brutalism/ui/tokens',
    root: 'libs/ui/tokens/src/index.ts',
    srcDir: 'libs/ui/tokens/src/lib',
  },
];

let failed = false;
const declaredEverywhere = new Set();

for (const entry of entryPoints) {
  const declared = collectDeclaredTypes(join(repoRoot, entry.srcDir));
  const reachable = collectReachableNames(join(repoRoot, entry.root));
  for (const name of declared) declaredEverywhere.add(name);

  const unreachable = [...declared]
    .filter((name) => !reachable.has(name) && !INTERNAL_ALLOWLIST.has(name))
    .sort();

  if (unreachable.length > 0) {
    failed = true;
    console.error(
      `\n${entry.name}: ${unreachable.length} public type(s) declared under ` +
        `${entry.srcDir} but not re-exported from ${entry.root}:`
    );
    for (const name of unreachable) console.error(`  - ${name}`);
    console.error(
      `\nExport them from the component barrel + root entry, or (if truly ` +
        `internal) add them to INTERNAL_ALLOWLIST in ` +
        `tools/api-export-check/run.mjs with a reason.\n`
    );
  }
}

// Guard against allowlist rot: an allowlisted name that no longer exists should
// be removed so the list can't quietly hide a real gap later.
for (const name of INTERNAL_ALLOWLIST.keys()) {
  if (!declaredEverywhere.has(name)) {
    failed = true;
    console.error(
      `INTERNAL_ALLOWLIST entry "${name}" is no longer declared anywhere; ` +
        `remove it from tools/api-export-check/run.mjs.`
    );
  }
}

if (failed) process.exit(1);
console.log(
  'Export guard passed: every public Nb* type is reachable from its root entry.'
);

// Collects the names of `export type Nb*` declarations under a source dir.
// Barrels (index.ts) re-export rather than declare, so they are skipped; specs
// are not public. Comments are stripped so commented-out code can't register.
function collectDeclaredTypes(dir) {
  const names = new Set();
  for (const file of walk(dir)) {
    if (!file.endsWith('.ts') || file.endsWith('.spec.ts')) continue;
    if (file.endsWith(`${sep()}index.ts`)) continue;
    const source = stripComments(readFileSync(file, 'utf8'));
    const re = /^export type (Nb[A-Za-z0-9]+)\b/gm;
    let match;
    while ((match = re.exec(source)) !== null) names.add(match[1]);
  }
  return names;
}

// The set of Nb* identifiers named by the root entry file. The root barrel only
// ever re-exports (`export { ... } from`, `export type { ... } from`), so every
// Nb* token it mentions is a name it makes reachable to consumers.
function collectReachableNames(rootFile) {
  const source = stripComments(readFileSync(rootFile, 'utf8'));
  const names = new Set();
  const re = /\bNb[A-Za-z0-9]+\b/g;
  let match;
  while ((match = re.exec(source)) !== null) names.add(match[0]);
  return names;
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

function sep() {
  return join('a', 'b').slice(1, 2);
}
