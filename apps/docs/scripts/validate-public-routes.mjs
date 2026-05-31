#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../../..');
const pagesRoot = path.resolve(__dirname, '../src/app/pages');
const publicDir = path.resolve(__dirname, '../public');

const jiti = createJiti(import.meta.url, { interopDefault: true });
const { DOCS_PUBLIC_ROUTES } = await jiti.import(
  path.resolve(__dirname, '../src/app/docs/docs-public-routes.ts')
);

let errors = [];

console.log(`Validating ${DOCS_PUBLIC_ROUTES.length} public routes...`);

// Check 1: Every route maps to an existing page file
for (const route of DOCS_PUBLIC_ROUTES) {
  const filePath = path.resolve(pagesRoot, route.file);
  if (!existsSync(filePath)) {
    errors.push(`❌ Route ${route.path}: page file not found at ${route.file}`);
  }
}

// Check 2: Verify sitemap.xml contains all routes
const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const route of DOCS_PUBLIC_ROUTES) {
    const siteUrl = 'https://ngbrutalism.khangtran.dev';
    const loc = route.path === '/' ? `${siteUrl}/` : `${siteUrl}${route.path}/`;
    if (!sitemap.includes(`<loc>${loc}</loc>`)) {
      errors.push(`❌ Route ${route.path}: not found in sitemap.xml`);
    }
  }
} else {
  errors.push(`⚠️  sitemap.xml not found at ${sitemapPath}. Run build first.`);
}

// Check 3: Verify llms.txt contains all routes
const llmsTxtPath = path.resolve(publicDir, 'llms.txt');
if (existsSync(llmsTxtPath)) {
  const llmsTxt = readFileSync(llmsTxtPath, 'utf8');
  for (const route of DOCS_PUBLIC_ROUTES) {
    if (route.path === '/') continue;
    if (!llmsTxt.includes(`/${route.path.split('/').pop()}/`)) {
      errors.push(`❌ Route ${route.path}: not found in llms.txt`);
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
