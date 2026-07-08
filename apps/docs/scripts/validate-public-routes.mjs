#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesRoot = path.resolve(__dirname, '../src/app/pages');
const publicDir = path.resolve(__dirname, '../public');

const SITE_URL = 'https://ngbrutalism.khangtran.dev';

const INDEX_PAGE_FILES = new Set([
  'components.page.ts',
  'docs.page.ts',
  'recipes.page.ts',
]);

const PRIVATE_PAGE_FILES = new Set(['[...not-found].page.ts']);

const jiti = createJiti(import.meta.url, { interopDefault: true });
const { DOCS_PUBLIC_ROUTES } = await jiti.import(
  path.resolve(__dirname, '../src/app/docs/docs-public-routes.ts')
);

const errors = [];

console.log(`Validating ${DOCS_PUBLIC_ROUTES.length} public routes...`);

const seenPaths = new Set();
const seenFiles = new Map();
for (const route of DOCS_PUBLIC_ROUTES) {
  if (seenPaths.has(route.path)) {
    errors.push(`❌ Duplicate route path in DOCS_PUBLIC_ROUTES: ${route.path}`);
  }
  seenPaths.add(route.path);

  if (seenFiles.has(route.file)) {
    errors.push(
      `❌ Duplicate file mapping in DOCS_PUBLIC_ROUTES: ${route.file} (used by ${seenFiles.get(route.file)} and ${route.path})`
    );
  }
  seenFiles.set(route.file, route.path);
}

for (const route of DOCS_PUBLIC_ROUTES) {
  const filePath = path.resolve(pagesRoot, route.file);
  if (!existsSync(filePath)) {
    errors.push(`❌ Route ${route.path}: page file not found at ${route.file}`);
  }
}

const discoveredRoutes = discoverPublicRoutes(pagesRoot);
const registeredFiles = new Set(DOCS_PUBLIC_ROUTES.map((route) => route.file));

for (const { file, expectedPath } of discoveredRoutes) {
  if (!registeredFiles.has(file)) {
    errors.push(
      `❌ Discovered public page file ${file} (expected route ${expectedPath}) is missing from DOCS_PUBLIC_ROUTES`
    );
  }
}

const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const route of DOCS_PUBLIC_ROUTES) {
    const loc = toCanonicalUrl(route.path);
    if (!sitemap.includes(`<loc>${loc}</loc>`)) {
      errors.push(`❌ Route ${route.path}: missing <loc>${loc}</loc> in sitemap.xml`);
    }
  }

  const registeredUrls = new Set(
    DOCS_PUBLIC_ROUTES.map((route) => toCanonicalUrl(route.path))
  );
  const locMatches = sitemap.matchAll(/<loc>([^<]+)<\/loc>/g);
  for (const match of locMatches) {
    const loc = match[1];
    if (loc.startsWith(SITE_URL) && !registeredUrls.has(loc)) {
      errors.push(
        `❌ sitemap.xml contains <loc>${loc}</loc> with no matching entry in DOCS_PUBLIC_ROUTES`
      );
    }
  }
} else {
  errors.push(`⚠️  sitemap.xml not found at ${sitemapPath}. Run build first.`);
}

const llmsTxtPath = path.resolve(publicDir, 'llms.txt');
if (existsSync(llmsTxtPath)) {
  const llmsTxt = readFileSync(llmsTxtPath, 'utf8');
  for (const route of DOCS_PUBLIC_ROUTES) {
    const canonicalUrl = toCanonicalUrl(route.path);
    if (!llmsTxt.includes(canonicalUrl)) {
      errors.push(`❌ Route ${route.path}: missing ${canonicalUrl} in llms.txt`);
    }
  }
} else {
  errors.push(`⚠️  llms.txt not found at ${llmsTxtPath}. Run build first.`);
}

if (errors.length > 0) {
  console.error('\n⚠️  Validation errors found:\n');
  errors.forEach((err) => console.error(err));
  process.exit(1);
} else {
  console.log(
    `✅ All route validations passed (${DOCS_PUBLIC_ROUTES.length} registered, ${discoveredRoutes.length} discovered).`
  );
}

function discoverPublicRoutes(root) {
  const results = [];

  const homePage = '(home).page.ts';
  if (existsSync(path.resolve(root, homePage))) {
    results.push({ file: homePage, expectedPath: '/' });
  }

  for (const section of ['docs', 'composition', 'components']) {
    const dir = path.resolve(root, section);
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (!statSync(full).isFile()) continue;
      if (!entry.endsWith('.page.ts')) continue;
      if (INDEX_PAGE_FILES.has(entry) || PRIVATE_PAGE_FILES.has(entry)) continue;
      const slug = entry.slice(0, -'.page.ts'.length);
      results.push({
        file: `${section}/${entry}`,
        expectedPath: `/${section}/${slug}`,
      });
    }
  }

  for (const section of ['recipes', 'showcase']) {
    const dir = path.resolve(root, section);
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (!statSync(full).isDirectory()) continue;
      const indexFile = path.join(full, 'index.page.ts');
      if (!existsSync(indexFile)) continue;
      results.push({
        file: `${section}/${entry}/index.page.ts`,
        expectedPath: `/${section}/${entry}`,
      });
    }
  }

  return results;
}

function toCanonicalUrl(routePath) {
  return `${SITE_URL}${routePath === '/' ? '/' : `${routePath}/`}`;
}
