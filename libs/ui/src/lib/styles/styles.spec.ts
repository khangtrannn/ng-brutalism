import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

import { describe, expect, it } from 'vitest';

const libDir = [
  join(process.cwd(), 'libs/ui/src/lib'),
  join(process.cwd(), 'src/lib'),
].find((candidate) => existsSync(join(candidate, 'styles/styles.css')));

if (!libDir) {
  throw new Error(`Could not locate libs/ui/src/lib from ${process.cwd()}`);
}

const stylesDir = join(libDir, 'styles');
const stylesCss = readFileSync(join(stylesDir, 'styles.css'), 'utf8');

const componentCss = readdirSync(libDir, { recursive: true })
  .map(String)
  .map((path) => path.split(sep).join('/'))
  .filter((path) => path.endsWith('.css'))
  .filter((path) => !path.startsWith('styles/') && !path.includes('node_modules/'));

const localImports = [...stylesCss.matchAll(/@import\s+'(\.\.\/[^']+\.css)'/g)].map(
  (match) => match[1]
);

type CssExport = string | { style?: string; default?: string };
const packageJson = JSON.parse(
  readFileSync(join(libDir, '..', '..', 'package.json'), 'utf8')
) as { exports?: Record<string, CssExport> };
const cssExports = packageJson.exports ?? {};
const exportTarget = (entry: CssExport | undefined): string | undefined =>
  typeof entry === 'string' ? entry : entry?.style ?? entry?.default;

describe('styles.css component registry', () => {
  it('imports every component stylesheet', () => {
    const missing = componentCss.filter(
      (path) => !stylesCss.includes(`'../${path}'`)
    );

    expect(missing, `component CSS not imported in styles.css: ${missing.join(', ')}`).toEqual([]);
  });

  it('has no dangling @import pointing at a missing file', () => {
    const dangling = localImports.filter((path) => !existsSync(join(stylesDir, path)));

    expect(dangling, `styles.css imports missing files: ${dangling.join(', ')}`).toEqual([]);
  });
});

describe('package.json css subpath exports', () => {
  it('exposes a subpath export for every component stylesheet', () => {
    const missing = componentCss.filter((path) => {
      const file = path.split('/').pop() as string;
      const key = `./${file.replace(/^nb-/, '')}`;
      return exportTarget(cssExports[key]) !== `./${path}`;
    });

    expect(
      missing,
      `component CSS missing a matching exports entry in package.json: ${missing.join(', ')}`
    ).toEqual([]);
  });

  it('has no css export pointing at a missing file', () => {
    const dangling = Object.entries(cssExports)
      .filter(([key]) => key.endsWith('.css'))
      .filter(([, entry]) => {
        const target = exportTarget(entry);
        return !target || !existsSync(join(libDir, target.replace(/^\.\//, '')));
      })
      .map(([key]) => key);

    expect(
      dangling,
      `package.json exports point at missing files: ${dangling.join(', ')}`
    ).toEqual([]);
  });
});
