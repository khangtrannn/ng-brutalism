import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import {
  APP_TITLE,
  AUTHOR_NAME,
  AUTHOR_URL,
  AUTHOR_X_URL,
  DocsPageSeo,
  GOOGLE_SITE_VERIFICATION,
  LIB_VERSION,
  MODIFIED_DATE,
  NPM_URL,
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
  OG_LOCALE,
  PUBLISHED_DATE,
  REPO_URL,
  SITE_URL,
  SOFTWARE_KEYWORDS,
  getDocsPageSeo,
} from './docs-seo-data';

export { getDocsPageSeo, getDocsPageTitle, type DocsPageSeo } from './docs-seo-data';

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
    this.meta.updateTag({ name: 'robots', content: seo.robots });
    this.meta.updateTag({ property: 'og:type', content: seo.ogType });
    this.meta.updateTag({ property: 'og:url', content: seo.canonicalUrl });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
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

    this.updateGoogleVerification(seo.path === '/');
    this.updateJsonLd(seo);
  }

  private updateGoogleVerification(present: boolean): void {
    const selector = 'meta[name="google-site-verification"]';
    const existing = this.document.head.querySelector<HTMLMetaElement>(selector);

    if (!present) {
      existing?.remove();
      return;
    }

    const meta =
      existing ?? (this.document.createElement('meta') as HTMLMetaElement);
    meta.setAttribute('name', 'google-site-verification');
    meta.setAttribute('content', GOOGLE_SITE_VERIFICATION);

    if (!existing) {
      this.document.head.appendChild(meta);
    }
  }

  private updateCanonicalLink(url: string): void {
    const selector = 'link[rel="canonical"]';
    const existingLink =
      this.document.head.querySelector<HTMLLinkElement>(selector);
    const link = existingLink ?? this.document.createElement('link');

    link.rel = 'canonical';
    link.href = url;

    if (!existingLink) {
      this.document.head.appendChild(link);
    }
  }

  private updateJsonLd(seo: DocsPageSeo): void {
    const blocks: Record<string, object | null> = {
      'software-application':
        seo.path === '/' ? buildSoftwareApplicationLd() : null,
      breadcrumbs: seo.path === '/' ? null : buildBreadcrumbListLd(seo),
      'tech-article': seo.isTechArticle ? buildTechArticleLd(seo) : null,
    };

    for (const [key, payload] of Object.entries(blocks)) {
      this.setJsonLdBlock(key, payload);
    }
  }

  private setJsonLdBlock(key: string, payload: object | null): void {
    const selector = `script[type="application/ld+json"][data-ld="${key}"]`;
    const existing =
      this.document.head.querySelector<HTMLScriptElement>(selector);

    if (!payload) {
      existing?.remove();
      return;
    }

    const script =
      existing ?? (this.document.createElement('script') as HTMLScriptElement);
    script.type = 'application/ld+json';
    script.setAttribute('data-ld', key);
    script.textContent = JSON.stringify(payload);

    if (!existing) {
      this.document.head.appendChild(script);
    }
  }
}

function buildSoftwareApplicationLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: APP_TITLE,
    alternateName: ['ng-brutalism', '@ng-brutalism/ui'],
    description:
      'Neo-brutalist Angular UI library with signals, zoneless change detection, and Tailwind v4. Brutalist Angular components with hard borders and offset shadows.',
    url: SITE_URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    programmingLanguage: 'TypeScript',
    softwareVersion: LIB_VERSION,
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: REPO_URL,
    downloadUrl: NPM_URL,
    keywords: SOFTWARE_KEYWORDS.join(', '),
    sameAs: [NPM_URL, REPO_URL],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      sameAs: [AUTHOR_X_URL],
    },
  };
}

function buildBreadcrumbListLd(seo: DocsPageSeo): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: APP_TITLE,
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: seo.breadcrumb.name,
        item: seo.breadcrumb.url,
      },
    ],
  };
}

function buildTechArticleLd(seo: DocsPageSeo): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: seo.breadcrumb.name,
    description: seo.description,
    url: seo.canonicalUrl,
    datePublished: PUBLISHED_DATE,
    dateModified: MODIFIED_DATE,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      sameAs: [AUTHOR_X_URL],
    },
    publisher: {
      '@type': 'Organization',
      name: APP_TITLE,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.canonicalUrl,
    },
  };
}
