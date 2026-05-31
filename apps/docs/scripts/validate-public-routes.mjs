#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesRoot = path.resolve(__dirname, '../src/app/pages');
const publicDir = path.resolve(__dirname, '../public');

const SITE_URL = 'https://ngbrutalism.khangtran.dev';

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

const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const route of DOCS_PUBLIC_ROUTES) {
    const loc = toCanonicalUrl(route.path);
    if (!sitemap.includes(`<loc>${loc}</loc>`)) {
      errors.push(`❌ Route ${route.path}: missing <loc>${loc}</loc> in sitemap.xml`);
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
  console.log('✅ All route validations passed!');
}

function toCanonicalUrl(routePath) {
  return `${SITE_URL}${routePath === '/' ? '/' : `${routePath}/`}`;
}
