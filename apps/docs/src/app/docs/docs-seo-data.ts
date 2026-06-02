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
  'Neo-brutalist Angular UI primitive library and composition system. Build loud Angular interfaces with Surface, Section, Stack, Cluster, Split, directive APIs, signals, Tailwind v4, chunky borders, crisp shadows, and punchy colors.';

export const AUTHOR_NAME = 'Khang Tran';
export const AUTHOR_URL = 'https://github.com/khangtrannn';
export const AUTHOR_X_URL = 'https://x.com/mktrann';
export const AUTHOR_LINKEDIN_URL = 'https://www.linkedin.com/in/khangtrann';
export const REPO_URL = 'https://github.com/khangtrannn/ng-brutalism';
export const NPM_URL = 'https://www.npmjs.com/package/@ng-brutalism/ui';
// Kept in sync with libs/ui/package.json by the release flow.
export const LIB_VERSION = '0.2.0';
// Coarse fallback dates for TechArticle JSON-LD. Could be replaced by a
// build-time per-page manifest later; for now they apply uniformly.
export const PUBLISHED_DATE = '2025-10-01';
export const MODIFIED_DATE = '2026-05-23';

export const GOOGLE_SITE_VERIFICATION =
  'lq5mTAkarsSjy3r_0qKiuAUUvzEFyaXagIKcCZMmcd4';

