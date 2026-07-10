#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../../..');
const libSrcRoot = path.resolve(workspaceRoot, 'libs/ui/src/lib');
const themeCssPath = path.resolve(libSrcRoot, 'styles/theme.css');
const outputPath = path.resolve(__dirname, '../src/app/docs/docs-tokens.generated.ts');

const NON_COMPONENT_DIRS = new Set(['core', 'styles', 'tokens', 'typography']);

const SHARED_TOKEN_NAMES = [
  '--nb-border',
  '--nb-shadow',
  '--nb-radius',
  '--nb-shadow-offset-x',
  '--nb-shadow-offset-y',
  '--nb-foreground',
  '--nb-background',
];

const THEME_OVERRIDES = {
  '--nb-border': 'Border color and focus ring color',
  '--nb-shadow': 'Offset shadow color',
  '--nb-radius': 'Corner radius through the rounded-nb utility',
  '--nb-shadow-offset-x': 'Horizontal shadow and press offset',
  '--nb-shadow-offset-y': 'Vertical shadow and press offset',
  '--nb-foreground': 'Default foreground text color',
  '--nb-background': 'Default surface background color',
  '--nb-field-bg': 'Shared field background',
  '--nb-primary': 'Primary accent color',
  '--nb-primary-foreground': 'Text on primary surfaces',
  '--nb-secondary': 'Secondary accent color',
  '--nb-secondary-foreground': 'Text on secondary surfaces',
  '--nb-accent': 'Accent color',
  '--nb-accent-foreground': 'Text on accent surfaces',
  '--nb-danger': 'Danger states',
  '--nb-danger-foreground': 'Text on danger surfaces',
  '--nb-success': 'Success states',
  '--nb-success-foreground': 'Text on success surfaces',
  '--nb-warning': 'Warning states',
  '--nb-warning-foreground': 'Text on warning surfaces',
  '--nb-main': 'Strong component fills',
  '--nb-main-foreground': 'Text on main fills',
  '--nb-surface': 'Component surface background',
  '--nb-surface-foreground': 'Text on component surfaces',
  '--nb-secondary-background': 'Subtle secondary backgrounds',
  '--nb-border-width': 'Border width token available to consumers',
  '--nb-reverse-shadow-offset-x': 'Reverse shadow horizontal offset',
  '--nb-reverse-shadow-offset-y': 'Reverse shadow vertical offset',
  '--nb-motion-fast': 'Duration for interactive hover/press transitions',
  '--nb-motion-base':
    'Duration for structural transitions (e.g. accordion expand/collapse)',
  '--nb-motion-pulse':
    'Cycle duration for pulsing indicators (e.g. status-dot live state); zeroed under prefers-reduced-motion',
  '--nb-ease': 'Shared easing curve for component transitions',
  '--nb-font-sans': 'Default body font',
  '--nb-font-mono': 'Monospace font token',
  '--nb-font-weight-normal': 'Default body font weight',
  '--nb-font-weight-bold': 'Bold component font weight',
  '--nb-focus-ring': 'Focus outline utility',
  '--nb-focus-ring-offset': 'Focus outline offset',
};

const PROPERTY_PHRASES = {
  background: 'Background color',
  'background-color': 'Background color',
  color: 'Text color',
  'border-color': 'Border color',
  'border-top-color': 'Border color',
  'border-left-color': 'Border color',
  'border-inline-start-color': 'Border color',
  'border-inline-end-color': 'Border color',
  'border-width': 'Border width',
  'border-top-width': 'Border width',
  'border-left-width': 'Border width',
  'border-right-width': 'Border width',
  'border-bottom-width': 'Border width',
  'border-inline-width': 'Border width',
  'border-inline-end-width': 'Border width',
  'border-block-width': 'Border width',
  border: 'Border',
  'border-radius': 'Corner radius',
  'box-shadow': 'Box shadow',
  'font-size': 'Font size',
  'font-weight': 'Font weight',
  'font-family': 'Font family',
  'line-height': 'Line height',
  'letter-spacing': 'Letter spacing',
  'text-transform': 'Text transform',
  width: 'Size',
  height: 'Size',
  'min-width': 'Minimum size',
  'max-width': 'Maximum size',
  'min-height': 'Minimum size',
  'max-height': 'Maximum size',
  'inline-size': 'Size',
  'block-size': 'Size',
  'min-block-size': 'Minimum size',
  gap: 'Gap between items',
  padding: 'Padding',
  'padding-top': 'Padding',
  'padding-inline': 'Padding',
  'padding-block': 'Padding',
  'margin-top': 'Spacing',
  opacity: 'Opacity',
  outline: 'Focus outline',
  'outline-offset': 'Focus outline offset',
  stroke: 'Stroke color',
  'stroke-width': 'Stroke width',
  fill: 'Fill color',
  'animation-duration': 'Animation duration',
  'grid-template-columns': 'Column layout',
  translate: 'Shadow / press offset',
};

