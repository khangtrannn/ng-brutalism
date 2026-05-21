import { getDocsPageSeo } from './docs-title-strategy';

describe('docs SEO metadata', () => {
  it('uses the final static URL as the canonical URL for component pages', () => {
    expect(getDocsPageSeo('/components/button?utm_source=test')).toEqual({
      title: 'Button | Ng Brutalism',
      description:
        'Neo-brutalist Button component for Angular. Hard borders, offset shadows, and multiple variants — built with directive APIs and signals.',
      canonicalUrl: 'https://ngbrutalism.khangtran.dev/components/button/',
    });
  });

  it('normalizes the docs introduction URL used by the prerendered home redirect', () => {
    expect(getDocsPageSeo('/docs/introduction').canonicalUrl).toBe(
      'https://ngbrutalism.khangtran.dev/docs/introduction/'
    );
  });
});
