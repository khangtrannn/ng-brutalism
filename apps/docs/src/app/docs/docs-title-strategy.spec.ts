import { getDocsPageSeo } from './docs-title-strategy';

describe('docs SEO metadata', () => {
  it('uses the final static URL as the canonical URL for component pages', () => {
    // Assert
    expect(getDocsPageSeo('/components/button?utm_source=test')).toEqual({
      title: 'Neo-Brutalist Angular Button | Ng Brutalism',
      description:
        'Neo-brutalist Button primitive for Angular. Hard borders, offset shadows, and tone-driven styling — built with directive APIs and signals.',
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
    // Assert
    expect(getDocsPageSeo('/docs/introduction').canonicalUrl).toBe(
      'https://ngbrutalism.khangtran.dev/docs/introduction/'
    );
  });

  it('uses indexable metadata for the FAQ content-depth page', () => {
    // Assert
    expect(getDocsPageSeo('/docs/faq')).toMatchObject({
      title: 'FAQ | Ng Brutalism',
      description:
        'Ng Brutalism FAQ for Angular developers. Learn what the neo-brutalist Angular primitive library and composition system is, why it uses Tailwind v4, how it compares, and whether it fits your project.',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/docs/faq/',
      path: '/docs/faq',
      robots: 'index, follow',
      ogType: 'article',
      isTechArticle: true,
    });
  });

  it('uses website metadata for the dedicated home page', () => {
    // Assert
    expect(getDocsPageSeo('/')).toMatchObject({
      title: 'Ng Brutalism — Neo-Brutalist Angular UI Primitive Library',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/',
      path: '/',
      robots: 'index, follow',
      ogType: 'website',
      isTechArticle: false,
    });
  });

  it('keeps layout-only routes crawlable but out of the index', () => {
    // Assert
    expect(getDocsPageSeo('/components')).toMatchObject({
      title: 'Components | Ng Brutalism',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/components/',
      path: '/components',
      robots: 'noindex, follow',
      isTechArticle: false,
    });
  });

  it('marks unknown routes noindex so 404-style pages do not pollute search', () => {
    // Assert
    expect(
      getDocsPageSeo('/missing/launch-page?utm_source=test')
    ).toMatchObject({
      title: 'Launch Page | Ng Brutalism',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/missing/launch-page/',
      path: '/missing/launch-page',
      robots: 'noindex, follow',
      isTechArticle: false,
    });
  });
});
