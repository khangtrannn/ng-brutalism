import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

import { describe, expect, it } from 'vitest';

// styles.css hand-maintains one `@import` per component stylesheet. A missing
// entry ships a component with zero styles and no build/test error, so this
// spec asserts the registry stays in sync with the files on disk in both
// directions.
// `import.meta.url` isn't a real file: URL under the Analog transform, so
// anchor on cwd: nx runs from the workspace root, vitest from the project root.
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
