export type Section = 'home' | 'docs' | 'components' | 'showcase';

export interface SectionLink {
  readonly section: Section;
  readonly label: string;
  readonly path: string;
}

export const TOP_SECTIONS: readonly SectionLink[] = [
  { section: 'home', label: 'Home', path: '/' },
  { section: 'docs', label: 'Docs', path: '/docs/introduction' },
  { section: 'components', label: 'Components', path: '/components/accordion' },
  { section: 'showcase', label: 'Showcase', path: '/showcase/portfolio' },
];
