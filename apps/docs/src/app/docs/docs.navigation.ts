export interface DocsTocItem {
  readonly label: string;
  readonly fragment: string;
}

export interface DocsNavItem {
  readonly label: string;
  readonly path?: string;
  readonly toc?: readonly DocsTocItem[];
}

export interface DocsNavGroup {
  readonly label: string;
  readonly items: readonly DocsNavItem[];
}

export const docsNavGroups: readonly DocsNavGroup[] = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/docs/introduction' },
      { label: 'Installation', path: '/docs/installation' },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        label: 'Accordion',
        path: '/components/accordion',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Single collapsible', fragment: 'single-collapsible' },
          { label: 'Multiple', fragment: 'multiple' },
          { label: 'Disabled item', fragment: 'disabled-item' },
          { label: 'Default opened item', fragment: 'default-open' },
          { label: 'API', fragment: 'api' },
        ],
      },
      {
        label: 'Button',
        path: '/components/button',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Installation', fragment: 'installation' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Examples', fragment: 'examples' },
          { label: 'Variants', fragment: 'variants' },
          { label: 'Sizes', fragment: 'sizes' },
          { label: 'Full width', fragment: 'full-width' },
          { label: 'Disabled', fragment: 'disabled' },
          { label: 'Anchor usage', fragment: 'anchor-usage' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Badge', path: '/components/badge' },
      { label: 'Card', path: '/components/card' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Dialog', path: '/components/dialog' },
      { label: 'Image Card', path: '/components/image-card' },
      { label: 'Input', path: '/components/input' },
      {
        label: 'Input Group',
        path: '/components/input-group',
        toc: [
          { label: 'Overview', fragment: 'overview' },
          { label: 'Preview', fragment: 'preview' },
          { label: 'Usage', fragment: 'usage' },
          { label: 'Prefix and Suffix', fragment: 'prefix-suffix' },
          { label: 'With Label', fragment: 'with-label' },
          { label: 'Textarea', fragment: 'textarea' },
          { label: 'Disabled', fragment: 'disabled' },
          { label: 'API', fragment: 'api' },
        ],
      },
      { label: 'Label', path: '/components/label' },
      { label: 'Marquee', path: '/components/marquee' },
      { label: 'Textarea', path: '/components/textarea' },
    ],
  },
];

export const docsNavItems: readonly DocsNavItem[] = docsNavGroups.flatMap(
  (group) => group.items
);

export function findDocsNavItem(path: string): DocsNavItem | undefined {
  const normalizedPath = path.split(/[?#]/, 1)[0] || '/';

  return docsNavItems.find((item) => item.path === normalizedPath);
}
