#!/usr/bin/env node

// Guards the declared peer floor (`^22.0.0`, ADR 0003) against APIs that require a newer
// Angular. Angular's partial compiler stamps every ɵɵngDeclare* call with a `minVersion` —
// the oldest Angular version whose linker can understand the emitted format. If that
// climbs above 22.0.0, an Angular 22.0.x consumer's linker would fail on this package,
// silently breaking the peer range. Fails the gate if any minVersion found in the built
// fesm2022 bundles is > 22.0.0.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const fesmDir = join(repoRoot, 'dist/ui/fesm2022');
const maxAllowed = [22, 0, 0];

const files = readdirSync(fesmDir).filter((file) => file.endsWith('.mjs'));

if (files.length === 0) {
  console.error(
    `No .mjs files found in ${fesmDir}. Run "pnpm nx build ui" before the minVersion check.`
  );
  process.exit(1);
}

let failed = false;

for (const file of files) {
  const source = readFileSync(join(fesmDir, file), 'utf8');
  const matches = source.matchAll(/minVersion:\s*"([^"]+)"/g);

  for (const [, version] of matches) {
    if (compareVersions(parseVersion(version), maxAllowed) > 0) {
      console.error(
        `${file}: found minVersion "${version}" (> 22.0.0). This means an API newer than ` +
          `the declared peer floor was compiled in, which breaks the ^22.0.0 peer range. ` +
          `Remove that usage or raise the peer floor before publishing.`
      );
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  'minVersion check passed: nothing above the ^22.0.0 peer floor in dist/ui/fesm2022.'
);

function parseVersion(version) {
  return version.split('.').map(Number);
}

function compareVersions(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}