const SUFFIX_PSEUDO_PROPERTY = [
  ['-border-color', 'border-color'],
  ['-border-width', 'border-width'],
  ['-min-height', 'min-height'],
  ['-max-height', 'max-height'],
  ['-min-width', 'min-width'],
  ['-max-width', 'max-width'],
  ['-radius', 'border-radius'],
  ['-shadow', 'box-shadow'],
  ['-bg', 'background'],
  ['-fg', 'color'],
  ['-border', 'border-color'],
  ['-color', 'color'],
  ['-weight', 'font-weight'],
  ['-tracking', 'letter-spacing'],
  ['-duration', 'animation-duration'],
  ['-gap', 'gap'],
  ['-padding', 'padding'],
  ['-size', 'width'],
  ['-width', 'width'],
  ['-height', 'width'],
];

// Minimum public CSS-var hook contract (design-props.md §4). Surface/box and
// interactive archetypes must expose the color-surface hook set so a consumer
// can retheme them from CSS without an ergonomic input. Anatomy hooks (size
// presets, min-height, padding) are deliberately Tier 2 and NOT part of this
// contract — which is why button height / status-dot width stay hardcoded.
// Documented partials (checkbox, input-group) list only the hooks they
// intentionally expose; keep this map and the §4 table in sync.
const SURFACE_HOOKS = [
  'bg',
  'fg',
  'border-color',
  'border-width',
  'radius',
  'shadow',
];

const HOOK_CONTRACT = {
  button: contractHooks('button', SURFACE_HOOKS),
  card: contractHooks('card', SURFACE_HOOKS),
  surface: contractHooks('surface', SURFACE_HOOKS),
  callout: contractHooks('callout', SURFACE_HOOKS),
  'media-frame': contractHooks('media-frame', SURFACE_HOOKS),
  'image-card': contractHooks('image-card', SURFACE_HOOKS),
  dialog: contractHooks('dialog', SURFACE_HOOKS),
  'icon-button': contractHooks('icon-button', SURFACE_HOOKS),
  input: contractHooks('input', SURFACE_HOOKS),
  textarea: contractHooks('textarea', SURFACE_HOOKS),
  select: contractHooks('select', SURFACE_HOOKS),
  chip: contractHooks('chip', SURFACE_HOOKS),
  // accordion exposes the surface set on its item sub-part, not the root.
  accordion: contractHooks('accordion-item', SURFACE_HOOKS),
  // Documented partials — see design-props.md §4:
  //   checkbox: a small control; border/shadow would be a focus ring, not
  //             elevation, so only bg/fg/radius are public hooks.
  //   input-group: a wrapper; shadow/border-width stay CSS-only, border is a
  //                single color hook (--nb-input-group-border).
  checkbox: contractHooks('checkbox', ['bg', 'fg', 'radius']),
  'input-group': [
    '--nb-input-group-bg',
    '--nb-input-group-radius',
    '--nb-input-group-border',
  ],
};

function contractHooks(slug, suffixes) {
  return suffixes.map((suffix) => `--nb-${slug}-${suffix}`);
}

const shouldUpdate = process.argv.includes('--update');

const componentSlugs = readdirSync(libSrcRoot)
  .filter((entry) => {
    if (NON_COMPONENT_DIRS.has(entry)) return false;
    return statSync(path.join(libSrcRoot, entry)).isDirectory();
  })
  .sort();

const componentTokens = {};
for (const slug of componentSlugs) {
  const dir = path.join(libSrcRoot, slug);
  const cssFiles = readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .map((f) => path.join(dir, f));
  componentTokens[slug] = collectComponentTokens(slug, cssFiles);
}

const { sharedTokens, themeTokens } = collectThemeTokens();
componentTokens.theme = themeTokens;

const hookViolations = checkHookContract(componentTokens);
if (hookViolations.length > 0) {
  console.error(
    '\nMinimum CSS-var hook contract violated (design-props.md §4):'
  );
  for (const { slug, missing } of hookViolations) {
    console.error(`  ${slug}: missing ${missing.join(', ')}`);
  }
  console.error(
    '\nExpose the missing public --nb-<component>-* hook(s), or record the ' +
      'exemption in design-props.md §4 and the HOOK_CONTRACT map above.\n'
  );
  process.exit(1);
}

const output = renderOutput(componentSlugs, componentTokens, sharedTokens);

if (shouldUpdate) {
  writeFileSync(outputPath, output);
  console.log(`Updated: ${path.relative(workspaceRoot, outputPath)}`);
  process.exit(0);
}

