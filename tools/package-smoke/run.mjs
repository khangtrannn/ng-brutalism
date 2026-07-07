#!/usr/bin/env node

// Proves the published @ng-brutalism/ui artifact actually installs and works:
// build -> npm pack -> `ng new` a throwaway app -> `ng add` the tarball ->
// `ng build` against it. Catches exports-map/sideEffects/schematics
// regressions that unit tests can't see, since those only run against source.

import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const ngBin = join(repoRoot, 'node_modules/.bin/ng');
const env = { ...process.env, NG_CLI_ANALYTICS: 'false' };

let packOutDir;
let appDir;

try {
  run('pnpm', ['nx', 'build', 'ui'], repoRoot);

  const distDir = join(repoRoot, 'dist/ui');
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
    ngBin,
    [
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
    '\nPackage smoke test passed: build, npm pack, ng add, and ng build all succeeded.'
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
