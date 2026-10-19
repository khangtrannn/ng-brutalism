#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The Angular major to scaffold the consumer app with (matches the library's
// supported peer range, e.g. --ng=22). Always fetched via npx rather than the
// workspace's own pinned CLI, so the consumer app stays independent of whatever
// Angular major this workspace itself happens to be on.
const ngMajorArg = process.argv.find((arg) => arg.startsWith('--ng='));
const ngMajor = ngMajorArg?.slice('--ng='.length);

if (!ngMajor) {
  console.error(
    'Usage: node tools/package-smoke/run.mjs --ng=<major> (e.g. --ng=21 or --ng=22)'
  );
  process.exit(1);
}

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const env = { ...process.env, NG_CLI_ANALYTICS: 'false' };

let packOutDir;
let appDir;

try {
  run('pnpm', ['nx', 'build', 'ui'], repoRoot);

  const distDir = join(repoRoot, 'dist/ui');
  assertSchematicsAssembled(distDir);
  packOutDir = mkdtempSync(join(tmpdir(), 'ngb-pack-'));
  run('npm', ['pack', '--pack-destination', packOutDir], distDir);

  const tarballName = readdirSync(packOutDir).find((file) =>
    file.endsWith('.tgz')
  );
  if (!tarballName) {
    throw new Error('npm pack did not produce a .tgz file.');
  }
  const tarballPath = join(packOutDir, tarballName);

  appDir = mkdtempSync(join(tmpdir(), 'ngb-smoke-'));
  run(
    'npx',
    [
      '--yes', `@angular/cli@${ngMajor}`,
      'new',
      'smoke-app',
      '--directory', '.',
      '--package-manager', 'npm',
      '--style', 'css',
      '--routing', 'false',
      '--ssr', 'false',
      '--skip-tests',
      '--skip-git',
    ],
    appDir,
    env
  );

  writeSmokeComponent(appDir);

  run(
    'npx',
    ['--no-install', 'ng', 'add', tarballPath, '--skip-confirmation'],
    appDir,
    env
  );

  run('npx', ['--no-install', 'ng', 'build'], appDir, env);

  console.log(
    `\nPackage smoke test passed for Angular ${ngMajor}: build, npm pack, ng add, and ng build all succeeded.`
  );
} finally {
  if (appDir) rmSync(appDir, { recursive: true, force: true });
  if (packOutDir) rmSync(packOutDir, { recursive: true, force: true });
}

function writeSmokeComponent(dir) {
  rmSync(join(dir, 'src/app/app.html'), { force: true });
  mkdirSync(join(dir, 'src/app'), { recursive: true });
  writeFileSync(
    join(dir, 'src/app/app.ts'),
    `import { Component } from '@angular/core';
import { NbButton } from '@ng-brutalism/ui';

@Component({
  selector: 'app-root',
  imports: [NbButton],
  template: '<button nbButton>Smoke test</button>',
})
export class App {}
`
  );
}

function assertSchematicsAssembled(distDir) {
  const collectionPath = join(distDir, 'schematics/collection.json');
  const collection = JSON.parse(readFileSync(collectionPath, 'utf8'));
  const require = createRequire(import.meta.url);

  for (const [name, schematic] of Object.entries(collection.schematics ?? {})) {
    const factoryPath = require.resolve(
      join(dirname(collectionPath), schematic.factory)
    );
    const factoryModule = require(factoryPath);
    const factory = factoryModule.default ?? factoryModule;

    if (typeof factory !== 'function') {
      throw new Error(
        `Schematic "${name}" factory at ${factoryPath} did not export a function.`
      );
    }
  }

  console.log(
    `Schematics assembly verified: collection.json + factories resolve for [${Object.keys(collection.schematics ?? {}).join(', ')}].`
  );
}

function run(command, args, cwd, extraEnv) {
  console.log(`\n$ ${command} ${args.join(' ')}  (cwd: ${cwd})`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: extraEnv ?? process.env,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status}): ${command} ${args.join(' ')}`);
  }
}
