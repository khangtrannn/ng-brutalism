import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import postcss, { type AtRule, type Node, type Rule } from 'postcss';
import { describe, expect, it } from 'vitest';

// Enforces the four-block stylesheet contract from
// docs/architecture/token-customization.md §5. Components move into MIGRATED
// as they adopt it (§13 steps 3–4); the rest keep the legacy registration rule
// until the list covers every component, then the legacy branch is deleted.
const MIGRATED = new Set<string>(['button']);

const lib = [
  join(process.cwd(), 'libs/ui/src/lib'),
  join(process.cwd(), 'src/lib'),
].find((candidate) => existsSync(join(candidate, 'styles/styles.css')));

if (!lib) {
  throw new Error(`Could not locate libs/ui/src/lib from ${process.cwd()}`);
}

const stylesDir = join(lib, 'styles');

const TONE_SLOTS = new Set([
  '--nb-tone-bg',
  '--nb-tone-fg',
  '--nb-tone-border',
]);

// Roles, primitives and tone presets: every custom property the theme files declare.
const THEME_TOKENS = new Set(
  readdirSync(stylesDir)
    .filter((file) => file.startsWith('theme') && file.endsWith('.css'))
    .flatMap((file) => [
      ...readFileSync(join(stylesDir, file), 'utf8').matchAll(
        /(--nb-[a-z0-9-]+)\s*:/g,
      ),
    ])
    .map(([, name]) => name)
    // Optional depth roles, unset by default (§14.6).
    .concat(['--nb-shadow-box', '--nb-shadow-field', '--nb-shadow-control', '--nb-shadow-pill']),
);

const BLOCKS = ['Tokens', 'Variants', 'Anatomy', 'States'] as const;
type Block = (typeof BLOCKS)[number];

const STATE_MARKER =
  /:(hover|focus|focus-visible|focus-within|active|disabled|enabled|checked|indeterminate|invalid|valid|user-invalid|placeholder-shown|read-only|open|popover-open|target)\b|\[(aria-|data-state|open\]|disabled\])/;