if (!existsSync(outputPath)) {
  console.error(
    `Missing ${path.relative(workspaceRoot, outputPath)}. Run "pnpm docs:tokens:update".`
  );
  process.exit(1);
}

const current = readFileSync(outputPath, 'utf8');
if (current !== output) {
  console.error(
    `${path.relative(workspaceRoot, outputPath)} is stale (component CSS changed since last generation).\n` +
      'Run "pnpm docs:tokens:update" and commit the result.'
  );
  process.exit(1);
}

console.log(
  `Token reference is up to date (${componentSlugs.length} components).`
);

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function extractDeclarations(css) {
  const decls = [];
  const re = /([a-zA-Z-]+|--[a-zA-Z0-9-]+)\s*:\s*([^;{}]+);/g;
  let m;
  while ((m = re.exec(css))) {
    decls.push({ property: m[1].trim(), value: m[2].trim() });
  }
  return decls;
}

function findVarCalls(value) {
  const calls = [];
  const re = /var\(\s*(--nb-[a-zA-Z0-9-]+)/g;
  let m;
  while ((m = re.exec(value))) {
    const name = m[1];
    let depth = 0;
    let commaIdx = -1;
    let endIdx = -1;
    for (let i = re.lastIndex; i < value.length; i++) {
      const ch = value[i];
      if (ch === '(') {
        depth++;
      } else if (ch === ')') {
        if (depth === 0) {
          endIdx = i;
          break;
        }
        depth--;
      } else if (ch === ',' && depth === 0 && commaIdx === -1) {
        commaIdx = i;
      }
    }
    const fallback =
      commaIdx > -1 && endIdx > -1
        ? value.slice(commaIdx + 1, endIdx).trim()
        : null;
    calls.push({ name, fallback });
  }
  return calls;
}

function checkHookContract(componentTokens) {
  const violations = [];
  for (const [slug, required] of Object.entries(HOOK_CONTRACT)) {
    const exposed = new Set((componentTokens[slug] ?? []).map((t) => t.name));
    const missing = required.filter((name) => !exposed.has(name));
    if (missing.length > 0) violations.push({ slug, missing });
  }
  return violations;
}

function collectComponentTokens(slug, cssFiles) {
  const usageMap = new Map(); // varName -> { property, fallback }
  const declMap = new Map(); // varName -> declaredValue

  for (const file of cssFiles) {
    const css = stripComments(readFileSync(file, 'utf8'));
    for (const { property, value } of extractDeclarations(css)) {
      if (property.startsWith('--nb-')) {
        if (!declMap.has(property)) declMap.set(property, value);
        continue;
      }
      if (property.startsWith('--_nb-')) continue; // private, not a public token
      for (const { name, fallback } of findVarCalls(value)) {
        if (!usageMap.has(name)) usageMap.set(name, { property, fallback });
      }
    }
  }

  const prefix = `--nb-${slug}-`;
  const names = [...new Set([...usageMap.keys(), ...declMap.keys()])]
    .filter((n) => n.startsWith(prefix))
    .sort();

  return names.map((name) => {
    const usage = usageMap.get(name);
    const declared = declMap.get(name);
    const property = usage?.property ?? pseudoPropertyFor(name);
    const defaultValue = collapseToneVars(declared ?? usage?.fallback ?? '—');
    return {
      name,
      defaultValue,
      usage: phraseFor(slug, property, name),
    };
  });
}

function collapseToneVars(value) {
  const marker = 'var(--_nb-tone-';
  let result = value;
  let sawTone = false;
  let usedPlaceholder = false;

  let idx;
  while ((idx = result.indexOf(marker)) !== -1) {
    let depth = 0;
    let commaIdx = -1;
    let closeIdx = -1;
    for (let i = idx + 4; i < result.length; i++) {
      const ch = result[i];
      if (ch === '(') {
        depth++;
      } else if (ch === ')') {
        if (depth === 0) {
          closeIdx = i;
          break;
        }
        depth--;
      } else if (ch === ',' && depth === 0 && commaIdx === -1) {
        commaIdx = i;
      }
    }
    if (closeIdx === -1) break; // malformed, bail out rather than loop forever

    const fallback =
      commaIdx > -1 ? result.slice(commaIdx + 1, closeIdx).trim() : null;
    const replacement = fallback ?? 'current tone';
    if (!fallback) usedPlaceholder = true;

    result = result.slice(0, idx) + replacement + result.slice(closeIdx + 1);
    sawTone = true;
  }

  if (sawTone && !usedPlaceholder) {
    result += ' (tone-aware)';
  }
  return result;
}

function pseudoPropertyFor(name) {
  for (const [suffix, property] of SUFFIX_PSEUDO_PROPERTY) {
    if (name.endsWith(suffix)) return property;
  }
  return null;
}

function slotFor(slug, name) {
  const remainder = name.slice(`--nb-${slug}-`.length);
  for (const [suffix] of SUFFIX_PSEUDO_PROPERTY) {
    const bare = suffix.slice(1);
    if (remainder === bare) return null;
    if (remainder.endsWith(suffix)) {
      return remainder.slice(0, remainder.length - suffix.length);
    }
  }
  return null;
}

function phraseFor(slug, property, name) {
  const base = property
    ? (PROPERTY_PHRASES[property] ?? genericPropertyPhrase(property))
    : 'Component token';
  const slot = slotFor(slug, name);
  const subject = slot
    ? `${titleCase(slug)} ${slot.replace(/-/g, ' ')}`
    : titleCase(slug);
  return `${subject} ${lowerFirst(base)}`;
}

function genericPropertyPhrase(property) {
  return `Sets \`${property}\``;
}

function collectThemeTokens() {
  const css = stripComments(readFileSync(themeCssPath, 'utf8'));
  const rootMatch = css.match(/:root\s*{([\s\S]*?)\n}/);
  const rootBody = rootMatch ? rootMatch[1] : '';
  const seen = new Set();
  const shared = [];
  const rest = [];

  for (const { property, value } of extractDeclarations(rootBody)) {
    if (!property.startsWith('--nb-') || seen.has(property)) continue;
    seen.add(property);
    const token = {
      name: property,
      defaultValue: value,
      usage: THEME_OVERRIDES[property] ?? themeHeuristic(property),
    };
    if (SHARED_TOKEN_NAMES.includes(property)) {
      shared.push(token);
    } else {
      rest.push(token);
    }
  }

  return { sharedTokens: shared, themeTokens: rest };
}

function themeHeuristic(name) {
  const short = name.replace(/^--nb-/, '');

  const toneMatch = short.match(/^tone-([a-z]+)-(bg|fg|border)$/);
  if (toneMatch) {
    const [, tone, part] = toneMatch;
    const partLabel =
      part === 'bg'
        ? 'background'
        : part === 'fg'
          ? 'foreground / text'
          : 'border';
    return `"${tone}" tone ${partLabel} color`;
  }

  const scaleMatch = short.match(/^(radius|space|padding|border-width)-(.+)$/);
  if (scaleMatch) {
    const [, scale, step] = scaleMatch;
    const scaleLabel = {
      radius: 'Corner radius',
      space: 'Spacing',
      padding: 'Padding',
      'border-width': 'Border width',
    }[scale];
    return `${scaleLabel} scale step "${step}"`;
  }

  const shadowMatch = short.match(/^shadow-(sm|hard|heavy)$/);
  if (shadowMatch) return `"${shadowMatch[1]}" shadow preset`;

  const fontMatch = short.match(/^font-(body|display|accent)$/);
  if (fontMatch) return `Font family alias for ${fontMatch[1]} text`;

  const paletteColors = new Set([
    'yellow',
    'pink',
    'mint',
    'lavender',
    'blue',
    'cream',
  ]);
  if (paletteColors.has(short)) return `Brutalist palette color "${short}"`;

  return 'Global design token';
}

function titleCase(slug) {
  return slug
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function lowerFirst(text) {
  return text[0].toLowerCase() + text.slice(1);
}

function renderOutput(slugs, componentTokens, sharedTokens) {
  const lines = [];
  lines.push(
    '// GENERATED FILE — do not hand-edit.',
    '// Source: apps/docs/scripts/generate-token-reference.mjs',
    '// Regenerate with `pnpm docs:tokens:update` after changing component CSS.',
    ''
  );
  lines.push('export interface DocsToken {');
  lines.push('  name: string;');
  lines.push('  defaultValue: string;');
  lines.push('  usage: string;');
  lines.push('}');
  lines.push('');

  const unionMembers = [...slugs, 'theme'].map((s) => `  | '${s}'`).join('\n');
  lines.push('export type DocsTokenComponent =');
  lines.push(unionMembers + ';');
  lines.push('');

  lines.push('export const sharedTokens: DocsToken[] = ' + renderTokenArray(sharedTokens) + ';');
  lines.push('');

  lines.push(
    'export const componentTokens: Record<DocsTokenComponent, DocsToken[]> = {'
  );
  for (const slug of [...slugs, 'theme']) {
    lines.push(`  '${slug}': ${renderTokenArray(componentTokens[slug])},`);
  }
  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

function renderTokenArray(tokens) {
  if (tokens.length === 0) return '[]';
  const items = tokens
    .map(
      (t) =>
        `    { name: ${JSON.stringify(t.name)}, defaultValue: ${JSON.stringify(t.defaultValue)}, usage: ${JSON.stringify(t.usage)} }`
    )
    .join(',\n');
  return `[\n${items},\n  ]`;
}
