import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { findDocsNavItem } from './docs.navigation';

const APP_TITLE = 'Ng Brutalism';
const SITE_URL = 'https://ngbrutalism.khangtran.dev';
const OG_IMAGE_URL = `${SITE_URL}/og.png`;
const OG_IMAGE_ALT = 'Ng Brutalism — Neo-Brutalist Angular UI Library';
const OG_LOCALE = 'en_US';
const DEFAULT_DESCRIPTION =
  'Neo-brutalist Angular component library. Signals, zoneless, Tailwind v4. Bold borders, offset shadows, and punchy colors — drop it in and ship loud.';

const PAGE_DESCRIPTIONS: Record<string, string> = {
  // Getting started
  '/docs/introduction':
    'Get started with Ng Brutalism — a neo-brutalist Angular UI library built with signals, zoneless change detection, and Tailwind v4.',
  '/docs/installation':
    'Install @ng-brutalism/ui in your Angular project. Requires Angular 21, Tailwind v4, and Node 20+.',

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
    'Neo-brutalist Dialog component for Angular. Accessible native modal with keyboard focus and brutalist styling.',
  '/components/image-card':
    'Neo-brutalist Image Card component for Angular. Bold media cards with thick borders and offset shadows.',
  '/components/input':
    'Neo-brutalist Input component for Angular. Sharp form fields with strong focus states and Tailwind v4 tokens.',
  '/components/input-group':
    'Neo-brutalist Input Group component for Angular. Compose inputs with prefix and suffix slots in a brutalist wrapper.',
  '/components/label':
    'Neo-brutalist Label component for Angular. Bold form labels with strong typography and brutalist styling.',
  '/components/marquee':
    'Neo-brutalist Marquee component for Angular. Continuous scrolling ticker with bold borders and configurable speed.',
  '/components/select':
    'Neo-brutalist Select component for Angular. Custom dropdown with bold styling and full keyboard support.',
  '/components/textarea':
    'Neo-brutalist Textarea component for Angular. Multi-line input with sharp borders and brutalist focus states.',
  '/components/title':
    'Neo-brutalist Title component for Angular. Decorative heading with custom wave underline and mixed content support.',

  // Components — /docs/* (API reference pages)
  '/docs/accordion':
    'API reference for the Ng Brutalism Accordion — neo-brutalist Angular disclosure component with keyboard navigation.',
  '/docs/avatar':
    'API reference for the Ng Brutalism Avatar — neo-brutalist Angular profile image component.',
  '/docs/badge':
    'API reference for the Ng Brutalism Badge — neo-brutalist Angular status label component.',
  '/docs/button':
    'API reference for the Ng Brutalism Button — neo-brutalist Angular button with variants, sizes, and directive API.',
  '/docs/card':
    'API reference for the Ng Brutalism Card — neo-brutalist Angular content block component.',
  '/docs/checkbox':
    'API reference for the Ng Brutalism Checkbox — accessible neo-brutalist Angular checkbox component.',
  '/docs/dialog':
    'API reference for the Ng Brutalism Dialog — neo-brutalist Angular modal component with native focus management.',
  '/docs/image-card':
    'API reference for the Ng Brutalism Image Card — neo-brutalist Angular media card component.',
  '/docs/input':
    'API reference for the Ng Brutalism Input — neo-brutalist Angular form input component.',
  '/docs/input-group':
    'API reference for the Ng Brutalism Input Group — neo-brutalist Angular input composition component.',
  '/docs/label':
    'API reference for the Ng Brutalism Label — neo-brutalist Angular form label component.',
  '/docs/marquee':
    'API reference for the Ng Brutalism Marquee — neo-brutalist Angular scrolling ticker component.',
  '/docs/select':
    'API reference for the Ng Brutalism Select — neo-brutalist Angular dropdown component.',
  '/docs/textarea':
    'API reference for the Ng Brutalism Textarea — neo-brutalist Angular multi-line input component.',
  '/docs/title':
    'API reference for the Ng Brutalism Title — neo-brutalist Angular decorative heading component.',

  // Showcase
  '/showcase/portfolio':
    'Portfolio showcase built with Ng Brutalism — see the neo-brutalist Angular UI library in action.',
};

@Injectable()
export class DocsTitleStrategy extends TitleStrategy {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const seo = getDocsPageSeo(snapshot.url);

    this.title.setTitle(seo.title);
    this.updateCanonicalLink(seo.canonicalUrl);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: seo.canonicalUrl });
    this.meta.updateTag({
      property: 'og:title',
      content: seo.title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: seo.description,
    });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE_URL });
    this.meta.updateTag({
      property: 'og:image:secure_url',
      content: OG_IMAGE_URL,
    });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/png' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: OG_IMAGE_ALT });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: seo.description,
    });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE_URL });
    this.meta.updateTag({ name: 'twitter:image:alt', content: OG_IMAGE_ALT });
  }

  private updateCanonicalLink(url: string): void {
    const selector = 'link[rel="canonical"]';
    const existingLink =
      this.document.head.querySelector<HTMLLinkElement>(selector);
    const link =
      existingLink ?? this.document.createElement('link');

    link.rel = 'canonical';
    link.href = url;

    if (!existingLink) {
      this.document.head.appendChild(link);
    }
  }
}

export interface DocsPageSeo {
  title: string;
  description: string;
  canonicalUrl: string;
}

export function getDocsPageSeo(url: string): DocsPageSeo {
  const path = normalizePath(url);
  const pageTitle = getDocsPageTitle(path);

  return {
    title: pageTitle ? `${pageTitle} | ${APP_TITLE}` : APP_TITLE,
    description: PAGE_DESCRIPTIONS[path] ?? DEFAULT_DESCRIPTION,
    canonicalUrl: toCanonicalUrl(path),
  };
}

export function getDocsPageTitle(url: string): string {
  const path = normalizePath(url);

  if (path === '/' || path === '/docs') {
    return 'Introduction';
  }

  if (path === '/showcase/portfolio') {
    return 'Portfolio Showcase';
  }

  const navItem = findDocsNavItem(path);

  if (navItem) {
    return navItem.label;
  }

  return humanizePath(path);
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
