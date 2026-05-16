export interface NavItem {
  readonly label: string;
  readonly path: string;
}

export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

export const DOC_NAV: readonly NavGroup[] = [
  {
    label: 'Getting started',
    items: [
      { label: 'Introduction', path: '/docs' },
      { label: 'Migrating from V3', path: '/docs/migrating-from-v3' },
      { label: 'Installation', path: '/docs/installation' },
      { label: 'Resources', path: '/docs/resources' },
      { label: 'Figma', path: '/docs/figma' },
      { label: 'Changelog', path: '/docs/changelog' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Accordion', path: '/docs/accordion' },
      { label: 'Button', path: '/docs/button' },
      { label: 'Card', path: '/docs/card' },
      { label: 'Checkbox', path: '/docs/checkbox' },
      { label: 'Image Card', path: '/docs/image-card' },
      { label: 'Input', path: '/docs/input' },
      { label: 'Label', path: '/docs/label' },
      { label: 'Marquee', path: '/docs/marquee' },
    ],
  },
  {
    label: 'Stars',
    items: [{ label: 'Installation', path: '/docs/stars/installation' }],
  },
];
