import { getDocsPageSeo } from './docs-title-strategy';

describe('docs SEO metadata', () => {
  it('uses the final static URL as the canonical URL for component pages', () => {
    expect(getDocsPageSeo('/components/button?utm_source=test')).toEqual({
      title: 'Neo-Brutalist Angular Button | Ng Brutalism',
      description:
        'Neo-brutalist Button component for Angular. Hard borders, offset shadows, and multiple variants — built with directive APIs and signals.',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/components/button/',
      path: '/components/button',
      robots: 'index, follow',
      ogType: 'article',
      isTechArticle: true,
      breadcrumb: {
        name: 'Neo-Brutalist Angular Button',
        url: 'https://ngbrutalism.khangtran.dev/components/button/',
      },
    });
  });

  it('keeps docs introduction canonicalized to its own URL', () => {
    expect(getDocsPageSeo('/docs/introduction').canonicalUrl).toBe(
      'https://ngbrutalism.khangtran.dev/docs/introduction/'
    );
  });

  it('uses website metadata for the dedicated home page', () => {
    expect(getDocsPageSeo('/')).toMatchObject({
      title: 'Ng Brutalism — Neo-Brutalist Angular UI Library',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/',
      path: '/',
      robots: 'index, follow',
      ogType: 'website',
      isTechArticle: false,
    });
  });

  it('keeps layout-only routes crawlable but out of the index', () => {
    expect(getDocsPageSeo('/components')).toMatchObject({
      title: 'Components | Ng Brutalism',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/components/',
      path: '/components',
      robots: 'noindex, follow',
      isTechArticle: false,
    });
  });

  it('marks unknown routes noindex so 404-style pages do not pollute search', () => {
    expect(getDocsPageSeo('/missing/launch-page?utm_source=test')).toMatchObject({
      title: 'Launch Page | Ng Brutalism',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/missing/launch-page/',
      path: '/missing/launch-page',
      robots: 'noindex, follow',
      isTechArticle: false,
    });
  });
});
