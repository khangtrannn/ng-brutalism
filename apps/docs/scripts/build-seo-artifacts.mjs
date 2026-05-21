#!/usr/bin/env node

// Generates sitemap.xml and llms.txt for the docs site. Sources lastmod from
// `git log` per route file and descriptions from docs-title-strategy.ts so
// there's a single source of truth for page metadata.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../..');
const pagesRoot = path.resolve(__dirname, '../src/app/pages');
const distClientDir = path.resolve(workspaceRoot, 'dist/apps/docs/client');
const distAnalogPublicDir = path.resolve(
  workspaceRoot,
  'dist/apps/docs/analog/public',
);
const publicDir = path.resolve(__dirname, '../public');

const SITE_URL = 'https://ngbrutalism.khangtran.dev';

const ROUTES = [
  { path: '/', file: '(home).page.ts', priority: '1.0', changefreq: 'weekly' },
  { path: '/docs/introduction', file: 'docs/introduction.page.ts', priority: '0.9', changefreq: 'weekly' },
  { path: '/docs/installation', file: 'docs/installation.page.ts', priority: '0.9', changefreq: 'weekly' },
  { path: '/components/button', file: 'components/button.page.ts', priority: '0.8', changefreq: 'weekly' },
  { path: '/components/card', file: 'components/card.page.ts', priority: '0.8', changefreq: 'weekly' },
  { path: '/components/dialog', file: 'components/dialog.page.ts', priority: '0.8', changefreq: 'weekly' },
  { path: '/components/accordion', file: 'components/accordion.page.ts', priority: '0.8', changefreq: 'weekly' },
  { path: '/components/input', file: 'components/input.page.ts', priority: '0.8', changefreq: 'weekly' },
  { path: '/components/input-group', file: 'components/input-group.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/avatar', file: 'components/avatar.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/badge', file: 'components/badge.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/checkbox', file: 'components/checkbox.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/image-card', file: 'components/image-card.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/label', file: 'components/label.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/marquee', file: 'components/marquee.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/select', file: 'components/select.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/textarea', file: 'components/textarea.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/components/title', file: 'components/title.page.ts', priority: '0.7', changefreq: 'weekly' },
  { path: '/showcase/portfolio', file: 'showcase/portfolio/index.page.ts', priority: '0.6', changefreq: 'monthly' },
];

const jiti = createJiti(import.meta.url, { interopDefault: true });
const seoData = await jiti.import(
  path.resolve(__dirname, '../src/app/docs/docs-seo-data.ts'),
);

const targets = process.argv.includes('--no-dist')
  ? [publicDir]
  : [publicDir, distClientDir, distAnalogPublicDir];

for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
}

const sitemap = buildSitemap();
const llms = buildLlmsTxt();

for (const dir of targets) {
  writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
  writeFileSync(path.join(dir, 'llms.txt'), llms);
}

console.log(
  `Wrote sitemap.xml + llms.txt (${ROUTES.length} routes) to: ${targets.join(', ')}`,
);

function buildSitemap() {
  const urls = ROUTES.map((route) => {
    const loc = `${SITE_URL}${route.path === '/' ? '/' : `${route.path}/`}`;
    const lastmod = gitLastmod(route.file);
    const lastmodTag = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      lastmodTag.trimEnd(),
      `    <priority>${route.priority}</priority>`,
      `    <changefreq>${route.changefreq}</changefreq>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildLlmsTxt() {
  const lines = [
    '# Ng Brutalism',
    '',
    '> The neo-brutalist Angular UI library. Signals, zoneless change detection, Tailwind v4. Bold borders, offset shadows, punchy colors.',
    '',
    '- Repository: https://github.com/khangtrannn/ng-brutalism',
    '- npm: https://www.npmjs.com/package/@ng-brutalism/ui',
    '- License: MIT',
    '',
    '## Pages',
    '',
  ];

  for (const route of ROUTES) {
    const seo = seoData.getDocsPageSeo(route.path);
    lines.push(`- [${seo.title}](${seo.canonicalUrl}): ${seo.description}`);
  }

  lines.push('');
  return lines.join('\n');
}

function gitLastmod(relPath) {
  const fullPath = path.resolve(pagesRoot, relPath);
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', fullPath],
      { cwd: workspaceRoot, encoding: 'utf8' },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}
