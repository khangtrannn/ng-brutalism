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
  'dist/apps/docs/analog/public'
);
const publicDir = path.resolve(__dirname, '../public');

const SITE_URL = 'https://ngbrutalism.khangtran.dev';

const jiti = createJiti(import.meta.url, { interopDefault: true });
const { DOCS_PUBLIC_ROUTES } = await jiti.import(
  path.resolve(__dirname, '../src/app/docs/docs-public-routes.ts')
);
const seoData = await jiti.import(
  path.resolve(__dirname, '../src/app/docs/docs-seo-data.ts')
);

const ROUTES = DOCS_PUBLIC_ROUTES;

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
  `Wrote sitemap.xml + llms.txt (${ROUTES.length} routes) to: ${targets.join(
    ', '
  )}`
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
    '> Ng Brutalism is a neo-brutalist Angular UI library by Khang Tran. Built with signals, zoneless change detection, and Tailwind v4. It ships as @ng-brutalism/ui on npm. Bold borders, offset shadows, punchy colors.',
    '',
    '- Author: Khang Tran (https://github.com/khangtrannn)',
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
      { cwd: workspaceRoot, encoding: 'utf8' }
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}
