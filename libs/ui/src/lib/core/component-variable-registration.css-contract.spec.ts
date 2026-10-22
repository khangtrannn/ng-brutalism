import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

// Every public `--nb-<component>-*` variable a component stylesheet reads must
// be registered with `@property`, stating whether it stays on the element
// (`inherits: false`) or flows to descendants (`inherits: true`).
const lib = fileURLToPath(new URL('..', import.meta.url));

// Theme tokens that share a component's name prefix.
const THEME_TOKENS = new Set(['--nb-surface-foreground']);

const components = readdirSync(lib, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .map((name) => ({
    name,
    css: readdirSync(join(lib, name))
      .filter((file) => file.startsWith('nb-') && file.endsWith('.css'))
      .map((file) => readFileSync(join(lib, name, file), 'utf8'))
      .join('\n'),
  }))
  .filter(({ css }) => css.length > 0);

describe('component variable registration', () => {
  it.each(components.map(({ name, css }) => [name, css] as const))(
    '%s registers every public variable it reads',
    (name, css) => {
      const prefix = `--nb-${name}-`;
      const read = [...css.matchAll(/var\(\s*(--nb-[a-z0-9-]+)/g)]
        .map(([, variable]) => variable)
        .filter((variable) => variable.startsWith(prefix) && !THEME_TOKENS.has(variable));
      const registered = new Map(
        [...css.matchAll(/@property (--nb-[a-z0-9-]+) \{[^}]*inherits: (true|false);/g)].map(
          ([, variable, inherits]) => [variable, inherits]
        )
      );

      const unregistered = [...new Set(read)].filter((variable) => !registered.has(variable));

      expect(unregistered).toEqual([]);
    }
  );
});