export const SOFTWARE_KEYWORDS = [
  'neobrutalism angular',
  'neo-brutalist angular ui library',
  'brutalist angular components',
  'angular ui primitive library',
  'angular composition system',
  'tailwindcss',
  'signals',
  'zoneless',
];

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  // Home
  '/': 'Ng Brutalism is a neo-brutalist Angular UI primitive library and composition system for building loud Angular interfaces with Surface, Section, Stack, Cluster, Split, actions, forms, media, and recipes.',

  // Getting started
  '/docs/introduction':
    'Get started with Ng Brutalism — a neo-brutalist Angular UI primitive library and composition system built with signals, zoneless change detection, and Tailwind v4.',
  '/docs/installation':
    'Install @ng-brutalism/ui in your Angular project. Requires a modern Angular setup, Tailwind v4, and Node 20+.',
  '/docs/inspired-designs':
    'Explore the visual references behind Ng Brutalism: loud layouts, chunky borders, bold color, and Angular UI patterns with bite.',
  '/docs/faq':
    'Ng Brutalism FAQ for Angular developers. Learn what the neo-brutalist Angular primitive library and composition system is, why it uses Tailwind v4, how it compares, and whether it fits your project.',

  // Composition
  '/composition/overview':
    'Learn the Ng Brutalism composition system: Surface, Section, Stack, Cluster, Split, Button, Chip, Text, and Title working together.',
  '/composition/surface-and-section':
    'Compose Angular card shells and panel regions with nbSurface and nbSection, including headers, bodies, footers, dividers, and clipping.',
  '/composition/stack-and-cluster':
    'Use nbStack and nbCluster to build vertical rhythm, inline groups, responsive chips, action rows, and composed brutalist Angular cards.',
  '/composition/split-layouts':
    'Build responsive two-column Angular layouts with nbSplit, including hero splits, media/content pairs, ratios, collapse points, and split APIs.',
  '/composition/common-patterns':
    'Copy-paste Ng Brutalism composition patterns for card shells, toolbars, feature stacks, callout panels, two-column cards, and primitives-used panels.',

  // Components — /components/* (demo pages)
  '/components/accordion':
    'Neo-brutalist Accordion component for Angular. Dense disclosure panels with keyboard navigation and signal-driven state.',
  '/components/avatar':
    'Neo-brutalist Avatar component for Angular. Bold profile images with hard borders and offset shadow styling.',
  '/components/avatar-group':
    'Use Avatar Group to stack Angular avatars with brutalist borders, overflow counts, and compact team or social context.',
  '/components/badge':
    'Neo-brutalist Badge component for Angular. Punchy status labels with thick borders and high-contrast colors.',
  '/components/button':
    'Neo-brutalist Button primitive for Angular. Hard borders, offset shadows, and tone-driven styling — built with directive APIs and signals.',
  '/components/callout':
    'Use Callout to highlight important messages with chunky borders, loud tones, and sharp Angular-first composition.',
  '/components/card':
    'Neo-brutalist Card component for Angular. Bold content blocks with thick borders and offset shadows.',
  '/components/checkbox':
    'Neo-brutalist Checkbox component for Angular. Accessible checkbox with strong focus states and brutalist styling.',
  '/components/chip':
    'Use Chip to compose compact Angular tags, filters, metadata, and icon labels with punchy brutalist tones.',
  '/components/cluster':
    'Use Cluster to arrange inline groups, actions, badges, and metadata with flexible wrapping and brutalist spacing.',
  '/components/dialog':
    'Neo-brutalist Dialog (modal) component for Angular. Accessible native brutalist modal with keyboard focus management.',
  '/components/display':
    'Use Display for loud Angular hero text, editorial headings, and oversized brutalist type with token-friendly sizing.',
  '/components/halftone':
    'Use Halftone to add graphic brutalist texture, dotted overlays, and punchy Angular composition accents.',
  '/components/icon':
    'Use Icon to render masked SVG icons with ng-brutalism sizing, tones, and accessibility-friendly labeling.',
  '/components/icon-button':
    'Use Icon Button for compact Angular actions with clear labels, sharp shapes, strong focus states, and tone-driven styling.',
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
  '/components/media-item':
    'Use Media Item to compose avatars, thumbnails, content, and actions into reusable brutalist media rows and cards.',
  '/components/media-frame':
    'Use Media Frame to wrap images, illustrations, and visual content in bold brutalist frames with controlled ratios.',
  '/components/progress':
    'Use Progress to show Angular task completion, loading states, and meter values with bold brutalist tracks and tones.',
  '/components/rating':
    'Use Rating to render Angular review scores, stars, and compact social proof with sharp brutalist styling.',
  '/components/section':
    'Use Section to structure page regions with Angular-first spacing, surfaces, headers, and brutalist composition.',
  '/components/select':
    'Neo-brutalist Select component for Angular. Custom dropdown with bold styling and full keyboard support.',
  '/components/separator':
    'Use Separator to divide Angular content with strong brutalist rules, vertical lines, and token-driven visual styles.',
  '/components/split':
    'Use Split to build responsive two-column layouts with brutalist spacing, ratios, separators, and collapse behavior.',
  '/components/stack':
    'Use Stack to create vertical rhythm, grouped content, forms, panels, and divided brutalist layouts.',
  '/components/stat':
    'Use Stat to show Angular metrics, counters, labels, and icon-backed values with loud brutalist emphasis.',
  '/components/status-dot':
    'Use Status Dot to mark state, presence, health, and alerts with small but loud brutalist indicators.',
  '/components/sticker':
    'Use Sticker to add playful Angular badges, labels, and offset brutalist stamps to cards and feature areas.',
  '/components/surface':
    'Use Surface to create reusable brutalist containers with chunky borders, offset shadows, tones, and flexible padding.',
  '/components/text':
    'Use Text to apply consistent brutalist typography, tones, sizes, and semantic text styling across Angular UIs.',
  '/components/textarea':
    'Neo-brutalist Textarea component for Angular. Multi-line input with sharp borders and brutalist focus states.',
  '/components/title':
    'Neo-brutalist Title component for Angular. Decorative heading with custom wave underline and mixed content support.',

  // Recipes
  '/recipes/travel-card':
    'Build a loud travel card recipe from reusable ng-brutalism primitives like Surface, Stack, Cluster, Split, and Media Item.',
  '/recipes/podcast-card':
    'Podcast Card recipe for Ng Brutalism. Compose neo-brutalist Angular primitives into a bold audio episode card with chips, host metadata, waveform player, and CTA.',
  '/recipes/open-to-work-card':
    'Open to Work Card recipe for Ng Brutalism. Compose surface, media frame, chips, icon actions, button, and sticker primitives into a loud profile card for portfolios and hiring pages.',

  // Showcase
  '/showcase/portfolio':
    'Portfolio showcase built with Ng Brutalism — see the neo-brutalist Angular primitive library and composition system in action.',
};

export interface DocsPageSeo {
  title: string;
  description: string;
  canonicalUrl: string;
  path: string;
  robots: 'index, follow' | 'noindex, follow';
  ogType: 'website' | 'article';
  isTechArticle: boolean;
  breadcrumb: { name: string; url: string };
}

