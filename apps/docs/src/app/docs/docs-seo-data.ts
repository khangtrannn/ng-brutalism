// Pure data + helpers shared by DocsTitleStrategy (runtime) and the
// build-seo-artifacts script (build time). Must not import Angular APIs so
// the build script can load it via jiti.

import { findDocsNavItem } from './docs.navigation';

export const APP_TITLE = 'Ng Brutalism';
export const SITE_URL = 'https://ngbrutalism.khangtran.dev';
export const OG_IMAGE_URL = `${SITE_URL}/og.png`;
export const OG_IMAGE_ALT = 'Ng Brutalism — Neo-Brutalist Angular UI Library';
export const OG_LOCALE = 'en_US';
export const DEFAULT_DESCRIPTION =
  'Neo-brutalist Angular component library. Signals, zoneless, Tailwind v4. Bold borders, offset shadows, and punchy colors — drop it in and ship loud.';

export const AUTHOR_NAME = 'Khang Tran';
export const AUTHOR_URL = 'https://github.com/khangtrannn';
export const REPO_URL = 'https://github.com/khangtrannn/ng-brutalism';
export const NPM_URL = 'https://www.npmjs.com/package/@ng-brutalism/ui';
// Kept in sync with libs/ui/package.json by the release flow.
export const LIB_VERSION = '0.1.1';
// Coarse fallback dates for TechArticle JSON-LD. Could be replaced by a
// build-time per-page manifest later; for now they apply uniformly.
export const PUBLISHED_DATE = '2025-10-01';
export const MODIFIED_DATE = '2026-05-21';

export const GOOGLE_SITE_VERIFICATION =
  'lq5mTAkarsSjy3r_0qKiuAUUvzEFyaXagIKcCZMmcd4';

export const SOFTWARE_KEYWORDS = [
  'neobrutalism angular',
  'neo-brutalist angular ui library',
  'brutalist angular components',
  'angular component library',
  'tailwindcss',
  'signals',
  'zoneless',
];

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  // Home
  '/':
    'The neo-brutalist Angular UI library. Signals, zoneless, Tailwind v4. Bold borders, offset shadows, and punchy colors — drop in brutalist Angular components and ship loud.',

  // Getting started
  '/docs/introduction':
    'Get started with Ng Brutalism — a neo-brutalist Angular UI library built with signals, zoneless change detection, and Tailwind v4.',
  '/docs/installation':
    'Install @ng-brutalism/ui in your Angular project. Requires a modern Angular setup, Tailwind v4, and Node 20+.',

  // Components — /components/* (demo pages)
  '/components/accordion':
    'Neo-brutalist Accordion component for Angular. Dense disclosure panels with keyboard navigation and signal-driven state.',
  '/components/avatar':
    'Neo-brutalist Avatar component for Angular. Bold profile images with hard borders and offset shadow styling.',
  '/components/badge':
    'Neo-brutalist Badge component for Angular. Punchy status labels with thick borders and high-contrast colors.',
  '/components/button':
    'Neo-brutalist Button component for Angular. Hard borders, offset shadows, and multiple variants — built with directive APIs and signals.',
  '/components/card':
    'Neo-brutalist Card component for Angular. Bold content blocks with thick borders and offset shadows.',
  '/components/checkbox':
    'Neo-brutalist Checkbox component for Angular. Accessible checkbox with strong focus states and brutalist styling.',
  '/components/dialog':
    'Neo-brutalist Dialog (modal) component for Angular. Accessible native brutalist modal with keyboard focus management.',
  '/components/image-card':
    'Neo-brutalist Image Card component for Angular. Bold media cards with thick borders and offset shadows.',
  '/components/input':
    'Neo-brutalist Input component for Angular. Sharp form fields with strong focus states and Tailwind v4 tokens.',
  '/components/input-group':
    'Neo-brutalist Input Group component for Angular. Compose inputs with prefix and suffix slots in a brutalist wrapper.',
  '/components/label':
    'Neo-brutalist Label component for Angular. Bold form labels with strong typography and brutalist styling.',
  '/components/marquee':
    'Ng Brutalism Marquee component for Angular. Continuous scrolling ticker with bold borders and configurable speed.',
  '/components/select':
    'Neo-brutalist Select component for Angular. Custom dropdown with bold styling and full keyboard support.',
  '/components/textarea':
    'Neo-brutalist Textarea component for Angular. Multi-line input with sharp borders and brutalist focus states.',
  '/components/title':
    'Neo-brutalist Title component for Angular. Decorative heading with custom wave underline and mixed content support.',

  // Showcase
  '/showcase/portfolio':
    'Portfolio showcase built with Ng Brutalism — see the neo-brutalist Angular UI library in action.',
};

export interface DocsPageSeo {
  title: string;
  description: string;
  canonicalUrl: string;
  path: string;
  ogType: 'website' | 'article';
  isTechArticle: boolean;
  breadcrumb: { name: string; url: string };
}

export function getDocsPageSeo(url: string): DocsPageSeo {
  const path = normalizePath(url);
  const pageTitle = getDocsPageTitle(path);
  const isTechArticle =
    path.startsWith('/docs/') ||
    path.startsWith('/components/') ||
    path === '/showcase/portfolio';

  return {
    title: formatPageTitle(path, pageTitle),
    description: PAGE_DESCRIPTIONS[path] ?? DEFAULT_DESCRIPTION,
    canonicalUrl: toCanonicalUrl(path),
    path,
    ogType: path === '/' ? 'website' : 'article',
    isTechArticle,
    breadcrumb: {
      name: pageTitle || APP_TITLE,
      url: toCanonicalUrl(path),
    },
  };
}

export function getDocsPageTitle(url: string): string {
  const path = normalizePath(url);

  if (path === '/') {
    return 'Neo-Brutalist Angular UI Library';
  }

  if (path === '/docs') {
    return 'Introduction';
  }

  if (path === '/showcase/portfolio') {
    return 'Portfolio Showcase';
  }

  const navItem = findDocsNavItem(path);

  if (navItem) {
    return path.startsWith('/components/')
      ? `Neo-Brutalist Angular ${navItem.label}`
      : navItem.label;
  }

  return humanizePath(path);
}

function formatPageTitle(path: string, pageTitle: string): string {
  if (!pageTitle) {
    return APP_TITLE;
  }

  if (path === '/') {
    return `${APP_TITLE} — ${pageTitle}`;
  }

  return `${pageTitle} | ${APP_TITLE}`;
}

function normalizePath(url: string): string {
  const path = url.split(/[?#]/, 1)[0] || '/';

  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

function toCanonicalUrl(path: string): string {
  const canonicalPath = path === '/' ? '/' : `${path}/`;

  return new URL(canonicalPath, `${SITE_URL}/`).toString();
}

function humanizePath(path: string): string {
  const segment = path.split('/').filter(Boolean).at(-1);

  if (!segment) {
    return '';
  }

  return segment
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}
