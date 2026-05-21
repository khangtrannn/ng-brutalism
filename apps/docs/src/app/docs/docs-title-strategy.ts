import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { findDocsNavItem } from './docs.navigation';

const APP_TITLE = 'Ng Brutalism';
const DEFAULT_DESCRIPTION =
  'Neo-brutalist Angular component library. Signals, zoneless, Tailwind v4. Bold borders, offset shadows, and punchy colors — drop it in and ship loud.';

const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/docs/introduction':
    'Get started with Ng Brutalism — a neo-brutalist Angular UI library built with signals, zoneless change detection, and Tailwind v4.',
  '/docs/installation':
    'Install @ng-brutalism/ui in your Angular project. Requires Angular 21, Tailwind v4, and Node 20+.',
  '/components/button':
    'Neo-brutalist Button component for Angular. Hard borders, offset shadows, and multiple variants — built with directive APIs and signals.',
  '/components/card':
    'Neo-brutalist Card component for Angular. Bold content blocks with thick borders and offset shadows.',
  '/components/dialog':
    'Neo-brutalist Dialog component for Angular. Accessible native modal with keyboard focus and brutalist styling.',
  '/components/accordion':
    'Neo-brutalist Accordion component for Angular. Dense disclosure panels with keyboard navigation.',
  '/components/input':
    'Neo-brutalist Input component for Angular. Sharp form fields with strong focus states and Tailwind v4 tokens.',
  '/components/select':
    'Neo-brutalist Select component for Angular. Custom dropdown with bold styling and full keyboard support.',
  '/showcase/portfolio':
    'Portfolio showcase built with Ng Brutalism — see the neo-brutalist Angular UI library in action.',
};

@Injectable()
export class DocsTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const path = snapshot.url.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    const pageTitle = getDocsPageTitle(snapshot.url);
    const description = PAGE_DESCRIPTIONS[path] ?? DEFAULT_DESCRIPTION;

    this.title.setTitle(
      pageTitle ? `${pageTitle} | ${APP_TITLE}` : APP_TITLE
    );
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: pageTitle ? `${pageTitle} | ${APP_TITLE}` : APP_TITLE,
    });
  }
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