export function getDocsPageSeo(url: string): DocsPageSeo {
  const path = normalizePath(url);
  const robots = getRobotsDirective(path);
  const pageTitle = getDocsPageTitle(path);
  const isTechArticle =
    robots === 'index, follow' &&
    (path.startsWith('/docs/') ||
      path.startsWith('/composition/') ||
      path.startsWith('/components/') ||
      path.startsWith('/recipes/') ||
      path === '/showcase/portfolio');

  return {
    title: formatPageTitle(path, pageTitle),
    description: getDocsPageDescription(path),
    canonicalUrl: toCanonicalUrl(path),
    path,
    robots,
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
    return 'Neo-Brutalist Angular UI Primitive Library';
  }

  if (path === '/docs') {
    return 'Docs';
  }

  if (path === '/components') {
    return 'Components';
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

function getDocsPageDescription(path: string): string {
  if (PAGE_DESCRIPTIONS[path]) {
    return PAGE_DESCRIPTIONS[path];
  }

  if (path === '/docs') {
    return 'Browse Ng Brutalism documentation for installation, Angular usage, Tailwind v4 setup, and component examples.';
  }

  if (path === '/components') {
    return 'Browse Ng Brutalism Angular primitives, including composition, actions, forms, media, emphasis, and interaction patterns.';
  }

  return 'This Ng Brutalism docs page could not be found. Return to the Angular primitive library documentation or examples.';
}

function getRobotsDirective(path: string): DocsPageSeo['robots'] {
  if (path === '/docs' || path === '/components') {
    return 'noindex, follow';
  }

  if (path === '/' || PAGE_DESCRIPTIONS[path]) {
    return 'index, follow';
  }

  return 'noindex, follow';
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

export const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'What is Ng Brutalism?',
    answer:
      'Ng Brutalism is a neo-brutalist Angular UI primitive library and composition system published as @ng-brutalism/ui. It gives modern Angular apps directive-first primitives — Surface, Section, Stack, Cluster, Split, Button, Chip, and more — with hard borders, offset shadows, punchy colors, and Tailwind CSS v4 styling ergonomics.',
  },
  {
    question: 'Why build it for Angular?',
    answer:
      'Angular has excellent application primitives, especially in modern versions with standalone components, signals, and zoneless-friendly patterns. Ng Brutalism is built to fit that world directly, with APIs and interaction patterns that feel natural in Angular applications. Each component can be imported directly into the Angular component that uses it.',
  },
  {
    question: 'Does it support signals and zoneless Angular?',
    answer:
      'Yes. The library is designed for modern Angular: standalone imports, signal-friendly internals, and zoneless-friendly interaction patterns. You can use Ng Brutalism in a zoneless app, and you can also use it in Angular apps that still run with zone.js.',
  },
  {
    question: 'Does it require Tailwind CSS v4?',
    answer:
      'Yes. Ng Brutalism is built around Tailwind CSS v4 and CSS custom properties. It ships with an Angular CLI schematic that helps you get the required styling setup ready out of the box.',
  },
  {
    question:
      'How is it different from Angular Material, PrimeNG, Taiga UI, or Spartan?',
    answer:
      'Ng Brutalism starts from a narrower design promise: neo-brutalist components that look opinionated on day one. The library leans on CSS tokens and Tailwind utilities rather than a large theme abstraction — you tune borders, shadows, colors, and local component accents close to the markup. Where other libraries focus on unstyled primitives, Ng Brutalism takes a visual-first approach.',
  },
  {
    question: 'Is it production ready?',
    answer:
      'Ng Brutalism is pre-1.0. The components are usable today, but minor API changes can happen while the library hardens. It is a good fit for prototypes, portfolios, launch pages, and side projects. For conservative enterprise systems, wait for a later stable release.',
  },
  {
    question: 'What components are included?',
    answer:
      'v0.2.0 includes a full primitive composition system: Composition (Surface, Section, Stack, Cluster, Split); Actions (Button, Icon Button); Typography (Text, Title, Display); Forms (Input, Textarea, Checkbox, Select, Label, Input Group); Media (Avatar, Avatar Group, Icon, Media Frame, Media Item); Emphasis (Badge, Chip, Callout, Sticker, Status Dot, Rating, Progress); Interaction (Accordion, Dialog, Marquee); Recipes (Travel Card, Podcast Card, Open to Work Card).',
  },
  {
    question: 'Does it work with SSR?',
    answer:
      'The docs site itself is prerendered with Analog and Angular. The UI package avoids browser-only assumptions in core primitives where possible, and browser-dependent behavior is kept behind Angular platform checks when needed.',
  },
  {
    question: 'Who made Ng Brutalism?',
    answer:
      'Ng Brutalism was created by Khang Tran, is MIT licensed, and is published to npm as @ng-brutalism/ui. The source code is available on GitHub at github.com/khangtrannn/ng-brutalism.',
  },
];