const COLOR_LITERAL =
  /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|oklch|oklab|lab|lch|color)\(/i;
const DIMENSION_LITERAL =
  /(?<![\w-])-?(\d*\.)?\d+(px|rem|em|vh|vw|vmin|vmax|ch|ex|ms|s|deg|turn)\b/g;

const varsIn = (value: string) =>
  [...value.matchAll(/var\(\s*(--nb-[a-z0-9-]+)/g)].map(([, name]) => name);

const insideHoverMedia = (rule: Rule) => {
  for (let node: Node | undefined = rule.parent; node; node = node.parent) {
    if (node.type === 'atrule' && (node as AtRule).name === 'media') {
      if (/\(\s*hover\s*:\s*hover\s*\)/.test((node as AtRule).params))
        return true;
    }
  }
  return false;
};

const insideKeyframes = (rule: Rule) => {
  for (let node: Node | undefined = rule.parent; node; node = node.parent) {
    if (node.type === 'atrule' && /keyframes$/.test((node as AtRule).name))
      return true;
  }
  return false;
};

/** Returns one message per violation of the §5 contract; empty when the sheet complies. */
function checkStylesheet(css: string, name: string): string[] {
  const errors: string[] = [];
  const root = `[data-nb-${name}]`;
  const prefix = `--nb-${name}-`;
  const isOwn = (token: string) =>
    token.startsWith(prefix) && !THEME_TOKENS.has(token);
  const tokensSelector = `:where(${root})`;
  const variantPart = `${root.replace(/[[\]]/g, '\\$&')}(\\[[^\\]]+\\])+`;
  const variantSelector = new RegExp(
    `^:where\\(${variantPart}(\\s*,\\s*${variantPart})*\\)$`,
  );

  const ast = postcss.parse(css);
  const declared = new Set<string>();
  let current = -1;

  ast.walkAtRules((atRule) => {
    if (atRule.name === 'property')
      errors.push(`@property ${atRule.params}: only tone slots are registered`);
  });

  ast.each((node) => {
    if (node.type === 'comment') return;
    if (
      node.type === 'atrule' &&
      ((node.name === 'layer' && node.params === 'components') ||
        /keyframes$/.test(node.name))
    )
      return;
    errors.push(
      `top-level ${node.toString().split('{')[0].trim()}: everything goes inside @layer components`,
    );
  });

  ast.walkRules((rule) => {
    if (insideKeyframes(rule)) return;
    const selector = rule.selector.replace(/\s+/g, ' ').trim();
    const decls = rule.nodes.filter((node) => node.type === 'decl');
    if (decls.length === 0) return;

    if (!selector.startsWith(':where('))
      errors.push(`${selector}: wrap the selector in :where()`);

    const custom = decls.filter((decl) => decl.prop.startsWith('--'));
    if (custom.length > 0 && custom.length < decls.length) {
      errors.push(`${selector}: mixes token and property declarations`);
      return;
    }

    let block: Block;
    if (custom.length > 0) {
      if (selector === tokensSelector) block = 'Tokens';
      else if (variantSelector.test(selector) && !STATE_MARKER.test(selector))
        block = 'Variants';
      else {
        errors.push(
          `${selector}: tokens are declared only on the root, and states never reassign them`,
        );
        return;
      }
    } else {
      block = STATE_MARKER.test(selector) ? 'States' : 'Anatomy';
    }

    const index = BLOCKS.indexOf(block);
    if (index < current)
      errors.push(`${selector}: ${block} block after ${BLOCKS[current]}`);
    current = Math.max(current, index);

    if (selector.includes(':hover') && !insideHoverMedia(rule)) {
      errors.push(`${selector}: gate hover behind @media (hover: hover)`);
    }

    for (const decl of decls) {
      const where = `${selector} { ${decl.prop} }`;
      const reads = varsIn(decl.value);

      if (block === 'Tokens' || block === 'Variants') {
        if (!isOwn(decl.prop))
          errors.push(`${where}: declares a token outside ${prefix}*`);
        if (block === 'Tokens') declared.add(decl.prop);
        else if (!declared.has(decl.prop))
          errors.push(`${where}: variant reassigns an undeclared token`);
        for (const token of reads) {
          if (!THEME_TOKENS.has(token) && !declared.has(token)) {
            errors.push(
              `${where}: reads ${token}, which is neither a role nor an own token`,
            );
          }
        }
        continue;
      }

      for (const token of reads) {
        if (TONE_SLOTS.has(token)) continue;
        if (!isOwn(token))
          errors.push(
            `${where}: reads ${token}; read own tokens or tone slots only`,
          );
        else if (!declared.has(token))
          errors.push(`${where}: reads ${token}, not declared in Tokens`);
      }
      if (/var\(\s*--nb-tone-(bg|fg|border)\s*\)/.test(decl.value)) {
        errors.push(`${where}: a tone slot needs an own-token fallback`);
      }
      if (
        new RegExp(
          `var\\(\\s*${prefix}[a-z0-9-]+\\s*,\\s*var\\(\\s*--nb-tone-`,
        ).test(decl.value)
      ) {
        errors.push(
          `${where}: read tone first: var(--nb-tone-*, var(${prefix}*))`,
        );
      }
      const literal = decl.value.replace(/var\([^()]*\)/g, '');
      if (
        COLOR_LITERAL.test(literal) ||
        [...literal.matchAll(DIMENSION_LITERAL)].some(
          ([n]) => parseFloat(n) !== 0,
        )
      ) {
        errors.push(`${where}: literal value; move it into a token`);
      }
    }
  });

  return errors;
}

const components = readdirSync(lib, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .map((dir) => ({
    dir,
    sheets: readdirSync(join(lib, dir))
      .filter((file) => file.startsWith('nb-') && file.endsWith('.css'))
      .map((file) => ({
        name: file.slice('nb-'.length, -'.css'.length),
        css: readFileSync(join(lib, dir, file), 'utf8'),
      })),
  }))
  .filter(({ sheets }) => sheets.length > 0);

const unknown = [...MIGRATED].filter(
  (dir) => !components.some((c) => c.dir === dir),
);

describe('stylesheet contract', () => {
  it('lists only existing component folders as migrated', () => {
    expect(unknown).toEqual([]);
  });

  const migrated = components.filter(({ dir }) => MIGRATED.has(dir));
  if (migrated.length > 0) {
    it.each(
      migrated.flatMap(({ sheets }) =>
        sheets.map(({ name, css }) => [name, css] as const),
      ),
    )('nb-%s.css follows the four-block contract', (name, css) => {
      expect(checkStylesheet(css, name)).toEqual([]);
    });
  }

  // Legacy rule: every public `--nb-<component>-*` variable a stylesheet reads
  // is registered with `@property`. Removed once MIGRATED covers every component.
  const legacy = components.filter(({ dir }) => !MIGRATED.has(dir));
  it.each(
    legacy.map(
      ({ dir, sheets }) =>
        [dir, sheets.map(({ css }) => css).join('\n')] as const,
    ),
  )(
    '%s (not migrated) registers every public variable it reads',
    (dir, css) => {
      const prefix = `--nb-${dir}-`;
      const read = varsIn(css).filter(
        (token) => token.startsWith(prefix) && !THEME_TOKENS.has(token),
      );
      const registered = new Set(
        [
          ...css.matchAll(
            /@property (--nb-[a-z0-9-]+) \{[^}]*inherits: (true|false);/g,
          ),
        ].map(([, token]) => token),
      );

      expect(
        [...new Set(read)].filter((token) => !registered.has(token)),
      ).toEqual([]);
    },
  );
});

describe('checkStylesheet', () => {
  // The Button example from token-customization.md §5.
  const valid = `
    @layer components {
      :where([data-nb-button]) {
        --nb-button-bg: var(--nb-primary);
        --nb-button-fg: var(--nb-primary-foreground);
        --nb-button-border-color: var(--nb-border);
        --nb-button-border-width: var(--nb-border-width);
        --nb-button-radius: var(--nb-radius-control);
        --nb-button-shadow: var(--nb-shadow-control, var(--nb-shadow-control-offset) var(--nb-shadow-control-offset) 0 0 var(--nb-shadow));
        --nb-button-height: 2.75rem;
        --nb-button-padding-x: 1rem;
        --nb-button-font-size: 1rem;
        --nb-button-hover-translate: var(--nb-shadow-control-offset) var(--nb-shadow-control-offset);
        --nb-button-hover-shadow: none;
        --nb-button-disabled-opacity: 0.5;
      }
      :where([data-nb-button][data-size='sm']) {
        --nb-button-height: 2.25rem;
        --nb-button-padding-x: 0.75rem;
        --nb-button-font-size: 0.875rem;
      }
      :where([data-nb-button]) {
        height: var(--nb-button-height);
        padding-inline: var(--nb-button-padding-x);
        font-size: var(--nb-button-font-size);
        background: var(--nb-tone-bg, var(--nb-button-bg));
        color: var(--nb-tone-fg, var(--nb-button-fg));
        border: var(--nb-button-border-width) solid var(--nb-tone-border, var(--nb-button-border-color));
        border-radius: var(--nb-button-radius);
        box-shadow: var(--nb-button-shadow);
      }
      @media (hover: hover) {
        :where([data-nb-button][data-press='push']):hover {
          translate: var(--nb-button-hover-translate);
          box-shadow: var(--nb-button-hover-shadow);
        }
      }
      :where([data-nb-button]:disabled, [data-nb-button][aria-disabled='true']) {
        opacity: var(--nb-button-disabled-opacity);
      }
    }
  `;

  const check = (css: string) =>
    checkStylesheet(`@layer components { ${css} }`, 'x');
  const tokens =
    ':where([data-nb-x]) { --nb-x-bg: var(--nb-surface); --nb-x-hover-bg: var(--nb-primary); }';

  it('accepts the §5 Button example', () => {
    expect(checkStylesheet(valid, 'button')).toEqual([]);
  });

  it.each([
    [
      '@property registration',
      `@property --nb-x-bg { syntax: "*"; inherits: false; } ${tokens}`,
      /only tone slots/,
    ],
    [
      'unwrapped selector',
      `${tokens} [data-nb-x] { background: var(--nb-x-bg); }`,
      /:where\(\)/,
    ],
    [
      'blocks out of order',
      `${tokens} :where([data-nb-x]) { background: var(--nb-x-bg); } :where([data-nb-x][data-size='sm']) { --nb-x-bg: red; }`,
      /Variants block after Anatomy/,
    ],
    [
      'tokens on a part',
      `:where([data-nb-x] > span) { --nb-x-bg: red; }`,
      /declared only on the root/,
    ],
    [
      'state reassigning a token',
      `${tokens} :where([data-nb-x]:focus-visible) { --nb-x-bg: red; }`,
      /states never reassign/,
    ],
    [
      'mixed declarations',
      `:where([data-nb-x]) { --nb-x-bg: red; color: red; }`,
      /mixes/,
    ],
    [
      'foreign token declared',
      `:where([data-nb-x]) { --nb-card-bg: red; }`,
      /outside --nb-x-\*/,
    ],
    [
      'variant of an undeclared token',
      `${tokens} :where([data-nb-x][data-size='sm']) { --nb-x-height: 1rem; }`,
      /undeclared token/,
    ],
    [
      'anatomy reads a role',
      `${tokens} :where([data-nb-x]) { color: var(--nb-primary); }`,
      /own tokens or tone slots/,
    ],
    [
      'anatomy reads another component',
      `${tokens} :where([data-nb-x]) { color: var(--nb-card-fg); }`,
      /own tokens or tone slots/,
    ],
    [
      'undeclared own token',
      `${tokens} :where([data-nb-x]) { color: var(--nb-x-fg); }`,
      /not declared in Tokens/,
    ],
    [
      'tone without fallback',
      `${tokens} :where([data-nb-x]) { background: var(--nb-tone-bg); }`,
      /own-token fallback/,
    ],
    [
      'token before tone',
      `${tokens} :where([data-nb-x]) { background: var(--nb-x-bg, var(--nb-tone-bg)); }`,
      /read tone first/,
    ],
    [
      'color literal',
      `${tokens} :where([data-nb-x]) { color: #000; }`,
      /literal/,
    ],
    [
      'length literal',
      `${tokens} :where([data-nb-x]) { padding: 4px; }`,
      /literal/,
    ],
    [
      'ungated hover',
      `${tokens} :where([data-nb-x]):hover { background: var(--nb-x-hover-bg); }`,
      /@media \(hover: hover\)/,
    ],
  ])('rejects %s', (_, css, message) => {
    const errors = check(css);
    expect(
      errors.some((error) => message.test(error)),
      errors.join('\n'),
    ).toBe(true);
  });

  it('allows keywords, zero and structural values in Anatomy', () => {
    expect(
      check(
        `${tokens} :where([data-nb-x]) { display: flex; margin: 0; width: 100%; background: var(--nb-tone-bg, var(--nb-x-bg)); }`,
      ),
    ).toEqual([]);
  });

  it('rejects top-level rules outside @layer components', () => {
    expect(checkStylesheet(tokens, 'x')).toContainEqual(
      expect.stringMatching(/inside @layer components/),
    );
  });
});
